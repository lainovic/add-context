import React from "react";
import styled from "styled-components";

import { Navigate } from "react-router-dom";

import Header from "./Header";
import ContextInput from "./ContextInput";
import ContextPage from "./ContextPage";

import ErrorBanner from "./components/ErrorBanner";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function ContextPageProxy({ entityId, image, text }) {
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
      Upload failed, but you can still copy an image into your clipboard!
    </ErrorBanner>
    {
      data ? <ContextPageProxy {...data} /> :
        < Wrapper >
          <Header />
          <ContextInput onInputEntered={setData} />
        </Wrapper >
    }</>
}

export default RootPage;
