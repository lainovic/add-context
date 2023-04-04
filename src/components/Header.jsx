import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--color-gray-700);
`;

const Text = styled.h1`
  text-align: center;
  font-size: 2rem;
`;

function Header() {
  return (
    <Wrapper>
      <Text>Context Matters.</Text>
    </Wrapper>
  );
}

export default Header;
