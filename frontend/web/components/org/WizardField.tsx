import type { ReactNode } from 'react';

export function FieldLabel({ title, hint }: { title: string; hint?: string }) {
  return (
    <>
      <h4 className="h4" style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{title}</h4>
      {hint && <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>{hint}</div>}
    </>
  );
}

export function FieldBlock({ children, mb = 28 }: { children: ReactNode; mb?: number }) {
  return <div style={{ marginBottom: mb }}>{children}</div>;
}
