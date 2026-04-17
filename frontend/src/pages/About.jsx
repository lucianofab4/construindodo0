import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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

const milestones = [
  {
    year: 'Anos no CLT',
    title: 'Trocando horas por salário',
    desc: 'Entregando o que mandavam. Esperando reconhecimento que raramente vinha. Construindo sonhos de outros enquanto os meus esperavam.',
    tone: 'muted',
  },
  {
    year: 'Jan/2026',
    title: 'A decisão',
    desc: 'Não foi um momento épico. Foi o cansaço acumulado de saber que era capaz de mais. Pedi demissão sem ter nada estruturado. Sabia que o risco de ficar era maior do que o risco de sair.',
    tone: 'default',
  },
  {
    year: '2026',
    title: 'Os primeiros meses',
    desc: 'Dificuldade financeira real. Incerteza constante. Erros que custaram tempo e dinheiro. Aprendi mais nesses meses do que em anos de CLT.',
    tone: 'default',
  },
  {
    year: '2026',
    title: 'NacionalSign',
    desc: 'Identifiquei o problema, validei com clientes reais e construí o produto. SaaS de assinatura digital. Da ideia ao primeiro pagamento recorrente.',
    tone: 'brand',
  },
  {
    year: 'Hoje',
    title: 'Construção contínua',
    desc: 'Produto evoluindo. Novos projetos em validação. Documentando tudo aqui — porque a jornada não termina, ela muda de fase.',
    tone: 'brand',
  },
];

export default function About() {
  return (
    <>
      {/* ───── Header ───── */}
      <section className="section-padding pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand/[0.05] blur-[120px] pointer-events-none" />
        <div className="container-max">
          <Reveal>
            <span className="section-label">Sobre</span>
            <h1 className="text-5xl md:text-6xl font-black text-zinc-50 mt-6 leading-[1.1] tracking-tight max-w-2xl">
              Eu não romantizo<br />o empreendedorismo.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xl text-zinc-400 leading-relaxed mt-6 max-w-xl">
              A maioria das histórias de empreendedorismo começa com a vitória. A minha começa com o cansaço.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      {/* ───── Texto principal ───── */}
      <section className="section-padding py-20">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Foto + card */}
            <Reveal>
              <div className="sticky top-24">
                <div className="relative">
                  {/* Photo */}
                  <div className="w-full aspect-[4/5] rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-end overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <div className="w-24 h-24 rounded-full bg-zinc-800 mb-3 flex items-center justify-center">
                        <span className="text-4xl font-black text-zinc-600">LD</span>
                      </div>
                      <p className="text-xs text-zinc-700 mt-2">Substituir por foto</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
                    <div className="relative z-20 p-6 w-full">
                      <p className="font-bold text-zinc-50 text-xl">Luciano Dias</p>
                      <p className="text-zinc-500 text-sm">Fundador · NacionalSign</p>
                    </div>
                  </div>

                  {/* Info card */}
                  <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-black text-zinc-50">Jan/26</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Saiu do CLT</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-zinc-50">2026</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Começo da jornada</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-zinc-50">1</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Empresa fundada</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-zinc-50">2+</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Produtos em build</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Texto */}
            <div className="space-y-8">
              <Reveal>
                <p className="text-2xl font-semibold text-zinc-200 leading-relaxed">
                  "Por anos eu trocava horas por salário. Fazia o que mandavam, entregava o que pediam
                  e esperava que alguém reconhecesse meu trabalho."
                </p>
              </Reveal>

              <Reveal delay={100}>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  A decisão de sair do CLT não veio de um momento épico. Veio do cansaço. Do cansaço de construir
                  sonhos de outros enquanto os meus ficavam esperando o "momento certo".
                </p>
              </Reveal>

              <Reveal delay={150}>
                <p className="text-zinc-400 leading-relaxed">
                  Em janeiro de 2026 pedi demissão. Sem produto pronto. Sem cliente garantido. Só com a clareza
                  de que continuar seria mais arriscado do que tentar. Os primeiros meses foram difíceis —
                  financeiramente e emocionalmente. Mas foram também os mais honestos da minha vida profissional.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-zinc-400 leading-relaxed">
                  Identifiquei um problema real no mercado de documentação digital, validei com clientes antes de
                  escrever uma linha de código e construí a NacionalSign — um SaaS de assinatura digital.
                  Da ideia ao primeiro pagamento recorrente, documentei cada passo.
                </p>
              </Reveal>

              <Reveal delay={250}>
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                  <p className="text-zinc-300 leading-relaxed font-medium">
                    "Hoje dirijo a NacionalSign, estou construindo outros produtos e documenting tudo aqui — não
                    para inspirar, mas para mostrar o jogo real. Porque a versão glamourizada do empreendedorismo
                    não ajuda ninguém."
                  </p>
                  <p className="text-zinc-600 text-sm mt-3">— Luciano Dias</p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <p className="text-zinc-400 leading-relaxed">
                  Se você está pensando em empreender, já está no jogo ou só quer entender como funciona por dentro —
                  este é o lugar certo. Sem filtro, sem fórmula mágica. Só trabalho real.
                </p>
              </Reveal>

              <Reveal delay={350}>
                <div className="flex gap-3 pt-4">
                  <Link to="/projetos" className="btn-primary">
                    Ver meus projetos <ArrowRight size={15} />
                  </Link>
                  <Link to="/blog" className="btn-ghost">
                    Ler o blog
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ───── Timeline ───── */}
      <section className="section-padding py-24">
        <div className="container-max">
          <Reveal>
            <span className="section-label">A jornada</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mt-4 mb-16">
              Cada fase teve seu preço.
            </h2>
          </Reveal>

          <div className="relative pl-8 md:pl-0">
            {/* Vertical line */}
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 md:-translate-x-px" />

            <div className="space-y-12">
              {milestones.map(({ year, title, desc, tone }, i) => (
                <Reveal key={year} delay={i * 80}>
                  <div className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? '' : 'md:dir-rtl'}`}>
                    {/* Dot */}
                    <div className={`absolute left-0 md:left-1/2 top-1.5 w-3 h-3 rounded-full -translate-x-[5.5px] md:-translate-x-1.5 border-2 ${
                      tone === 'brand' ? 'bg-brand border-brand/50' :
                      tone === 'muted' ? 'bg-zinc-700 border-zinc-600' :
                      'bg-zinc-500 border-zinc-400'
                    }`} />

                    {/* Content */}
                    <div className={i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}>
                      <span className={`text-xs font-bold tracking-widest uppercase ${
                        tone === 'brand' ? 'text-brand' : 'text-zinc-600'
                      }`}>{year}</span>
                      <h3 className="font-bold text-zinc-100 text-lg mt-1 mb-2">{title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
                    </div>
                    {/* Spacer for alternating layout */}
                    {i % 2 !== 0 && <div className="hidden md:block md:col-start-1 md:row-start-1" />}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── CTA Final ───── */}
      <section className="section-padding py-24">
        <div className="container-max text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mb-4">
              Quer acompanhar a jornada?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Receba os bastidores reais — sem filtro, sem guru. Só o que está acontecendo de verdade.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contato" className="btn-primary">
                Falar comigo <ArrowRight size={15} />
              </Link>
              <Link to="/blog" className="btn-ghost">
                Ler o blog
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
