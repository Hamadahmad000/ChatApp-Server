require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const DATABASE_CONNECT = require("./src/Database/connection");
const router = require("./src/Routes/Routes");
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/").get((req, res) => {
  const option = {
    root: path.join(__dirname),
  };
  res.sendFile("index.html", option);
});

io.on("connection", (socket) => {
  socket.on("userConnected", (data) => {});

  socket.on("send", (message) => {
    console.log(message);

    io.sockets.emit("receive", message);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

app.use("/user", router);

DATABASE_CONNECT(process.env.DATABASE);
http.listen(PORT, () => {
  console.log(`Your server is running on port http://localhost:${PORT}`);
});
