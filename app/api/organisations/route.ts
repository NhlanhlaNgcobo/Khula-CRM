import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 30);
}

export async function POST(request: NextRequest) {
  try {
    const { name, owner_id, owner_email, owner_name } = await request.json();

    if (!name || !owner_id || !owner_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createAdminClient();
    const subdomain = slugify(name);

    // Create organisation
    const { data: org, error: orgError } = await supabase
      .from("organisations")
      .insert({
        name,
        subdomain,
        owner_id,
        plan: "spark",
        settings: {
          onboarding: {
            profile: true,
            contacts: false,
            whatsapp: false,
            automations: false,
            bookings: false,
            team: false,
            complete: false,
          },
        },
      })
      .select()
      .single();

    if (orgError) {
      console.error("Org creation error:", orgError);
      return NextResponse.json({ error: orgError.message }, { status: 500 });
    }

    // Create user record linked to org
    const { error: userError } = await supabase.from("users").insert({
      id: owner_id,
      organisation_id: org.id,
      email: owner_email,
      full_name: owner_name || "",
      role: "owner",
    });

    if (userError) {
      console.error("User creation error:", userError);
      // Rollback org
      await supabase.from("organisations").delete().eq("id", org.id);
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    return NextResponse.json({ organisation: org });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
