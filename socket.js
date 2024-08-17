const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", socket => {
  console.log(`User ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`)
  })

  socket.on("new-message", (newMessage, type) => {
    socket.broadcast.emit("recieve-message", newMessage, type);
  })
})
