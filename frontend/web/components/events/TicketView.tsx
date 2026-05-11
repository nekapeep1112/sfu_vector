'use client';

import { CURRENT_USER, type EventItem } from '@/lib/mock-data';
import { EventCover } from '@/components/EventCover';
import { QrPattern } from './QrPattern';

const IcCal = ({ s = 12 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);
const IcShare = ({ s = 12 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
);
const IcDownload = ({ s = 12 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

export function TicketView({ event }: { event: EventItem }) {
  return (
    <div style={{ minWidth: 0 }}>
      <h2 className="h2" style={{ margin: 0, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.025em' }}>Мой билет</h2>
      <p style={{ fontSize: 14, color: 'var(--fg-3)', margin: '6px 0 0', lineHeight: 1.5 }}>
        Покажи QR-код на входе. Если не работает камера — продиктуй 4-значный код.
      </p>

      <div className="card" style={{ padding: 0, marginTop: 24, position: 'relative', overflow: 'hidden', borderRadius: 20 }}>
        <div style={{ position: 'relative' }}>
          <EventCover event={event} height={200}/>
          <div style={{
            position: 'absolute', top: 16, right: 16,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
            color: 'white', fontSize: 11, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }}/>
            Подтверждено
          </div>
          <div style={{ position: 'absolute', left: 24, right: 24, bottom: 18 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: '-0.015em' }}>Хакатон Siberian Hack 2026</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>20 мая, 14:00 · ауд. 5-08</div>
          </div>
        </div>

        <div style={{ height: 24, position: 'relative' }}>
          <div style={{
            position: 'absolute', left: -12, top: 0,
            width: 24, height: 24, borderRadius: '50%',
            background: 'var(--bg)',
          }}/>
          <div style={{
            position: 'absolute', right: -12, top: 0,
            width: 24, height: 24, borderRadius: '50%',
            background: 'var(--bg)',
          }}/>
          <div style={{
            position: 'absolute', left: 16, right: 16, top: 12,
            borderTop: '1px dashed var(--border-strong)',
          }}/>
        </div>

        <div style={{ padding: 32, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'center' }}>
          <QrPattern size={220}/>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
              Или продиктуй код
            </div>
            <div style={{
              marginTop: 10,
              fontSize: 48, fontWeight: 800,
              letterSpacing: '0.05em',
              color: 'var(--fg)',
              fontFamily: 'JetBrains Mono, monospace',
              lineHeight: 1,
            }}>K7-XQ29</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 16, lineHeight: 1.55, maxWidth: 320 }}>
              Покажи этот код организатору на входе. Действует только в день мероприятия с 13:30 до окончания.
            </div>

            <div style={{ marginTop: 20, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
              <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Участник
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: CURRENT_USER.avatarGrad,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 12, fontWeight: 700, flexShrink: 0,
                }}>{CURRENT_USER.initials}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{CURRENT_USER.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 2 }}>{CURRENT_USER.institute} · {CURRENT_USER.course} курс · @{CURRENT_USER.handle}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{
        marginTop: 24, padding: 20,
        display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 13, color: 'var(--fg-3)', minWidth: 0 }}>
          Билет также отправлен на <span style={{ color: 'var(--fg-2)', fontWeight: 600 }}>{CURRENT_USER.email}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => console.log('TODO: download pdf')}><IcDownload s={12}/> Скачать PDF</button>
          <button className="btn btn-ghost btn-sm" onClick={() => console.log('TODO: ics export')}><IcCal s={12}/> В календарь</button>
          <button className="btn btn-ghost btn-sm" onClick={() => console.log('TODO: share api')}><IcShare s={12}/> Поделиться</button>
        </div>
      </div>

      <div className="card" style={{
        marginTop: 16, padding: 18,
        background: 'var(--bg-2)', border: '1px solid var(--border)',
        display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>Передумал?</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
            Освободи место для других. Регистрацию можно отменить до 18 мая, 23:59.
          </div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => console.log('TODO: cancel registration')}
          style={{ color: 'var(--red)', flexShrink: 0 }}
        >Отменить регистрацию</button>
      </div>
    </div>
  );
}
