import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    if (!query?.trim()) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const prompt = `You are a social media analyst for a South African SME CRM called KHULA.
A business owner has searched for: "${query}"

Simulate a realistic social media sentiment analysis as if you had scanned Instagram, Facebook, TikTok, Twitter/X, and Google Reviews for this keyword or competitor.

Return a JSON object with EXACTLY this structure (no markdown, no explanation, just pure JSON):
{
  "query": "${query}",
  "overall": "positive" | "negative" | "mixed",
  "score": { "positive": <number 0-100>, "neutral": <number 0-100>, "negative": <number 0-100> },
  "themes": [<5 key themes found in conversations, strings>],
  "opportunities": [<3 specific actionable opportunities for the business, strings>],
  "threats": [<3 specific competitive threats or risks, strings>],
  "posts": [
    { "platform": "instagram"|"facebook"|"tiktok"|"twitter", "text": "<realistic sample post/comment>", "sentiment": "positive"|"negative"|"neutral"|"competitor_ad", "engagement": <number> }
  ],
  "summary": "<2-3 sentence strategic summary with specific South African market context>"
}

Make the analysis realistic, specific to South Africa, and actionable. The scores must add up to 100. Include 4 sample posts. Focus on insights a small business owner would find genuinely useful.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
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
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    return NextResponse.json({ result });
  } catch (err) {
    console.error("Social research error:", err);
    return NextResponse.json({ error: "Research failed" }, { status: 500 });
  }
}
