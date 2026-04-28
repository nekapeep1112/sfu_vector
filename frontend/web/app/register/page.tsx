'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Logo } from '@/components/Logo';

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    course: '',
    email: '',
    password: '',
    passwordConfirm: '',
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm(s => ({ ...s, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.lastName.trim())  e.lastName  = 'Укажи фамилию';
    if (!form.firstName.trim()) e.firstName = 'Укажи имя';
    if (!form.course)           e.course    = 'Выбери курс';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Похоже, email некорректный';
    if (form.password.length < 8) e.password = 'Минимум 8 символов';
    if (form.password !== form.passwordConfirm) e.passwordConfirm = 'Пароли не совпадают';
    if (!form.agree) e.agree = 'Нужно принять соглашение';
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    // Mock — нет бэкэнда. Имитируем задержку и переходим на dashboard.
    setTimeout(() => router.push('/dashboard'), 700);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 30% 20%, rgba(79,127,255,0.18), transparent 50%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(155,92,255,0.18), transparent 50%)' }} />

      <div style={{ position: 'relative', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}><Logo/></Link>
        <Link href="/login" style={{ fontSize: 13, color: 'var(--fg-3)' }}>Уже есть аккаунт? Войти →</Link>
      </div>

      <div style={{ position: 'relative', maxWidth: 720, margin: '24px auto 64px', padding: '0 24px' }}>
        <div className="card" style={{ padding: 40 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.1em', marginBottom: 12 }}>РЕГИСТРАЦИЯ</div>
          <h2 className="h2" style={{ margin: 0, marginBottom: 8 }}>Заверши создание аккаунта</h2>
          <p style={{ fontSize: 14, color: 'var(--fg-3)', marginBottom: 28 }}>
            Эти данные появятся в твоём профиле. Их можно будет изменить позже.
          </p>

          <form onSubmit={onSubmit} className="col gap-5">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Фамилия" error={errors.lastName} required>
                <input
                  className="input"
                  placeholder="Петров"
                  value={form.lastName}
                  onChange={e => set('lastName', e.target.value)}
                  style={{ height: 48 }}
                />
              </Field>
              <Field label="Имя" error={errors.firstName} required>
                <input
                  className="input"
                  placeholder="Иван"
                  value={form.firstName}
                  onChange={e => set('firstName', e.target.value)}
                  style={{ height: 48 }}
                />
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
              <Field label="Отчество" hint="Если есть">
                <input
                  className="input"
                  placeholder="Сергеевич"
                  value={form.middleName}
                  onChange={e => set('middleName', e.target.value)}
                  style={{ height: 48 }}
                />
              </Field>
              <Field label="Курс" error={errors.course} required>
                <div style={{ position: 'relative' }}>
                  <select
                    className="input"
                    value={form.course}
                    onChange={e => set('course', e.target.value)}
                    style={{ height: 48, appearance: 'none', paddingRight: 36 }}
                  >
                    <option value="">—</option>
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} курс</option>
                    ))}
                  </select>
                  <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--fg-4)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </Field>
            </div>

            <Field label="Email" error={errors.email} hint="Лучше — корпоративный @sfu-kras.ru" required>
              <input
                className="input"
                type="email"
                placeholder="petrov.iv@sfu-kras.ru"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                style={{ height: 48 }}
              />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Пароль" error={errors.password} required>
                <input
                  className="input"
                  type="password"
                  placeholder="Минимум 8 символов"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  style={{ height: 48 }}
                />
              </Field>
              <Field label="Подтверди пароль" error={errors.passwordConfirm} required>
                <input
                  className="input"
                  type="password"
                  placeholder="Ещё раз"
                  value={form.passwordConfirm}
                  onChange={e => set('passwordConfirm', e.target.value)}
                  style={{ height: 48 }}
                />
              </Field>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--fg-2)' }}>
              <span style={{
                width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                marginTop: 2,
                border: '1px solid ' + (form.agree ? 'var(--violet)' : 'var(--border-strong)'),
                background: form.agree ? 'var(--grad)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .15s',
              }}>
                {form.agree && <svg width="11" height="11" viewBox="0 0 24 24" stroke="white" strokeWidth="3" fill="none"><path d="m5 12 5 5L20 7"/></svg>}
              </span>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={e => set('agree', e.target.checked)}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              <span style={{ lineHeight: 1.5 }}>
                Согласен с <a href="#" style={{ color: 'var(--blue)', fontWeight: 600 }}>пользовательским соглашением</a> и&nbsp;<a href="#" style={{ color: 'var(--blue)', fontWeight: 600 }}>политикой конфиденциальности</a>.
              </span>
            </label>
            {errors.agree && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: -12 }}>{errors.agree}</div>}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingTop: 24, borderTop: '1px solid var(--border)', alignItems: 'center', gap: 16 }}>
              <Link href="/onboarding" className="btn btn-ghost">← Назад к онбордингу</Link>
              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Создаём…' : 'Создать аккаунт'} →
              </button>
            </div>
          </form>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--fg-4)', textAlign: 'center', lineHeight: 1.5 }}>
          🛈 Бэкэнд ещё не подключён — отправка формы только мокает вход и переводит на дашборд.
        </div>
      </div>
    </div>
  );
}

function Field({
  label, hint, error, required, children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="col" style={{ gap: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-4)' }}>
        {label} {required && <span style={{ color: 'var(--red)' }}>*</span>}
      </div>
      {children}
      {error
        ? <div style={{ fontSize: 12, color: 'var(--red)' }}>{error}</div>
        : hint
          ? <div style={{ fontSize: 12, color: 'var(--fg-4)' }}>{hint}</div>
          : null}
    </div>
  );
}
