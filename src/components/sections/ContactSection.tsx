import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { name: "GitHub", icon: "code", href: "https://github.com/RoNnY125-coder" },
  { name: "LinkedIn", icon: "link", href: "https://www.linkedin.com/in/raunak-sharma-b91650344" },
  { name: "Instagram", icon: "share", href: "https://www.instagram.com/basically._.raunak" },
];

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are an assistant managing contact form submissions for Raunak Sharma, a software developer based in Delhi, India.

When given a contact form submission, return ONLY a valid JSON object. No explanation, no markdown, no code fences. Raw JSON only.

Use this exact structure:

{
  "visitor_reply": {
    "subject": "string",
    "body": "string"
  },
  "owner_summary": {
    "subject": "string",
    "body": "string"
  }
}

Rules for visitor_reply:
- Address the visitor by their first name
- Confirm their message was received
- Tell them Raunak will respond within 24–48 hours
- Keep it under 100 words
- Sign off as "Raunak Sharma"
- Plain text only, no HTML

Rules for owner_summary:
- Summarise the visitor's intent in 1–2 sentences
- Flag with ⚠ Urgent if the message mentions a deadline, job offer, or collaboration
- Include the visitor's name and email for easy reply
- Keep it under 80 words
- Plain text only, no HTML`;

async function generateEmails(name: string, email: string, message: string) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generationConfig: { temperature: 0.3, maxOutputTokens: 600 },
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\nSubmitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const rawText: string = data.candidates[0].content.parts[0].text;
  const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(cleaned);
}

async function sendEmail(to: string, subject: string, body: string) {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, subject, body }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Send email failed (${res.status}): ${err}`);
  }
}

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const emails = await generateEmails(name, email, message);
      await sendEmail(email, emails.visitor_reply.subject, emails.visitor_reply.body);
      await sendEmail("theronnystack@gmail.com", emails.owner_summary.subject, emails.owner_summary.body);

      toast({
        title: "Message sent! ✉️",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (err) {
      console.error("[ContactForm]", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly at theronnystack@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 lg:pl-24 px-6 lg:px-16 overflow-hidden">
      {/* Ghost number */}
      <div className="ghost-num top-0 right-0">07</div>

      <div className="max-w-6xl relative z-10">
        <motion.div
           ref={ref}
           initial={{ opacity: 0, y: 40 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="mb-16"
        >
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.4em] text-[#8D1515]"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            Get in Touch
          </span>
          <h2 className="font-black uppercase tracking-tighter text-4xl lg:text-7xl text-[#eedfdf]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}>
            LET'S CONSTRUCT<br />
            <span className="text-gradient">SOMETHING TOGETHER</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-6">
              <p className="text-[#c6c6c7] text-lg leading-relaxed">
                Have a project in mind or just want to say hello? I'm always open to new collaborations and interesting challenges.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-6 group">
                  <span className="material-symbols-outlined text-[#8D1515] text-2xl group-hover:scale-110 transition-transform">mail</span>
                  <a href="mailto:theronnystack@gmail.com" className="text-xl font-bold text-[#FFB3AE] hover:text-[#8D1515] transition-colors" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                    theronnystack@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-6">
                  <span className="material-symbols-outlined text-[#8D1515] text-2xl">location_on</span>
                  <span className="text-xl font-bold text-[#FFB3AE]" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                    DELHI, INDIA
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-[#251e1e]">
              <h3 className="font-black uppercase tracking-widest text-[#8D1515] text-xs">SOCIAL CONNECT</h3>
              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B3333] hover:text-[#FFB3AE] transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span className="material-symbols-outlined text-3xl">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="bg-[#251e1e] p-8 lg:p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#FFB3AE] font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                    NAME
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="WALTER WHITE"
                    className="w-full bg-[#181212] border-none text-[#eedfdf] px-6 py-4 focus:ring-1 focus:ring-[#8D1515] outline-none placeholder-[#3B3333] font-bold uppercase transition-all"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#FFB3AE] font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                    EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="HEISENBERG@EMPIRE.COM"
                    className="w-full bg-[#181212] border-none text-[#eedfdf] px-6 py-4 focus:ring-1 focus:ring-[#8D1515] outline-none placeholder-[#3B3333] font-bold uppercase transition-all"
                    style={{ fontFamily: "'Epilogue', sans-serif" }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#FFB3AE] font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="I AM THE ONE WHO KNOCKS..."
                  className="w-full bg-[#181212] border-none text-[#eedfdf] px-6 py-4 focus:ring-1 focus:ring-[#8D1515] outline-none placeholder-[#3B3333] font-bold uppercase transition-all resize-none"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#8D1515] hover:bg-[#FFB3AE] text-[#FFB3AE] hover:text-[#68000b] py-6 font-black uppercase tracking-[0.4em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {isSubmitting ? "SENDING..." : "DISPATCH MESSAGE"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-32 pt-12 border-t border-[#251e1e]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="font-black text-[#8D1515] italic tracking-tighter text-2xl" style={{ fontFamily: "'Epilogue', sans-serif" }}>
            RAUNAK.SHARMA
          </span>
          <p className="text-[#3B3333] text-xs uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} — MANUFACTURED IN DELHI
          </p>
          <a href="#home" className="group flex items-center gap-2 text-[#FFB3AE] font-black uppercase text-xs tracking-widest" style={{ fontFamily: "'Epilogue', sans-serif" }}>
            BACK TO TOP
            <span className="material-symbols-outlined text-sm group-hover:-translate-y-1 transition-transform">arrow_upward</span>
          </a>
        </div>
      </footer>
    </section>
  );
}
