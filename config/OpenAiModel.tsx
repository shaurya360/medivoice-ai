import OpenAI from 'openai';

export const openai = new OpenAI({
  
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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"
  
});