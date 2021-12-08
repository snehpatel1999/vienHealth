import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from 'react-toastify';
import "./styles/app.scss"
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme/theme";
import { AuthProvider } from "./context/authProvider";

import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';



ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
    />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
