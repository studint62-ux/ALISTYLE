import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedItemQuery } from "../types";

// Initialize Gemini client
// Note: API_KEY must be provided in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

export const deconstructStyleRequest = async (userPrompt: string, lang: 'en' | 'ar' = 'en'): Promise<GeneratedItemQuery[]> => {
  try {
    const languageInstruction = lang === 'ar' 
      ? "Provide the 'reasoning' field STRICTLY in Arabic. The 'searchQuery' MUST remain in English to ensure best results on global e-commerce sites." 
      : "Provide the 'reasoning' in English.";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `You are an expert fashion stylist.
      Analyze the following user request: "${userPrompt}".
      
      Deconstruct this request into a complete outfit consisting of exactly 4-5 distinct items.
      Common categories include: Top, Bottom, Footwear, Accessory, Outerwear.
      
      ${languageInstruction}

      For each item, generate a specific, search-optimized keyword string that would work well on an e-commerce site like AliExpress.
      Avoid generic terms; be descriptive (e.g., instead of "Shirt", use "Men Linen Beige Shirt").
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: {
                    type: Type.STRING,
                    description: "The category of the item (e.g., Top, Bottom)"
                  },
                  searchQuery: {
                    type: Type.STRING,
                    description: "Specific search terms in English for finding this product"
                  },
                  reasoning: {
                    type: Type.STRING,
                    description: "Brief reason why this fits the style, in the requested language"
                  }
                },
                required: ["category", "searchQuery", "reasoning"]
              }
            }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(jsonText);
    return parsed.items || [];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};