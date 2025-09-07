import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logging";
import { gpt4oMiniClient } from "./llm_clients";

const app = express();
const port = 3000;

app.use(cors());
app.use(logger);
app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello, world!");
});

app.get("/messages{/:id}", (req, res) => {
  if (!req.params.id) {
    return res.json(Object.values(fakeData.messages));
  }
  const message = fakeData.messages[req.params.id];
  if (message) {
    res.json(message);
  } else {
    res.status(404).send("Message not found");
  }
});

app.post("/conversation", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send("Message is required");
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Cache-Control",
  });

  try {
    const stream = await gpt4oMiniClient.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Streaming error:", error);
    res.write(`data: ${JSON.stringify({ error: "Stream error occurred" })}\n\n`);
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});

type Message = {
  id: string;
  question: string;
  answer: string;
};

const fakeData = Object.freeze({
  messages: {
    "1": {
      id: "1",
      question: "What is the capital of France?",
      answer: "Paris",
    },
    "2": {
      id: "2",
      question: "How are you?",
      answer: "I'm fine, thank you!",
    },
    "3": {
      id: "3",
      question: "What is 2 + 2?",
      answer: "4",
    },
    "4": {
      id: "4",
      question: "What is the capital of Germany?",
      answer: "Berlin",
    },
    "5": {
      id: "5",
      question: "What is the capital of Italy?",
      answer: "Rome",
    },
    "6": {
      id: "6",
      question: "What is the capital of Spain?",
      answer: "Madrid",
    },
  } as { [key: string]: Message },
});
