import styled from "styled-components";

import { Movable } from "./common";

const Wrapper = styled(Movable)`
  display: flex;
  flex-direction: column;
`;

const ContextArea = () => {
  return (
    <Wrapper>
      <textarea></textarea>
      <button>Add context</button>
    </Wrapper>
  );
};

export default ContextArea;
