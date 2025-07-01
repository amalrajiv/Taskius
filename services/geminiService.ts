
import { GoogleGenAI } from "@google/genai";
import { SubTask } from '../types';

if (!process.env.API_KEY) {
  // To keep the app functional offline, we don't throw an error,
  // but the AI features will be disabled.
  console.warn("API_KEY environment variable not set. AI features will be unavailable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

interface SubTaskResponse {
    text: string;
}

export const generateSubTasks = async (taskText: string): Promise<Omit<SubTask, 'id' | 'completed'>[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is not configured. AI features are disabled.");
  }

  const prompt = `
    You are an expert productivity assistant specializing in helping people with ADHD. 
    Your task is to break down a complex or overwhelming user-provided task into a list of small, concrete, and actionable sub-tasks. 
    The goal is to reduce anxiety and make the task feel achievable. 
    
    Given the task: "${taskText}"
    
    Please provide a list of 3-5 sub-tasks in JSON format. The JSON should be an array of objects, where each object has a 'text' key.
    Example: [{"text": "First sub-task"}, {"text": "Second sub-task"}].
    Only return the raw JSON array, without any markdown formatting.
    `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData: SubTaskResponse[] = JSON.parse(jsonStr);

    if (Array.isArray(parsedData) && parsedData.every(item => typeof item.text === 'string')) {
       return parsedData.map(sub => ({ text: sub.text }));
    } else {
       throw new Error("AI response was not in the expected format.");
    }

  } catch (error) {
    console.error("Error generating sub-tasks from Gemini:", error);
    throw new Error("Failed to generate sub-tasks. The AI may be unavailable or the response was invalid.");
  }
};
