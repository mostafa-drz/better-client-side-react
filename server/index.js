const WebSocket = require("ws");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const path = require("path");

app.use(express.json());
let wss;

app.post("/api/message", function (req, res) {
  const { messageId, messageBody } = req.body;
  switch (messageId) {
    case "new-version":
      broadCastToAllClients(
        wss,
        JSON.stringify({
          messageId,
          newVersion: messageBody.version,
        })
      );
      return res.send("ok");
    case "maintenance":
      broadCastToAllClients(
        wss,
        JSON.stringify({
          messageId,
          message: messageBody.message,
          status: messageBody.status,
        })
      );
      return res.send("ok");
    default:
      return res.status(400).send("what do you mean?");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/api/ping", (req, res) => {
  res.send("PONG");
});

server.listen(PORT, (error) => {
  if (error) {
    console.error(`Something went wrong on Express Server 💔`);
  } else {
    console.log(`Express server is running on port ${PORT}`);
    wss = new WebSocket.Server({ server });
  }
});

function broadCastToAllClients(wsServer, message) {
  wsServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
