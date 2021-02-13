import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Notifications from "react-notify-toast";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Notifications />
  </React.StrictMode>,
  document.getElementById("root")
);
