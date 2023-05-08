import React from "react";
import styled from "styled-components";

import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import ContextTemplate from "./components/ContextTemplate"
import TextOutput from "./components/TextOutput";
import ImageOutput from "./components/ImageOutput";
import { Margin } from "./helpers/layout.helpers";
import Button from "./components/Button";

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

function ContextSnapshot({ image, text }) {
  const captureRef = React.useRef(null);

  const handleCapture = () => {
    html2canvas(captureRef.current).then(canvas => {
      canvas.toBlob(blob => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
        toast.info('Image copied into the clipboard.', {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        })
      });
    });
  };

  if (image === null && text === null) {
    return <div style={{
      fontFamily: ["Alkatra", "cursive"]
    }}>Loading...</div>;
  }

  const ImageComponent = <ImageOutput image={URL.createObjectURL(image.blob)} />
  const TextComponent = <>
    <TextOutput text={text} />
    <div style={{
      fontFamily: ["Alkatra", "cursive"],
      color: "gray"
    }}>contextify.me</div>
  </>

  return <Wrapper>
    <Margin mt={20} ref={captureRef}>
      <ContextTemplate
        ImageComponent={ImageComponent}
        TextComponent={TextComponent}
      />
    </Margin>
    <ToastContainer
      position="bottom-center"
      autoClose={1000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="light"
    />
    <Button onClick={handleCapture}><span>Copy as image</span></Button>
  </Wrapper>
};

export default ContextSnapshot;

