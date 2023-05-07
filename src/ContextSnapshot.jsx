import React from "react";

import ContextTemplate from "./components/ContextTemplate"
import TextOutput from "./components/TextOutput";
import ImageOutput from "./components/ImageOutput";

const ContextSnapshot = ({ image, text }) => {
  if (image === null && text === null) {
    return <div>Loading...</div>;
  }

  const ImageComponent = <ImageOutput image={URL.createObjectURL(image.blob)} />
  const TextComponent = <TextOutput text={text} />

  return <ContextTemplate
    ImageComponent={ImageComponent}
    TextComponent={TextComponent}
  />
};

export default ContextSnapshot;

