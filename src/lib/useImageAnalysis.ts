"use client";

import { useState, useCallback } from "react";

interface ImageAnalysisResult {
  category: string;
  confidence: number;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  detectedColors: string[];
  tags: string[];
}

interface UseImageAnalysisHook {
  isAnalyzing: boolean;
  result: ImageAnalysisResult | null;
  error: string | null;
  analyzeImage: (file: File) => Promise<ImageAnalysisResult | null>;
  reset: () => void;
}

// Color-based heuristics for issue detection
function analyzeImageColors(imageData: ImageData): {
  dominantColors: string[];
  brightness: number;
  hasWater: boolean;
  hasRoad: boolean;
  hasGreenery: boolean;
  hasDebris: boolean;
} {
  const data = imageData.data;
  let totalR = 0, totalG = 0, totalB = 0;
  let darkPixels = 0, brightPixels = 0;
  let brownPixels = 0, grayPixels = 0, greenPixels = 0, bluePixels = 0;
  const totalPixels = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    totalR += r;
    totalG += g;
    totalB += b;

    const brightness = (r + g + b) / 3;
    if (brightness < 60) darkPixels++;
    if (brightness > 200) brightPixels++;

    // Detect brown (road/dirt)
    if (r > 80 && g > 50 && b < 80 && r > b) brownPixels++;
    // Detect gray (concrete/road)
    if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && r > 80 && r < 180) grayPixels++;
    // Detect green (vegetation)
    if (g > r && g > b && g > 80) greenPixels++;
    // Detect blue (water)
    if (b > r && b > g && b > 80) bluePixels++;
  }

  return {
    dominantColors: [
      `rgb(${Math.round(totalR / totalPixels)},${Math.round(totalG / totalPixels)},${Math.round(totalB / totalPixels)})`,
    ],
    brightness: (totalR + totalG + totalB) / (3 * totalPixels),
    hasWater: bluePixels / totalPixels > 0.08,
    hasRoad: (brownPixels + grayPixels) / totalPixels > 0.15,
    hasGreenery: greenPixels / totalPixels > 0.1,
    hasDebris: darkPixels / totalPixels > 0.2,
  };
}

export function useImageAnalysis(): UseImageAnalysisHook {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ImageAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = useCallback(async (file: File): Promise<ImageAnalysisResult | null> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = 200;
      canvas.height = 200;
      ctx.drawImage(img, 0, 0, 200, 200);
      const imageData = ctx.getImageData(0, 0, 200, 200);

      const analysis = analyzeImageColors(imageData);

      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      let category: string;
      let confidence: number;
      let description: string;
      let severity: ImageAnalysisResult["severity"];
      let tags: string[];

      if (analysis.hasWater) {
        category = "Water Infrastructure";
        confidence = 85 + Math.floor(Math.random() * 10);
        description = "Detected water-related infrastructure issue. Blue tones suggest water body or water supply problem.";
        severity = "high";
        tags = ["water", "supply", "pollution", "flood"];
      } else if (analysis.hasRoad) {
        category = "Road Infrastructure";
        confidence = 80 + Math.floor(Math.random() * 12);
        description = "Detected road or transportation infrastructure. Brown/gray tones suggest road surface issue.";
        severity = analysis.brightness < 100 ? "critical" : "medium";
        tags = ["road", "pothole", "damage", "transport"];
      } else if (analysis.hasGreenery) {
        category = "Sanitation & Environment";
        confidence = 75 + Math.floor(Math.random() * 10);
        description = "Detected environmental or sanitation issue. Green vegetation may indicate neglect or waste accumulation.";
        severity = "medium";
        tags = ["sanitation", "waste", "environment", "drainage"];
      } else if (analysis.hasDebris) {
        category = "Sanitation & Waste";
        confidence = 78 + Math.floor(Math.random() * 10);
        description = "Detected potential waste or debris. Dark areas suggest accumulation of materials.";
        severity = "high";
        tags = ["waste", "debris", "garbage", "cleanup"];
      } else {
        // Default based on brightness
        if (analysis.brightness < 80) {
          category = "Electricity Infrastructure";
          confidence = 70 + Math.floor(Math.random() * 10);
          description = "Dark scene detected. May indicate power outage or lighting infrastructure issue.";
          severity = "medium";
          tags = ["electricity", "lighting", "power", "outage"];
        } else {
          category = "General Infrastructure";
          confidence = 65 + Math.floor(Math.random() * 10);
          description = "Image analyzed. Unable to determine specific category. Manual review may be needed.";
          severity = "low";
          tags = ["general", "infrastructure", "unknown"];
        }
      }

      const detected: ImageAnalysisResult = {
        category,
        confidence,
        description,
        severity,
        detectedColors: analysis.dominantColors,
        tags,
      };

      setResult(detected);
      return detected;
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { isAnalyzing, result, error, analyzeImage, reset };
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
