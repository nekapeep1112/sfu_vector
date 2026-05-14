'use client';

import { FieldBlock, FieldLabel } from '@/components/org/WizardField';
import { CapacitySlider } from '@/components/org/CapacitySlider';
import { FormBuilder } from '@/components/forms/FormBuilder';
import type { WizardData } from '@/components/org/wizard-types';

const Cw = {
  lock: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  chev: (p?: { s?: number }) => (
    <svg width={p?.s ?? 14} height={p?.s ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  check: (p?: { s?: number }) => (
    <svg width={p?.s ?? 12} height={p?.s ?? 12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

function RegModeCard({ title, hint, selected, onClick }: { title: string; hint: string; selected: boolean; onClick: () => void }) {
  const color = 'var(--blue)';
  return (
    <div
      onClick={onClick}
      style={{
        padding: 18,
        borderRadius: 12,
        border: selected ? `2px solid ${color}` : '1px solid var(--border)',
        background: selected ? `color-mix(in oklab, ${color} 6%, transparent)` : 'var(--surface)',
        cursor: 'pointer',
        transition: 'all .15s',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%',
          border: selected ? `6px solid ${color}` : '2px solid var(--fg-4)',
          flexShrink: 0,
        }}/>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)' }}>{title}</div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.4, paddingLeft: 28 }}>{hint}</div>
    </div>
  );
}

function DeadlineChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  const color = 'var(--blue)';
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        padding: '12px 14px',
        borderRadius: 10,
        border: selected ? `2px solid ${color}` : '1px solid var(--border)',
        background: selected ? `color-mix(in oklab, ${color} 8%, transparent)` : 'var(--surface)',
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: 13,
        fontWeight: selected ? 700 : 500,
        color: selected ? 'var(--fg)' : 'var(--fg-2)',
        transition: 'all .15s',
      }}
    >{label}</div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />
      <div style={{
        width: 20, height: 20, borderRadius: 6,
        background: checked ? 'var(--blue)' : 'var(--surface)',
        border: checked ? 'none' : '1.5px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', flexShrink: 0,
      }}>{checked && <Cw.check s={12}/>}</div>
      <span style={{ fontSize: 14, color: 'var(--fg)' }}>{label}</span>
    </label>
  );
}

export function Step3({ data, onChange }: { data: WizardData; onChange: (patch: Partial<WizardData>) => void }) {
  const capacityForSlider = data.capacity ?? 80;
  const regOpen = data.regMode === 'open';

  return (
    <div className="card" style={{ padding: 28 }}>
      {/* Capacity */}
      <FieldBlock>
        <FieldLabel title="Сколько мест"/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
          <input
            className="input"
            value={data.capacity ?? ''}
            onChange={(e) => {
              const v = e.target.value.trim();
              onChange({ capacity: v === '' ? null : parseInt(v, 10) || null });
            }}
            style={{ width: 120, height: 44, fontSize: 16, textAlign: 'center', fontWeight: 700 }}
          />
          <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>мест</span>
          <span
            onClick={() => onChange({ capacity: null })}
            style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, marginLeft: 'auto', cursor: 'pointer' }}
          >
            Без ограничений
          </span>
        </div>
        <CapacitySlider value={capacityForSlider}/>
      </FieldBlock>

      {/* Registration mode */}
      <FieldBlock>
        <FieldLabel title="Регистрация"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
          <RegModeCard
            title="Свободная регистрация"
            hint="Студент жмёт «Участвовать» и сразу получает место. Лучше для большинства событий."
            selected={data.regMode === 'open'}
            onClick={() => onChange({ regMode: 'open' })}
          />
          <RegModeCard
            title="С анкетой / по заявке"
            hint="Студент заполняет анкету, ты одобряешь вручную. Для отбора или ограниченного состава."
            selected={data.regMode === 'application'}
            onClick={() => onChange({ regMode: 'application' })}
          />
        </div>
      </FieldBlock>

      {/* Form questions area */}
      {regOpen && (
        <FieldBlock>
          <div style={{
            padding: 14, borderRadius: 10,
            background: 'var(--bg-2)',
            border: '1px dashed var(--border)',
            fontSize: 12, color: 'var(--fg-4)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Cw.lock s={14}/>
            Вопросы анкеты доступны при выборе варианта «С анкетой / по заявке».
          </div>
        </FieldBlock>
      )}
      {data.regMode === 'application' && (
        <FieldBlock>
          <FormBuilder
            questions={data.applicationQuestions}
            onChange={(qs) => onChange({ applicationQuestions: qs })}
            emptyHint="Добавь первый вопрос анкеты."
          />
        </FieldBlock>
      )}

      {/* Deadline */}
      <FieldBlock>
        <FieldLabel title="Когда закроем регистрацию"/>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <DeadlineChip label="За день до события"  selected={data.regDeadline === 'day'}    onClick={() => onChange({ regDeadline: 'day' })}/>
          <DeadlineChip label="За час до события"   selected={data.regDeadline === 'hour'}   onClick={() => onChange({ regDeadline: 'hour' })}/>
          <DeadlineChip label="Конкретная дата"     selected={data.regDeadline === 'custom'} onClick={() => onChange({ regDeadline: 'custom' })}/>
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 10 }}>
          Регистрация закроется <b style={{ color: 'var(--fg-2)' }}>18 июня в 14:00</b>.
        </div>
      </FieldBlock>

      {/* Hours */}
      <FieldBlock>
        <FieldLabel title="Часы активности" hint="Сколько часов в портфолио получит студент за участие"/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
          <input
            className="input"
            value={data.hours ?? ''}
            onChange={(e) => {
              const v = e.target.value.trim();
              onChange({ hours: v === '' ? null : parseInt(v, 10) || null });
            }}
            style={{ width: 80, height: 44, fontSize: 16, textAlign: 'center', fontWeight: 700 }}
          />
          <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>ч активности</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 8 }}>
          По умолчанию — длительность события. Можешь поставить больше за подготовку или работу после.
        </div>
      </FieldBlock>

      {/* Additional settings (always expanded) */}
      <FieldBlock mb={0}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Cw.chev s={14}/>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Дополнительные настройки</span>
        </div>
        <div style={{ marginTop: 8, paddingLeft: 22, borderLeft: '2px solid var(--border)' }}>
          <div style={{ paddingLeft: 14 }}>
            <Checkbox
              label="Разрешить отмену регистрации"
              checked={data.allowCancel}
              onChange={() => onChange({ allowCancel: !data.allowCancel })}
            />
            <Checkbox
              label="Уведомить меня о каждой новой регистрации"
              checked={data.notifyOnRegister}
              onChange={() => onChange({ notifyOnRegister: !data.notifyOnRegister })}
            />
            <Checkbox
              label="Отправить QR-билет после регистрации"
              checked={data.qrTicket}
              onChange={() => onChange({ qrTicket: !data.qrTicket })}
            />
          </div>
        </div>
      </FieldBlock>
    </div>
  );
}
