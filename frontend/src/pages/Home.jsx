import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, BookOpen, Layers, Users, TrendingUp, Mail, ChevronRight } from 'lucide-react';

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Mock data ── */
const mockPosts = [
  {
    slug: 'o-dia-que-decidi-sair-do-clt',
    title: 'O dia que decidi sair do CLT',
    excerpt: 'Não foi uma decisão heroica. Foi o acúmulo de frustração com anos construindo sonhos de outros.',
    category: 'Empreendedorismo',
    date: '12 Abr 2025',
    readTime: '5 min',
  },
  {
    slug: 'como-valido-ideias-sem-gastar-nada',
    title: 'Como valido ideias sem gastar nada',
    excerpt: 'O erro mais comum de quem começa: gastar meses construindo algo que ninguém pediu.',
    category: 'Construção',
    date: '28 Mar 2025',
    readTime: '7 min',
  },
  {
    slug: 'o-que-aprendi-no-primeiro-ano',
    title: 'O que aprendi no primeiro ano empreendendo',
    excerpt: 'Um ano de pressão, decisões erradas, pivôs e uma lição que nenhum curso vai te ensinar.',
    category: 'Empreendedorismo',
    date: '15 Mar 2025',
    readTime: '9 min',
  },
];

const features = [
  {
    icon: Layers,
    title: 'O jogo real do empreendedorismo',
    desc: 'Pressão, decisões difíceis, erros e o que realmente funciona. Sem filtro, sem glamour.',
  },
  {
    icon: TrendingUp,
    title: 'Construção de produtos digitais',
    desc: 'Como estou criando SaaS e outros produtos do zero — da ideia ao primeiro cliente.',
  },
  {
    icon: Users,
    title: 'Rede que importa',
    desc: 'Como construir network real sem enrolação. O que aprendi sobre pessoas e oportunidades.',
  },
  {
    icon: BookOpen,
    title: 'Liderança na prática',
    desc: 'O que aprendi construindo equipes e tomando decisões que importam de verdade.',
  },
];

