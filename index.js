const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io

io.on("connection", (socket) => {
  //socket = client

  //   socket.on("user-message", (message) => {
  //     io.emit("message", message);
  //   });
  socket.on("user-message", (message) => {
    socket.broadcast.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});
const PORT = 9000;

server.listen(PORT, () => console.log(`server started at Port:${PORT}`));
