import React from "react";
import styled from "styled-components";

import { useLoaderData } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ContextSnapshot from "./ContextSnapshot";

import { getContextFromDatabase } from "./helpers/db.helpers"

export async function loader({ params }) {
  return params.contextId;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 12px;
:`;

function ContextPage() {
  const [context, setContext] = React.useState(null);
  const contextId = useLoaderData();
  React.useEffect(() => {
    async function fetchContext() {
      const { image, text } = await getContextFromDatabase(contextId);
      setContext({ image, text });
    }
    fetchContext();
  }, []);

  return <Wrapper>
    <Header />
    {context ?
      <>
        <ContextSnapshot
          image={context.image}
          text={context.text}
        />
        <Footer />
      </>
      :
      <div>
        Loading...
      </div>
    }
  </Wrapper>
};

export default ContextPage;

