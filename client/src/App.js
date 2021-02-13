import React from "react";
import "./App.css";
import { useSocketContext } from "./SocketContext";

function App() {
  const { maintWindow } = useSocketContext();
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
        </>
      )}
    </div>
  );
}

export default App;
