import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function mockPage(info: Record<string, string>) {
  const name = info.businessName || "My Business";
  const city = info.city || "South Africa";
  const phone = info.phone || "+27 82 000 0000";
  const wa = info.whatsapp || phone;
  return {
    sections: [
      {
        id: "hero", type: "hero",
        content: { headline: `Welcome to ${name}`, subheadline: `Based in ${city} — we're here to help you succeed.`, cta1: "Get Started", cta2: "Chat on WhatsApp" },
      },
      {
        id: "services", type: "services",
        content: { title: "What We Offer", subtitle: "Tailored solutions built around your needs", items: [
          { name: "Consultation", description: "One-on-one sessions to understand your goals.", price: "From R500", icon: "💬" },
          { name: "Our Service", description: "Core service delivery with exceptional results.", price: "From R1,200", icon: "⭐" },
          { name: "Premium Package", description: "Full-service solution for the best outcomes.", price: "From R3,500", icon: "🚀" },
        ]},
      },
      {
        id: "about", type: "about",
        content: { title: `About ${name}`, body: `We are a trusted business based in ${city}, committed to delivering outstanding results for every client. Our team brings passion, professionalism and expertise to every project.`, highlights: ["5+ Years Experience", "100+ Happy Clients", "Trusted & Reliable"] },
      },
      {
        id: "stats", type: "stats",
        content: { items: [{ number: "100+", label: "Happy Clients" }, { number: "5+", label: "Years Active" }, { number: "4.9★", label: "Rating" }, { number: "R500", label: "Starting From" }] },
      },
      {
        id: "testimonials", type: "testimonials",
        content: { title: "What Our Clients Say", items: [
          { name: "Nomsa K.", text: "Absolutely incredible service. I saw results within the first week!", rating: 5, location: city },
          { name: "Riaan V.", text: "Professional, fast and affordable. Highly recommend to anyone.", rating: 5, location: city },
          { name: "Fatima P.", text: "Finally found a business I can trust. Will be back for sure.", rating: 5, location: city },
        ]},
      },
      {
        id: "booking_cta", type: "booking_cta",
        content: { title: "Ready to Get Started?", subtitle: "Book a free consultation today — no commitment required.", cta: "Book Now — It's Free" },
      },
      {
        id: "contact", type: "contact",
        content: { title: "Get In Touch", phone, whatsapp: wa, email: `hello@${name.toLowerCase().replace(/\s+/g, "")}.co.za`, address: `${city}, South Africa`, hours: "Mon–Fri 8am–5pm · Sat 8am–1pm" },
      },
      {
        id: "footer", type: "footer",
        content: { businessName: name, tagline: "Building success, one client at a time." },
      },
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const info = await request.json();
    const { businessName, industry, businessType, description, phone, whatsapp, city, style } = info;

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(mockPage(info));
    }

    const prompt = `Generate a complete website structure for a South African ${industry || "service"} business.

Business name: ${businessName}
City: ${city}
Business type: ${businessType || "services"} (services = appointment-based; products = eCommerce; both = mixed)
${description ? `Description: ${description}` : ""}
${phone ? `Phone: ${phone}` : ""}
${whatsapp ? `WhatsApp: ${whatsapp}` : ""}
Style: ${style || "professional"} (options: professional, friendly, modern, luxury)

Return ONLY a valid JSON object — no markdown, no explanation. Exact structure:

{
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "content": {
        "headline": "5–7 word punchy headline",
        "subheadline": "One compelling sentence about the business value",
        "cta1": "Primary CTA (e.g. Book Now / Shop Now)",
        "cta2": "Secondary CTA (e.g. Chat on WhatsApp)"
      }
    },
    {
      "id": "services",
      "type": "services",
      "content": {
        "title": "Section heading",
        "subtitle": "One line sub-description",
        "items": [
          { "name": "Service/Product name", "description": "One sentence description", "price": "From RXX", "icon": "single emoji" }
        ]
      }
    },
    {
      "id": "about",
      "type": "about",
      "content": {
        "title": "About [Business Name]",
        "body": "2–3 sentence paragraph about the business",
        "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"]
      }
    },
    {
      "id": "stats",
      "type": "stats",
      "content": {
        "items": [
          { "number": "100+", "label": "Happy Clients" },
          { "number": "5+", "label": "Years Experience" },
          { "number": "4.9★", "label": "Rating" },
          { "number": "R500", "label": "Starting From" }
        ]
      }
    },
    {
      "id": "testimonials",
      "type": "testimonials",
      "content": {
        "title": "What Our Clients Say",
        "items": [
          { "name": "South African name", "text": "2-sentence review", "rating": 5, "location": "SA city" }
        ]
      }
    },
    {
      "id": "booking_cta",
      "type": "booking_cta",
      "content": {
        "title": "Compelling CTA headline",
        "subtitle": "Supporting sentence",
        "cta": "Action button text"
      }
    },
    {
      "id": "contact",
      "type": "contact",
      "content": {
        "title": "Get In Touch",
        "phone": "${phone || "+27 82 000 0000"}",
        "whatsapp": "${whatsapp || phone || "+27 82 000 0000"}",
        "email": "hello@business.co.za",
        "address": "Street, ${city || "South Africa"}",
        "hours": "Mon–Fri 8am–5pm · Sat 8am–1pm"
      }
    },
    {
      "id": "footer",
      "type": "footer",
      "content": {
        "businessName": "${businessName}",
        "tagline": "Short memorable tagline"
      }
    }
  ]
}

Rules:
- 3 testimonials with authentic South African names (Zulu, Xhosa, Afrikaans, English mix)
- 3–5 services/products relevant to the ${industry} industry
- All prices in Rands (R)
- Warm, trustworthy tone for South African SME audience
- Return ONLY the JSON object`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();
    // Strip markdown code fences if Claude wrapped the JSON
    const jsonStr = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const parsed = JSON.parse(jsonStr);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[build-page]", err);
    return NextResponse.json(
      { error: "Failed to generate page", detail: String(err) },
      { status: 500 }
    );
  }
}
