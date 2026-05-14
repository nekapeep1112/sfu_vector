'use client';

import type { ApplicationQuestion } from '@/lib/mock-data';

export function FieldRadio({
  question,
  value,
  onChange,
  error,
}: {
  question: ApplicationQuestion;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const options = question.options ?? [];
  return (
    <div>
      <label style={{ display: 'block', fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
        {question.label}
        {question.required && <span style={{ color: 'var(--red)' }}> *</span>}
      </label>
      {question.hint && (
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{question.hint}</div>
      )}
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <label
              key={opt}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 12,
                cursor: 'pointer',
                border: selected ? '2px solid var(--blue)' : '1px solid var(--border)',
                background: selected ? 'color-mix(in oklab, var(--blue) 6%, transparent)' : 'var(--surface)',
                boxSizing: 'border-box',
              }}
            >
              <input
                type="radio"
                name={question.id}
                checked={selected}
                onChange={() => onChange(opt)}
                style={{ width: 18, height: 18, accentColor: 'var(--blue)', cursor: 'pointer', flexShrink: 0 }}
              />
              <span style={{ fontSize: 14, color: 'var(--fg)' }}>{opt}</span>
            </label>
          );
        })}
      </div>
      {error && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 6 }}>{error}</div>}
    </div>
  );
}
