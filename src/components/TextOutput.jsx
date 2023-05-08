import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 120px;
  width: 100%;
  font-family: "Alkatra", cursive;
`;

function TextOutput({ text }) {
  return (
    <Wrapper>
      <div style={{ maxWidth: "100%" }}>{text}</div>
    </Wrapper>
  );
}

export default TextOutput;
