import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 120px;
  border: 4px solid var(--color-medium-gray);
  transition: border-color 0.3s ease;
  &:hover {
    border-color: white;
  }
  font-family: "Alkatra", cursive;
  color: white;
`;

function ContextOutput({ text }) {
  return (
    <Wrapper>
      <div>{text}</div>
    </Wrapper>
  );
}

export default ContextOutput;
