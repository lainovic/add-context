import styled from "styled-components";

const Wrapper = styled.pre`
  font-family: "Alkatra", cursive;
  text-align: center;
`;

function TextOutput({ text }) {
  return (
    <Wrapper>
      {text}
    </Wrapper>
  );
}

export default TextOutput;
