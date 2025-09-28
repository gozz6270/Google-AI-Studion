
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        story: {
            type: Type.STRING,
            description: 'The next portion of the story narrative.',
        },
        choices: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'An array of three choices for the player.',
        },
        imagePrompt: {
            type: Type.STRING,
            description: 'A short, descriptive prompt for an AI image generator.',
        }
    },
    required: ["story", "choices", "imagePrompt"],
};

export async function generateNextStep(storyHistory: string[], choice: string): Promise<GeminiResponse> {
    const fullPrompt = `
        Previous story:
        ---
        ${storyHistory.join('\n---\n')}
        ---
        Player's choice: "${choice}"

        Continue the next part of the story.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
                topP: 0.9,
            },
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        // Basic validation
        if (!parsedResponse.story || !Array.isArray(parsedResponse.choices) || !parsedResponse.imagePrompt) {
            throw new Error('Received an invalid response structure from the Gemini API.');
        }
        
        return parsedResponse as GeminiResponse;

    } catch (error) {
        console.error('Gemini API request error:', error);
        throw new Error('Failed to conjure the next step of the tale. The ancient magic falters.');
    }
}