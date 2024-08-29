// main.tsxはあまりイジらない。

import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// import "./i18n/configs";
import App from "./App";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <style>
      {`


body {
  overflow: hidden;
}

::-webkit-scrollbar {
  display: none;
}
    `}
    </style>

    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div>
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
