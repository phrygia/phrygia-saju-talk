import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const createGoogleAi = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
