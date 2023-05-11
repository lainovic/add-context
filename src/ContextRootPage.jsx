import styled from "styled-components";

import Header from "./Header";
import ContextInput from "./ContextInput";
import { Padding } from "./helpers/layout.helpers";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function RootPage() {
  return (
    <Wrapper>
      <Header />
      <ContextInput />
    </Wrapper>
  );
}

export default RootPage;
