import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  font-family: "Roboto", sans-serif;
  outline: none;
  text-align: center;
  width: 100%;
  height: 100%;
  transition: border-color 0.3s ease;
  border: 1px solid white;
  &:hover {
    border-color: var(--color-dark-gray);
;
  }
  &::placeholder {
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
