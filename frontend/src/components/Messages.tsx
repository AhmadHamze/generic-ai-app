import { useEffect, useState } from "react";

type Messages = {
  id: string;
  question: string;
  answer: string;
}[];

export const Messages = () => {
  const [messages, setMessages] = useState<Messages>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "4rem",
      }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxWidth: "12rem",
            border: "1px solid black",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <p>Question: {msg.question}</p>
          <p>Answer: {msg.answer}</p>
        </div>
      ))}
    </div>
  );
};
