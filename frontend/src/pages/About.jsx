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
                  <div className="w-full aspect-[4/5] rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-end overflow-hidden relative">
                    <img
                      src="/foto.jpeg"
                      alt="Luciano Dias"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
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
                      <p className="text-2xl font-black text-zinc-50">6</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Empresas em construção</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Texto */}
            <div className="space-y-10">

              {/* Bloco 1 — Abertura honesta */}
              <Reveal>
                <p className="text-2xl md:text-3xl font-black text-zinc-50 leading-snug">
                  Eu não sou guru.<br />
                  <span className="text-zinc-400 font-normal text-xl">E não tenho uma história perfeita.</span>
                </p>
              </Reveal>

              {/* Bloco 2 — O caminho padrão */}
              <Reveal delay={80}>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  Durante anos, segui o caminho padrão: estudar, trabalhar, buscar estabilidade… CLT.
                </p>
              </Reveal>

              {/* Bloco 3 — O incômodo */}
              <Reveal delay={140}>
                <div className="border-l-2 border-brand/50 pl-5 space-y-3">
                  <p className="text-zinc-300 leading-relaxed">
                    Mas, ao mesmo tempo, sempre existiu algo dentro de mim.
                  </p>
                  <p className="text-zinc-300 font-semibold">Um incômodo.</p>
                  <p className="text-zinc-300 leading-relaxed">
                    Uma vontade de construir algo que fosse realmente meu. Que gerasse valor de verdade.
                    Que ajudasse pessoas. Que fizesse diferença — para um CNPJ, para um CPF… para alguém.
                  </p>
                </div>
              </Reveal>

              {/* Bloco 4 — Por muito tempo ficou só como pensamento */}
              <Reveal delay={180}>
                <p className="text-zinc-500 leading-relaxed">
                  E por muito tempo, isso ficou só como um pensamento.
                  Porque a verdade é que não é fácil tomar essa decisão.
                  Sair do caminho "seguro" exige coragem.
                </p>
              </Reveal>

              {/* Bloco 5 — Honestidade brutal */}
              <Reveal delay={220}>
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 space-y-2">
                  <p className="text-zinc-300 font-semibold text-lg leading-snug">
                    E sendo bem direto… ainda é difícil. Todos os dias.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Mas é uma das decisões que mais me dá orgulho.
                  </p>
                </div>
              </Reveal>

              {/* Bloco 6 — Gratidão / nada foi perdido */}
              <Reveal delay={260}>
                <p className="text-zinc-400 leading-relaxed">
                  Cada escolha que eu fiz até aqui, cada lugar por onde passei, cada empresa em que trabalhei —
                  tudo contribuiu para o que estou vivendo hoje.{' '}
                  <span className="text-zinc-200 font-medium">Nada foi perdido. Tudo me preparou — mesmo quando eu não percebia.</span>
                </p>
              </Reveal>

              {/* Bloco 7 — O ponto de virada */}
              <Reveal delay={300}>
                <p className="text-zinc-400 leading-relaxed">
                  Mas chegou um momento em que continuar no mesmo caminho deixou de fazer sentido.
                  Eu queria mais controle sobre a minha vida. Sobre minhas decisões.
                  Sobre o que eu estava construindo.
                </p>
              </Reveal>

              {/* Bloco 8 — O salto */}
              <Reveal delay={340}>
                <div className="rounded-xl bg-brand/5 border border-brand/20 p-6 space-y-4">
                  <p className="text-zinc-200 font-bold text-lg leading-snug">
                    Então eu fiz o que muita gente pensa, mas poucos fazem.
                  </p>
                  <div className="space-y-1 text-zinc-500 text-sm">
                    <p>Sem garantia.</p>
                    <p>Sem segurança.</p>
                    <p>Sem saber exatamente como seria.</p>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    E sim… no começo (e ainda agora), é mais difícil do que parece.
                    Pressão. Dúvida. Insegurança — tudo ao mesmo tempo.
                  </p>
                  <p className="text-zinc-200 font-semibold">
                    Empreender não é liberdade imediata.<br />É responsabilidade imediata.
                  </p>
                </div>
              </Reveal>

              {/* Bloco 9 — Hoje */}
              <Reveal delay={380}>
                <p className="text-zinc-400 leading-relaxed">
                  Hoje estou no início do processo. Construindo uma empresa de tecnologia, desenvolvendo novos
                  produtos e aprendendo todos os dias — muitas vezes errando mais do que acertando.
                  É cedo para certezas.
                </p>
              </Reveal>

              {/* Bloco 10 — A única certeza */}
              <Reveal delay={420}>
                <div className="space-y-2">
                  <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Mas existe uma que eu tenho:</p>
                  <p className="text-3xl font-black text-zinc-50 leading-tight">
                    Agora, não tem mais volta.
                  </p>
                  <p className="text-zinc-400 leading-relaxed pt-1">
                    E, apesar de tudo, eu estou animado. Com vontade. Com fome de fazer dar certo.
                    Porque, pela primeira vez, eu sinto que estou vivendo de verdade.
                  </p>
                </div>
              </Reveal>

              {/* Bloco 11 — Por que documentar */}
              <Reveal delay={460}>
                <div className="border-t border-zinc-800 pt-8 space-y-3">
                  <p className="text-zinc-300 font-semibold">Foi por isso que eu decidi documentar essa jornada.</p>
                  <div className="space-y-1 text-zinc-500 text-sm">
                    <p>Sem romantizar.</p>
                    <p>Sem promessas irreais.</p>
                    <p>Sem vender um caminho fácil.</p>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    Só mostrando o jogo como ele realmente é.
                  </p>
                </div>
              </Reveal>

              {/* Bloco 12 — CTA emocional */}
              <Reveal delay={500}>
                <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 space-y-3">
                  <p className="text-zinc-200 font-semibold leading-relaxed">
                    Se você também sente que pode mais…<br />
                    que quer construir algo…<br />
                    ou simplesmente sair do automático…
                  </p>
                  <p className="text-brand font-bold text-lg">
                    Talvez essa jornada faça sentido pra você também.
                  </p>
                </div>
              </Reveal>

              {/* Botões */}
              <Reveal delay={540}>
                <div className="flex gap-3 pt-2">
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
