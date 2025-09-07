import { useState } from "react";

const sendMessage = async (message: string): Promise<void> => {
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
  const data = await response.json();
  console.log("Response from server:", data);
};

export const Conversation = () => {
  const [message, setMessage] = useState("");

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
          await sendMessage(message);
          setMessage("");
        }}
      >
        Send
      </button>
    </div>
  );
};
