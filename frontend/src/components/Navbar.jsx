import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/',          label: 'Início' },
  { href: '/sobre',     label: 'Sobre' },
  { href: '/blog',      label: 'Blog' },
  { href: '/projetos',  label: 'Projetos' },
  { href: '/contato',   label: 'Contato' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled,    setScrolled]   = useState(false);
  const [menuOpen,    setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 shadow-xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-lg tracking-tight text-zinc-50 hover:text-brand transition-colors duration-200"
        >
          Luciano Dias
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  to={href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-zinc-50 bg-zinc-800/60'
                      : 'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/40'
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Desktop */}
        <Link
          to="/contato"
          className="hidden md:inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-brand/25"
        >
          Falar comigo
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-50 transition-colors"
          aria-label="Menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 px-6 pb-6 pt-2 flex flex-col gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active
                    ? 'text-zinc-50 bg-zinc-800'
                    : 'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            to="/contato"
            className="mt-2 text-center bg-brand hover:bg-brand-dark text-white text-sm font-medium px-4 py-3 rounded-lg transition-all duration-200"
          >
            Falar comigo
          </Link>
        </div>
      </div>
    </header>
  );
}
