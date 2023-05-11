import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UrlWrapper = styled.a`
  font-family: "Alkatra", cursive;
  text-decoration: none;
  color: black;
`;

function Footer() {
  return (
    <Wrapper>
      <UrlWrapper href="https://mare.care">mare.care</UrlWrapper>
    </Wrapper>
  );
}

export default Footer;
