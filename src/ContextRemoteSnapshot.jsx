import React from "react";
import { useLoaderData } from "react-router-dom";

import ContextSnapshot from "./ContextSnapshot";
import { getContextFromDatabase } from "./helpers/db.helpers"

export async function loader({ params }) {
  return params.contextId;
}

function ContextRemoteSnapshot() {
  const [context, setContext] = React.useState(null);
  const contextId = useLoaderData();
  React.useEffect(() => {
    async function fetchContext() {
      const { image, text } = await getContextFromDatabase(contextId);
      setContext({ image, text });
    }
    fetchContext();
  }, []);
  return <ContextSnapshot
    image={context ? context.image : null}
    text={context ? context.text : null}
  />
};

export default ContextRemoteSnapshot;

