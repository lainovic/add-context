import styled from "styled-components";

import Header from "./components/Header";
import MainArea from "./components/MainArea";

import { Margin } from "./components/common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Margin mt={42}>
        <MainArea />
      </Margin>
    </Wrapper>
  );
}

export default App;
