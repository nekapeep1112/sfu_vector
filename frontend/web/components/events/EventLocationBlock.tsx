'use client';

import type { EventItem } from '@/lib/mock-data';

const IcExt = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

// TODO: координаты/адрес из реальной модели event.location
export function EventLocationBlock({ event: _event }: { event?: EventItem } = {}) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 320, background: 'var(--surface-2)' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }}>
          <defs>
            <pattern id="loc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 0 40" stroke="var(--border)" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loc-grid)"/>
        </svg>
        <div style={{
          position: 'absolute', top: 16, left: 16,
          padding: '6px 12px', borderRadius: 10,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(15,23,42,0.08)',
          fontSize: 12, fontWeight: 600, color: 'var(--fg)',
          boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
        }}>Библиотека СФУ</div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', filter: 'drop-shadow(0 6px 14px rgba(124,58,237,0.4))' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 4 C 14 4 7 11 7 21 C 7 32 24 44 24 44 C 24 44 41 32 41 21 C 41 11 34 4 24 4 Z" fill="var(--violet)"/>
            <circle cx="24" cy="20" r="6" fill="white"/>
          </svg>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)', pointerEvents: 'none' }}/>
      </div>
      <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.4 }}>
          <div style={{ color: 'var(--fg)', fontWeight: 600 }}>Библиотека СФУ, корп. Л / ул. Свободный 79</div>
          <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 2 }}>Аудитория 5-08, 5-й этаж</div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => console.log('TODO: external map link')}
          style={{ flexShrink: 0 }}
        >
          Открыть в Яндекс.Картах <IcExt s={12}/>
        </button>
      </div>
    </div>
  );
}
