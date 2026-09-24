import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to get initialized GoogleGenAI instance safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Routes

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Professional Summary Generator
app.post("/api/ai/summary", async (req, res) => {
  try {
    const { jobTitle, keySkills, experienceOverview, tone = "professional" } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ error: "Job title is required." });
    }

    const ai = getGeminiClient();
    const prompt = `Write a compelling, concise 3-4 sentence professional summary for a CV / Resume.
Job Title: ${jobTitle}
Key Skills: ${Array.isArray(keySkills) ? keySkills.join(", ") : keySkills || "Not specified"}
Experience Overview: ${experienceOverview || "Not specified"}
Tone: ${tone}

Requirements:
- Strong opening highlighting expertise and years of impact.
- Mention core technical/functional competencies.
- End with value added to prospective employers.
- Do NOT use filler buzzwords like "hardworking" or "team player".
- Keep it under 80 words. Return ONLY the final summary paragraph.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return res.json({ summary: response.text?.trim() || "" });
  } catch (error: any) {
    console.error("AI Summary error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate summary." });
  }
});

// AI Bullet Point Polish / Enhance
app.post("/api/ai/enhance-bullet", async (req, res) => {
  try {
    const { bulletPoint, role, company } = req.body;

    if (!bulletPoint) {
      return res.status(400).json({ error: "Bullet point text is required." });
    }

    const ai = getGeminiClient();
    const prompt = `Rewrite and enhance the following resume bullet point to make it highly impactful for recruiters and ATS filters.
Role: ${role || "Professional"} ${company ? `at ${company}` : ""}
Original Bullet: "${bulletPoint}"

Guidelines:
1. Start with a powerful action verb (e.g., Spearheaded, Orchestrated, Engineered, Accelerated).
2. Incorporate quantifiable metrics or outcomes where plausible (e.g. "by 35%", "reducing latency by 200ms").
3. Make it clear, concise, and professional.
4. Provide 3 variation options: 
   Option 1: Impact & Results Focused
   Option 2: Technical & Method Focused
   Option 3: Leadership & Initiative Focused

Return a JSON object matching this schema:
{
  "options": [
    { "label": "Impact Focused", "text": "..." },
    { "label": "Technical Focus", "text": "..." },
    { "label": "Leadership Focus", "text": "..." }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("AI Enhance error:", error);
    return res.status(500).json({ error: error.message || "Failed to enhance bullet point." });
  }
});

// ATS Analysis & Score
app.post("/api/ai/ats-analyze", async (req, res) => {
  try {
    const { cvData, targetRole } = req.body;

    if (!cvData) {
      return res.status(400).json({ error: "CV data is required." });
    }

    const ai = getGeminiClient();
    const prompt = `Analyze this resume JSON for ATS (Applicant Tracking System) friendliness, clarity, impact, and completeness.
Target Role (if any): ${targetRole || "General Professional Role"}

CV Data JSON:
${JSON.stringify(cvData, null, 2)}

Evaluate:
1. Overall ATS Compatibility Score (0 - 100).
2. Key strengths (3 points).
3. Critical improvements / formatting issues (3-4 actionable tips).
4. Missing high-impact keywords for ${targetRole || "this industry"}.

Return ONLY JSON with this structure:
{
  "score": number,
  "summary": "Brief 1-2 sentence overall evaluation",
  "strengths": ["...", "...", "..."],
  "improvements": ["...", "...", "..."],
  "suggestedKeywords": ["...", "...", "..."]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("ATS Analysis error:", error);
    return res.status(500).json({ error: error.message || "Failed to analyze ATS score." });
  }
});

// Vite Middleware & Production Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CV Builder server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
