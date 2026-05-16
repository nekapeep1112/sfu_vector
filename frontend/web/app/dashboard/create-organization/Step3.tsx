'use client';

import { FieldBlock, FieldLabel } from '@/components/org/WizardField';
import { tonalShift } from '@/lib/mock-data';
import { ORG_COLORS, type CreateOrgWizardData } from './wizard-types';

interface Props {
  data: CreateOrgWizardData;
  onChange: (patch: Partial<CreateOrgWizardData>) => void;
}

const IconCheck = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconUpload = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

export function Step3({ data, onChange }: Props) {
  const avatarInitials = data.short || 'AB';

  return (
    <div className="card" style={{ padding: 28 }}>
      <FieldBlock>
        <FieldLabel title="Превью аватара" hint="Так значок организации появится в каталоге, навигации и шапке."/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 16 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: `linear-gradient(135deg, ${data.color}, ${tonalShift(data.color)})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 22,
            boxShadow: '0 6px 16px rgba(15,23,42,0.12)',
          }}>{avatarInitials}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
              {data.name || <span style={{ color: 'var(--fg-4)', fontWeight: 500 }}>Без названия</span>}
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>
              Инициалы: <strong style={{ color: 'var(--fg-2)' }}>{avatarInitials}</strong>
            </div>
          </div>
        </div>
      </FieldBlock>

      <FieldBlock>
        <FieldLabel title="Цвет" hint="Используется для аватара и акцентов на странице организации."/>
        <div style={{ display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
          {ORG_COLORS.map((c) => {
            const selected = data.color === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => onChange({ color: c })}
                aria-label={`Выбрать цвет ${c}`}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: c,
                  border: selected ? '3px solid var(--fg)' : '2px solid transparent',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                  padding: 0,
                  outline: 'none',
                  transition: 'transform .15s, border-color .15s',
                  transform: selected ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {selected && <IconCheck s={14}/>}
              </button>
            );
          })}
        </div>
      </FieldBlock>

      <FieldBlock mb={0}>
        <FieldLabel title="Логотип" hint="Если есть — можно загрузить файл. Иначе используются инициалы."/>
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => console.log('TODO file upload')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 16px' }}
          >
            <IconUpload s={14}/> Загрузить логотип
          </button>
        </div>
      </FieldBlock>
    </div>
  );
}
