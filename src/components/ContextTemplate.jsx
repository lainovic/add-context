import React from "react";
import styled from "styled-components";

import { Margin, Spacer } from "../helpers/layout.helpers";

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

const ContextTemplate = React.forwardRef(({ ImageComponent, TextComponent }, ref) => {
  return (
    <Wrapper ref={ref}>
      {ImageComponent}
      <Margin mt={-12}>
        <IfSpan>if</IfSpan>
      </Margin>
      {TextComponent}
      <Spacer h={24} />
    </Wrapper >
  );
});

export default ContextTemplate;

