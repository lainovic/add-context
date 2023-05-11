import styled from "styled-components";

import Header from "./Header";
import ContextInput from "./ContextInput";
import { Padding } from "./helpers/layout.helpers";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function RootPage() {
  return (
    <Wrapper>
      <Padding pt={24} pb={24}>
        <Header />
        <ContextInput />
      </Padding>
    </Wrapper>
  );
}

export default RootPage;
