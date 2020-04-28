const ws = new WebSocket(`ws://${window.location.hostname}:81`);

ws.onopen = () => {
  console.log("Connected");
  ws.send("Hello!");
};

ws.onmessage = (event) => {
  console.log(`Received: ${event.data}`);
};
