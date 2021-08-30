import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";



//importing css files
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/styles/rsuite-default.css";
import "normalize.css";
import "./css/main.css";


ReactDOM.render(
  <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
