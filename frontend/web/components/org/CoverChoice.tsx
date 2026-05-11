'use client';

import { EventCover } from '@/components/EventCover';
import type { EventItem } from '@/lib/mock-data';
import { FieldBlock, FieldLabel } from '@/components/org/WizardField';
import type { WizardCover, WizardData } from '@/components/org/wizard-types';

const Cw = {
  upload: (p?: { s?: number }) => (
    <svg width={p?.s ?? 32} height={p?.s ?? 32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  crop: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>
    </svg>
  ),
  x: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

export function UploadedCoverImage({ height = 200, radius = 12, showChip = false }: { height?: number; radius?: number; showChip?: boolean }) {
  return (
    <div style={{
      height, borderRadius: radius, overflow: 'hidden',
      position: 'relative',
      background: '#0E1438',
    }}>
      <div style={{ position: 'absolute', left: '-10%', top: '-20%', width: '70%', height: '120%', background: 'radial-gradient(ellipse at 50% 30%, rgba(245,165,36,0.45), transparent 60%)' }}/>
      <div style={{ position: 'absolute', right: '-15%', bottom: '-30%', width: '80%', height: '120%', background: 'radial-gradient(ellipse at 50% 70%, rgba(79,127,255,0.55), transparent 60%)' }}/>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 22px' }}>
        <div style={{ fontSize: Math.round(height * 0.18), fontWeight: 800, color: 'white', lineHeight: 0.95, letterSpacing: '-0.04em', textTransform: 'uppercase', fontFamily: 'Manrope' }}>AI<br/>в&nbsp;науке</div>
        <div style={{ fontSize: Math.round(height * 0.05), fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>МАСТЕР-КЛАСС · 18 ИЮНЯ</div>
      </div>

      <div style={{ position: 'absolute', inset: 0, opacity: 0.10, mixBlendMode: 'overlay', backgroundImage: 'radial-gradient(circle at 30% 40%, white 0.5px, transparent 0.5px), radial-gradient(circle at 70% 60%, white 0.5px, transparent 0.5px)', backgroundSize: '6px 6px, 8px 8px' }}/>

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }}/>

      {showChip && (
        <div style={{ position: 'absolute', left: 14, bottom: 14, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', fontSize: 11, fontWeight: 600, color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Образование</div>
      )}
    </div>
  );
}

export function CoverChoice({ data, onCoverChange }: { data: WizardData; onCoverChange: (cover: WizardCover) => void }) {
  const uploaded = data.cover.type === 'uploaded';

  const previewEvent: EventItem | null = data.type ? {
    id: -2,
    type: data.type,
    title: data.title || 'Без названия',
    date: { d: 0, m: '', wd: '' },
    time: '', duration: '', loc: '',
    registered: 0, capacity: 0, format: '', org: '',
  } : null;

  return (
    <FieldBlock>
      <FieldLabel title="Обложка мероприятия" hint="Если не загрузишь — обложка сгенерируется автоматически из цвета типа события"/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
        {/* LEFT — own poster */}
        <div
          className="card"
          onClick={() => onCoverChange({ type: 'uploaded', url: 'PLACEHOLDER' })}
          style={{
            padding: 0, height: 200, overflow: 'hidden', cursor: 'pointer',
            border: uploaded ? '2px solid var(--blue)' : '1px solid var(--border)',
            position: 'relative',
            background: uploaded ? 'transparent' : 'var(--surface)',
            transition: 'all .15s',
          }}
        >
          {uploaded ? (
            <>
              <UploadedCoverImage height={200} radius={0}/>
              <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); console.log('TODO: crop cover'); }}
                  style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  title="Изменить обрезку"
                >
                  <Cw.crop s={14}/>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); console.log('TODO: remove cover'); }}
                  style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  title="Удалить"
                >
                  <Cw.x s={14}/>
                </button>
              </div>
              <div style={{ position: 'absolute', left: 12, top: 12, padding: '4px 10px', borderRadius: 999, background: 'var(--blue)', color: 'white', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>● Выбрано</div>
            </>
          ) : (
            <div style={{
              height: '100%', width: '100%',
              border: '2px dashed var(--border)',
              borderRadius: 12,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: 16, textAlign: 'center',
            }}>
              <div style={{ color: 'var(--fg-4)' }}><Cw.upload s={32}/></div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)', marginTop: 10 }}>Перетащи или нажми чтобы загрузить</div>
              <div style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 4 }}>JPG, PNG · до 5 МБ · рекомендуем 1200×630</div>
            </div>
          )}
        </div>

        {/* RIGHT — generated */}
        <div
          className="card"
          onClick={() => onCoverChange({ type: 'generated' })}
          style={{
            padding: 0, height: 200, overflow: 'hidden', cursor: 'pointer',
            border: !uploaded ? '2px solid var(--blue)' : '1px solid var(--border)',
            position: 'relative',
            transition: 'all .15s',
          }}
        >
          {previewEvent ? (
            <EventCover event={previewEvent} height={200}/>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-4)', fontSize: 13 }}>Выберите тип</div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.20)' }}/>
          {!uploaded && (
            <div style={{ position: 'absolute', right: 12, bottom: 12, padding: '4px 10px', borderRadius: 999, background: 'var(--blue)', color: 'white', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>● Выбрано</div>
          )}
          <div style={{ position: 'absolute', left: 12, top: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', fontSize: 11, fontWeight: 600, color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Сгенерировать автоматически</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-3)', textAlign: 'center', marginTop: 10 }}>
        После загрузки картинка будет автоматически обрезана до 16:9. Можно изменить позицию обрезки.
      </div>
    </FieldBlock>
  );
}
