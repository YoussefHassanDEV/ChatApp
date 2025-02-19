import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold mb-4">Chat Application</h1>
      <div className="flex-1 overflow-y-auto mb-4 border border-gray-700 p-2 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 bg-gray-800 my-2 rounded">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 rounded bg-gray-700 text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
