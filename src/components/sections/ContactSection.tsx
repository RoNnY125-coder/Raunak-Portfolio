import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/RoNnY125-coder" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/raunak-sharma-b91650344" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/basically._.raunak?igsh=MXNrNDd0bzRkcjl5MQ==" },
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

  // Strip any accidental markdown fences Gemini might add
  const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(cleaned);
}

async function sendEmail(to: string, subject: string, body: string) {
  // Calls our own server-side API route — keeps the Resend key out of the browser bundle
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
      // 1. Ask Gemini to draft both emails
      const emails = await generateEmails(name, email, message);

      // 2. Deliver auto-reply to the visitor
      await sendEmail(email, emails.visitor_reply.subject, emails.visitor_reply.body);

      // 3. Deliver briefing summary to Raunak
      await sendEmail("raunaksh75@gmail.com", emails.owner_summary.subject, emails.owner_summary.body);

      toast({
        title: "Message sent! ✉️",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (err) {
      console.error("[ContactForm]", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly at raunaksh75@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:pl-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Get in Touch
          </span>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Let's work together
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 lg:col-span-2"
            >
              <div>
                <h3 className="mb-6 font-heading text-xl font-semibold">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href="mailto:raunaksh75@gmail.com" className="font-medium hover:text-primary">
                        raunaksh75@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-heading text-lg font-semibold">Connect</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg"
                      >
                        <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="card-glass p-6 lg:p-8">
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="bg-secondary/50 border-border/50 resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending…"
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="mt-24 border-t border-border/50 pt-8"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Raunak Sharma. Built with passion.
            </p>
            <a
              href="#home"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Back to top
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
