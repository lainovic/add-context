import styled from "styled-components";

import Header from "./components/Header";
import Main from "./components/Main";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

function App() {
  return (
    <Wrapper>
      <Header mb={42} />
      <Main />
    </Wrapper>
  );
}

export default App;
