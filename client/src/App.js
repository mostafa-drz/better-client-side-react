import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { notify } from "react-notify-toast";

function App() {
  const socket = useRef(new WebSocket(process.env.REACT_APP_WEB_SOCKET_SERVER));
  const [maintWindow, setMaintWindow] = useState(false);

  return (
    <div className="App">
      {maintWindow ? (
        <div>
          👷‍♀️👷‍♂️ We're working on something unrgent, it'll be done soon! Thanks
          for your patience
        </div>
      ) : (
        <>
          {" "}
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
          <NewVersion socket={socket.current} />
          <MaintenanceWindow
            socket={socket.current}
            onStart={() => setMaintWindow(true)}
            onEnd={() => setMaintWindow(false)}
          />
        </>
      )}
    </div>
  );
}

function MaintenanceWindow(props) {
  const { socket } = props;

  useEffect(() => {
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data?.messageId === "maintanace") {
        if (data.status === "on") {
          notify.show(
            <div>
              <h2>Sorry to intrupt you 🙈</h2>
              <p>{data.message}</p>
              <button onClick={() => notify.hide()}>Ok</button>
            </div>,
            "warning",
            -1
          );
          props.onStart();
        } else {
          props.onEnd();
        }
      }
    };
  }, []);
  return null;
}

function NewVersion(props) {
  const { socket } = props;

  useEffect(() => {
    socket.onopen = function (e) {
      console.info("[open] Connection established");
    };
    socket.onmessage = function (event) {
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
    socket.onerror = function (error) {
      console.error(`[error] ${error}`);
    };
  }, []);
  return null;
}
export default App;
