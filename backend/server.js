const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/service/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    origin:"http://localhost:5173"
  }
});
const chatHistory = [

  {
    role:"user",
    parts:[{text:'who was prime minister of india in 2024 ?'}]
  },{
    role:"model",
    parts:[{text:'the prime minister of india in 2024 was **Narendra Modi** ?'}]

  }
]

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("disconnect", () => {
    console.log("A user is disconnected");
  });

  socket.on("ai-message", async (data) => {

    chatHistory.push({
      role:"user",
      parts:[{text:data}]
    })
    const response = await generateResponse(chatHistory);
    chatHistory.push({
      role:"model",
      parts:[{text:data}]
    })
    socket.emit("ai-message-response", { response });
    
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// inbuilt two default events ( connection & disconnection)
// other are custom events & can be Name any

// Custom test socket
// socket.on("message", (data) => {
//   console.log("message received", data);
// });

// io means server
// socket means single user

// on means listning event₹ 
// emit = firing event
