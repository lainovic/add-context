import styled from "styled-components";

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

function TextInput({ setText }) {
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
    </>
  );
}

export default TextInput;
