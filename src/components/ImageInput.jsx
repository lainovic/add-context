import React from "react";
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

function ImageInput({ onImageUrlEntered }) {
  const [text, setText] = React.useState("");

  return (
    <Wrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onImageUrlEntered(text);
        }}>
        <Input
          type="url"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onBlur={() => { onImageUrlEntered(text); }
          }
          placeholder="Paste an image, or its URL in here." />
      </Form>
    </Wrapper>
  );
}

export default ImageInput;
