import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  user-select: none;
  padding: 16px;
  font-size: 2rem;
  text-align: center;
  & span {
    color: var(--color-dark);
    text-transform: lowercase;
    font-size: 3rem;
    font-family: "Alkatra", cursive;
  }
`;

function Header() {
  return (
    <Wrapper>
      <img src="img/front.png" width={120} alt="hello there!" />
      <Text>
        context <span>matters</span>
      </Text>
    </Wrapper>
  );
}

export default Header;
