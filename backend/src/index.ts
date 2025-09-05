import express from "express";

const app = express();
const port = 3000;

app.get("/hello", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
