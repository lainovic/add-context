import styled from "styled-components";

import { Movable } from "./common";

const Wrapper = styled(Movable)``;

const InputArea = () => {
  return (
    <Wrapper>
      <form>
        <input type="url" placeholder="Paste image or URL" />
      </form>
    </Wrapper>
  );
};

export default InputArea;
