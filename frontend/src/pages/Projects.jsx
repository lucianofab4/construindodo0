import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Zap, Shield, FileSignature } from 'lucide-react';

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

export default function Projects() {
  return (
    <>
      {/* Header */}
      <section className="section-padding pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-brand/[0.05] blur-[100px] pointer-events-none rounded-full" />
        <div className="container-max">
          <Reveal>
            <span className="section-label">Projetos</span>
            <h1 className="text-5xl md:text-6xl font-black text-zinc-50 mt-6 leading-[1.08] tracking-tight">
              Produtos reais.<br />
              <span className="text-zinc-500 font-normal">Construídos do zero.</span>
            </h1>
            <p className="text-xl text-zinc-400 mt-4 max-w-xl leading-relaxed">
              Cada produto aqui resolve um problema real. Nada de side project abandonado — só o que vale o jogo.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padding py-20">
        <div className="container-max space-y-8">

          {/* ── NacionalSign — DESTAQUE ── */}
          <Reveal>
            <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden p-8 md:p-10">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-brand/[0.06] blur-[80px] pointer-events-none" />

              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-brand/15 border border-brand/25 flex items-center justify-center">
                        <FileSignature size={20} className="text-brand" />
                      </div>
                      <div>
                        <h2 className="font-bold text-2xl text-zinc-50">NacionalSign</h2>
                        <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-0.5 rounded-full">
                          Ativo · Em crescimento
                        </span>
                      </div>
                    </div>

                    <p className="text-xl font-semibold text-zinc-200 mb-3">SaaS de assinatura digital</p>
                    <p className="text-zinc-500 leading-relaxed mb-6 max-w-xl">
                      Assinatura de documentos 100% digital, com validade jurídica e facilidade de uso.
                      Construído para resolver um problema que eu mesmo enfrentei — processo burocrático,
                      caro e lento de assinar contratos.
                    </p>

                    <p className="text-zinc-500 leading-relaxed mb-8 max-w-xl text-sm border-l-2 border-brand/40 pl-4 italic">
                      "Da ideia ao primeiro pagamento recorrente em menos de 3 meses.
                      Validei o problema antes de escrever uma linha de código."
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://nacionalsign.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Conhecer o produto <ExternalLink size={14} />
                      </a>
                      <Link to="/blog/da-ideia-ao-primeiro-cliente" className="btn-ghost">
                        Ler a história
                      </Link>
                    </div>
                  </div>

                  {/* Right: features */}
                  <div className="flex-shrink-0 w-full md:w-64 space-y-3">
                    {[
                      { icon: Zap,    label: 'Assinatura em minutos',      desc: 'Sem burocracia, sem cartório' },
                      { icon: Shield, label: 'Validade jurídica',           desc: 'ICP-Brasil + timestamp' },
                      { icon: FileSignature, label: 'Gestão de documentos', desc: 'Dashboard completo' },
                    ].map(({ icon: Icon, label, desc }) => (
                      <div key={label} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={14} className="text-brand" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">{label}</p>
                          <p className="text-xs text-zinc-600">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Em construção ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal delay={100}>
              <div className="card p-8 relative border-dashed flex flex-col h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <span className="text-zinc-600 text-lg font-bold">?</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-400">Projeto #2</h3>
                    <span className="text-xs text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                      Validando
                    </span>
                  </div>
                </div>
                <p className="text-zinc-600 leading-relaxed text-sm flex-1 mb-6">
                  Identificando um problema no mercado de gestão para pequenas empresas.
                  Fase de validação com clientes potenciais — sem produto ainda, só problema mapeado.
                </p>
                <Link to="/blog" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5">
                  Acompanhar no blog <ArrowRight size={13} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="card p-8 relative border-dashed flex flex-col h-full opacity-60">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <span className="text-zinc-700 text-lg font-bold">+</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-600">Ideia futura</h3>
                    <span className="text-xs text-zinc-600 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">
                      Em fila
                    </span>
                  </div>
                </div>
                <p className="text-zinc-700 leading-relaxed text-sm flex-1">
                  O próximo problema ainda vai aparecer. Sempre aparecem. O que muda é como você o reconhece.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Philosophy */}
          <Reveal delay={200}>
            <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-8 mt-4">
              <span className="section-label mb-4 block">Como escolho o que construir</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {[
                  { num: '01', title: 'Problema real', desc: 'Só construo o que resolve algo que já vi acontecer. Ideias de quadro branco ficam no quadro.' },
                  { num: '02', title: 'Disposto a pagar', desc: 'O cliente precisa estar disposto a trocar dinheiro pela solução. Interesse não é validação.' },
                  { num: '03', title: 'Mínimo primeiro', desc: 'O produto mais simples possível que entrega o valor central. Tudo mais é ruído no começo.' },
                ].map(({ num, title, desc }) => (
                  <div key={num}>
                    <span className="text-5xl font-black text-zinc-800 leading-none block mb-3">{num}</span>
                    <h3 className="font-semibold text-zinc-200 mb-2">{title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-20">
        <div className="container-max text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-zinc-50 mb-4">Quer entender como funciona por dentro?</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Documento cada etapa de construção no blog. Da ideia ao produto, sem romantizar.
            </p>
            <Link to="/blog" className="btn-primary">
              Ir para o blog <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
