import { NextResponse } from "next/server";

import { getAdminClient } from "@/lib/supabase-admin";

type WaitlistBody = {
  fullName?: string;
  email?: string;
};

export async function POST(request: Request) {
  let body: WaitlistBody;

  try {
    body = (await request.json()) as WaitlistBody;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const fullName = body.fullName?.trim();
  const email = body.email?.trim().toLowerCase();

  if (!fullName || fullName.length < 2) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const supabase = getAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "config" }, { status: 500 });
  }

  const { error } = await supabase.from("waitlist").insert({
    full_name: fullName,
    email,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "duplicate_email" }, { status: 409 });
    }

    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
