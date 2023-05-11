import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./config/reset.css";
import "./config/constants.css";

import ErrorPage from "./ErrorPage";
import ContextPage, { loader as contextIdLoader } from "./ContextPage";
import ContextRootPage from "./ContextRootPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContextRootPage />,
    errorElement: <ErrorPage />
  },
  {
    path: ":contextId",
    element: <ContextPage />,
    loader: contextIdLoader,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

