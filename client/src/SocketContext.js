import React, { useEffect, useState, useRef } from "react";
import { notify } from "react-notify-toast";

const SocketContext = React.createContext({
  maintWindow: "off",
});

const useSocketContext = () => React.useContext(SocketContext);

function SocketContextProvider(props) {
  const [maintWindow, setMaintWindow] = useState(false);
  const socket = useRef(new WebSocket(process.env.REACT_APP_WEB_SOCKET_SERVER));

  useEffect(() => {
    socket.current.onopen = function (e) {
      console.info("[open] Connection established");
    };
    socket.current.onerror = function (error) {
      console.error(`[error] ${error}`);
    };

    socket.current.onmessage = function (event) {
      const data = JSON.parse(event.data);
      switch (data.messageId) {
        case "new-version":
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

          break;
        case "maintanace":
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
            setMaintWindow(true);
          } else {
            setMaintWindow(false);
          }
          break;
        default:
          break;
      }
    };
  }, []);
  return (
    <SocketContext.Provider value={{ maintWindow }}>
      {props.children}
    </SocketContext.Provider>
  );
}

export { SocketContextProvider, useSocketContext };
