import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.js";
import { store } from "./app/store.js";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import "./index.css";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
