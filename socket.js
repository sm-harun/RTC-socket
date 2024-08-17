const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:5173", "https://rtchat-tau.vercel.app"],
  },
});

io.on("connection", socket => {
  console.log(`User ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`)
    socket.broadcast.emit("broad-disconnection", socket.id);
  });

  socket.on("new-message", (newMessage, username) => {
    socket.broadcast.emit("recieve-message", newMessage, username);
  });

  socket.on("new-connection", (userId) => {
    socket.broadcast.emit("broad-connection", userId);
  });
})
