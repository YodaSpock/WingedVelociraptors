const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 81 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log(`Received: ${data}`);
  });

  ws.send("You just connected");
});
