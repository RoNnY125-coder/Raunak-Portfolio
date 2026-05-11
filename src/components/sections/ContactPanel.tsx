import React, { useState } from 'react';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export const ContactPanel: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const projectIdea = formData.message.trim();

    if (!name || !email || !projectIdea) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, projectIdea }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Unable to send message right now.');
      }

      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3500);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unable to send message right now.');
    }
  };

  const updateField = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(current => ({ ...current, [field]: e.target.value }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <section className="contact-panel scroll-panel">
      <div className="contact-grid" />

      <div className="contact-shell">
        <div className="contact-heading-block">
          <p>Project inquiry</p>
          <h2>
            LET'S BUILD
            <br />
            THE FUTURE.
          </h2>
          <span>Tell me what you want to make. I will receive your name, email, and project idea directly.</span>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-field-grid">
            <label>
              <span>NAME / IDENTITY</span>
              <input
                type="text"
                value={formData.name}
                onChange={updateField('name')}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>EMAIL ADDRESS</span>
              <input
                type="email"
                value={formData.email}
                onChange={updateField('email')}
                placeholder="you@email.com"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label>
            <span>PROJECT IDEA</span>
            <textarea
              rows={5}
              value={formData.message}
              onChange={updateField('message')}
              placeholder="Tell me about your website, app, dashboard, AI tool, redesign, or collaboration."
              required
            />
          </label>

          <button type="submit" disabled={status === 'sending' || status === 'sent'}>
            {status === 'sending' ? 'SENDING...' : status === 'sent' ? 'MESSAGE SENT' : 'SEND PROJECT IDEA'}
          </button>

          {status === 'sent' && <p className="contact-status success">Thanks. Your message has been sent to Raunak.</p>}
          {status === 'error' && <p className="contact-status error">{errorMessage}</p>}
        </form>

        <div className="contact-links">
          {[
            { label: 'GITHUB', href: 'https://github.com/RoNnY125-coder' },
            { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/raunak-sharma-b91650344' },
            { label: 'INSTAGRAM', href: 'https://www.instagram.com/basically._.raunak' },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>

        <p className="contact-location">DELHI, INDIA - AVAILABLE FOR OPPORTUNITIES</p>
      </div>
    </section>
  );
};
