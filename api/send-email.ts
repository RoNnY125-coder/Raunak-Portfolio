import type { VercelRequest, VercelResponse } from "@vercel/node";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const OWNER_EMAIL = "raunaksh75@gmail.com"; // MUST be the verified Resend email unless a custom domain is added
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const clean = (value: unknown) =>
  typeof value === "string" ? value.trim().slice(0, 4000) : "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!RESEND_API_KEY) {
    console.error("[send-email] RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email service not configured" });
  }

  const name = clean(req.body?.name);
  const email = clean(req.body?.email).toLowerCase();
  const projectIdea = clean(req.body?.projectIdea || req.body?.message);

  if (!name || !email || !projectIdea) {
    return res.status(400).json({ error: "Please fill in your name, email, and project idea." });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeProjectIdea = escapeHtml(projectIdea).replace(/\n/g, "<br />");

  const subject = `New portfolio project inquiry from ${name}`.slice(0, 120);
  const text = [
    "New portfolio project inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Submitted: ${submittedAt} IST`,
    "",
    "Project idea:",
    projectIdea,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#181212;max-width:640px;margin:0 auto;padding:24px;">
      <p style="margin:0 0 8px;color:#8D1515;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;">Portfolio Inquiry</p>
      <h1 style="margin:0 0 20px;font-size:28px;line-height:1.15;color:#181212;">New project idea from ${safeName}</h1>
      <div style="background:#f8eeee;border-left:4px solid #8D1515;padding:16px 18px;margin-bottom:22px;">
        <p style="margin:0;"><strong>Name:</strong> ${safeName}</p>
        <p style="margin:6px 0 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#8D1515;">${safeEmail}</a></p>
        <p style="margin:6px 0 0;"><strong>Submitted:</strong> ${submittedAt} IST</p>
      </div>
      <h2 style="font-size:16px;margin:0 0 8px;color:#8D1515;">Project idea</h2>
      <p style="margin:0;background:#fff7f7;padding:16px;border:1px solid #f0d7d7;">${safeProjectIdea}</p>
    </div>
  `;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!resendRes.ok) {
    const errBody = await resendRes.text();
    console.error("[send-email] Resend error:", resendRes.status, errBody);
    return res.status(502).json({ error: "Failed to send email" });
  }

  const data = await resendRes.json();
  return res.status(200).json({ id: data.id });
}
