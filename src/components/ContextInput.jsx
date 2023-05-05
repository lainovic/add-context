import styled from "styled-components";
import { Spacer } from "./common";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 120px;
`;

const TextArea = styled.textarea`
  display: block;
  font-family: "roboto", sans-serif;
  width: 100%;
  height: 100%;
  padding: 10px;
  resize: none;
  transition: border-color 0.3s ease;
  border: 1px solid white;
  outline: none;
  &::placeholder {
      text-align: center;
  }
  &:focus::placeholder {
    color: transparent;
  }
  &:hover {
    border-color: var(--color-light-gray);
  }
`;

const Button = styled.button`
  border: 2px solid white;
  border-radius: 16px;
  padding: 8px 24px;
  transition: background-color 0.3s ease;
  & span {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
  }
  background-color: black;
  color: white;
  &:hover {
    background-color: white;
    border-color: var(--color-black);
    color: black;
  }
`;

function ContextInput({ setText, onTextEntered }) {
  return (
    <>
      <Wrapper>
        <TextArea
          placeholder="Enter context here."
          onChange={(event) => {
            setText(event.target.value);
          }}
        ></TextArea>
      </Wrapper>
      <Spacer h={24} />
      <Button onClick={onTextEntered}>
        <span>Add Context</span>
      </Button>
    </>
  );
}

export default ContextInput;
