import React from "react";
import ReactDOM from "react-dom";
// import App from "./components/app";
import reportWebVitals from "./reportWebVitals";
import TrackingDetails from "./components/trackingDetails";

//importing css files
import "bootstrap/dist/css/bootstrap.min.css";
import 'rsuite/dist/styles/rsuite-default.css';
import "./css/main.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <TrackingDetails />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
