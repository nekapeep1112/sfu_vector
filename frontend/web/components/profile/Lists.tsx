'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EVENTS, CURRENT_USER, INTEREST_OPTIONS } from '@/lib/mock-data';
import { EventCover } from '../EventCover';

type NotifType = 'success' | 'event' | 'info';

export function NotificationsList() {
  const items: { type: NotifType; title: string; body: string; time: string; unread: boolean }[] = [
    { type: 'success', title: 'Заявка одобрена', body: 'Волонтёрский центр СФУ принял твою заявку. Ждём на встрече 15 июня.', time: '2 ч назад', unread: true },
    { type: 'event', title: 'Скоро мероприятие', body: 'Хакатон Siberian Hack 2026 начинается через 3 дня. Не забудь подготовить документы.', time: 'Сегодня, 10:14', unread: true },
    { type: 'info', title: 'Новая организация в ИКИТ', body: 'Появился клуб «AI Lab». Возможно, тебе интересно — открыт набор.', time: 'Вчера', unread: true },
    { type: 'event', title: 'Изменение времени', body: 'Карьерный форум перенесён с 10:00 на 11:00.', time: '2 дня назад', unread: false },
    { type: 'success', title: 'Сертификат получен', body: 'За участие в фестивале «Студенческая весна» начислены 8 ч активности.', time: '5 дней назад', unread: false },
  ];
  const colorOf: Record<NotifType, string> = { success: 'var(--green)', event: 'var(--violet)', info: 'var(--blue)' };
  return (
    <div className="col gap-2">
      {items.map((n, i) => (
        <div key={i} className="card card-hover" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start', opacity: n.unread ? 1 : 0.65 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${colorOf[n.type]}20`, border: `1px solid ${colorOf[n.type]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: colorOf[n.type], boxShadow: `0 0 6px ${colorOf[n.type]}` }}/>
          </div>
          <div className="col" style={{ flex: 1 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{n.title}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-4)' }}>{n.time}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 4, lineHeight: 1.5 }}>{n.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

type AppStatus = 'review' | 'approved' | 'registered' | 'rejected';
type AppKind = 'event' | 'org';

function appHref(kind: AppKind, status: AppStatus, targetId: number): string {
  if (kind === 'org') return `/dashboard/organizations/${targetId}`;
  switch (status) {
    case 'registered':
    case 'approved':
      return `/dashboard/events/${targetId}/ticket`;
    case 'review':
      return `/dashboard/events/${targetId}/register/success`;
    case 'rejected':
      return `/dashboard/events/${targetId}`;
  }
}

const KIND_CHIP: Record<AppKind, { label: string; color: string; bg: string }> = {
  event: { label: 'Событие',      color: 'var(--blue)',   bg: 'color-mix(in oklab, var(--blue) 14%, transparent)' },
  org:   { label: 'Организация',  color: 'var(--violet)', bg: 'color-mix(in oklab, var(--violet) 14%, transparent)' },
};

export function ApplicationsList() {
  const apps: { kind: AppKind; org: string; status: AppStatus; tag: string; date: string; targetId: number }[] = [
    { kind: 'event', org: 'Студенческий медиацентр',     status: 'review',     tag: 'На рассмотрении', date: '12 мая 2026', targetId: 2 },
    { kind: 'event', org: 'Волонтёрский центр СФУ',       status: 'approved',   tag: 'Одобрено',        date: '8 мая 2026',  targetId: 3 },
    { kind: 'event', org: 'Хакатон Siberian Hack 2026',  status: 'registered', tag: 'Зарегистрирован', date: '6 мая 2026',  targetId: 1 },
    { kind: 'event', org: 'Клуб робототехники',           status: 'rejected',   tag: 'Отклонено',       date: '2 мая 2026',  targetId: 4 },
    { kind: 'org',   org: 'Клуб AI Lab',                  status: 'review',     tag: 'На рассмотрении', date: '14 мая 2026', targetId: 1 },
    { kind: 'org',   org: 'Студенческий медиацентр',     status: 'approved',   tag: 'Принято',         date: '1 мая 2026',  targetId: 3 },
  ];
  const colors: Record<AppStatus, string> = { review: 'var(--amber)', approved: 'var(--green)', registered: 'var(--blue)', rejected: 'var(--red)' };
  return (
    <div className="col gap-2">
      {apps.map((a, i) => {
        const chip = KIND_CHIP[a.kind];
        return (
          <div key={i} className="card card-hover" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'var(--fg-2)' }}>{a.org.split(' ').slice(0, 2).map(w => w[0]).join('')}</div>
            <div className="col" style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{
                  padding: '2px 8px', borderRadius: 6,
                  background: chip.bg, color: chip.color,
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.02em',
                }}>{chip.label}</span>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{a.org}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 4 }}>Заявка от {a.date}</div>
            </div>
            <span style={{ padding: '6px 12px', borderRadius: 8, background: `${colors[a.status]}20`, border: `1px solid ${colors[a.status]}40`, color: colors[a.status], fontSize: 12, fontWeight: 600 }}>{a.tag}</span>
            <Link href={appHref(a.kind, a.status, a.targetId)} className="btn btn-ghost btn-sm">Открыть →</Link>
          </div>
        );
      })}
    </div>
  );
}

export function MyEventsList() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {EVENTS.slice(0, 4).map(e => (
        <Link
          key={e.id}
          href={`/dashboard/events/${e.id}/ticket`}
          className="card card-hover"
          style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
          <EventCover event={e} height={120}/>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{e.title}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{e.date.d} {e.date.m} · {e.time}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function SubHeader({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontSize: 11, color: 'var(--fg-4)',
      textTransform: 'uppercase', letterSpacing: '0.06em',
      fontWeight: 700, marginBottom: 12,
      ...style,
    }}>{children}</div>
  );
}

const CHECKBOX_STYLE: React.CSSProperties = {
  width: 18, height: 18, accentColor: 'var(--blue)', cursor: 'pointer', flexShrink: 0,
};

export function SettingsPanel() {
  const [notif, setNotif] = useState({
    newEvents: true,
    applicationUpdates: true,
    reminders: true,
    weeklyDigest: false,
  });
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    emailPublic: CURRENT_USER.emailPublic ?? false,
  });

  const updateNotif = (patch: Partial<typeof notif>) => {
    const next = { ...notif, ...patch };
    setNotif(next);
    console.log('TODO save notif settings', next);
  };
  const updatePrivacy = (patch: Partial<typeof privacy>) => {
    const next = { ...privacy, ...patch };
    setPrivacy(next);
    console.log('TODO save privacy', next);
  };

  const typeRow = (label: string, key: 'newEvents' | 'applicationUpdates' | 'reminders' | 'weeklyDigest') => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0', cursor: 'pointer', fontSize: 14, color: 'var(--fg)' }}>
      <input
        type="checkbox"
        checked={notif[key]}
        onChange={(e) => updateNotif({ [key]: e.target.checked } as Partial<typeof notif>)}
        style={CHECKBOX_STYLE}
      />
      {label}
    </label>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* SECTION 1: Уведомления */}
      <div className="card" style={{ padding: 24 }}>
        <h3 className="h3" style={{ margin: 0, marginBottom: 20 }}>Уведомления</h3>

        <SubHeader>Каналы</SubHeader>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, color: 'var(--fg)' }}>Email</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{CURRENT_USER.email}</span>
              <span style={{
                padding: '4px 10px', borderRadius: 8,
                background: 'rgba(5,150,105,0.1)', color: 'var(--green)',
                fontSize: 11, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>✓ подтверждён</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '10px 0' }}>
            <div style={{ fontSize: 14, color: 'var(--fg)' }}>Telegram</div>
            <button className="btn btn-ghost btn-sm" onClick={() => console.log('TODO connect telegram')}>Подключить →</button>
          </div>
        </div>

        <SubHeader style={{ marginTop: 20 }}>Типы уведомлений</SubHeader>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {typeRow('Новые мероприятия в моих организациях', 'newEvents')}
          {typeRow('Изменения по моим заявкам', 'applicationUpdates')}
          {typeRow('Напоминания о событиях за день', 'reminders')}
          {typeRow('Дайджест раз в неделю', 'weeklyDigest')}
        </div>
      </div>

      {/* SECTION 3: Приватность */}
      <div className="card" style={{ padding: 24 }}>
        <h3 className="h3" style={{ margin: 0, marginBottom: 16 }}>Приватность</h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
            <div style={{ fontSize: 14, color: 'var(--fg)' }}>Показывать профиль другим студентам</div>
            <input
              type="checkbox"
              checked={privacy.publicProfile}
              onChange={(e) => updatePrivacy({ publicProfile: e.target.checked })}
              style={CHECKBOX_STYLE}
            />
          </label>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '10px 0', cursor: 'pointer' }}>
            <div style={{ fontSize: 14, color: 'var(--fg)' }}>Показывать email в публичном профиле</div>
            <input
              type="checkbox"
              checked={privacy.emailPublic}
              onChange={(e) => updatePrivacy({ emailPublic: e.target.checked })}
              style={CHECKBOX_STYLE}
            />
          </label>
        </div>
      </div>

      {/* SECTION 4: Аккаунт */}
      <div className="card" style={{ padding: 24 }}>
        <h3 className="h3" style={{ margin: 0, marginBottom: 16 }}>Аккаунт</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <button className="btn btn-ghost" onClick={() => console.log('TODO: change password flow')} style={{ width: 240 }}>
            Сменить пароль
          </button>
          <button className="btn btn-ghost" onClick={() => console.log('TODO: logout')} style={{ width: 240 }}>
            Выйти из аккаунта
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => console.log('TODO: delete account')}
            style={{ width: 240, color: 'var(--red)', borderColor: 'var(--red)' }}
          >
            Удалить аккаунт
          </button>
          <p style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 4, lineHeight: 1.5 }}>
            Это действие нельзя отменить. Все твои заявки и членства будут удалены.
          </p>
        </div>
      </div>
    </div>
  );
}

