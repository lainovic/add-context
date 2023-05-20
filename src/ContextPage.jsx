import React from "react";
import styled from "styled-components";

import { useLoaderData } from "react-router-dom";

import Header from "./Header";
import ContextSnapshot from "./ContextSnapshot";
import { Padding } from "./helpers/layout.helpers";

import { getContextFromDatabase } from "./helpers/db.helpers"
import { BeatLoader } from "react-spinners";
import ErrorBanner from "./components/ErrorBanner";

export async function loader({ params }) {
  return params.contextId;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 12px;
:`;

function ContextPage({ data }) {
  const [context, setContext] = React.useState(data);
  const [isErrorVisible, setIsErrorVisible] = React.useState(false)
  const contextId = useLoaderData();
  React.useEffect(() => {
    if (context) return;
    async function fetchContext() {
      if (!contextId) return;
      const res = await getContextFromDatabase(contextId);
      if (res.error) {
        console.log(`---> error from the database: ${res.error}`);
        setIsErrorVisible(true);
        setTimeout(() => {
          setIsErrorVisible(false);
        }, 2000);
        return;
      }
      const { image, text } = res;
      setContext({ image, text });
    }
    fetchContext();
  }, []);

  return (
    <Padding pt={24} pb={24}>
      <ErrorBanner isVisible={isErrorVisible}>
        Failed to fetch the context 😔
      </ErrorBanner>
      <Wrapper>
        <Header />
        {context ?
          <>
            <ContextSnapshot
              image={context.image}
              text={context.text}
            />
          </>
          :
          <BeatLoader />
        }
      </Wrapper>
    </Padding>
  );
}

export default ContextPage;

