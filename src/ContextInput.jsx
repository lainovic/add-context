import React from "react";
import styled from "styled-components";

import { Navigate } from "react-router-dom";

import ImageInput from "./components/ImageInput";
import TextInput from "./components/TextInput";
import ContextTemplate from "./components/ContextTemplate"
import ImageOutput from "./components/ImageOutput";
import Button from "./components/Button";
import { Spacer } from "./helpers/layout.helpers";

import { saveImageToBucket, saveContextToDatabase } from "./helpers/db.helpers";
import { BeatLoader } from "react-spinners";

const TextComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center
`;

function usePastedImage(setImage) {
  React.useEffect(() => {
    async function handlePaste(event) {
      const clipboardData = event.clipboardData
      if (!clipboardData) {
        return;
      }
      const items = clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          const type = item.type.split('/')[1];
          setImage({ blob, type });
          break;
        }
      }
    }
    window.addEventListener("paste", handlePaste);
  }, []);
}

async function useImageFromUrl(imageUrl, setImage) {
  try {
    const res = await fetch(imageUrl)
    if (!res.ok) {
      console.error(`---> "${imageUrl}" not a valid url`);
      return;
    }
    const blob = await res.blob();
    const type = res.headers.get("content-type");
    if (!type.startsWith("image/")) {
      console.error(`---> "${imageUrl}" is not a valid image URL.`);
      return;
    }
    setImage({ blob, type });
  } catch (error) {
    console.error("--->", error);
  }
}

async function onAddContext(image, text, setContextId, setIsLoading) {
  setIsLoading(true);
  try {
    const { url: imageUrl, error: imageUrlError } = await saveImageToBucket(image);
    if (imageUrlError) {
      console.error({ imageUrlError });
      return;
    }
    const { id: entityId, error: entityUrlError } = await saveContextToDatabase(imageUrl, text);
    if (entityUrlError) {
      console.error({ entityUrlError });
      return;
    }
    setContextId(entityId);
  } catch (error) {
    console.error(error);
    setIsLoading(false);
  }
}

const ContextInput = () => {
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [contextId, setContextId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  usePastedImage(setImage);

  if (contextId) {
    return <Navigate to={`/${contextId}`} replace={true} />
  }

  const ImageComponent = image ? (
    <ImageOutput image={URL.createObjectURL(image.blob)} />
  ) : (
    <ImageInput onImageUrlEntered={url => useImageFromUrl(url, setImage)} />
  )

  const TextComponent =
    <TextComponentWrapper>
      <TextInput setText={setText} />
      <Spacer h={24} />
      {isLoading ?
        <BeatLoader /> :
        <Button
          disabled={text === "" || image === null}
          onClick={() => onAddContext(image, text, setContextId, setIsLoading)}>
          <span>Contextify</span>
        </Button>
      }
    </TextComponentWrapper>

  return <ContextTemplate
    ImageComponent={ImageComponent}
    TextComponent={TextComponent}
  />
};

export default ContextInput;
