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
    }, 1000);
  };

  return (
    <section className="w-screen h-screen flex-shrink-0 overflow-y-auto bg-[#930616] relative flex flex-col items-center justify-center">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-12 h-full w-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-[#ff9b95] h-full"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-8 md:px-24 pt-32 pb-24 w-full flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-7xl md:text-9xl font-headline font-black text-[#ffdad7] uppercase tracking-tighter mb-16 text-center leading-[0.85]">
          Build the<br/>Future.
        </h2>

        <form onSubmit={handleSubmit} className="max-w-2xl w-full mx-auto">
          <div className="mb-8">
            <label className="block font-label text-xs tracking-[0.3em] text-[#ff9b95]/70 uppercase mb-2">Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-transparent border-b border-[#ff9b95]/30 text-[#ffdad7] py-3 focus:outline-none focus:border-[#FFB3AE] focus:border-b-2 transition-all placeholder:text-[#ff9b95]/20 font-body"
              placeholder="YOUR NAME"
              required
            />
          </div>
          <div className="mb-8">
            <label className="block font-label text-xs tracking-[0.3em] text-[#ff9b95]/70 uppercase mb-2">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-transparent border-b border-[#ff9b95]/30 text-[#ffdad7] py-3 focus:outline-none focus:border-[#FFB3AE] focus:border-b-2 transition-all placeholder:text-[#ff9b95]/20 font-body"
              placeholder="YOUR@EMAIL.COM"
              required
            />
          </div>
          <div className="mb-8">
            <label className="block font-label text-xs tracking-[0.3em] text-[#ff9b95]/70 uppercase mb-2">Message</label>
            <textarea 
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-transparent border-b border-[#ff9b95]/30 text-[#ffdad7] py-3 focus:outline-none focus:border-[#FFB3AE] focus:border-b-2 transition-all placeholder:text-[#ff9b95]/20 font-body resize-none"
              placeholder="TELL ME ABOUT YOUR PROJECT"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={status !== 'idle'}
            className="w-full bg-[#181212] text-[#FFB3AE] font-headline font-black text-xl px-12 py-5 border-b-8 border-[#8D1515] hover:translate-y-2 transition-all duration-300 mt-8 uppercase tracking-widest disabled:opacity-50"
          >
            {status === 'idle' ? 'START A PROJECT' : status === 'sending' ? 'SENDING...' : 'MESSAGE SENT'}
          </button>
        </form>

        <div className="flex flex-wrap gap-8 md:gap-12 justify-center mt-16 text-center">
          <a href="https://github.com/RoNnY125-coder" target="_blank" rel="noopener noreferrer" className="font-headline font-bold tracking-widest text-[#ffdad7] hover:text-[#FFB3AE] transition-colors uppercase text-sm md:text-base">
            GITHUB ↗
          </a>
          <a href="https://www.linkedin.com/in/raunak-sharma-b91650344" target="_blank" rel="noopener noreferrer" className="font-headline font-bold tracking-widest text-[#ffdad7] hover:text-[#FFB3AE] transition-colors uppercase text-sm md:text-base">
            LINKEDIN ↗
          </a>
          <a href="https://www.instagram.com/basically._.raunak" target="_blank" rel="noopener noreferrer" className="font-headline font-bold tracking-widest text-[#ffdad7] hover:text-[#FFB3AE] transition-colors uppercase text-sm md:text-base">
            INSTAGRAM ↗
          </a>
        </div>

        <p className="font-label text-xs tracking-[0.4em] text-[#ffb3ae]/60 uppercase mt-16 text-center">
          DELHI, INDIA — AVAILABLE FOR OPPORTUNITIES
        </p>
      </div>
    </section>
  );
};
