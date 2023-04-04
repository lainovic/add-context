import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function ContextArea() {
  return (
    <Wrapper>
      <textarea></textarea>
      <button>Add context</button>
    </Wrapper>
  );
}

export default ContextArea;
