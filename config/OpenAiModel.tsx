import OpenAI from 'openai';

export const openai = new OpenAI({
  
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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"
  
});