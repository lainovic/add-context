import styled from "styled-components";

const Wrapper = styled.div``;

function InputArea() {
  return (
    <Wrapper>
      <form>
        <input type="url" placeholder="Paste image or URL" />
      </form>
    </Wrapper>
  );
}

export default InputArea;
