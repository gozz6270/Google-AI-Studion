
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
            description: "이야기의 다음 부분 서사."
        },
        choices: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "플레이어를 위한 3가지 선택지 배열."
        },
        imagePrompt: {
            type: Type.STRING,
            description: "AI 이미지 생성기를 위한 짧고 설명적인 프롬프트."
        }
    },
    required: ["story", "choices", "imagePrompt"],
};

export async function generateNextStep(storyHistory: string[], choice: string): Promise<GeminiResponse> {
    const fullPrompt = `
        이전 이야기:
        ---
        ${storyHistory.join('\n---\n')}
        ---
        플레이어의 선택: "${choice}"

        이야기의 다음 부분을 생성해 줘.
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
            throw new Error("Gemini API로부터 잘못된 응답 구조를 받았습니다.");
        }
        
        return parsedResponse as GeminiResponse;

    } catch (error) {
        console.error("Gemini API 호출 오류:", error);
        throw new Error("다음 이야기 단계를 생성하지 못했습니다. 고대의 마법이 약해지고 있습니다.");
    }
}