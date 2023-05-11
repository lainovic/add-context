import React from "react";
import ReactDOM from "react-dom/client";

import styled from "styled-components";

import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import ContextTemplate from "./components/ContextTemplate"
import TextOutput from "./components/TextOutput";
import ImageOutput from "./components/ImageOutput";
import Button from "./components/Button";
import { Margin } from "./helpers/layout.helpers";

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-family: "Alkatra", "cursive";
`;

const ContextWrapper = styled.div`
  padding: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UrlWrapper = styled.span`
  color: gray;
  text-align: center;
`;

const TextComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function ContextSnapshot({ image, text }) {
  const captureRef = React.useRef(null);

  const handleCapture = async () => {
    const root = document.createElement("div");
    const url = (
      <Margin mt={12} mb={12}>
        <div
          style={{ textAlign: "center" }}
        >
          <UrlWrapper>contextify.me</UrlWrapper>
        </div>
      </Margin>
    )
    ReactDOM.createRoot(root).render(url);
    captureRef.current.appendChild(root);
    setTimeout(async () => {
      const canvas = await html2canvas(captureRef.current);
      captureRef.current.removeChild(root);
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
      }, 100); 
    });
  };

  const ImageComponent = <ImageOutput image={URL.createObjectURL(image.blob)} />

  const TextComponent = <TextComponentWrapper>
    <TextOutput text={text} />
  </TextComponentWrapper>

  return <Wrapper>
    <ContextWrapper ref={captureRef}>
      <ContextTemplate
        ImageComponent={ImageComponent}
        TextComponent={TextComponent}
      />
    </ContextWrapper>
    <ButtonWrapper>
      <Button onClick={handleCapture}><span>Copy as image</span></Button>
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
    </ButtonWrapper>
  </Wrapper>
};

export default ContextSnapshot;

