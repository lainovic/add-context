import React from "react";
import styled from "styled-components";

import ImageInput from "./components/ImageInput";
import TextInput from "./components/TextInput";
import TextOutput from "./components/TextOutput";
import ContextTemplate from "./components/ContextTemplate"
import ImageOutput from "./components/ImageOutput";

import { Spacer } from "./components/common";

import { saveImageToBucket, saveContextToDatabase } from "./helpers/db.helpers";

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
  const res = await fetch(imageUrl)
  const blob = await res.blob();
  const type = res.headers.get("content-type");
  setImage({ blob, type });
}

async function onAddContext(image, text, setContext) {
  if (text === "" || !image) {
    return;
  }
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
    setContext(true);
  } catch (error) {
    console.error(error);
    return;
  }
}

const Button = styled.button`
  border: 2px solid white;
  border-radius: 16px;
  padding: 8px 24px;
  transition: background-color 0.3s ease;
  & span {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
  }
  background-color: black;
  color: white;
  &:hover {
    background-color: white;
    border-color: var(--color-black);
    color: black;
  }
`;

const Context = () => {
  const [text, setText] = React.useState("");
  const [context, setContext] = React.useState(false);
  const [image, setImage] = React.useState(null);
  usePastedImage(setImage);

  const ImageComponent = image ? (
    <ImageOutput image={URL.createObjectURL(image.blob)} />
  ) : (
    <ImageInput onImageUrlEntered={url => useImageFromUrl(url, setImage)} />
  )

  const TextComponent = context ? (
    <TextOutput text={text} />
  ) : (
    <>
      <TextInput setText={setText} />
      <Spacer h={24} />
      <Button onClick={() => onAddContext(image, text, setContext)}>
        <span>Add Context</span>
      </Button>
    </>
  )

  return <ContextTemplate
    ImageComponent={ImageComponent}
    TextComponent={TextComponent}
  />
};

export default Context;
