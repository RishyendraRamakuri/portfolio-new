import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, subject, message } = data;

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_RECEIVER,
      subject: `Portfolio Contact: ${subject || "No Subject"}`,
      html: `<p><strong>From:</strong> ${firstName} ${lastName || ""} (${email})</p><p>${message}</p>`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
