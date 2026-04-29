import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(process.env.BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    });

    if (res.status === 201 || res.status === 204) {
      return NextResponse.json({ success: true });
    }

    const data = await res.json();

    // Brevo returns 400 with code "duplicate_parameter" if already subscribed
    if (data.code === "duplicate_parameter") {
      return NextResponse.json({ error: "already_subscribed" }, { status: 400 });
    }

    return NextResponse.json({ error: "Brevo error" }, { status: 500 });

  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}