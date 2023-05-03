import React from "react";
import styled from "styled-components";

import ImageInput from "./ImageInput";
import AddContextButton from "./AddContextButton";
import ContextInput from "./ContextInput";
import ContextOutput from "./ContextOutput";
import { Margin, Spacer } from "./common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IfSpan = styled.span`
  position: relative;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 4rem;
  user-select: none;
  z-index: 1;
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
  const res = await fetch(imageUrl)
  const blob = await res.blob();
  const type = res.headers.get("content-type");
  setImage({ blob, type });
}

async function saveImageToBucket(image) {
  const ep = "http://localhost:3000/api/image";
  //const ep = "https://add-context-proxy.vercel.app/image";

  const formData = new FormData();
  formData.append("image-data", image.blob);
  formData.append("image-type", image.type);
  const req = {
    method: "POST",
    body: formData
  };
  console.log("---> sending the request to the bucket: ", req);

  const response = await fetch(ep, req);
  if (!response.ok) {
    return { status: response.status, imageUrlError: `The request failed with: ${response.statusText}` };
  }

  const { url, error } = await response.json();
  if (error) {
    return { status: response.status, error };
  }
  console.log("---> image saved in the bucket: ", url);
  return { url };
}

async function saveEntityToDatabase(imageUrl, text) {
  const entity = { imageUrl, text };

  const ep = "http://localhost:3000/api/context";
  //const ep = "https://add-context-proxy.vercel.app/context";

  const req = {
    method: "POST",
    body: JSON.stringify(entity)
  };
  console.log("---> sending the request to the database: ", req);

  const response = await fetch(ep, req);
  if (!response.ok) {
    return { status: response.status, error: `The request failed with: ${response.statusText}` };
  }

  const { url, error } = await response.json();
  if (error) {
    console.log({ error });
  }
  console.log("---> entity saved to the database: ", url);
  return url;
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
    const { url: entityUrl, error: entityUrlError } = await saveEntityToDatabase(imageUrl, text);
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

const Context = () => {
  const [text, setText] = React.useState("");
  const [context, setContext] = React.useState(false);
  const [image, setImage] = React.useState(null);
  usePastedImage(setImage);

  return (
    <Wrapper>
      {image ? (
        <img
          src={URL.createObjectURL(image.blob)}
          width="50%"
          style={{ maxHeight: "800px" }}
          alt="A given image."
        ></img>
      ) : (
        <ImageInput onEnterPressed={url => useImageFromUrl(url, setImage)} />
      )}
      <Margin mt={-12}>
        <IfSpan>if</IfSpan>
      </Margin>
      {context ? (
        <ContextOutput text={text} />
      ) : (
        <>
          <ContextInput setText={setText} />
          <Spacer h={24} />
          <AddContextButton
            onPressed={async () => onAddContext(image, text, setContext)}
          />
        </>
      )}
      <Spacer h={24} />
    </Wrapper>
  );
};

export default Context;

