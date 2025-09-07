import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const gpt4oMiniClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.GPT_4O_MINI_KEY,
});
