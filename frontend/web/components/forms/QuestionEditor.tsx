'use client';

import { useState } from 'react';
import type { ApplicationQuestion, FieldType } from '@/lib/mock-data';
import { OptionsEditor } from './OptionsEditor';

interface QuestionEditorProps {
  question: ApplicationQuestion;
  onChange: (updated: ApplicationQuestion) => void;
  onDelete: () => void;
  onDragStartHandle: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  isDragging?: boolean;
}

const TYPE_LABEL: Record<FieldType, string> = {
  short_text: 'Короткий текст',
  long_text:  'Длинный текст',
  radio:      'Выбор одного',
  checkbox:   'Множественный выбор',
  email:      'Email',
};

const IcGrip = () => (
  <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor" aria-hidden>
    <circle cx="4" cy="4" r="1.5"/><circle cx="10" cy="4" r="1.5"/>
    <circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/>
    <circle cx="4" cy="16" r="1.5"/><circle cx="10" cy="16" r="1.5"/>
  </svg>
);
const IcChevron = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IcX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IcCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export function QuestionEditor({
  question,
  onChange,
  onDelete,
  onDragStartHandle,
  onDragOver,
  onDrop,
  isDragging,
}: QuestionEditorProps) {
  const [expanded, setExpanded] = useState(false);
  const hasOptions = question.type === 'radio' || question.type === 'checkbox';
  const hasLength  = question.type === 'short_text' || question.type === 'long_text' || question.type === 'email';

  return (
    <div
      className="card"
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        padding: 16, marginBottom: 8,
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity .15s',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 12, alignItems: 'center' }}>
        <span
          draggable
          onDragStart={onDragStartHandle}
          style={{
            cursor: 'grab', color: 'var(--fg-4)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 24, height: 24,
          }}
          aria-label="Перетащить"
        ><IcGrip/></span>

        <div
          onClick={() => setExpanded((v) => !v)}
          style={{ minWidth: 0, cursor: 'pointer' }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {question.label || <span style={{ color: 'var(--fg-4)', fontWeight: 500 }}>Без названия</span>}
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
            {TYPE_LABEL[question.type]} · {question.required ? 'обязательный' : 'необязательный'}
          </div>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            title={expanded ? 'Свернуть' : 'Развернуть'}
            style={{
              width: 32, height: 32, padding: 0, borderRadius: 8,
              background: 'transparent', border: 'none', color: 'var(--fg-3)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          ><IcChevron open={expanded}/></button>
          <button
            type="button"
            onClick={onDelete}
            title="Удалить вопрос"
            style={{
              width: 32, height: 32, padding: 0, borderRadius: 8,
              background: 'transparent', border: 'none', color: 'var(--fg-3)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          ><IcX/></button>
        </div>
      </div>

      {expanded && (
        <div style={{
          marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <input
            type="text"
            className="input"
            value={question.label}
            onChange={(e) => onChange({ ...question, label: e.target.value })}
            placeholder="Текст вопроса"
            style={{ height: 40 }}
          />
          <input
            type="text"
            className="input"
            value={question.hint ?? ''}
            onChange={(e) => onChange({ ...question, hint: e.target.value || undefined })}
            placeholder="Подсказка под вопросом (необязательно)"
            style={{ height: 40 }}
          />

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <span style={{
              width: 20, height: 20, borderRadius: 6,
              background: question.required ? 'var(--blue)' : 'var(--surface)',
              border: question.required ? 'none' : '1.5px solid var(--border)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', flexShrink: 0,
            }}>{question.required && <IcCheck/>}</span>
            <input
              type="checkbox"
              checked={question.required}
              onChange={() => onChange({ ...question, required: !question.required })}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
            />
            <span style={{ fontSize: 14, color: 'var(--fg)' }}>Обязательное поле</span>
          </label>

          {hasOptions && (
            <OptionsEditor
              options={question.options ?? ['', '']}
              onChange={(opts) => onChange({ ...question, options: opts })}
              variant={question.type as 'radio' | 'checkbox'}
            />
          )}

          {hasLength && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 12 }}>
              <input
                type="text"
                className="input"
                value={question.placeholder ?? ''}
                onChange={(e) => onChange({ ...question, placeholder: e.target.value || undefined })}
                placeholder="Placeholder (необязательно)"
                style={{ height: 40 }}
              />
              <input
                type="number"
                className="input"
                value={question.maxLength ?? ''}
                onChange={(e) => {
                  const v = e.target.value.trim();
                  onChange({ ...question, maxLength: v === '' ? undefined : Math.max(0, parseInt(v, 10) || 0) });
                }}
                placeholder="Максимум символов"
                min={0}
                style={{ height: 40 }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
