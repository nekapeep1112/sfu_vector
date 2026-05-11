// TODO: требования из реальной модели event.requirements
export function EventRequirementsRow() {
  const items = [
    { e: '💻', t: 'Ноутбук с зарядкой', d: 'Любой современный' },
    { e: '🪪', t: 'Студенческий билет', d: 'Для прохода в корпус' },
    { e: '☕', t: 'Хорошее настроение', d: '48 часов вместе' },
    { e: '🤝', t: 'Готовность к команде', d: '3–5 человек' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {items.map((it, i) => (
        <div key={i} className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 24, lineHeight: 1, marginBottom: 4 }}>{it.e}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{it.t}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{it.d}</div>
        </div>
      ))}
    </div>
  );
}
