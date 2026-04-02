import type { VercelRequest, VercelResponse } from "@vercel/node";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_ADDRESS = "portfolio@raunaksharma.dev";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!RESEND_API_KEY) {
    console.error("[send-email] RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email service not configured" });
  }

  const { to, subject, body } = req.body as {
    to: string;
    subject: string;
    body: string;
  };

  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Missing required fields: to, subject, body" });
  }

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to,
      subject,
      text: body,
    }),
  });

  if (!resendRes.ok) {
    const errBody = await resendRes.text();
    console.error("[send-email] Resend error:", resendRes.status, errBody);
    return res.status(502).json({ error: "Failed to send email", detail: errBody });
  }

  const data = await resendRes.json();
  return res.status(200).json({ id: data.id });
}
