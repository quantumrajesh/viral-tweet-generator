
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorConfig, TweetResult } from "../types";

const apiKey = process.env.API_KEY;
// Ensure API Key is present
if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY_FOR_BUILD' });

export const generateViralTweets = async (config: GeneratorConfig): Promise<TweetResult[]> => {
  const { topic, tone, style } = config;

  const prompt = `
    You are a world-class viral social media ghostwriter. 
    Your task is to take the user's raw idea and convert it into 4 distinct, high-engagement Twitter/X posts.
    
    User Idea: "${topic}"
    Target Tone: ${tone}
    Writing Style: ${style}

    Requirements:
    - Posts must be under 280 characters unless it's a thread hook.
    - Focus on strong hooks (questions, contrarian statements, data points).
    - Do not use emojis excessively (unless requested style implies it).
    - Make it sound human, not AI-generated. Avoid words like "unleash", "unlock", "elevate".
    - If the tone is humorous, unhinged, or sarcastic, feel free to break grammar rules for comedic effect.
    
    Return the response as a JSON array of objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert copywriter specialized in X (Twitter) growth.",
        temperature: 0.85, // Slightly increased creativity for funny tones
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              content: {
                type: Type.STRING,
                description: "The actual text of the tweet.",
              },
              hookType: {
                type: Type.STRING,
                description: "A 1-2 word description of the hook used (e.g., 'Contrarian', 'Question').",
              },
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "2-3 relevant hashtags.",
              },
            },
            required: ["content", "hookType", "hashtags"],
          },
        },
      },
    });

    const rawText = response.text;
    if (!rawText) throw new Error("No text returned from Gemini.");

    const data = JSON.parse(rawText);
    
    // Map and calculate character counts locally
    return data.map((item: any) => ({
      content: item.content,
      hookType: item.hookType,
      hashtags: item.hashtags || [],
      characterCount: item.content.length,
    }));

  } catch (error) {
    console.error("Error generating tweets:", error);
    throw new Error("Failed to generate viral tweets. Please try again.");
  }
};
