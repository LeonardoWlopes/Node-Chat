import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import ejs from "ejs";

import { Server } from "socket.io";

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

const server = http.createServer(app);

app.use("/", (req, res) => {
  res.render("index.html");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let messages = [];

io.on("connection", (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
  socket.emit("prevMessages", messages);

  socket.on("sendMessage", (data) => {
    console.log(data);
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });
});

app.use(express.json());

server.listen(3000, () => {
  console.log("Server started on port 3000");
});

//export { io };
