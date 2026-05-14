'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Logo } from '@/components/Logo';

// Моки соответствуют профилю в дашборде (Иван Петров).
const MOCK_EMAIL = 'petrov.iv@sfu-kras.ru';
const MOCK_PASSWORD = 'Demo12345';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(MOCK_EMAIL);
  const [password, setPassword] = useState(MOCK_PASSWORD);
  const [remember, setRemember] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Похоже, email некорректный'); return; }
    if (password.length < 6) { setError('Пароль слишком короткий'); return; }
    setSubmitting(true);
    setTimeout(() => router.push('/dashboard'), 600);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 30% 20%, rgba(79,127,255,0.18), transparent 50%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(155,92,255,0.18), transparent 50%)' }} />

      <div style={{ position: 'relative', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}><Logo/></Link>
        <Link href="/register" style={{ fontSize: 13, color: 'var(--fg-3)' }}>Нет аккаунта? Создать →</Link>
      </div>

      <div style={{ position: 'relative', maxWidth: 460, margin: '40px auto 64px', padding: '0 24px' }}>
        <div className="card" style={{ padding: 36 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.1em', marginBottom: 12 }}>ВХОД</div>
          <h2 className="h2" style={{ margin: 0, marginBottom: 8 }}>С возвращением</h2>
          <p style={{ fontSize: 14, color: 'var(--fg-3)', marginBottom: 24 }}>
            Войди в свой Вектор — продолжим с того места, где остановились.
          </p>

          <form onSubmit={onSubmit} className="col gap-4">
            <div className="col" style={{ gap: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-4)' }}>Email</div>
              <input
                className="input"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ height: 48 }}
              />
            </div>

            <div className="col" style={{ gap: 6 }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-4)' }}>Пароль</div>
                <a href="#" style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Забыли?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  className="input"
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ height: 48, paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(s => !s)}
                  aria-label={showPwd ? 'Скрыть пароль' : 'Показать пароль'}
                  style={{
                    position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
                    width: 36, height: 36, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--fg-4)',
                  }}
                >
                  {showPwd ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 2l20 20M6.7 6.7C4.5 8.2 2.7 10.4 2 12c1.7 4 6 7 10 7 1.9 0 3.7-.6 5.2-1.6M11 5.1c.3 0 .7-.1 1-.1 4 0 8.3 3 10 7-.5 1.2-1.4 2.4-2.5 3.5"/><path d="M9 9.6A3 3 0 0 0 14.4 15"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12c1.7-4 6-7 10-7s8.3 3 10 7c-1.7 4-6 7-10 7s-8.3-3-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ fontSize: 13, color: 'var(--red)', padding: '8px 12px', borderRadius: 8, background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
                {error}
              </div>
            )}

            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--fg-2)' }}>
              <span style={{
                width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                border: '1px solid ' + (remember ? 'var(--violet)' : 'var(--border-strong)'),
                background: remember ? 'var(--grad)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .15s',
              }}>
                {remember && <svg width="11" height="11" viewBox="0 0 24 24" stroke="white" strokeWidth="3" fill="none"><path d="m5 12 5 5L20 7"/></svg>}
              </span>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              Запомнить меня на этом устройстве
            </label>

            <button type="submit" className="btn btn-primary" disabled={submitting}
              style={{ justifyContent: 'center', height: 48, fontSize: 15, opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Входим…' : 'Войти'} →
            </button>
          </form>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--fg-4)', textAlign: 'center', lineHeight: 1.5 }}>
          🛈 Бэкэнд ещё не подключён — поля заполнены моками демо-аккаунта.<br/>
          Любой ввод просто откроет дашборд.
        </div>
      </div>
    </div>
  );
}
