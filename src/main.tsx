import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "./locales/i18n";
import App from "./App.tsx";

const AppComponent = App as unknown as React.ComponentType;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppComponent />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  </StrictMode>
);
