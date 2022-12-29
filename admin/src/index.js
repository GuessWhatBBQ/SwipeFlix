import React from "react";
import { createRoot } from "react-dom/client";

import { AuthContextProvider } from "./context/authContext/AuthContext";
import App from "./App";
import { MovieContextProvider } from "./context/movieContext/MovieContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <App />
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
