import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Mail, Instagram, Send, ArrowUpRight } from 'lucide-react';

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const socialLinks = [
  {
    name: 'LinkedIn',
    handle: 'Luciano Dias',
    href: 'https://www.linkedin.com/in/luciano-dias-59929ab3/',
    icon: Linkedin,
    desc: 'Onde posto mais conteúdo sobre empreendedorismo',
    color: 'hover:border-blue-500/30 hover:bg-blue-500/5',
  },
  {
    name: 'Email',
    handle: 'luciano.dias@nacionalsign.com',
    href: 'mailto:luciano.dias@nacionalsign.com',
    icon: Mail,
    desc: 'Para parcerias e oportunidades de negócio',
    color: 'hover:border-brand/30 hover:bg-brand/5',
  },
  {
    name: 'Instagram',
    handle: '@luciano.di',
    href: 'https://instagram.com/luciano.di',
    icon: Instagram,
    desc: 'Bastidores do dia a dia e da construção',
    color: 'hover:border-pink-500/20 hover:bg-pink-500/5',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const API = import.meta.env.VITE_API_URL || '';

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Header */}
      <section className="section-padding pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand/[0.06] blur-[120px] pointer-events-none" />
        <div className="container-max">
          <Reveal>
            <span className="section-label">Contato</span>
            <h1 className="text-5xl md:text-6xl font-black text-zinc-50 mt-6 leading-[1.08] tracking-tight">
              Vamos conversar.
            </h1>
            <p className="text-xl text-zinc-400 mt-4 max-w-lg leading-relaxed">
              Se você está construindo algo, quer discutir uma parceria ou só quer trocar ideia sobre empreendedorismo real — pode chegar.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padding py-20">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: links sociais */}
            <div>
              <Reveal>
                <h2 className="text-xl font-bold text-zinc-100 mb-2">Onde me encontrar</h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  Sou mais ativo no LinkedIn. Mas se preferir email direto ou Instagram, funciona também.
                </p>
              </Reveal>

              <div className="space-y-3">
                {socialLinks.map(({ name, handle, href, icon: Icon, desc, color }, i) => (
                  <Reveal key={name} delay={i * 80}>
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800 ${color} transition-all duration-200`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-zinc-200 text-sm">{name}</p>
                        <p className="text-xs text-zinc-500 truncate">{handle}</p>
                        <p className="text-xs text-zinc-600 mt-0.5">{desc}</p>
                      </div>
                      <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
                    </a>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={300}>
                <div className="mt-8 p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    <strong className="text-zinc-300">Para parcerias comerciais:</strong> envie email com o contexto completo.
                    Respondo dentro de 48 horas úteis.
                  </p>
                  <p className="text-sm text-zinc-600 leading-relaxed mt-2">
                    Não respondo propostas genéricas de marketing ou "oportunidades únicas".
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: formulário */}
            <Reveal delay={100}>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

                <h2 className="text-xl font-bold text-zinc-100 mb-6">Enviar mensagem</h2>

                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-4">
                      <Send size={20} className="text-green-400" />
                    </div>
                    <p className="font-semibold text-zinc-100 mb-2">Mensagem enviada.</p>
                    <p className="text-sm text-zinc-500">Vou responder em breve. Obrigado pelo contato.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1.5">Nome</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Seu nome"
                          required
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1.5">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                          required
                          className="input-field"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1.5">Assunto</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Sobre o que é?"
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1.5">Mensagem</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Detalhe sua mensagem aqui..."
                        required
                        rows={5}
                        className="input-field resize-none"
                      />
                    </div>
                    {status === 'error' && (
                      <p className="text-red-400 text-sm">Algo deu errado. Tente novamente ou envie por email.</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Enviando...' : <><Send size={15} /> Enviar mensagem</>}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
