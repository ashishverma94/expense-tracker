import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import MuiThemeWrapper from "./MuiThemeWrapper";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <ThemeProvider>
          <MuiThemeWrapper>
            <CssBaseline />
            <AuthProvider>
              <App />
            </AuthProvider>
          </MuiThemeWrapper>
        </ThemeProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
