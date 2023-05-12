import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
`;

const TextWrapper = styled.div`
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
      <ImageWrapper>
        <img src="static/images/animated_front.gif" width={120} alt="the flaming orange" />
      </ImageWrapper>
      <TextWrapper>
        <Text>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">context <span>matters</span></Link>
        </Text>
      </TextWrapper>
    </Wrapper>
  );
}

export default Header;
