const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:5173", "https://rtchat-tau.vercel.app"],
  },
});

io.on("connection", socket => {
  console.log(`User ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`)
  })

  socket.on("new-message", (newMessage, username) => {
    socket.broadcast.emit("recieve-message", newMessage, username);
  })
})
