import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const socket = useRef(
    new WebSocket(process.env.REACT_APP_WEB_SOCKET_SERVER!)
  );
  useEffect(() => {
    socket.current.onopen = function (e) {
      console.info("[open] Connection established");
    };
    socket.current.onmessage = function (event) {
      console.info(`[message] Data received from server: ${event.data}`);
    };
    socket.current.onerror = function (error) {
      console.error(`[error] ${error}`);
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
