import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

function AddContextButton({ onPressed }) {
  return (
    <Wrapper>
      <Button onClick={onPressed}>
        <span>Add Context!</span>
      </Button>
    </Wrapper>
  );
}

export default AddContextButton;
