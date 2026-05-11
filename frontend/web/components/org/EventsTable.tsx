'use client';

import type { OrgEvent } from '@/lib/mock-data';
import { EVENT_TYPES } from '@/lib/mock-data';
import { StatusChip } from './StatusChip';
import { IconMore } from './icons';

interface EventsTableProps {
  events: OrgEvent[];
  orgId: number;
}

export function EventsTable({ events, orgId }: EventsTableProps) {
  const cols = '90px 1fr 130px 180px 120px 40px';
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: cols, gap: 16,
        padding: '14px 20px', borderBottom: '1px solid var(--border)',
        background: 'var(--bg-2)',
        fontSize: 11, fontWeight: 700, color: 'var(--fg-4)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
        <div>Дата</div>
        <div>Мероприятие</div>
        <div>Тип</div>
        <div>Заполняемость</div>
        <div>Статус</div>
        <div></div>
      </div>
      {events.map((e, i) => {
        const t = EVENT_TYPES[e.type] || EVENT_TYPES.community;
        const pct = Math.min(100, (e.reg / e.cap) * 100);
        return (
          <div
            key={e.id}
            style={{
              display: 'grid', gridTemplateColumns: cols, gap: 16,
              padding: '14px 20px', alignItems: 'center',
              borderBottom: i === events.length - 1 ? 'none' : '1px solid var(--border)',
              transition: 'background .12s',
              cursor: 'pointer',
            }}
            onClick={() => console.log('TODO: event manage page', orgId, e.id)}
            onMouseEnter={(ev) => { ev.currentTarget.style.background = 'var(--bg-2)'; }}
            onMouseLeave={(ev) => { ev.currentTarget.style.background = 'transparent'; }}
          >
            {/* Date badge */}
            <div style={{
              width: 50, height: 40, borderRadius: 10,
              background: 'var(--bg-2)', border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1, color: 'var(--fg)' }}>{e.date.d}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{e.date.m}</div>
            </div>
            {/* Title */}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.title}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.loc} · {e.time}</div>
            </div>
            {/* Type chip */}
            <div>
              <span style={{
                background: t.bg, border: `1px solid ${t.color}40`, color: t.color,
                padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                display: 'inline-block',
              }}>● {t.label}</span>
            </div>
            {/* Capacity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: t.color, borderRadius: 999 }}/>
              </div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--fg-2)', fontWeight: 600, minWidth: 56, textAlign: 'right' }}>{e.reg}/{e.cap}</div>
            </div>
            {/* Status */}
            <div><StatusChip status={e.status}/></div>
            {/* More */}
            <div>
              <button
                style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: 'transparent', border: 'none',
                  color: 'var(--fg-4)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onClick={(ev) => { ev.stopPropagation(); console.log('TODO: event row context menu', orgId, e.id); }}
                onMouseEnter={(ev) => { ev.currentTarget.style.background = 'var(--surface)'; ev.currentTarget.style.color = 'var(--fg)'; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.background = 'transparent'; ev.currentTarget.style.color = 'var(--fg-4)'; }}
              ><IconMore s={16}/></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
