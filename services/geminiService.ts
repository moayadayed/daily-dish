
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, DishType } from "../types";

export const generateRecipes = async (ingredients: string[], dishType: DishType): Promise<Recipe[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `I have the following ingredients: ${ingredients.join(', ')}. 
  I want to make a "${dishType}". 
  Suggest 3-4 delicious recipes of type "${dishType}" that can be primarily made using these items. 
  It's okay to assume basic pantry items like salt, water, and common spices are available even if not selected.
  Return the output strictly in Arabic.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are a professional chef specializing in ${dishType}. Your goal is to suggest practical recipes specifically for ${dishType} based on available ingredients. Always provide a YouTube search query that would lead to a good tutorial video for that specific dish in Arabic.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              recipeName: { type: Type.STRING, description: "Name of the dish in Arabic" },
              duration: { type: Type.STRING, description: "Preparation time (e.g., 30 دقيقة)" },
              difficulty: { type: Type.STRING, description: "Difficulty level: سهل, متوسط, or صعب" },
              youtubeSearchQuery: { type: Type.STRING, description: "Search query for YouTube to find this recipe" },
              briefDescription: { type: Type.STRING, description: "A one-sentence appetizing description" },
              mainIngredients: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of core ingredients from the provided list used in this recipe"
              }
            },
            required: ["recipeName", "duration", "difficulty", "youtubeSearchQuery", "briefDescription", "mainIngredients"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as Recipe[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. حاول مرة أخرى.");
  }
};
