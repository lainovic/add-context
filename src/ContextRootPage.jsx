import React from "react";
import styled from "styled-components";

import { Navigate } from "react-router-dom";

import Header from "./Header";
import ContextInput from "./ContextInput";
import ContextPage from "./ContextPage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ErrorBanner = ({ isVisible, children }) => {
  const bannerStyles = {
    position: 'fixed',
    top: isVisible ? '0' : '-50px',
    left: '0',
    right: '0',
    height: '50px',
    backgroundColor: 'darkred',
    color: 'white',
    fontFamily: "Alkatra",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'top 0.6s', // Animation duration
  };

  return (
    <div style={bannerStyles}>
      {children}
    </div>
  );
};

function Foo({ entityId, image, text }) {
  const isUploaded = entityId && entityId !== "fail";
  return <>
    {isUploaded ?
      <Navigate to={`/${entityId}`} replace={true} /> :
      <>
        <ContextPage data={{ image, text }} />
      </>
    }
  </>
}

function RootPage() {
  const [data, setData] = React.useState(null)
  const [isErrorVisible, setIsErrorVisible] = React.useState(false)
  React.useEffect(() => {
    const isUploadFailed = data && !data.isUploaded;
    if (isUploadFailed) {
      setIsErrorVisible(true);
      setTimeout(() => {
        setIsErrorVisible(false);
      }, 2000);
    }
  }, [data]);
  return <>
    <ErrorBanner isVisible={isErrorVisible}>
      Upload failed, but you can still copy an image into your clipboard.
    </ErrorBanner>
    {
      data ? <Foo {...data} /> :
        < Wrapper >
          <Header />
          <ContextInput onInputEntered={setData} />
        </Wrapper >
    }</>
}

export default RootPage;
