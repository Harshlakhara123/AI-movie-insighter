import { GoogleGenAI } from "@google/genai";

const GOOGLEAI_API_KEY = process.env.GOOGLEAI_API_KEY;

// Initialize the Google Gen AI client if key is present
const ai = GOOGLEAI_API_KEY ? new GoogleGenAI({ apiKey: GOOGLEAI_API_KEY }) : null;

export async function analyzeSentiment(movieData) {
    if (!movieData || !movieData.title) {
        return {
            summary: "No movie data available to form a sentiment analysis.",
            classification: "mixed",
        };
    }

    if (!ai) {
        console.warn("GOOGLEAI_API_KEY is not configured. Skipping sentiment analysis.");
        return {
            summary: "Sentiment analysis is currently disabled (missing API key).",
            classification: "mixed"
        };
    }

    const prompt = `
    Analyze the historical and general audience sentiment for the following movie. Use your internal knowledge base about its reception.
    
    Movie Title: ${movieData.title}
    Release Year: ${movieData.year}
    Plot: ${movieData.plot}
    
    Provide two things:
    1. A concise summary of the overall audience sentiment (2-3 sentences max).
    2. An overall classification strictly chosen from one of these three words: "positive", "negative", or "mixed".

    Format the response as JSON with the exact keys:
    {
      "summary": "your concise summary here",
      "classification": "positive or negative or mixed"
    }
  `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const resultText = response.text;
        if (resultText) {
            return JSON.parse(resultText);
        }
        throw new Error("No response text from Gemini");
    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        return {
            summary: "Failed to analyze sentiment due to an error.",
            classification: "mixed",
        };
    }
}
