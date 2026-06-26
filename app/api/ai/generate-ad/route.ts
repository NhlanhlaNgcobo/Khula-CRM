import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { industry, objective, platform, businessName, offer, language = "english" } = await request.json();

    const langMap: Record<string, string> = {
      english: "English",
      afrikaans: "Afrikaans",
      zulu: "isiZulu",
      xhosa: "isiXhosa",
    };

    const prompt = `You are an expert South African digital marketing copywriter for small businesses.

Business: ${businessName || "A South African SME"}
Industry: ${industry}
Platform: ${platform}
Ad Objective: ${objective}
Offer/Service: ${offer || "their main service"}
Language: ${langMap[language] || "English"}

Generate high-converting ad copy optimised for ${platform} for a South African small business. Use local context, cultural relevance, and ZAR pricing where applicable.

Return ONLY valid JSON with this exact structure:
{
  "headlines": ["<headline 1>", "<headline 2>", "<headline 3>", "<headline 4>", "<headline 5>"],
  "descriptions": ["<body copy 1 — 2-3 sentences>", "<body copy 2 — 2-3 sentences>", "<body copy 3 — 2-3 sentences>"],
  "ctas": ["<CTA 1>", "<CTA 2>", "<CTA 3>"],
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "audience_suggestion": "<who to target: age, gender, interests, location in SA>",
  "budget_suggestion": "<recommended daily budget in ZAR with reasoning>",
  "tip": "<one specific tip for this type of ad in SA market>"
}

Headlines should be punchy (max 8 words). Descriptions should feel local and personal. CTAs should drive immediate action. All in ${langMap[language] || "English"}.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text.trim() : "{}";

    let result;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      result = null;
    }

    if (!result) {
      return NextResponse.json({ error: "Failed to parse response" }, { status: 500 });
    }

    return NextResponse.json({ ad: result });
  } catch (err) {
    console.error("Ad generation error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
