'use client';

import { EVENT_TYPES, tonalShift, type EventType } from '@/lib/mock-data';
import { FieldBlock, FieldLabel } from '@/components/org/WizardField';
import { CoverChoice } from '@/components/org/CoverChoice';
import type { WizardData } from '@/components/org/wizard-types';

const Cw = {
  bold: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h8a4 4 0 0 1 0 8H6z"/><path d="M6 12h9a4 4 0 0 1 0 8H6z"/>
    </svg>
  ),
  italic: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/>
    </svg>
  ),
  list: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  link: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
};

function TypeRadioCard({ selected, label, color, onClick }: { selected: boolean; label: string; color: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '14px 10px',
        borderRadius: 12,
        border: selected ? `2px solid ${color}` : '1px solid var(--border)',
        background: selected ? `color-mix(in oklab, ${color} 8%, transparent)` : 'var(--surface)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        transition: 'all .15s',
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: `linear-gradient(135deg, ${color}, ${tonalShift(color)})`,
        boxShadow: selected ? `0 4px 10px ${color}40` : 'none',
      }}/>
      <div style={{ fontSize: 12, fontWeight: 600, color: selected ? 'var(--fg)' : 'var(--fg-2)', textAlign: 'center', lineHeight: 1.2 }}>{label}</div>
    </div>
  );
}

export function Step1({ data, onChange }: { data: WizardData; onChange: (patch: Partial<WizardData>) => void }) {
  const typeKeys = Object.keys(EVENT_TYPES) as EventType[];
  const toolbarIcons = [Cw.bold, Cw.italic, Cw.list, Cw.link];

  return (
    <div className="card" style={{ padding: 28 }}>
      <FieldBlock>
        <FieldLabel title="Тип мероприятия" hint="Влияет на цвет обложки и фильтры в афише"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 14 }}>
          {typeKeys.map(k => (
            <TypeRadioCard
              key={k}
              selected={data.type === k}
              label={EVENT_TYPES[k].label}
              color={EVENT_TYPES[k].color}
              onClick={() => onChange({ type: k })}
            />
          ))}
        </div>
      </FieldBlock>

      <CoverChoice data={data} onCoverChange={(cover) => onChange({ cover })}/>

      <FieldBlock>
        <FieldLabel title="Название мероприятия"/>
        <input
          className="input"
          placeholder="Например: Хакатон по машинному обучению"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          style={{ height: 48, fontSize: 16, marginTop: 12, width: '100%' }}
        />
        <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'right', marginTop: 6 }}>
          {data.title.length} / 100
        </div>
      </FieldBlock>

      <FieldBlock>
        <FieldLabel title="Краткое описание" hint="Одна-две строки, появится в карточке в афише"/>
        <textarea
          className="input"
          placeholder="Что это, для кого, что получит участник…"
          value={data.shortDesc}
          onChange={(e) => onChange({ shortDesc: e.target.value })}
          style={{ height: 80, padding: 14, fontSize: 14, marginTop: 12, width: '100%', resize: 'none', fontFamily: 'inherit' }}
        />
      </FieldBlock>

      <FieldBlock mb={0}>
        <FieldLabel title="Подробное описание"/>
        <div style={{
          marginTop: 12,
          border: '1px solid var(--border)',
          borderRadius: 10,
          background: 'var(--surface)',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '8px 12px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-2)',
          }}>
            {toolbarIcons.map((I, i) => (
              <button
                key={i}
                type="button"
                onClick={() => console.log('TODO: markdown toolbar button', i)}
                style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: 'transparent', border: 'none', color: 'var(--fg-3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <I s={13}/>
              </button>
            ))}
            <div style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 6px' }}/>
            <span style={{ fontSize: 11, color: 'var(--fg-4)' }}>Поддерживается простой markdown</span>
          </div>
          <textarea
            placeholder="Расскажи о программе, спикерах, что будет интересного. Поддерживается простой markdown (заголовки, списки, ссылки)."
            value={data.longDesc}
            onChange={(e) => onChange({ longDesc: e.target.value })}
            style={{
              height: 200, padding: 14, fontSize: 14, width: '100%',
              resize: 'none', fontFamily: 'inherit',
              border: 'none', outline: 'none', background: 'transparent', color: 'var(--fg)',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </FieldBlock>
    </div>
  );
}
