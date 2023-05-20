import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: ${({ isVisible }) => `${ isVisible ? "0" : "-50px" }`};
  left: 0;
  right: 0;
  height: 50px;
  background-color: darkred;
  color: white;
  font-family: "Alkatra", cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: top 0.64s; 
`;

const ErrorBanner = ({ isVisible, children }) => {
  return (
    <Wrapper isVisible={isVisible}>
      {children}
    </Wrapper>
  );
};

export default ErrorBanner;
