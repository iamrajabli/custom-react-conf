import * as React from "react";
import ReactDOM from "react-dom/client";

import "@/styles/index.scss";

import App from "./app/App";

const root = document.querySelector("#root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
