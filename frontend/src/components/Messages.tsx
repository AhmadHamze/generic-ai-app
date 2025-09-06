import { use, useState } from "react";

const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch("http://localhost:3000/messages");
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
};

type Message = {
  id: string;
  question: string;
  answer: string;
};

const messagesPromise = fetchMessages();

export const Messages = () => {

  const messages = use(messagesPromise);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCardClick = (msg: Message, index: number) => {
    console.log(`Card ${index} clicked:`, msg);
  };

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
          onClick={() => handleCardClick(msg, index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxWidth: "12rem",
            border: "1px solid #e0e0e0",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow:
              hoveredIndex === index
                ? "0 8px 25px rgba(0, 0, 0, 0.15)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
            background:
              hoveredIndex === index
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            transform:
              hoveredIndex === index ? "translateY(-2px)" : "translateY(0)",
          }}
        >
          <p
            style={{
              margin: "0",
              fontWeight: "600",
              color: hoveredIndex === index ? "#ffffff" : "#2c3e50",
              fontSize: "0.9rem",
            }}
          >
            Question: {msg.question}
          </p>
          <p
            style={{
              margin: "0",
              color: hoveredIndex === index ? "#f8f9fa" : "#34495e",
              fontSize: "0.85rem",
              lineHeight: "1.4",
            }}
          >
            Answer: {msg.answer}
          </p>
        </div>
      ))}
    </div>
  );
};
