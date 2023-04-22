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
`;

const TextArea = styled.textarea`
  display: block;
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 100%;
  padding: 10px;
  resize: none;
  transition: border-color 0.3s ease;
  border: none;
  background-color: var(--color-dark-gray);
  color: white;
  &::placeholder {
    color: white;
  }
  &:focus::placeholder {
    color: transparent;
  }
  &:hover {
    border-color: white;
  }
`;

function ContextInput() {
  return (
    <Wrapper>
      <TextArea placeholder="Enter context."></TextArea>
    </Wrapper>
  );
}

export default ContextInput;
