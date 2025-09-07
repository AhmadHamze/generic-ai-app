import { useState } from "react";
import ReactMarkdown from "react-markdown";

const sendMessage = async (
  message: string
): Promise<{ llmResponse: string }> => {
  const response = await fetch("http://localhost:3000/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) {
    throw new Error("Failed to send message");
  }
  return response.json();
};

export const Conversation = () => {
  const [message, setMessage] = useState("");
  const [llmResponse, setLlmResponse] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "600px",
        margin: "2rem auto",
      }}
    >
      <p>Conversation</p>
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        minLength={3}
        placeholder="Type a message..."
      />
      <button
        onClick={async () => {
          const { llmResponse } = await sendMessage(message);
          setLlmResponse(llmResponse);
        }}
      >
        Send
      </button>
      <div>
        <h3>Response:</h3>
        <ReactMarkdown>{llmResponse}</ReactMarkdown>
      </div>
    </div>
  );
};
