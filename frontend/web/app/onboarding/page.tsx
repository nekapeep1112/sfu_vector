'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { Logo } from '@/components/Logo';
import { INSTITUTES } from '@/lib/mock-data';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [institute, setInstitute] = useState('');
  const [dorm, setDorm] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const interestOpts = [
    { id: 'edu', label: 'Образование', color: '#9B5CFF' },
    { id: 'career', label: 'Карьера', color: '#4F7FFF' },
    { id: 'community', label: 'Сообщество', color: '#3DD68C' },
    { id: 'fun', label: 'Развлечения', color: '#F5A524' },
    { id: 'sport', label: 'Спорт', color: '#F25E5E' },
    { id: 'art', label: 'Творчество', color: '#9B5CFF' },
    { id: 'volunteer', label: 'Волонтёрство', color: '#3DD68C' },
  ];

  const dorms = ['Не проживаю в общежитии', ...Array.from({ length: 30 }, (_, i) => `Общежитие №${i + 1}`)];

  const toggleInterest = (id: string) => {
    setInterests(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div style={{
      background: 'var(--bg)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 30% 20%, rgba(79,127,255,0.18), transparent 50%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(155,92,255,0.18), transparent 50%)' }} />

      <div style={{ position: 'relative', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}><Logo/></Link>
        <Link href="/register" style={{ fontSize: 13, color: 'var(--fg-3)' }}>Пропустить →</Link>
      </div>

      <div style={{ position: 'relative', maxWidth: 720, margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, justifyContent: 'center' }}>
          {[1, 2, 3].map(n => (
            <Fragment key={n}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: n <= step ? 'var(--grad)' : 'var(--surface)',
                border: '1px solid ' + (n <= step ? 'transparent' : 'var(--border)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: n <= step ? 'white' : 'var(--fg-4)',
                transition: 'all .3s',
              }}>
                {n < step ? '✓' : n}
              </div>
              {n < 3 && <div style={{ width: 60, height: 2, background: n < step ? 'var(--grad)' : 'var(--border)' }}/>}
            </Fragment>
          ))}
        </div>

        <div className="card" style={{ padding: 40, position: 'relative' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-4)', letterSpacing: '0.1em', marginBottom: 12 }}>ШАГ {step} / 3</div>

          {step === 1 && (
            <>
              <h2 className="h2" style={{ margin: 0, marginBottom: 8 }}>Выбери свой институт</h2>
              <p style={{ fontSize: 14, color: 'var(--fg-3)', marginBottom: 24 }}>Это поможет показывать релевантные мероприятия и организации.</p>
              <div style={{ position: 'relative' }}>
                <select className="input" value={institute} onChange={e => setInstitute(e.target.value)} style={{ height: 52, fontSize: 14, appearance: 'none', paddingRight: 40 }}>
                  <option value="">Выберите институт…</option>
                  {INSTITUTES.map(i => <option key={i.abbr} value={i.abbr}>{i.abbr} — {i.name}</option>)}
                </select>
                <svg style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              {institute && (
                <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: 'var(--grad-soft)', border: '1px solid rgba(155,92,255,0.3)' }}>
                  <div style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 4 }}>Вы выбрали:</div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{INSTITUTES.find(i => i.abbr === institute)?.name}</div>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="h2" style={{ margin: 0, marginBottom: 8 }}>Где живёшь?</h2>
              <p style={{ fontSize: 14, color: 'var(--fg-3)', marginBottom: 24 }}>Опционально. Подберём события и соседей по общаге.</p>
              <div style={{ position: 'relative' }}>
                <select className="input" value={dorm} onChange={e => setDorm(e.target.value)} style={{ height: 52, fontSize: 14, appearance: 'none', paddingRight: 40 }}>
                  <option value="">Выберите вариант…</option>
                  {dorms.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <svg style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="h2" style={{ margin: 0, marginBottom: 8 }}>Что тебе интересно?</h2>
              <p style={{ fontSize: 14, color: 'var(--fg-3)', marginBottom: 24 }}>Можно выбрать несколько. Поможем формировать ленту.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {interestOpts.map(opt => {
                  const on = interests.includes(opt.id);
                  return (
                    <button key={opt.id} onClick={() => toggleInterest(opt.id)} style={{
                      padding: '12px 18px',
                      borderRadius: 12,
                      background: on ? `${opt.color}20` : 'var(--bg-2)',
                      border: '1px solid ' + (on ? `${opt.color}80` : 'var(--border)'),
                      color: on ? 'var(--fg)' : 'var(--fg-2)',
                      fontWeight: 600, fontSize: 13,
                      transition: 'all .15s',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: opt.color, opacity: on ? 1 : 0.4 }}/>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop: 20, fontSize: 12, color: 'var(--fg-4)' }}>Выбрано: {interests.length}</div>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <button onClick={() => setStep(Math.max(1, step - 1))} className="btn btn-ghost" disabled={step === 1} style={{ opacity: step === 1 ? 0.4 : 1 }}>
              ← Назад
            </button>
            <button
              onClick={() => {
                if (step === 3) router.push('/register');
                else setStep(step + 1);
              }}
              className="btn btn-primary"
            >
              {step === 3 ? 'Завершить' : 'Далее'} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
