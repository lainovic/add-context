import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  background-color: var(--color-medium-gray);
`;

const Form = styled.form`
  background-color: var(--color-dark-gray);
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  font-family: "Roboto", sans-serif;
  outline: none;
  background-color: var(--color-dark-gray);
  color: white;
  text-align: center;
  width: 100%;
  height: 100%;
  transition: border-color 0.3s ease;
  background-color: var(--color-dark-gray);
  border: 1px solid var(--color-dark-gray);
  &:hover {
    border-color: white;
  }
  &::placeholder {
    color: white;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

function ImageInput() {
  return (
    <Wrapper>
      <Form>
        <Input type="url" placeholder="Paste an image or its URL here." />
      </Form>
    </Wrapper>
  );
}

export default ImageInput;
