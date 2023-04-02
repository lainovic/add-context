import styled from "styled-components";

import { Movable } from "./common";

const Wrapper = styled(Movable)`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--color-gray-700);
`;

const Text = styled.h1`
  text-align: center;
  font-size: 2rem;
`;

const Header = ({ mb }) => {
  return (
    <Wrapper mb={mb}>
      <Text>Context Matters.</Text>
    </Wrapper>
  );
};

export default Header;
