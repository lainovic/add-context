import React from "react";
import styled from "styled-components";

import ImageInput from "./ImageInput";
import AddContextButton from "./AddContextButton";
import ContextInput from "./ContextInput";
import { Margin } from "./common";

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
  color: white;
  user-select: none;
  z-index: 1;
`;

function usePastedImage(event) {
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    function handlePaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      console.log("---> enter handlePaste");
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
  const pastedImage = usePastedImage();
  return (
    <Wrapper>
      {pastedImage ? (
        <img
          src={pastedImage}
          width="50%"
          alt="Pasted from the clipboard"
        ></img>
      ) : (
        <ImageInput />
      )}
      <Margin mt={-24}>
        <IfSpan>if</IfSpan>
      </Margin>
      <Margin mt={-30}>
        <ContextInput />
      </Margin>
      <Margin mt={24} mb={24}>
        <AddContextButton />
      </Margin>
    </Wrapper>
  );
};

export default Context;
