import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 120px;
  font-family: "Alkatra", cursive;
`;

function ContextOutput({ text }) {
  return (
    <Wrapper>
      <div>{text}</div>
    </Wrapper>
  );
}

export default ContextOutput;
