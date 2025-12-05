import { VisionResult } from '../types';

/**
 * SIMULATED VISION AI
 * Since we don't have a backend, this randomizes "detected" styles.
 * In a real app, you would send the 'imageFile' to Google Gemini 1.5 Flash Vision.
 */

const MOCK_SCENARIOS = [
  {
    styleName: "Urban Streetwear",
    detectedItems: [
      { category: "Outerwear", searchQuery: "Black Faux Leather Biker Jacket oversized", reasoning: "Core piece of the streetwear look" },
      { category: "Top", searchQuery: "White Graphic Tee Vintage Cotton", reasoning: "Layering essential" },
      { category: "Bottom", searchQuery: "Distressed Blue Loose Jeans Men", reasoning: "Adds texture and grunge vibe" },
      { category: "Footwear", searchQuery: "Chunky High Top Sneakers Black White", reasoning: "Statement footwear" },
      { category: "Accessory", searchQuery: "Silver Chain Necklace Punk Style", reasoning: "Finishing touch" }
    ]
  },
  {
    styleName: "Summer Chic",
    detectedItems: [
      { category: "Top", searchQuery: "Floral Print Chiffon Blouse", reasoning: "Light and airy for summer" },
      { category: "Bottom", searchQuery: "High Waisted White Linen Shorts", reasoning: "Crisp and classic" },
      { category: "Footwear", searchQuery: "Beige Strappy Flat Sandals", reasoning: "Comfortable chic" },
      { category: "Accessory", searchQuery: "Straw Beach Hat Wide Brim", reasoning: "Sun protection with style" },
      { category: "Bag", searchQuery: "Rattan Woven Round Crossbody Bag", reasoning: "Natural texture" }
    ]
  },
  {
    styleName: "Office Minimalist",
    detectedItems: [
      { category: "Outerwear", searchQuery: "Beige Trench Coat Classic Long", reasoning: "Timeless professional outerwear" },
      { category: "Top", searchQuery: "Black Turtleneck Sweater Slim Fit", reasoning: "Sleek silhouette" },
      { category: "Bottom", searchQuery: "Grey Wool Tapered Trousers", reasoning: "Sharp tailoring" },
      { category: "Footwear", searchQuery: "Black Leather Loafers Gold Buckle", reasoning: "Smart casual essential" },
      { category: "Accessory", searchQuery: "Minimalist Gold Hoop Earrings", reasoning: "Subtle elegance" }
    ]
  }
];

export const simulateImageAnalysis = async (imageFile: File): Promise<VisionResult> => {
  // Simulate processing time (2.5 seconds)
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Pick a random scenario to simulate AI "recognition"
  const scenario = MOCK_SCENARIOS[Math.floor(Math.random() * MOCK_SCENARIOS.length)];

  return scenario;
};