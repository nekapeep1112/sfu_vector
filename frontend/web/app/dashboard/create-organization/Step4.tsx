'use client';

import { ORG_CATEGORY_LABEL, tonalShift } from '@/lib/mock-data';
import { hostLabel, type CreateOrgWizardData } from './wizard-types';

interface Props {
  data: CreateOrgWizardData;
}

const IconInfo = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

export function Step4({ data }: Props) {
  const avatarInitials = data.short || 'AB';
  const categoryLabel = ORG_CATEGORY_LABEL[data.category];
  const host = hostLabel(data);

  return (
    <>
      <div className="card" style={{ padding: 28 }}>
        <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 16 }}>
          Превью карточки в каталоге
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, flexShrink: 0,
            background: `linear-gradient(135deg, ${data.color}, ${tonalShift(data.color)})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 22,
            boxShadow: '0 6px 16px rgba(15,23,42,0.12)',
          }}>{avatarInitials}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <h3 className="h3" style={{ margin: 0 }}>
                {data.name || <span style={{ color: 'var(--fg-4)', fontWeight: 500 }}>Без названия</span>}
              </h3>
              <span style={{ fontSize: 12, color: 'var(--fg-4)', fontWeight: 600 }}>· {avatarInitials}</span>
            </div>

            <p style={{
              margin: '8px 0 0',
              fontSize: 13, lineHeight: 1.55, color: 'var(--fg-2)',
              display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden',
            }}>
              {data.description || <span style={{ color: 'var(--fg-4)' }}>Описание не заполнено</span>}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              <span style={{
                padding: '4px 10px', borderRadius: 8,
                background: 'color-mix(in oklab, var(--blue) 12%, transparent)',
                color: 'var(--blue)',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.02em',
              }}>{categoryLabel}</span>
              <span style={{
                padding: '4px 10px', borderRadius: 8,
                background: 'var(--bg-2)', border: '1px solid var(--border)',
                color: 'var(--fg-2)',
                fontSize: 11, fontWeight: 600,
              }}>{host}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 16,
        padding: '14px 16px',
        borderRadius: 12,
        background: 'color-mix(in oklab, var(--blue) 8%, transparent)',
        border: '1px solid color-mix(in oklab, var(--blue) 30%, transparent)',
        color: 'var(--fg-2)',
        fontSize: 13, lineHeight: 1.55,
        display: 'flex', alignItems: 'flex-start', gap: 12,
      }}>
        <span style={{ color: 'var(--blue)', flexShrink: 0, marginTop: 2 }}><IconInfo s={16}/></span>
        <span>
          После отправки заявка попадёт на модерацию администрации СФУ. Обычно решение принимается в течение 1–3 рабочих дней. Ты получишь уведомление о результате.
        </span>
      </div>
    </>
  );
}
