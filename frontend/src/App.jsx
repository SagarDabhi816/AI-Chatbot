import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [socket, setsocket] = useState(null);
  useEffect(() => {
    let socketInstance = io("http://localhost:3000");
    setsocket(socketInstance);

    socketInstance.on("ai-message-response", (response) => {
     
      const botMessage = {
        id: Date.now(),
        sender: "bot",
        text:response.response,
      };

      setHistory((prev) => [...prev, botMessage]);

      console.log(botMessage.response)


    });
  }, []);

  const sendMessage = () => {
    const text = inputValue.trim();

    if (!text) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setHistory((prev) => [...prev, userMessage]);
    socket.emit("ai-message", text);
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-app">
      <header className="chat-header">
        <h1>AI Chatbot</h1>
      </header>

      <main className="chat-window" role="log" aria-live="polite">
        {history.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.sender === "user" ? "user" : "bot"}`}
          >
            <div className="bubble">{message.text}</div>
          </div>
        ))}
      </main>

      <footer className="chat-input-row">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
}

export default App;
