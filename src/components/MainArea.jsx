import styled from "styled-components";

import InputArea from "./InputArea";
import ContextArea from "./ContextArea";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const MainArea = () => {
  return (
    <Wrapper>
      <InputArea />
      <span>if</span>
      <ContextArea />
    </Wrapper>
  );
};

export default MainArea;
