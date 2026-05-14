'use client';

import { useEffect, useRef, useState } from 'react';

type NotifType = 'success' | 'event' | 'info';
interface Notif {
  type: NotifType;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const ITEMS: Notif[] = [
  { type: 'success', title: 'Заявка одобрена',          body: 'Волонтёрский центр СФУ принял твою заявку. Ждём на встрече 15 июня.', time: '2 ч назад',     unread: true  },
  { type: 'event',   title: 'Скоро мероприятие',        body: 'Хакатон Siberian Hack 2026 начинается через 3 дня.',                  time: 'Сегодня, 10:14', unread: true  },
  { type: 'info',    title: 'Новая организация в ИКИТ', body: 'Появился клуб «AI Lab». Открыт набор.',                                time: 'Вчера',          unread: true  },
  { type: 'event',   title: 'Изменение времени',        body: 'Карьерный форум перенесён с 10:00 на 11:00.',                          time: '2 дня назад',    unread: false },
  { type: 'success', title: 'Сертификат получен',       body: 'За «Студвесну» начислены 8 ч активности.',                              time: '5 дней назад',   unread: false },
];

const COLOR: Record<NotifType, string> = {
  success: 'var(--green)',
  event:   'var(--violet)',
  info:    'var(--blue)',
};

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = ITEMS.filter(n => n.unread).length;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Уведомления"
        style={{
          width: 40, height: 40, borderRadius: 10,
          border: '1px solid ' + (open ? 'rgba(155,92,255,0.3)' : 'var(--border)'),
          background: open ? 'var(--grad-soft)' : 'var(--surface)',
          position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .15s, border-color .15s',
          color: 'var(--fg-2)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/>
        </svg>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: 4, right: 4,
            minWidth: 16, height: 16, padding: '0 4px',
            borderRadius: 8,
            background: 'var(--violet)', color: 'white',
            fontSize: 10, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--surface)',
            lineHeight: 1,
          }}>{unreadCount}</span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Уведомления"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: 0,
            width: 380,
            maxHeight: 'calc(100vh - 100px)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            boxShadow: 'var(--shadow-pop)',
            zIndex: 100,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--grad-soft)',
          }}>
            <div className="row gap-2">
              <span style={{ fontSize: 14, fontWeight: 700 }}>Уведомления</span>
              {unreadCount > 0 && (
                <span style={{
                  padding: '2px 8px', borderRadius: 999,
                  background: 'var(--violet)', color: 'white',
                  fontSize: 10, fontWeight: 700,
                }}>{unreadCount} новых</span>
              )}
            </div>
            <button style={{ fontSize: 12, color: 'var(--violet)', fontWeight: 600 }}>Прочитать все</button>
          </div>

          <div style={{ overflowY: 'auto', flex: 1 }}>
            {ITEMS.map((n, i) => (
              <div
                key={i}
                className="card-hover"
                style={{
                  padding: '12px 16px',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  borderBottom: i < ITEMS.length - 1 ? '1px solid var(--border)' : 'none',
                  background: n.unread ? 'rgba(37,99,235,0.03)' : 'transparent',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {n.unread && (
                  <span style={{
                    position: 'absolute', left: 6, top: 18,
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--violet)',
                    boxShadow: '0 0 6px var(--violet)',
                  }}/>
                )}
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: `${COLOR[n.type]}20`,
                  border: `1px solid ${COLOR[n.type]}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  marginLeft: 8,
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: COLOR[n.type],
                    boxShadow: `0 0 6px ${COLOR[n.type]}`,
                  }}/>
                </div>
                <div className="col" style={{ flex: 1, minWidth: 0, gap: 2 }}>
                  <div className="row" style={{ justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{n.title}</div>
                    <div style={{ fontSize: 10, color: 'var(--fg-4)', whiteSpace: 'nowrap' }}>{n.time}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.45 }}>{n.body}</div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '12px 16px',
              borderTop: '1px solid var(--border)',
              background: 'var(--bg-2)',
              fontSize: 13, fontWeight: 600, color: 'var(--violet)',
            }}
          >
            Все уведомления
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>
      )}
    </div>
  );
}
