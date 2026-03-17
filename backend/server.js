const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/service/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, {});

// inbuilt two default events ( connection & disconnection)
// other are custom events & can be Name any

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("disconnect", () => {
    console.log("A user is disconnected");
  });

  // Custom test socket
  // socket.on("message", (data) => {
  //   console.log("message received", data);
  // });

  socket.on("ai-message", async (data) => {
    console.log("prompt received", data.prompt);
    const response = await generateResponse(data.prompt);
    console.log("Ai-response ", response);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on");
});
