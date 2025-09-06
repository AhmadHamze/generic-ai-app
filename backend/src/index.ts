import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logging";

const app = express();
const port = 3000;

app.use(cors());
app.use(logger);

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
