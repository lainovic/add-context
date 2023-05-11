import React from "react";
import styled from "styled-components";

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
  -webkit-text-stroke: 1px #eee;
  text-shadow: 0px 2px 2px #aaa;
`;

const ImageWrapper = styled.div`
`;

const IfWrapper = styled.div`
  margin: 0 0 0 0;
`;

const TextWrapper = styled.div`
`;

const ContextTemplate = React.forwardRef(({ ImageComponent, TextComponent }, ref) => {
  return (
    <Wrapper ref={ref}>
      <ImageWrapper>
        {ImageComponent}
      </ImageWrapper>
      <IfWrapper>
        <IfSpan>if</IfSpan>
      </IfWrapper>
      <TextWrapper>
        {TextComponent}
      </TextWrapper>
    </Wrapper >
  );
});

export default ContextTemplate;

