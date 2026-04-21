import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';

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

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const allPosts = [
  {
    slug: 'ninguem-fala-sobre-isso-quando-voce-decide-empreender',
    title: 'Ninguém fala sobre isso quando você decide empreender',
    excerpt: 'Por muito tempo, parece um vírus. Uma cola invisível que te faz aceitar o caminho padrão, a rotina, o "tá bom assim". Mas ignorar o incômodo tem um preço.',
    category: 'Empreendedorismo',
    date: '17 Abr 2026',
    readTime: '6',
    featured: true,
  },
  {
    slug: 'a-maior-mentira-sobre-sair-do-clt',
    title: 'A maior mentira sobre sair do CLT',
    excerpt: 'Todo mundo vende a ideia de que largar o crachá é sinônimo de liberdade total. A realidade é outra — e ninguém te prepara para ela.',
    category: 'Empreendedorismo',
    date: '19 Abr 2026',
    readTime: '7',
    featured: false,
  },
  {
    slug: 'o-dia-que-decidi-sair-do-clt',
    title: 'O dia que decidi sair do CLT',
    excerpt: 'Não foi uma decisão heroica. Foi o acúmulo de frustração com anos construindo sonhos de outros. Aqui está o que realmente aconteceu.',
    category: 'Empreendedorismo',
    date: '12 Abr 2025',
    readTime: '5',
    featured: false,
  },
  {
    slug: 'como-valido-ideias-sem-gastar-nada',
    title: 'Como valido ideias sem gastar nada',
    excerpt: 'O erro mais comum de quem começa: gastar meses construindo algo que ninguém pediu. Meu processo de validação antes de escrever uma linha de código.',
    category: 'Construção',
    date: '28 Mar 2025',
    readTime: '7',
    featured: false,
  },
  {
    slug: 'o-que-aprendi-no-primeiro-ano',
    title: 'O que aprendi no primeiro ano empreendendo',
    excerpt: 'Um ano de pressão, decisões erradas, pivôs e uma lição que nenhum curso vai te ensinar.',
    category: 'Empreendedorismo',
    date: '15 Mar 2025',
    readTime: '9',
    featured: false,
  },
  {
    slug: 'construindo-equipe-sem-dinheiro',
    title: 'Construindo uma equipe sem dinheiro',
    excerpt: 'Como atrair pessoas boas quando você não pode pagar os melhores salários do mercado. O que funciona de verdade.',
    category: 'Liderança',
    date: '02 Mar 2025',
    readTime: '6',
    featured: false,
  },
  {
    slug: 'network-de-verdade',
    title: 'Network de verdade: o que ninguém te conta',
    excerpt: 'Participar de eventos e trocar cartão não é network. O que realmente constrói uma rede que gera oportunidades.',
    category: 'Network',
    date: '18 Fev 2025',
    readTime: '8',
    featured: false,
  },
  {
    slug: 'da-ideia-ao-primeiro-cliente',
    title: 'Da ideia ao primeiro cliente: o caminho real',
    excerpt: 'Como saí de uma ideia vaga para o primeiro pagamento recorrente na NacionalSign. Sem romantizar nenhuma etapa.',
    category: 'Construção',
    date: '05 Fev 2025',
    readTime: '11',
    featured: false,
  },
];

const categories = ['Todos', 'Empreendedorismo', 'Construção', 'Liderança', 'Network'];

const categoryColors = {
  Empreendedorismo: 'text-brand bg-brand/8 border-brand/20',
  Construção: 'text-violet-400 bg-violet-400/8 border-violet-400/20',
  Liderança: 'text-sky-400 bg-sky-400/8 border-sky-400/20',
  Network: 'text-emerald-400 bg-emerald-400/8 border-emerald-400/20',
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filtered = activeCategory === 'Todos'
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory);

  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p !== featured);

  return (
    <>
      {/* Header */}
      <section className="section-padding pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-brand/[0.04] blur-[100px] pointer-events-none rounded-full" />
        <div className="container-max">
          <Reveal>
            <span className="section-label">Blog</span>
            <h1 className="text-5xl md:text-6xl font-black text-zinc-50 mt-6 leading-[1.08] tracking-tight">
              Escrito na trincheira.
            </h1>
            <p className="text-xl text-zinc-400 mt-4 max-w-xl leading-relaxed">
              Artigos sobre empreendedorismo real, construção de produtos, liderança e o que aprendo no dia a dia.
            </p>
          </Reveal>

          {/* Category filter */}
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-2 mt-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-brand text-white border-brand shadow-lg shadow-brand/20'
                      : 'text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padding py-20">
        <div className="container-max">
          {featured && (
            <>
              {/* Featured post */}
              <Reveal>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group block card p-8 md:p-10 mb-12 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 max-w-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[featured.category] || 'text-zinc-400 bg-zinc-800 border-zinc-700'}`}>
                          {featured.category}
                        </span>
                        <span className="text-xs text-zinc-600">Destaque</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-zinc-50 group-hover:text-zinc-100 mb-3 leading-tight transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-zinc-500 leading-relaxed mb-4">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-zinc-600">
                        <span>{featured.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {featured.readTime} min</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                        <ChevronRight size={18} className="text-brand group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>

              {/* Rest of posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post, i) => (
                  <Reveal key={post.slug} delay={i * 70}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group card p-6 flex flex-col h-full"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[post.category] || 'text-zinc-400 bg-zinc-800 border-zinc-700'}`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-zinc-600 flex items-center gap-1">
                          <Clock size={11} /> {post.readTime} min
                        </span>
                      </div>
                      <h3 className="font-semibold text-zinc-100 group-hover:text-zinc-50 mb-2 leading-snug text-lg transition-colors flex-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/60">
                        <span className="text-xs text-zinc-600">{post.date}</span>
                        <span className="text-xs text-brand font-medium group-hover:text-brand-light transition-colors">
                          Ler artigo →
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500">Nenhum artigo nesta categoria ainda.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
