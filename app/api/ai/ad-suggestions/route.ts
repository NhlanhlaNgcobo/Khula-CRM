import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { pipelineStats, industry, location, topChannel } = await request.json();

    const prompt = `You are a digital marketing strategist for South African SMEs.

Business context:
- Industry: ${industry || "service business"}
- Location: ${location || "South Africa"}
- Current top ad channel: ${topChannel || "Facebook"}
- Pipeline data: ${JSON.stringify(pipelineStats || {})}

Based on this data, suggest 3 specific advertising campaigns this business should run RIGHT NOW. Focus on South African market reality: WhatsApp dominance (96% internet users), TikTok growth, cost-effective options for SMEs, ZAR budgets.

Return ONLY valid JSON:
{
  "suggestions": [
    {
      "platform": "whatsapp|facebook|instagram|tiktok|google",
      "title": "<campaign name>",
      "reason": "<why this specific campaign will work for their business, 2 sentences>",
      "estimated_leads": "<range like 40-60>",
      "estimated_cpl": "<ZAR range like R25-35>",
      "budget": "<monthly ZAR budget like R1,500/mo>",
      "confidence": <number 70-98>,
      "type": "<Lead Gen|CTWA|Retargeting|Awareness|Conversion>"
    }
  ]
}`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
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
      return NextResponse.json({ error: "Failed" }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Ad suggestions error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
