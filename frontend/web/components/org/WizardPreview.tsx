import { EVENT_TYPES, type EventItem } from '@/lib/mock-data';
import { EventCover, CapacityBar } from '@/components/EventCover';
import { UploadedCoverImage } from '@/components/org/CoverChoice';
import type { WizardData } from '@/components/org/wizard-types';

const IconCal = ({ s = 12 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);
const IconPin = ({ s = 12 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

function buildPreviewEvent(data: WizardData): EventItem | null {
  if (!data.type) return null;
  return {
    id: -1,
    type: data.type,
    title: data.title || 'Без названия',
    date: { d: data.date?.d ?? 0, m: data.date?.m ?? '', wd: data.date?.wd ?? '' },
    time: data.time,
    duration: data.duration,
    loc: data.address,
    registered: 0,
    capacity: data.capacity ?? 0,
    format: data.format ?? '',
    org: '',
  };
}

export function WizardPreview({ data }: { data: WizardData }) {
  const t = data.type ? EVENT_TYPES[data.type] : null;
  const evt = buildPreviewEvent(data);

  const locationLabel = data.room && data.building
    ? `${data.room}, ${data.building}`
    : data.room || data.building || '—';

  const dateLabel = data.date?.full
    ? (data.time ? `${data.date.full} · ${data.time}` : data.date.full)
    : '—';

  return (
    <div style={{ position: 'sticky', top: 88 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--fg-4)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        marginBottom: 10,
      }}>Предпросмотр карточки</div>

      <div className="card" style={{ padding: 16 }}>
        {data.cover.type === 'uploaded' ? (
          <UploadedCoverImage height={160} showChip={true}/>
        ) : evt ? (
          <EventCover event={evt} height={160}/>
        ) : (
          <div style={{
            height: 160, borderRadius: 12,
            background: 'var(--bg-2)',
            border: '1px dashed var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--fg-4)', fontSize: 13, fontWeight: 500,
          }}>Выберите тип события</div>
        )}

        <div style={{ marginTop: 14 }}>
          {t && (
            <span style={{ background: t.bg, border: `1px solid ${t.color}40`, color: t.color, padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, display: 'inline-block' }}>● {t.label}</span>
          )}
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', marginTop: 8, lineHeight: 1.3 }}>
            {data.title || <span style={{ color: 'var(--fg-4)', fontWeight: 500 }}>Название появится здесь</span>}
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 12, color: 'var(--fg-3)', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <IconCal s={12}/>
              {dateLabel}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <IconPin s={12}/>
              {locationLabel}
            </span>
          </div>

          {data.capacity != null && t && (
            <div style={{ marginTop: 14 }}>
              <CapacityBar registered={0} capacity={data.capacity} color={t.color}/>
            </div>
          )}
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--fg-4)', textAlign: 'center', padding: '12px 4px' }}>
        Так увидят это студенты в афише
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Превью полной карточки →</span>
        <span style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Превью на мобильном →</span>
      </div>
    </div>
  );
}
