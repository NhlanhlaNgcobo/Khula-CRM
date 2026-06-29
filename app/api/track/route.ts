import { NextRequest, NextResponse } from "next/server";

// CORS headers — this endpoint is called from the business's external website
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Preflight for cross-origin requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orgId, event, properties, page, referrer, ua, timestamp } = body;

    if (!orgId || !event) {
      return NextResponse.json({ error: "orgId and event are required" }, { status: 400, headers: CORS });
    }

    // Derive source from referrer
    const source = (() => {
      if (!referrer) return "direct";
      if (/google|bing|yahoo|duckduckgo/i.test(referrer)) return "organic";
      if (/facebook|instagram|tiktok|twitter|linkedin/i.test(referrer)) return "social";
      return "referral";
    })();

    // Derive device from user-agent
    const device = /mobile|android|iphone|ipad/i.test(ua || "") ? "mobile" : "desktop";

    // In production: write to Supabase activity_log or a website_events table using the service role client.
    // For now we log and return success so the tracker script works end-to-end.
    console.log("[KHULA tracker]", { orgId, event, page, source, device, properties, timestamp });

    return NextResponse.json({ ok: true, received: { event, source, device } }, { headers: CORS });
  } catch (err) {
    console.error("Track error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500, headers: CORS });
  }
}
