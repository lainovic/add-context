import React from "react";
import styled from "styled-components";

import { useLoaderData } from "react-router-dom";

import Header from "./Header";
import ContextSnapshot from "./ContextSnapshot";
import { Padding } from "./helpers/layout.helpers";

import { getContextFromDatabase } from "./helpers/db.helpers"
import { BeatLoader } from "react-spinners";

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

  return (
    <Padding pt={23} pb={24}>
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

