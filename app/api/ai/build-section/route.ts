import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { sectionType, businessName, industry, instruction, currentContent } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ content: currentContent });
    }

    const prompt = `You are rewriting one section of a website for a South African ${industry || "service"} business called "${businessName}".

Section type: ${sectionType}
Current content:
${JSON.stringify(currentContent, null, 2)}

Instruction from the user: "${instruction || "Make this section more compelling and professional"}"

Return ONLY a valid JSON object with the same keys as the current content, but with improved/updated values.
Keep the same structure — same keys, same array lengths (or add 1 extra item if it makes sense).
All prices in Rands. South African context. No markdown. Return ONLY the JSON.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();
    const jsonStr = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const content = JSON.parse(jsonStr);

    return NextResponse.json({ content });
  } catch (err) {
    console.error("[build-section]", err);
    return NextResponse.json(
      { error: "Failed to regenerate section", detail: String(err) },
      { status: 500 }
    );
  }
}
