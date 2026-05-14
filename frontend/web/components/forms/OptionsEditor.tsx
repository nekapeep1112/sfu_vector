'use client';

interface OptionsEditorProps {
  options: string[];
  onChange: (options: string[]) => void;
  variant: 'radio' | 'checkbox';
}

const IcX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IcPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export function OptionsEditor({ options, onChange, variant }: OptionsEditorProps) {
  const canRemove = options.length > 2;

  const setAt = (i: number, value: string) => {
    const next = [...options];
    next[i] = value;
    onChange(next);
  };

  const addOne = () => onChange([...options, '']);

  const removeAt = (i: number) => {
    if (!canRemove) return;
    onChange(options.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((opt, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 14, height: 14, flexShrink: 0,
              borderRadius: variant === 'radio' ? '50%' : 4,
              border: '2px solid var(--fg-4)',
              background: 'transparent',
            }}/>
            <input
              type="text"
              className="input"
              value={opt}
              onChange={(e) => setAt(i, e.target.value)}
              placeholder={`Опция ${i + 1}`}
              style={{ flex: 1, height: 38 }}
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              disabled={!canRemove}
              title={canRemove ? 'Удалить' : 'Должно быть минимум 2 опции'}
              style={{
                width: 32, height: 32, padding: 0, borderRadius: 8,
                background: 'transparent', border: 'none',
                color: canRemove ? 'var(--fg-4)' : 'var(--fg-4)',
                opacity: canRemove ? 1 : 0.3,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                cursor: canRemove ? 'pointer' : 'not-allowed',
                flexShrink: 0,
              }}
            ><IcX/></button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-ghost btn-sm"
        onClick={addOne}
        style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6 }}
      >
        <IcPlus/> Добавить опцию
      </button>
    </div>
  );
}
