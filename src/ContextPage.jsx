import React from "react";
import styled from "styled-components";

import ImageInput from "./components/ImageInput";
import ContextInput from "./components/ContextInput";
import ContextOutput from "./components/ContextOutput";
import ContextTemplate from "./components/ContextTemplate"
import ImageOutput from "./components/ImageOutput";

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

const ContextPage = () => {
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
    <ContextOutput text={text} />
  ) : (
    <ContextInput setText={setText} onTextEntered={() => onAddContext(image, text, setContext)} />
  )

  return <ContextTemplate
    ImageComponent={ImageComponent}
    TextComponent={TextComponent}
  />
};

export default ContextPage;

