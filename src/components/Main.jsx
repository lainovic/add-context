import styled from "styled-components";

import InputArea from "./InputArea";
import ContextArea from "./ContextArea";

import { Movable } from "./common";

const Wrapper = styled(Movable)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Main = () => {
  return (
    <Wrapper>
      <InputArea />
      <span>if</span>
      <ContextArea />
    </Wrapper>
  );
};

export default Main;
