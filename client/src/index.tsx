import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Notifications from "react-notify-toast";
import { SocketContextProvider } from "./SocketContext";

ReactDOM.render(
  <React.StrictMode>
    <Notifications />
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
