'use client';

import type { ReactNode } from 'react';
import { FieldBlock, FieldLabel } from '@/components/org/WizardField';
import {
  DORMITORIES,
  INSTITUTES,
  ORG_CATEGORY_LABEL,
  type OrgCategory,
} from '@/lib/mock-data';
import type { CreateOrgWizardData } from './wizard-types';

interface Props {
  data: CreateOrgWizardData;
  onChange: (patch: Partial<CreateOrgWizardData>) => void;
}

const Cw = {
  building: (p?: { s?: number }) => (
    <svg width={p?.s ?? 18} height={p?.s ?? 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2"/>
      <line x1="9" y1="8" x2="9" y2="8.01"/><line x1="15" y1="8" x2="15" y2="8.01"/>
      <line x1="9" y1="13" x2="9" y2="13.01"/><line x1="15" y1="13" x2="15" y2="13.01"/>
      <path d="M10 21v-4h4v4"/>
    </svg>
  ),
  home: (p?: { s?: number }) => (
    <svg width={p?.s ?? 18} height={p?.s ?? 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  ),
  globe: (p?: { s?: number }) => (
    <svg width={p?.s ?? 18} height={p?.s ?? 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  warn: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
};

function HostRadio({ icon, title, sub, selected, onClick }: { icon: ReactNode; title: string; sub: string; selected: boolean; onClick: () => void }) {
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

export function Step2({ data, onChange }: Props) {
  const setHostType = (hostType: CreateOrgWizardData['hostType']) => {
    if (hostType === 'institute') {
      onChange({ hostType, instituteAbbr: data.instituteAbbr ?? 'ИКИТ', dormNumber: undefined });
    } else if (hostType === 'dormitory') {
      onChange({ hostType, dormNumber: data.dormNumber ?? 7, instituteAbbr: undefined });
    } else {
      onChange({ hostType, instituteAbbr: undefined, dormNumber: undefined });
    }
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    height: 44,
    padding: '0 14px',
    fontSize: 14,
    fontFamily: 'inherit',
    color: 'var(--fg)',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    cursor: 'pointer',
  };

  return (
    <div className="card" style={{ padding: 28 }}>
      <FieldBlock>
        <FieldLabel title="Привязка организации" hint="К чему относится организация — это влияет на видимость в каталоге."/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          <HostRadio
            icon={<Cw.building s={18}/>}
            title="Институтская"
            sub="Орг привязана к конкретному институту СФУ"
            selected={data.hostType === 'institute'}
            onClick={() => setHostType('institute')}
          />
          {data.hostType === 'institute' && (
            <div style={{ marginLeft: 76 }}>
              <select
                value={data.instituteAbbr ?? 'ИКИТ'}
                onChange={(e) => onChange({ instituteAbbr: e.target.value })}
                style={selectStyle}
              >
                {INSTITUTES.map((inst) => (
                  <option key={inst.abbr} value={inst.abbr}>{inst.abbr} — {inst.name}</option>
                ))}
              </select>
            </div>
          )}

          <HostRadio
            icon={<Cw.home s={18}/>}
            title="Общажная"
            sub="Орг внутри общежития"
            selected={data.hostType === 'dormitory'}
            onClick={() => setHostType('dormitory')}
          />
          {data.hostType === 'dormitory' && (
            <div style={{ marginLeft: 76 }}>
              <select
                value={data.dormNumber ?? 7}
                onChange={(e) => onChange({ dormNumber: Number(e.target.value) })}
                style={selectStyle}
              >
                {DORMITORIES.map((d) => (
                  <option key={d.number} value={d.number}>Общежитие №{d.number} · {d.address}</option>
                ))}
              </select>
            </div>
          )}

          <HostRadio
            icon={<Cw.globe s={18}/>}
            title="Общеуниверситетская"
            sub="Доступна всем студентам СФУ, без привязки"
            selected={data.hostType === 'university'}
            onClick={() => setHostType('university')}
          />
          {data.hostType === 'university' && (
            <div style={{
              marginLeft: 76,
              padding: '12px 14px',
              borderRadius: 10,
              background: 'color-mix(in oklab, var(--amber) 10%, transparent)',
              border: '1px solid color-mix(in oklab, var(--amber) 30%, transparent)',
              color: 'var(--amber)',
              fontSize: 12, lineHeight: 1.5,
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <span style={{ flexShrink: 0, marginTop: 1 }}><Cw.warn s={14}/></span>
              <span>
                Создание общеуниверситетских организаций ограничено. Заявку с большой вероятностью отклонят, если ты не имеешь специального разрешения.
              </span>
            </div>
          )}
        </div>
      </FieldBlock>

      <FieldBlock mb={0}>
        <FieldLabel title="Категория" hint="Определяет фильтры и иконку в каталоге."/>
        <select
          value={data.category}
          onChange={(e) => onChange({ category: e.target.value as OrgCategory })}
          style={{ ...selectStyle, marginTop: 12 }}
        >
          {(Object.keys(ORG_CATEGORY_LABEL) as OrgCategory[]).map((k) => (
            <option key={k} value={k}>{ORG_CATEGORY_LABEL[k]}</option>
          ))}
        </select>
      </FieldBlock>
    </div>
  );
}
