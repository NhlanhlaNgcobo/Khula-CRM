import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages, contactName, businessName, channel } = await request.json();

    const systemPrompt = `You are a helpful sales assistant for ${businessName || "a South African business"}.
You help craft professional, warm, and concise reply messages to ${channel || "WhatsApp"} conversations.
Keep replies short (1-3 sentences max), friendly, and in plain English.
Do not use markdown formatting. Do not add greetings unless starting a new conversation.
Match the tone of the existing conversation. Always be helpful and move the conversation forward.`;

    const conversationHistory = messages
      .slice(-5)
      .map((m: { direction: string; body: string }) => ({
        role: m.direction === "outbound" ? "assistant" : "user",
        content: m.body,
      }));

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 150,
      system: systemPrompt,
      messages: [
        ...conversationHistory,
        {
          role: "user",
          content: `Generate a professional reply to send to ${contactName || "this contact"} based on the conversation above. Just give the reply text, nothing else.`,
        },
      ],
    });

    const suggestion =
      response.content[0].type === "text" ? response.content[0].text.trim() : "";

    return NextResponse.json({ suggestion });
  } catch (err) {
    console.error("AI suggest error:", err);
    return NextResponse.json({ error: "Failed to generate suggestion" }, { status: 500 });
  }
}
