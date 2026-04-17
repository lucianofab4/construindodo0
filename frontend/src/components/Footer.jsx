import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { href: '/sobre',    label: 'Sobre' },
  { href: '/blog',     label: 'Blog' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/contato',  label: 'Contato' },
];

const socialLinks = [
  { href: 'https://www.linkedin.com/in/luciano-dias-59929ab3/', icon: Linkedin,  label: 'LinkedIn' },
  { href: 'https://instagram.com/luciano.di',                   icon: Instagram, label: 'Instagram' },
  { href: 'mailto:luciano.dias@nacionalsign.com',               icon: Mail,      label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-bold text-xl tracking-tight text-zinc-50 hover:text-brand transition-colors">
              Luciano Dias
            </Link>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs">
              Empresário. Fundador da NacionalSign. Documentando a jornada real de construir do zero.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 text-zinc-500 hover:text-zinc-50 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 rounded-lg transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-600 mb-4">Navegação</p>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-zinc-600 mb-4">Projetos</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://nacionalsign.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-50 transition-colors duration-200"
                >
                  NacionalSign <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <Link
                  to="/projetos"
                  className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors duration-200"
                >
                  Ver todos os projetos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Luciano Dias. Todos os direitos reservados.
          </p>
          <p className="text-xs text-zinc-600">
            Construído do zero. Como tudo que vale a pena.
          </p>
        </div>
      </div>
    </footer>
  );
}
