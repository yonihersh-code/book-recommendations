import { GoogleGenAI, Type } from "@google/genai";
import type { UserInput, BookRecommendation } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
    throw new Error("VITE_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recommendationSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: {
                type: Type.STRING,
                description: "The full title of the recommended book.",
            },
            author: {
                type: Type.STRING,
                description: "The full name of the book's author.",
            },
            reason: {
                type: Type.STRING,
                description: "A compelling, short paragraph (2-3 sentences) explaining why the user would enjoy this specific book based on their provided preferences.",
            },
            purchaseLink: {
                type: Type.STRING,
                description: "A valid, clean URL to a major online retailer (like Amazon) where the book can be purchased. Do NOT include any affiliate tags.",
            },
            kindleUnlimited: {
                type: Type.BOOLEAN,
                description: "Set to true if the book is commonly available on Kindle Unlimited, otherwise false.",
            },
        },
        required: ["title", "author", "reason", "purchaseLink", "kindleUnlimited"],
    },
};

const buildPrompt = (userInput: UserInput): string => {
    const personalGreeting = userInput.name ? ` for ${userInput.name}` : '';

    return `
        Based on the user's preferences below, please recommend 5 books${personalGreeting}.

        User Profile:
        - Name: ${userInput.name || 'Not provided'}
        - Age: ${userInput.age || 'Not provided'}
        - Gender: ${userInput.gender || 'Not specified'}

        User Preferences:
        - Favorite TV Shows: ${userInput.tvShows || 'None specified'}
        - Liked Genres: ${userInput.genres || 'None specified'}
        - Books they've read and enjoyed: ${userInput.pastBooks || 'None specified'}
        - Favorite Authors: ${userInput.favoriteAuthors || 'None specified'}
        - Desired Book Length: ${userInput.bookLength}
        - Other important factors: ${userInput.otherFactors || 'None specified'}

        For each of the 5 recommendations, provide the title, author, a compelling reason for the recommendation based on their inputs, a purchase link, and whether it's on Kindle Unlimited.
    `;
};


export const getBookRecommendations = async (userInput: UserInput): Promise<BookRecommendation[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: buildPrompt(userInput),
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationSchema,
                temperature: 0.8,
                systemInstruction: "You are a world-class librarian and literary expert with a passion for connecting people to their next favorite book. You cater to all age groups and provide insightful, personalized recommendations in the requested JSON format. Your goal is to give recommendations so compelling that the user is highly likely to purchase the books through the provided links."
            },
        });

        const jsonText = response.text.trim();
        const recommendations = JSON.parse(jsonText) as BookRecommendation[];

        if (!Array.isArray(recommendations) || recommendations.length === 0) {
            throw new Error("Received an empty or invalid response from the API.");
        }
        
        // Gemini can sometimes return more or less than 5, so we slice.
        return recommendations.slice(0, 5);

    } catch (error) {
        console.error("Error fetching book recommendations:", error);
        throw new Error("Failed to get recommendations from the AI service.");
    }
};
