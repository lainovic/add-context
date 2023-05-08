import styled from "styled-components";

import Header from "./components/Header";
import { Margin, WidthInPercent } from "./components/common";
import { Outlet } from "react-router-dom";

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
      <WidthInPercent w={50}>
        <Margin mt={24}>
          <Header />
          <Outlet />
        </Margin>
      </WidthInPercent>
    </Wrapper>
  );
}

export default App;
