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
  const completion = await gpt4oMiniClient.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: message }],
  });
  return res
    .status(201)
    .json({ llmResponse: completion.choices[0].message.content });
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
