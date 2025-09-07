import { useState } from "react";
import ReactMarkdown from "react-markdown";

const sendMessage = async (
  message: string,
  onChunk: (content: string) => void
): Promise<void> => {
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

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error("No response body reader available");
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") {
          return;
        }
        try {
          const parsed = JSON.parse(data);
          if (parsed.content) {
            onChunk(parsed.content);
          }
        } catch (e) {
          console.warn("Failed to parse SSE data:", data);
        }
      }
    }
  }
};

export const Conversation = () => {
  const [message, setMessage] = useState("");
  const [llmResponse, setLlmResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

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
        disabled={isStreaming}
      />
      <button
        onClick={async () => {
          setIsStreaming(true);
          setLlmResponse("");
          try {
            await sendMessage(message, (content) => {
              setLlmResponse((prev) => prev + content);
            });
          } catch (error) {
            console.error("Error streaming message:", error);
            setLlmResponse("Error occurred while streaming response");
          } finally {
            setIsStreaming(false);
          }
        }}
        disabled={isStreaming}
      >
        {isStreaming ? "Streaming..." : "Send"}
      </button>
      <div>
        <ReactMarkdown>{llmResponse}</ReactMarkdown>
      </div>
    </div>
  );
};
