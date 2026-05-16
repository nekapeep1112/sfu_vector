import { notFound } from 'next/navigation';
import { ORGANIZATIONS } from '@/lib/mock-data';
import { MetricTile } from '@/components/org/MetricTile';
import {
  IconCal, IconUsers, IconUserAdd, IconGauge,
  IconCheck, IconInbox, IconClock, IconBell,
} from '@/components/org/icons';

const MONTHS: { label: string; value: number }[] = [
  { label: 'ноя', value:  92 },
  { label: 'дек', value: 124 },
  { label: 'янв', value:  64 },
  { label: 'фев', value: 168 },
  { label: 'мар', value: 198 },
  { label: 'апр', value: 148 },
];

const VIEWS_30 = [120,145,130,160,178,205,175,190,212,228,215,248,272,260,250,290,310,294,325,342,320,358,382,365,402,420,405,440,462,480];
const REGS_30  = [ 38, 45, 42, 52, 58, 66, 60, 62, 72, 80, 74, 84, 92, 88, 84, 98,104, 99,110,118,108,122,128,120,132,140,134,146,154,162];

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

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Регистрации по месяцам</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>За последние 6 месяцев</div>
          <div style={{ marginTop: 16 }}>
            <BarChart data={MONTHS}/>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)' }}>Активность за 30 дней</div>
              <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>Просмотры карточек событий и регистрации</div>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--fg-3)' }}>
              <Legend color="var(--blue)" label="Просмотры"/>
              <Legend color="var(--violet)" label="Регистрации"/>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <LineChart series={[
              { color: 'var(--blue)',   data: VIEWS_30 },
              { color: 'var(--violet)', data: REGS_30 },
            ]}/>
          </div>
        </div>
      </section>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: color }}/>
      {label}
    </span>
  );
}

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const W = 600, H = 240, padL = 36, padR = 12, padT = 16, padB = 28;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const N = data.length;
  const maxV = Math.max(...data.map((d) => d.value)) * 1.15;
  const slotW = innerW / N;
  const barW = Math.min(56, slotW * 0.55);
  const y = (v: number) => padT + innerH - (v / maxV) * innerH;
  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 240, display: 'block' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--blue)"/>
          <stop offset="1" stopColor="var(--violet)"/>
        </linearGradient>
      </defs>
      {yTicks.map((t, i) => {
        const yy = padT + innerH - t * innerH;
        return (
          <g key={i}>
            <line x1={padL} y1={yy} x2={W - padR} y2={yy} stroke="var(--border)" strokeWidth="1" strokeDasharray={t === 0 ? '' : '2 4'} vectorEffect="non-scaling-stroke"/>
            <text x={padL - 6} y={yy + 3} fontSize="9" fill="var(--fg-4)" textAnchor="end">{Math.round(t * maxV)}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const cx = padL + slotW * i + slotW / 2;
        const by = y(d.value);
        const bh = padT + innerH - by;
        return (
          <g key={i}>
            <rect x={cx - barW / 2} y={by} width={barW} height={bh} rx="4" fill="url(#barGrad)"/>
            <text x={cx} y={by - 6} fontSize="10" fontWeight="600" fill="var(--fg-2)" textAnchor="middle">{d.value}</text>
            <text x={cx} y={H - 8} fontSize="10" fill="var(--fg-4)" textAnchor="middle">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart({ series }: { series: { color: string; data: number[] }[] }) {
  const W = 600, H = 240, padL = 36, padR = 12, padT = 12, padB = 24;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const N = series[0].data.length;
  const maxV = Math.max(...series.flatMap((s) => s.data)) * 1.1;
  const x = (i: number) => padL + (i / (N - 1)) * innerW;
  const y = (v: number) => padT + innerH - (v / maxV) * innerH;
  const yTicks = [0, 0.25, 0.5, 0.75, 1];
  const xTicks = [0, 5, 10, 15, 20, 25, 29];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 240, display: 'block' }} preserveAspectRatio="none">
      {yTicks.map((t, i) => {
        const yy = padT + innerH - t * innerH;
        return (
          <g key={i}>
            <line x1={padL} y1={yy} x2={W - padR} y2={yy} stroke="var(--border)" strokeWidth="1" strokeDasharray={t === 0 ? '' : '2 4'}/>
            <text x={padL - 6} y={yy + 3} fontSize="9" fill="var(--fg-4)" textAnchor="end">{Math.round(t * maxV)}</text>
          </g>
        );
      })}
      {series.map((s, si) => {
        const pts = s.data.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
        const areaPath = `M ${x(0).toFixed(1)},${(padT + innerH).toFixed(1)} L ${pts.join(' L ')} L ${x(N - 1).toFixed(1)},${(padT + innerH).toFixed(1)} Z`;
        return (
          <g key={si}>
            <path d={areaPath} fill={s.color} opacity={0.08}/>
            <polyline points={pts.join(' ')} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>
          </g>
        );
      })}
      {xTicks.filter(i => i < N).map(i => (
        <text key={i} x={x(i)} y={H - 6} fontSize="9" fill="var(--fg-4)" textAnchor="middle">{i + 1}</text>
      ))}
    </svg>
  );
}
