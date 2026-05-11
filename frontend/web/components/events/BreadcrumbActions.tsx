'use client';

const IcStar = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);

const IcShare = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
);

export function BreadcrumbActions() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => console.log('TODO: toggle favorite')}
      >
        <IcStar s={12}/> В избранное
      </button>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => console.log('TODO: web share api')}
      >
        <IcShare s={12}/> Поделиться
      </button>
    </div>
  );
}
