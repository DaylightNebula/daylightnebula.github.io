import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./theme.css";
import "./styles.css";

// mount the app, failing loudly if the page shell is missing its root
const root = document.getElementById("root");
if (root === null) {
  throw new Error("mounting the portfolio: no #root element in index.html");
}
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
