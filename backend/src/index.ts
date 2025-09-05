import express from "express";
import { logger } from "./middlewares/logging";

const app = express();
const port = 3000;

app.use(logger);

app.get("/hello", (_, res) => {
  res.send("Hello, world!");
});

app.get("/messages{/:id}", (req, res) => {
  if (!req.params.id) {
    return res.json(fakeData.messages);
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
  } as { [key: string]: Message },
});
