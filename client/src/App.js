import React, { useEffect, useRef } from "react";
import "./App.css";
import { notify } from "react-notify-toast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      <NewVersion />
    </div>
  );
}

function NewVersion() {
  const socket = useRef(new WebSocket(process.env.REACT_APP_WEB_SOCKET_SERVER));
  useEffect(() => {
    socket.current.onopen = function (e) {
      console.info("[open] Connection established");
    };
    socket.current.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data?.messageId === "new-version") {
        const newVersion = data.newVersion;
        if (newVersion !== process.env.REACT_APP_VERSION) {
          notify.show(
            <div>
              <h2>Sorry to intrupt you 🙈</h2>
              <p>
                A new version of our App is available and to get the latest
                features you should refresh your page
              </p>
              <button onClick={() => window.location.reload()}>Reload</button>
            </div>,
            "warning",
            -1
          );
        }
      }
    };
    socket.current.onerror = function (error) {
      console.error(`[error] ${error}`);
    };
  }, []);
  return null;
}
export default App;
