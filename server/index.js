const WebSocket = require("ws");
const express = require("express");
const app = express();
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
    case "maintanace":
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

app.get("/api/ping", (req, res) => {
  res.send("PONG");
});

app.listen(3000, (error) => {
  if (error) {
    console.error(`Something went wrong on Express Server 💔`);
  } else {
    console.log(`Express server is running...`);
    wss = new WebSocket.Server({ port: 8080 });
  }
});

function broadCastToAllClients(wsServer, message) {
  wsServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
