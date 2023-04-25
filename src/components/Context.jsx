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

function usePastedImage(event) {
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    function handlePaste(event) {
      const clipboardData = event.clipboardData 
      if (!clipboardData) {
        return;
      }
      const items = clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          const url = URL.createObjectURL(blob);
          setImage(url);
          break;
        }
      }
    }
    window.addEventListener("paste", handlePaste);
  }, []);

  return image;
}

const Context = () => {
  const [context, setContext] = React.useState("");
  const [addedContext, setAddedContext] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const pastedImage = usePastedImage();

  return (
    <Wrapper>
      {pastedImage || imageUrl ? (
        <img
          src={pastedImage || imageUrl}
          width="50%"
          style={{ maxHeight: "800px" }}
          alt="Pasted from the clipboard"
        ></img>
      ) : (
        <ImageInput onEnterPressed={setImageUrl}/>
      )}
      <Margin mt={-12}>
        <IfSpan>if</IfSpan>
      </Margin>
        {pastedImage && context !== "" && addedContext ? (
          <ContextOutput text={context} />
        ) : (
          <>
            <ContextInput setContext={setContext} />
            <Spacer h={24} />
            <AddContextButton
              onPressed={() => {
                if (context === "" || !pastedImage) return;
                setAddedContext(true);
              }}
            />
          </>
        )}
            <Spacer h={24} />
    </Wrapper>
  );
};

export default Context;
