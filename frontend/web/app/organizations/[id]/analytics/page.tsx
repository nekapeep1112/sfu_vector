import { notFound } from 'next/navigation';
import { ORGANIZATIONS } from '@/lib/mock-data';
import { MetricTile } from '@/components/org/MetricTile';
import {
  IconCal, IconUsers, IconUserAdd, IconGauge,
  IconCheck, IconInbox, IconClock, IconBell,
} from '@/components/org/icons';

const MONTHS: { label: string; height: number }[] = [
  { label: 'ноя', height: 45 },
  { label: 'дек', height: 60 },
  { label: 'янв', height: 30 },
  { label: 'фев', height: 80 },
  { label: 'мар', height: 95 },
  { label: 'апр', height: 70 },
];

export default async function OrgAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const org = ORGANIZATIONS.find((o) => o.id === id);
  if (!org) notFound();

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16 }}>
        <div>
          <h2 className="h2" style={{ margin: 0 }}>Аналитика</h2>
          <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>За последние 30 дней</div>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          За 30 дней
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h3 className="h3" style={{ margin: '0 0 16px' }}>Ключевые показатели</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <MetricTile color="var(--blue)"   icon={<IconCal s={14}/>}     value="12"  delta="+3"   deltaDir="up" label="мероприятий за месяц"/>
          <MetricTile color="var(--violet)" icon={<IconUsers s={14}/>}   value="287" delta="+42"  deltaDir="up" label="уникальных участников"/>
          <MetricTile color="var(--green)"  icon={<IconUserAdd s={14}/>} value="164" delta="+28%" deltaDir="up" label="регистраций"/>
          <MetricTile color="var(--amber)"  icon={<IconGauge s={14}/>}   value="73%" delta="+4%"  deltaDir="up" label="средняя заполняемость"/>
          <MetricTile color="var(--blue)"   icon={<IconCheck s={14}/>}   value="92%" label="пришедших после регистрации"/>
          <MetricTile color="var(--violet)" icon={<IconInbox s={14}/>}   value="47"  label="обработанных заявок"/>
          <MetricTile color="var(--green)"  icon={<IconClock s={14}/>}   value="1.8д" label="среднее время ответа"/>
          <MetricTile color="var(--fg-3)"   icon={<IconBell s={14}/>}    value="234" label="отправленных уведомлений"/>
        </div>
      </section>

      <section>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Регистрации по месяцам</div>
              <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>За последние 6 месяцев</div>
            </div>
          </div>

          <div style={{
            height: 240, display: 'flex', alignItems: 'flex-end',
            gap: 16, marginTop: 20, paddingBottom: 24, position: 'relative',
          }}>
            {MONTHS.map((m) => (
              <div key={m.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: 60, height: `${m.height}%`,
                  background: 'var(--grad)', borderRadius: '8px 8px 0 0',
                }}/>
                <div style={{
                  fontSize: 11, color: 'var(--fg-4)', textAlign: 'center',
                  marginTop: 8, textTransform: 'lowercase',
                }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>
            Подробный отчёт →
          </div>
        </div>
      </section>
    </div>
  );
}
