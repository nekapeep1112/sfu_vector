'use client';

import type { ReactNode } from 'react';
import { FieldBlock, FieldLabel } from '@/components/org/WizardField';
import type { WizardData } from '@/components/org/wizard-types';

const Cw = {
  cal: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  clock: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  pin: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  monitor: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  hybrid: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="14" height="11" rx="2"/>
      <path d="M21 11c0 4-5 8-5 8s-5-4-5-8a5 5 0 0 1 10 0z" transform="translate(-2 0)"/>
    </svg>
  ),
  globe: (p?: { s?: number }) => (
    <svg width={p?.s ?? 16} height={p?.s ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  lock: (p?: { s?: number }) => (
    <svg width={p?.s ?? 16} height={p?.s ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  users: (p?: { s?: number }) => (
    <svg width={p?.s ?? 16} height={p?.s ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  plus: (p?: { s?: number }) => (
    <svg width={p?.s ?? 12} height={p?.s ?? 12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
};

function FormatRadioCard({ icon, label, hint, selected, color = 'var(--blue)', onClick }: { icon: ReactNode; label: string; hint: string; selected: boolean; color?: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '16px 14px',
        borderRadius: 12,
        border: selected ? `2px solid ${color}` : '1px solid var(--border)',
        background: selected ? `color-mix(in oklab, ${color} 8%, transparent)` : 'var(--surface)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 8,
        transition: 'all .15s',
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: selected ? color : 'var(--bg-2)',
        color: selected ? 'white' : 'var(--fg-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{label}</div>
      <div style={{ fontSize: 11, color: 'var(--fg-3)', lineHeight: 1.3 }}>{hint}</div>
    </div>
  );
}

function VisibilityRadio({ icon, title, sub, selected, onClick }: { icon: ReactNode; title: string; sub: string; selected: boolean; onClick: () => void }) {
  const color = 'var(--blue)';
  return (
    <div
      onClick={onClick}
      style={{
        padding: 16,
        borderRadius: 12,
        border: selected ? `2px solid ${color}` : '1px solid var(--border)',
        background: selected ? `color-mix(in oklab, ${color} 6%, transparent)` : 'var(--surface)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'flex-start', gap: 14,
        transition: 'all .15s',
      }}
    >
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        border: selected ? `7px solid ${color}` : '2px solid var(--fg-4)',
        flexShrink: 0, marginTop: 1,
        transition: 'all .15s',
      }}/>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: selected ? `color-mix(in oklab, ${color} 14%, transparent)` : 'var(--bg-2)',
        color: selected ? color : 'var(--fg-3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function MiniMapStub() {
  return (
    <div style={{
      height: 160, borderRadius: 12, marginTop: 14,
      background: 'var(--bg-2)',
      border: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)"/>
        <line x1="0" y1="50" x2="400" y2="80" stroke="var(--border)" strokeWidth="6" opacity="0.5"/>
        <line x1="180" y1="0" x2="220" y2="160" stroke="var(--border)" strokeWidth="4" opacity="0.5"/>
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', color: 'var(--blue)' }}>
        <Cw.pin s={32}/>
      </div>
      <div style={{
        position: 'absolute', bottom: 10, right: 12,
        padding: '4px 10px', borderRadius: 6,
        background: 'var(--surface)', border: '1px solid var(--border)',
        fontSize: 11, color: 'var(--fg-3)', fontWeight: 600,
      }}>Кампус СФУ</div>
    </div>
  );
}

export function Step2({ data, onChange }: { data: WizardData; onChange: (patch: Partial<WizardData>) => void }) {
  const setDateFull = (value: string) => {
    if (!value) {
      onChange({ date: null });
      return;
    }
    const dMatch = value.match(/\d+/);
    const d = dMatch ? parseInt(dMatch[0], 10) : 0;
    onChange({ date: { d, m: '', wd: '', full: value } });
  };

  return (
    <div className="card" style={{ padding: 28 }}>
      {/* When */}
      <FieldBlock>
        <FieldLabel title="Когда"/>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12, marginTop: 12 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)', pointerEvents: 'none' }}>
              <Cw.cal s={16}/>
            </div>
            <input
              className="input"
              value={data.date?.full ?? ''}
              onChange={(e) => setDateFull(e.target.value)}
              placeholder="Дата"
              style={{ height: 44, paddingLeft: 40, width: '100%', fontSize: 14 }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)', pointerEvents: 'none' }}>
              <Cw.clock s={16}/>
            </div>
            <input
              className="input"
              value={data.time}
              onChange={(e) => onChange({ time: e.target.value })}
              placeholder="Время"
              style={{ height: 44, paddingLeft: 40, width: '100%', fontSize: 14 }}
            />
          </div>
          <input
            className="input"
            value={data.duration}
            onChange={(e) => onChange({ duration: e.target.value })}
            placeholder="Длительность"
            style={{ height: 44, width: '100%', fontSize: 14 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
          <span style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
                onClick={() => console.log('TODO: multi-day event')}>
            <Cw.plus s={12}/> Сделать многодневным
          </span>
          <span style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
                onClick={() => console.log('TODO: recurring event series')}>
            <Cw.plus s={12}/> Серия повторяющихся событий
          </span>
        </div>
      </FieldBlock>

      {/* Format */}
      <FieldBlock>
        <FieldLabel title="Формат"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
          <FormatRadioCard icon={<Cw.pin s={16}/>}     label="Очно"   hint="Участники приходят в указанное место"     selected={data.format === 'offline'} onClick={() => onChange({ format: 'offline' })}/>
          <FormatRadioCard icon={<Cw.monitor s={16}/>} label="Онлайн" hint="Трансляция или встреча в видеоконференции" selected={data.format === 'online'}  onClick={() => onChange({ format: 'online' })}/>
          <FormatRadioCard icon={<Cw.hybrid s={16}/>}  label="Гибрид" hint="Очное место + трансляция параллельно"      selected={data.format === 'hybrid'}  onClick={() => onChange({ format: 'hybrid' })}/>
        </div>
      </FieldBlock>

      {/* Location */}
      <FieldBlock>
        <FieldLabel title="Где"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <input className="input" value={data.building} onChange={(e) => onChange({ building: e.target.value })} placeholder="Здание / корпус" style={{ height: 44, fontSize: 14, width: '100%' }}/>
          <input className="input" value={data.room}     onChange={(e) => onChange({ room: e.target.value })}     placeholder="Аудитория / помещение" style={{ height: 44, fontSize: 14, width: '100%' }}/>
        </div>
        <input className="input" value={data.address} onChange={(e) => onChange({ address: e.target.value })} placeholder="Адрес" style={{ height: 44, fontSize: 14, width: '100%', marginTop: 12 }}/>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, cursor: 'pointer' }} onClick={() => console.log('TODO: pick location on map')}>Выбрать на карте →</span>
        </div>
        <MiniMapStub/>
      </FieldBlock>

      {/* Visibility */}
      <FieldBlock mb={0}>
        <FieldLabel title="Кому показывать"/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          <VisibilityRadio
            icon={<Cw.globe s={18}/>}
            title="Всем студентам СФУ"
            sub="Появится в общей афише, фильтрах и поиске."
            selected={data.visibility === 'all'}
            onClick={() => onChange({ visibility: 'all' })}
          />
          <VisibilityRadio
            icon={<Cw.lock s={18}/>}
            title="Только моему институту (ИКИТ)"
            sub="Студенты других институтов не увидят событие."
            selected={data.visibility === 'institute'}
            onClick={() => onChange({ visibility: 'institute' })}
          />
          <VisibilityRadio
            icon={<Cw.users s={18}/>}
            title="Только участникам организации"
            sub="Закрытое внутреннее событие. Видно только команде."
            selected={data.visibility === 'org-only'}
            onClick={() => onChange({ visibility: 'org-only' })}
          />
        </div>
      </FieldBlock>
    </div>
  );
}
