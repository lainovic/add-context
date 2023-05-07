import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./config/reset.css";
import "./config/constants.css";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Context from "./Context";
import ContextRemoteSnapshot, { loader as contextIdLoader } from "./ContextRemoteSnapshot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Context />
      },
      {
        path: ":contextId",
        element: <ContextRemoteSnapshot />,
        loader: contextIdLoader,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