/* ── Lead capture ── */
function LeadCapture() {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const API = import.meta.env.VITE_API_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(`${API}/api/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section-padding py-24 relative overflow-hidden">
      {/* Glow BG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-brand/5 blur-[120px]" />
      </div>

      <div className="container-max relative">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <span className="tag mb-6">Bastidores reais</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mt-4 mb-4 leading-tight">
              Sem filtro. Sem guru.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Receba os bastidores reais da construção das minhas empresas. Decisões, erros, o que funciona
              e o que não funciona. Direto no seu email.
            </p>
          </Reveal>

          <Reveal delay={150}>
            {status === 'success' ? (
              <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
                <p className="text-zinc-50 font-semibold">Email confirmado.</p>
                <p className="text-zinc-400 text-sm mt-1">Você vai receber os próximos bastidores em primeira mão.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="input-field flex-1"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Enviando...' : (
                    <><Mail size={16} /> Acompanhar</>
                  )}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">Algo deu errado. Tente novamente.</p>
            )}
            <p className="text-xs text-zinc-600 mt-3">Sem spam. Cancele quando quiser.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Main ── */
export default function Home() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="relative min-h-screen flex items-center section-padding pt-24 pb-16 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-hero-glow pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-brand/[0.06] blur-[100px] pointer-events-none" />

        <div className="container-max w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 mb-8 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse-slow" />
                <span className="text-xs font-medium tracking-widest uppercase text-zinc-500">
                  Documentando a jornada
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight text-zinc-50 animate-fade-up mb-6">
                Construindo<br />
                do zero.<br />
                <span className="text-brand">Mostrando<br />o jogo real.</span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed max-w-lg mb-10 animate-fade-up" style={{ animationDelay: '150ms' }}>
                Saí do CLT, fundei uma empresa de tecnologia e estou documentando cada passo dessa
                jornada — <strong className="text-zinc-300 font-medium">sem romantizar, sem glamour.</strong> Só o que funciona de verdade.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: '250ms' }}>
                <Link to="/sobre" className="btn-primary">
                  Acompanhar minha jornada <ArrowRight size={16} />
                </Link>
                <Link to="/projetos" className="btn-ghost">
                  Ver meus projetos
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 mt-12 pt-12 border-t border-zinc-800/60 animate-fade-up" style={{ animationDelay: '350ms' }}>
                {[
                  { label: 'empresa fundada',   value: '1' },
                  { label: 'saiu do CLT',       value: 'Jan/26' },
                  { label: 'empresas em construção', value: '6' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-3xl font-black text-zinc-50">{value}</p>
                    <p className="text-sm text-zinc-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: photo placeholder */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand/30 via-transparent to-transparent" />
                {/* Photo area */}
                <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-end justify-center">
                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
                  {/* Foto */}
                  <img
                    src="/foto.jpeg"
                    alt="Luciano Dias"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  {/* Name tag */}
                  <div className="relative z-20 mb-6 text-center">
                    <p className="font-bold text-zinc-50 text-lg">Luciano Dias</p>
                    <p className="text-zinc-500 text-xs">Fundador · NacionalSign</p>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 shadow-xl">
                  <p className="text-xs text-zinc-500">Saiu do CLT em</p>
                  <p className="font-bold text-zinc-50">Jan/2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ───── O QUE VOCÊ VAI ENCONTRAR ───── */}
      <section className="section-padding py-24">
        <div className="container-max">
          <Reveal>
            <div className="text-center mb-16">
              <span className="section-label">O que você vai encontrar aqui</span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mt-4 leading-tight">
                Não é curso. Não é guru.<br />
                <span className="text-zinc-400 font-normal">É construção real, documentada.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="card p-6 h-full group">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors duration-200">
                    <Icon size={18} className="text-brand" />
                  </div>
                  <h3 className="font-semibold text-zinc-100 mb-2 text-sm leading-snug">{title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ───── PROJETOS ───── */}
      <section className="section-padding py-24">
        <div className="container-max">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="section-label">Projetos que estou construindo</span>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mt-3 leading-tight">
                  Produtos reais.<br />
                  <span className="text-zinc-400 font-normal">Problemas reais.</span>
                </h2>
              </div>
              <Link to="/projetos" className="btn-ghost text-sm">
                Ver todos <ChevronRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NacionalSign — destaque */}
            <Reveal>
              <div className="card p-8 relative group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand/15 border border-brand/25 flex items-center justify-center">
                    <span className="text-brand font-black text-sm">NS</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-50">NacionalSign</h3>
                    <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">Ativo</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed mb-2 font-medium text-zinc-300">SaaS de assinatura digital</p>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                  Da ideia ao produto funcionando. Assinatura de documentos 100% digital, legal e segura.
                  Construído para resolver um problema que eu mesmo tive.
                </p>
                <a
                  href="https://nacionalsign.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-light font-medium transition-colors"
                >
                  Conhecer o produto <ExternalLink size={13} />
                </a>
              </div>
            </Reveal>

            {/* Em construção */}
            <Reveal delay={100}>
              <div className="card p-8 relative group overflow-hidden border-dashed">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <span className="text-zinc-500 text-lg">?</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-400">Próximo produto</h3>
                    <span className="text-xs text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">Em construção</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  Identificando o próximo problema real para resolver. Estou documentando o processo de
                  validação desde o início.
                </p>
                <Link
                  to="/projetos"
                  className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 font-medium transition-colors"
                >
                  Acompanhar <ChevronRight size={13} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ───── SOBRE TEASER ───── */}
      <section className="section-padding py-24">
        <div className="container-max">
          <div className="max-w-2xl">
            <Reveal>
              <span className="section-label">Minha história</span>
              <blockquote className="mt-8 text-2xl md:text-3xl font-semibold text-zinc-200 leading-tight">
                "Eu não romantizo o empreendedorismo. Fui CLT por anos. Construí sonhos de outros.
                E um dia decidi que precisava construir os meus."
              </blockquote>
              <p className="mt-6 text-zinc-400 leading-relaxed">
                A decisão de empreender não foi heroica. Foi o cansaço acumulado de saber que era capaz de
                mais, mas estar preso numa estrutura que não permitia crescer. Hoje dirijo a NacionalSign e
                construo outros produtos — e documento tudo aqui.
              </p>
              <Link to="/sobre" className="inline-flex items-center gap-2 mt-8 text-brand hover:text-brand-light font-medium transition-colors">
                Ler minha história completa <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ───── ÚLTIMOS ARTIGOS ───── */}
      <section className="section-padding py-24">
        <div className="container-max">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="section-label">Últimos artigos</span>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mt-3 leading-tight">
                  Escrito na trincheira.
                </h2>
              </div>
              <Link to="/blog" className="btn-ghost text-sm">
                Ver todos <ChevronRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="flex flex-col divide-y divide-zinc-800/60">
            {mockPosts.map(({ slug, title, excerpt, category, date, readTime }, i) => (
              <Reveal key={slug} delay={i * 80}>
                <Link
                  to={`/blog/${slug}`}
                  className="group py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-900/30 -mx-4 px-4 rounded-xl transition-colors duration-200"
                >
                  <div className="flex-1 max-w-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-brand bg-brand/8 px-2 py-0.5 rounded-md">
                        {category}
                      </span>
                      <span className="text-xs text-zinc-600">{date} · {readTime} leitura</span>
                    </div>
                    <h3 className="font-semibold text-zinc-100 group-hover:text-zinc-50 text-lg mb-1 transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{excerpt}</p>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-zinc-700 group-hover:text-brand group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── LEAD CAPTURE ───── */}
      <LeadCapture />
    </>
  );
}
