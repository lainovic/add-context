import React from "react";
import styled from "styled-components";

import html2canvas from "html2canvas";

import ContextTemplate from "./components/ContextTemplate"
import TextOutput from "./components/TextOutput";
import ImageOutput from "./components/ImageOutput";
import { Margin } from "./components/common";

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
`;

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

function ContextSnapshot({ image, text }) {
  const captureRef = React.useRef(null);

  const handleCapture = () => {
    html2canvas(captureRef.current).then(canvas => {
      canvas.toBlob(blob => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
      });
    });
  };

  if (image === null && text === null) {
    return <div>Loading...</div>;
  }

  const ImageComponent = <ImageOutput image={URL.createObjectURL(image.blob)} />
  const TextComponent = <>
    <TextOutput text={text} />
    <div style={{
      fontFamily: ["Alkatra", "cursive"]
    }}>contextify.me</div>
  </>

  return <Wrapper>
    <Margin mt={20} ref={captureRef}>
      <ContextTemplate
        ImageComponent={ImageComponent}
        TextComponent={TextComponent}
      />
    </Margin>
    <Button onClick={handleCapture}><span>Copy as image</span></Button>
  </Wrapper>
};

export default ContextSnapshot;

