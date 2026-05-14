'use client';

import type { ApplicationQuestion } from '@/lib/mock-data';

export function FieldLongText({
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
  const max = question.maxLength;
  return (
    <div>
      <label style={{ display: 'block', fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>
        {question.label}
        {question.required && <span style={{ color: 'var(--red)' }}> *</span>}
      </label>
      {question.hint && (
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{question.hint}</div>
      )}
      <textarea
        className="input"
        value={value}
        onChange={(e) => {
          if (max && e.target.value.length > max) return;
          onChange(e.target.value);
        }}
        placeholder={question.placeholder}
        style={{
          marginTop: 12, height: 110, padding: 14, resize: 'none',
          fontFamily: 'inherit', width: '100%', boxSizing: 'border-box', lineHeight: 1.5,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
        <div style={{ fontSize: 12, color: 'var(--red)' }}>{error ?? ''}</div>
        {max && (
          <div style={{ fontSize: 12, color: 'var(--fg-4)' }}>{value.length} / {max}</div>
        )}
      </div>
    </div>
  );
}
