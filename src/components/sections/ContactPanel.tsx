import React, { useState } from 'react';

export const ContactPanel: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <section className="w-screen h-screen flex-shrink-0 overflow-y-auto relative flex flex-col" style={{ background: '#930616' }}>
      {/* 12-column grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08 }}>
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ borderRight: '1px solid #ff9b95', height: '100%' }} />
          ))}
        </div>
      </div>

      <div className="relative z-10 px-8 md:px-24 pt-32 pb-16 w-full flex flex-col items-center min-h-screen">
        {/* Giant headline — "Let's Build the Future" */}
        <div className="w-full mb-12">
          <h2
            className="font-headline font-black text-[#ffdad7] uppercase tracking-tighter text-center leading-[0.85] mb-10 sm:mb-16"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 9rem)' }}
          >
            LET'S BUILD<br />THE FUTURE.
          </h2>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
          {/* Name */}
          <div className="relative mb-10">
            <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,154,143,0.7)', textTransform: 'uppercase', marginBottom: 8 }}>
              NAME / IDENTITY
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="YOUR NAME"
              required
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,154,143,0.3)', color: '#ffdad7', padding: '12px 0', fontSize: 16, fontFamily: "'Inter', sans-serif", outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => { e.target.style.borderBottomColor = '#FFB3AE'; e.target.style.borderBottomWidth = '2px'; }}
              onBlur={e => { e.target.style.borderBottomColor = 'rgba(255,154,143,0.3)'; e.target.style.borderBottomWidth = '1px'; }}
            />
          </div>

          {/* Email */}
          <div className="relative mb-10">
            <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,154,143,0.7)', textTransform: 'uppercase', marginBottom: 8 }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="YOUR@EMAIL.COM"
              required
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,154,143,0.3)', color: '#ffdad7', padding: '12px 0', fontSize: 16, fontFamily: "'Inter', sans-serif", outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => { e.target.style.borderBottomColor = '#FFB3AE'; e.target.style.borderBottomWidth = '2px'; }}
              onBlur={e => { e.target.style.borderBottomColor = 'rgba(255,154,143,0.3)'; e.target.style.borderBottomWidth = '1px'; }}
            />
          </div>

          {/* Message */}
          <div className="relative mb-10">
            <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,154,143,0.7)', textTransform: 'uppercase', marginBottom: 8 }}>
              COMMUNICATION BRIEF
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="TELL ME ABOUT YOUR PROJECT"
              required
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,154,143,0.3)', color: '#ffdad7', padding: '12px 0', fontSize: 16, fontFamily: "'Inter', sans-serif", outline: 'none', resize: 'none', boxSizing: 'border-box' }}
              onFocus={e => { e.target.style.borderBottomColor = '#FFB3AE'; e.target.style.borderBottomWidth = '2px'; }}
              onBlur={e => { e.target.style.borderBottomColor = 'rgba(255,154,143,0.3)'; e.target.style.borderBottomWidth = '1px'; }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status !== 'idle'}
            style={{
              width: '100%',
              background: '#181212',
              color: '#FFB3AE',
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 900,
              fontSize: 20,
              padding: '20px 48px',
              borderBottom: '8px solid #8D1515',
              border: 'none',
              borderBottom: '8px solid #8D1515',
              cursor: status !== 'idle' ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginTop: 8,
              opacity: status !== 'idle' ? 0.6 : 1,
              transition: 'transform 300ms ease',
            }}
            onMouseEnter={e => { if (status === 'idle') (e.target as HTMLElement).style.transform = 'translateY(4px)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            {status === 'idle' ? 'SEND SIGNAL' : status === 'sending' ? 'SENDING...' : '✓ SIGNAL SENT'}
          </button>
        </form>

        {/* Social links */}
        <div className="flex flex-wrap gap-8 md:gap-12 justify-center mt-12">
          {[
            { label: 'GITHUB ↗', href: 'https://github.com/RoNnY125-coder' },
            { label: 'LINKEDIN ↗', href: 'https://www.linkedin.com/in/raunak-sharma-b91650344' },
            { label: 'INSTAGRAM ↗', href: 'https://www.instagram.com/basically._.raunak' },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 700, letterSpacing: '0.15em', color: '#ffdad7', textDecoration: 'none', textTransform: 'uppercase', fontSize: 14, transition: 'color 300ms' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = '#FFB3AE'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = '#ffdad7'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.4em', color: 'rgba(255,179,174,0.5)', textTransform: 'uppercase', marginTop: 24, textAlign: 'center' }}>
          DELHI, INDIA — AVAILABLE FOR OPPORTUNITIES
        </p>
      </div>
    </section>
  );
};
