'use client';

import Link from 'next/link';
import type { EventItem } from '@/lib/mock-data';

const IcClock = ({ s = 40 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
);
const IcArrow = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

export function RegistrationSuccess({ event: _event }: { event: EventItem }) {
  const steps = [
    { t: 'Жди решения',        d: 'Обычно — 1–2 дня. Можешь отслеживать статус в разделе «Мои заявки».' },
    { t: 'Получи место',       d: 'Если одобрят — место автоматически закрепится. Появится QR-билет в «Моих мероприятиях».' },
    { t: 'Приходи на хакатон', d: '20 мая в 14:00. Покажешь QR-код на входе — и ты внутри.' },
  ];
  return (
    <div style={{ maxWidth: 640, margin: '40px auto 0' }}>
      <div className="card" style={{ padding: 48, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--amber) 12%, transparent), transparent 60%)',
          pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'color-mix(in oklab, var(--amber) 14%, transparent)',
            color: 'var(--amber)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto',
          }}>
            <IcClock s={40}/>
          </div>

          <h2 className="h2" style={{ marginTop: 24, marginBottom: 0, fontSize: 32, letterSpacing: '-0.025em' }}>Заявка отправлена</h2>
          <p style={{ fontSize: 15, color: 'var(--fg-3)', maxWidth: 480, margin: '8px auto 0', lineHeight: 1.55 }}>
            Студсовет ИКИТ рассмотрит её в течение 1–2 дней. Когда придёт решение — пришлём уведомление в e-mail и в приложение.
          </p>

          <div className="card" style={{
            padding: 18, textAlign: 'left',
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            marginTop: 28,
          }}>
            <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
              Что дальше
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'color-mix(in oklab, var(--blue) 14%, transparent)',
                    color: 'var(--blue)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800, flexShrink: 0,
                  }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 14, color: 'var(--fg)', fontWeight: 600 }}>{s.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2, lineHeight: 1.5 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/dashboard/events" className="btn btn-ghost">К афише</Link>
            <Link href="/dashboard/profile" className="btn btn-primary">
              Посмотреть статус в профиле <IcArrow s={14}/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
