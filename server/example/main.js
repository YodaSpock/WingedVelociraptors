import WebSocketEventManager from "./websocket-event-manager.js";

const wsem = new WebSocketEventManager(`ws://${window.location.hostname}:81`);

document.getElementById("join").addEventListener("click", () => {
  wsem.sendMessage("c_join", { name: document.getElementById("name").value });
});

document.getElementById("narrator").addEventListener("click", () => {
  wsem.sendMessage("c_narrator");
});

document.getElementById("start").addEventListener("click", () => {
  wsem.sendMessage("c_start");
});

document.getElementById("ready").addEventListener("click", () => {
  wsem.sendMessage("c_ready");
});

document.getElementById("narrAck").addEventListener("click", () => {
  wsem.sendMessage("c_narrAck");
});

document.getElementById("act").addEventListener("click", () => {
  const data = JSON.parse(document.getElementById("actText").value);
  wsem.sendMessage("c_narrAck", data);
});

document.getElementById("vote").addEventListener("click", () => {
  const name = document.getElementById("voteText").value;
  wsem.sendMessage("c_narrAck", { name });
});

wsem.addEventHandler("s_role", (data) => {

});
