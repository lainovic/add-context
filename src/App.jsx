import styled from "styled-components";

import Header from "./components/Header";
import Context from "./components/Context";
import { Margin } from "./components/common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

function App() {
  return (
    <Wrapper>
      <Margin mt={24}>
        <Header />
        <Context />
      </Margin>
    </Wrapper>
  );
}

export default App;
