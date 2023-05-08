import React from "react";

import { Navigate } from "react-router-dom";

import ImageInput from "./components/ImageInput";
import TextInput from "./components/TextInput";
import ContextTemplate from "./components/ContextTemplate"
import ImageOutput from "./components/ImageOutput";
import Button from "./components/Button";
import { Spacer } from "./helpers/layout.helpers";

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

async function onAddContext(image, text, setContextId) {
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
    setContextId(entityId);
  } catch (error) {
    console.error(error);
    return;
  }
}

const Context = () => {
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [contextId, setContextId] = React.useState(null);
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
    <>
      <TextInput setText={setText} />
      <Spacer h={24} />
      <Button onClick={() => onAddContext(image, text, setContextId)}>
        <span>Add Context</span>
      </Button>
    </>

  return <ContextTemplate
    ImageComponent={ImageComponent}
    TextComponent={TextComponent}
  />
};

export default Context;