export function InterestsPanel() {
  const [baseline, setBaseline] = useState<string[]>(CURRENT_USER.interests);
  const [selected, setSelected] = useState<string[]>(CURRENT_USER.interests);
  const [justSaved, setJustSaved] = useState(false);

  const toggle = (id: string) => {
    setJustSaved(false);
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSave = () => {
    console.log('TODO: save interests to backend', selected);
    setBaseline(selected);
    setJustSaved(true);
  };

  const hasChanges =
    JSON.stringify([...selected].sort()) !== JSON.stringify([...baseline].sort());

  return (
    <div className="card" style={{ padding: 24 }}>
      <h3 className="h3" style={{ margin: 0 }}>Твои интересы</h3>
      <p style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 6, lineHeight: 1.55, marginBottom: 24 }}>
        Выбери темы, которые тебе интересны — поможем формировать ленту рекомендаций на главной. Можно выбрать несколько.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {INTEREST_OPTIONS.map((opt) => {
          const on = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              style={{
                padding: '12px 18px',
                borderRadius: 12,
                background: on ? `color-mix(in oklab, ${opt.color} 14%, transparent)` : 'var(--bg-2)',
                border: '1px solid ' + (on ? opt.color : 'var(--border)'),
                color: on ? 'var(--fg)' : 'var(--fg-2)',
                fontWeight: 600, fontSize: 13,
                cursor: 'pointer',
                transition: 'all .15s',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: opt.color, opacity: on ? 1 : 0.4,
              }}/>
              {opt.label}
            </button>
          );
        })}
      </div>

      <div style={{
        marginTop: 24, paddingTop: 20,
        borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
      }}>
        <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>
          Выбрано: <strong style={{ color: 'var(--fg)' }}>{selected.length}</strong>
          {selected.length === 0 && <span style={{ color: 'var(--amber)', marginLeft: 8 }}>· выбери хотя бы один интерес</span>}
        </div>
        {justSaved && !hasChanges ? (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 14px', borderRadius: 8,
            background: 'rgba(61,214,140,0.12)',
            border: '1px solid rgba(61,214,140,0.35)',
            color: 'var(--green)', fontSize: 13, fontWeight: 600,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Сохранено
          </div>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSave}
            disabled={selected.length === 0 || !hasChanges}
            style={{ opacity: (selected.length === 0 || !hasChanges) ? 0.5 : 1 }}
          >
            Сохранить
          </button>
        )}
      </div>
    </div>
  );
}
