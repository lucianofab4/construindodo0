import { useState, useEffect } from 'react';
import {
  Users, Mail, MessageSquare, Send, LogOut,
  RefreshCw, ChevronDown, ChevronUp, CheckSquare, Square,
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '';

export default function Admin() {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const [tokenInput, setTokenInput]   = useState('');
  const [token, setToken]             = useState('');
  const [authed, setAuthed]           = useState(false);
  const [loginError, setLoginError]   = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // ── Data ──────────────────────────────────────────────────────────────────
  const [subscribers, setSubscribers] = useState([]);
  const [contacts, setContacts]       = useState([]);
  const [loading, setLoading]         = useState(false);

  // ── UI ────────────────────────────────────────────────────────────────────
  const [tab, setTab]                     = useState('subscribers');
  const [selected, setSelected]           = useState(new Set());
  const [expandedContact, setExpandedContact] = useState(null);

  // ── Email compose ─────────────────────────────────────────────────────────
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody]       = useState('');
  const [sending, setSending]           = useState(false);
  const [sendResult, setSendResult]     = useState(null);

  // ── Auto-login from localStorage ─────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('admin_token');
    if (saved) tryLogin(saved, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function tryLogin(t, silent = false) {
    if (!silent) setLoginLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/subscribers?token=${encodeURIComponent(t)}`);
      if (res.ok) {
        const data = await res.json();
        setToken(t);
        setSubscribers(data.subscribers || []);
        setAuthed(true);
        localStorage.setItem('admin_token', t);
        fetchContacts(t);
      } else {
        localStorage.removeItem('admin_token');
        if (!silent) setLoginError('Token inválido. Verifique e tente novamente.');
      }
    } catch {
      if (!silent) setLoginError('Erro ao conectar ao servidor.');
    }
    if (!silent) setLoginLoading(false);
  }

  async function fetchContacts(t) {
    try {
      const res = await fetch(`${API}/api/admin/contacts?token=${encodeURIComponent(t)}`);
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts || []);
      }
    } catch {}
  }

  async function refresh() {
    setLoading(true);
    try {
      const [sRes, cRes] = await Promise.all([
        fetch(`${API}/api/admin/subscribers?token=${encodeURIComponent(token)}`),
        fetch(`${API}/api/admin/contacts?token=${encodeURIComponent(token)}`),
      ]);
      if (sRes.ok) { const d = await sRes.json(); setSubscribers(d.subscribers || []); }
      if (cRes.ok) { const d = await cRes.json(); setContacts(d.contacts || []); }
    } catch {}
    setLoading(false);
  }

  function logout() {
    localStorage.removeItem('admin_token');
    setToken(''); setAuthed(false);
    setSubscribers([]); setContacts([]);
    setSelected(new Set()); setSendResult(null);
  }

  // ── Selection helpers ─────────────────────────────────────────────────────
  function toggleSelect(email) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(email) ? next.delete(email) : next.add(email);
      return next;
    });
  }

  function toggleAll() {
    setSelected(
      selected.size === subscribers.length
        ? new Set()
        : new Set(subscribers.map(s => s.email))
    );
  }

  // ── Send email ────────────────────────────────────────────────────────────
  async function sendEmails() {
    if (!emailSubject.trim() || !emailBody.trim()) return;
    const targets = selected.size > 0
      ? [...selected]
      : subscribers.map(s => s.email);

    if (targets.length === 0) {
      setSendResult({ error: 'Nenhum destinatário selecionado.' });
      return;
    }

    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch(
        `${API}/api/admin/send-email?token=${encodeURIComponent(token)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emails: targets, subject: emailSubject, body: emailBody }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setSendResult({ error: err.detail || `Erro ${res.status} — verifique se o backend foi atualizado (git push).` });
        setSending(false);
        return;
      }
      const d = await res.json();
      setSendResult(d);
      if (!d.error && d.success > 0) {
        setEmailSubject('');
        setEmailBody('');
      }
    } catch {
      setSendResult({ error: 'Erro ao conectar ao servidor.' });
    }
    setSending(false);
  }

  // ── Derived values ────────────────────────────────────────────────────────
  const allSelected    = subscribers.length > 0 && selected.size === subscribers.length;
  const sendTargetCount = selected.size > 0 ? selected.size : subscribers.length;

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN SCREEN
  // ═══════════════════════════════════════════════════════════════════════════
  if (!authed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 mb-4">
              <Mail size={24} className="text-brand" />
            </div>
            <h1 className="text-2xl font-black text-zinc-50">Painel Admin</h1>
            <p className="text-zinc-500 text-sm mt-1">construindodo0</p>
          </div>

          {/* Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-xs text-zinc-500 font-medium mb-1.5 uppercase tracking-wider">
                Token de acesso
              </label>
              <input
                type="password"
                value={tokenInput}
                onChange={e => { setTokenInput(e.target.value); setLoginError(''); }}
                onKeyDown={e => e.key === 'Enter' && tryLogin(tokenInput)}
                placeholder="••••••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3
                           text-zinc-100 placeholder-zinc-600 text-sm
                           focus:outline-none focus:border-brand transition-colors"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-xs bg-red-950/30 border border-red-800/50 rounded-lg px-3 py-2">
                {loginError}
              </p>
            )}

            <button
              onClick={() => tryLogin(tokenInput)}
              disabled={!tokenInput.trim() || loginLoading}
              className="w-full bg-brand hover:bg-brand/90 text-white font-semibold
                         py-3 rounded-xl text-sm transition-colors disabled:opacity-50
                         flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <><RefreshCw size={14} className="animate-spin" /> Verificando...</>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ADMIN PANEL
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <div className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-black text-zinc-50 text-lg">Admin</span>
            <span className="text-zinc-700 select-none">·</span>
            <span className="text-zinc-500 text-sm">construindodo0</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              title="Atualizar dados"
              className="text-zinc-500 hover:text-zinc-300 transition-colors p-1.5 rounded-lg hover:bg-zinc-800"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors text-sm px-2 py-1.5 rounded-lg hover:bg-zinc-800"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex">
            {[
              { id: 'subscribers', label: 'Inscritos',     icon: Users,          count: subscribers.length },
              { id: 'contacts',    label: 'Mensagens',     icon: MessageSquare,  count: contacts.length },
              { id: 'email',       label: 'Enviar Email',  icon: Send,           count: null },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.id
                    ? 'border-brand text-zinc-50'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <t.icon size={15} />
                {t.label}
                {t.count !== null && (
                  <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${
                    tab === t.id ? 'bg-brand/20 text-brand' : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ══ SUBSCRIBERS ══════════════════════════════════════════════════ */}
        {tab === 'subscribers' && (
          <div>
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <h2 className="text-xl font-bold text-zinc-50">Inscritos</h2>
                <p className="text-zinc-500 text-sm mt-0.5">
                  {subscribers.length} pessoa{subscribers.length !== 1 ? 's' : ''} inscrita{subscribers.length !== 1 ? 's' : ''}
                </p>
              </div>
              {selected.size > 0 && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm text-zinc-400">
                    {selected.size} selecionado{selected.size !== 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => setTab('email')}
                    className="bg-brand hover:bg-brand/90 text-white text-sm font-medium
                               px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Send size={13} /> Enviar email
                  </button>
                  <button
                    onClick={() => setSelected(new Set())}
                    className="text-zinc-500 hover:text-zinc-300 text-sm px-2 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    Limpar
                  </button>
                </div>
              )}
            </div>

            {subscribers.length === 0 ? (
              <div className="text-center py-20 text-zinc-600">
                <Users size={32} className="mx-auto mb-3 opacity-30" />
                <p>Nenhum inscrito ainda.</p>
              </div>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="py-3 px-4 text-left w-12">
                        <button
                          onClick={toggleAll}
                          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          {allSelected
                            ? <CheckSquare size={16} className="text-brand" />
                            : <Square size={16} />
                          }
                        </button>
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub, i) => (
                      <tr
                        key={sub.email}
                        onClick={() => toggleSelect(sub.email)}
                        className={`border-b border-zinc-800/60 hover:bg-zinc-800/40 transition-colors cursor-pointer
                          ${i === subscribers.length - 1 ? 'border-b-0' : ''}
                          ${selected.has(sub.email) ? 'bg-brand/5' : ''}`}
                      >
                        <td className="py-3 px-4">
                          {selected.has(sub.email)
                            ? <CheckSquare size={16} className="text-brand" />
                            : <Square size={16} className="text-zinc-600" />
                          }
                        </td>
                        <td className="py-3 px-4 text-sm text-zinc-200">{sub.email}</td>
                        <td className="py-3 px-4 text-sm text-zinc-500">{sub.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer with select-all helper */}
                <div className="border-t border-zinc-800 px-4 py-2.5 flex items-center justify-between">
                  <span className="text-xs text-zinc-600">
                    {selected.size > 0
                      ? `${selected.size} de ${subscribers.length} selecionados`
                      : `Clique nas linhas para selecionar`}
                  </span>
                  {selected.size > 0 && (
                    <button
                      onClick={() => { setTab('email'); }}
                      className="text-xs text-brand hover:text-brand/80 font-medium transition-colors flex items-center gap-1"
                    >
                      <Send size={11} /> Enviar para selecionados
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ CONTACTS ═════════════════════════════════════════════════════ */}
        {tab === 'contacts' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-zinc-50">Mensagens de Contato</h2>
              <p className="text-zinc-500 text-sm mt-0.5">
                {contacts.length} mensagem{contacts.length !== 1 ? 's' : ''} recebida{contacts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {contacts.length === 0 ? (
              <div className="text-center py-20 text-zinc-600">
                <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
                <p>Nenhuma mensagem ainda.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.map(c => (
                  <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <button
                      className="w-full p-5 text-left flex items-start justify-between gap-4
                                 hover:bg-zinc-800/40 transition-colors"
                      onClick={() => setExpandedContact(expandedContact === c.id ? null : c.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-zinc-100 text-sm">{c.name}</span>
                          <span className="text-zinc-600 text-xs">{c.data}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-zinc-500 text-xs">{c.email}</span>
                          {c.subject && (
                            <>
                              <span className="text-zinc-700">·</span>
                              <span className="text-zinc-400 text-xs truncate max-w-xs">{c.subject}</span>
                            </>
                          )}
                        </div>
                        {expandedContact !== c.id && (
                          <p className="text-zinc-500 text-sm mt-2 line-clamp-1">{c.message}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0 text-zinc-600 mt-0.5">
                        {expandedContact === c.id
                          ? <ChevronUp size={16} />
                          : <ChevronDown size={16} />
                        }
                      </div>
                    </button>

                    {expandedContact === c.id && (
                      <div className="px-5 pb-5 border-t border-zinc-800">
                        <p className="text-zinc-300 text-sm leading-relaxed mt-4 whitespace-pre-wrap">
                          {c.message}
                        </p>
                        <a
                          href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject || 'Seu contato')}`}
                          className="mt-4 inline-flex items-center gap-1.5 text-brand text-sm
                                     font-medium hover:text-brand/80 transition-colors"
                        >
                          <Mail size={13} /> Responder por email
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ SEND EMAIL ═══════════════════════════════════════════════════ */}
        {tab === 'email' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-zinc-50">Enviar Email</h2>
              <p className="text-zinc-500 text-sm mt-0.5">
                {selected.size > 0
                  ? `Enviando para ${selected.size} inscrito${selected.size !== 1 ? 's' : ''} selecionado${selected.size !== 1 ? 's' : ''}`
                  : `Enviando para todos os ${subscribers.length} inscrito${subscribers.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>

            {/* Selected recipients */}
            {selected.size > 0 && (
              <div className="mb-5 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                    Destinatários ({selected.size})
                  </span>
                  <button
                    onClick={() => setSelected(new Set())}
                    className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    Remover seleção → enviar para todos
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...selected].map(email => (
                    <span
                      key={email}
                      className="flex items-center gap-1 bg-zinc-800 text-zinc-300 text-xs
                                 px-2.5 py-1 rounded-full border border-zinc-700"
                    >
                      {email}
                      <button
                        onClick={() => toggleSelect(email)}
                        className="text-zinc-500 hover:text-zinc-200 ml-0.5 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {subscribers.length === 0 && (
              <div className="mb-5 bg-yellow-950/30 border border-yellow-800/50 rounded-xl p-4 text-yellow-300 text-sm">
                Nenhum inscrito cadastrado ainda.
              </div>
            )}

            <div className="space-y-4">
              {/* Subject */}
              <div>
                <label className="block text-xs text-zinc-500 font-semibold mb-1.5 uppercase tracking-wider">
                  Assunto
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  placeholder="Ex: Uma novidade para você"
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand
                             rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600
                             focus:outline-none text-sm transition-colors"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-xs text-zinc-500 font-semibold mb-1.5 uppercase tracking-wider">
                  Mensagem
                </label>
                <textarea
                  value={emailBody}
                  onChange={e => setEmailBody(e.target.value)}
                  placeholder="Escreva sua mensagem aqui..."
                  rows={12}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand
                             rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600
                             focus:outline-none text-sm transition-colors resize-none"
                />
                <p className="text-xs text-zinc-600 mt-1.5">
                  Quebras de linha são preservadas no email enviado.
                </p>
              </div>

              {/* Result feedback */}
              {sendResult && (
                <div className={`rounded-xl p-4 text-sm flex items-start gap-2 ${
                  sendResult.error
                    ? 'bg-red-950/30 border border-red-800/50 text-red-300'
                    : 'bg-green-950/30 border border-green-800/50 text-green-300'
                }`}>
                  {sendResult.error
                    ? `Erro: ${sendResult.error}`
                    : `✓ Email enviado com sucesso para ${sendResult.success} pessoa${sendResult.success !== 1 ? 's' : ''}${sendResult.failed > 0 ? ` · ${sendResult.failed} falha${sendResult.failed !== 1 ? 's' : ''}` : ''}`
                  }
                </div>
              )}

              {/* Send button */}
              <button
                onClick={sendEmails}
                disabled={!emailSubject.trim() || !emailBody.trim() || sending || subscribers.length === 0}
                className="w-full bg-brand hover:bg-brand/90 text-white font-semibold
                           py-3.5 rounded-xl text-sm transition-colors disabled:opacity-50
                           flex items-center justify-center gap-2"
              >
                <Send size={15} />
                {sending
                  ? 'Enviando...'
                  : `Enviar para ${sendTargetCount} pessoa${sendTargetCount !== 1 ? 's' : ''}`
                }
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
