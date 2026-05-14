'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, notFound } from 'next/navigation';
import {
  ORGANIZATIONS, EVENTS, TEAM, CURRENT_USER, tonalShift,
  type OrgRole,
} from '@/lib/mock-data';
import { EventCover } from '@/components/EventCover';

const ROLE_LABEL: Record<OrgRole, string> = {
  owner: 'Владелец',
  editor: 'Редактор',
  viewer: 'Наблюдатель',
};

const ROLE_PILL: Record<OrgRole, { color: string; bg: string }> = {
  owner:  { color: 'var(--violet)', bg: 'rgba(155,92,255,0.15)' },
  editor: { color: 'var(--blue)',   bg: 'rgba(79,127,255,0.15)' },
  viewer: { color: 'var(--fg-4)',   bg: 'var(--bg-2)' },
};

const IconCheck = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m8 12 3 3 5-6"/>
  </svg>
);

const IconClock = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default function OrgPublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = use(params);
  const id = Number(idParam);
  const org = ORGANIZATIONS.find(o => o.id === id);
  if (!org) notFound();

  const router = useRouter();
  const searchParams = useSearchParams();
  const justSubmitted = searchParams.get('submitted') === '1';
  const isMember = CURRENT_USER.memberships.includes(id);
  const isPending = (CURRENT_USER.pendingMemberships?.includes(id) ?? false) || justSubmitted;

  const upcomingEvents = EVENTS.slice(0, 3);

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      <div className="card" style={{ padding: 28, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{
          width: 96, height: 96, borderRadius: 20,
          background: `linear-gradient(135deg, ${org.color}, ${tonalShift(org.color)})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em',
          flexShrink: 0,
        }}>{org.short}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h1 className="h2" style={{ margin: 0 }}>{org.name}</h1>
            {org.verified && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '3px 9px', borderRadius: 999,
                background: 'rgba(61,214,140,0.12)',
                border: '1px solid rgba(61,214,140,0.35)',
                color: 'var(--green)', fontSize: 11, fontWeight: 700,
              }}>
                <IconCheck s={12}/> Верифицировано
              </span>
            )}
          </div>
          <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.55, marginTop: 10, marginBottom: 0, maxWidth: 680 }}>
            {org.description}
          </p>
          <div style={{ fontSize: 12, color: 'var(--fg-4)', marginTop: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
            <span>{org.members} {pluralPeople(org.members)}</span>
            <span style={{ color: 'var(--fg-4)' }}>·</span>
            <span>С {org.foundedAt.toLowerCase()}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
          {isMember ? (
            <>
              <span style={{
                padding: '4px 10px', borderRadius: 999,
                background: ROLE_PILL[org.role].bg, color: ROLE_PILL[org.role].color,
                fontSize: 11, fontWeight: 700,
              }}>Ты участник · {ROLE_LABEL[org.role]}</span>
              <button
                className="btn btn-primary"
                onClick={() => router.push('/organizations/' + id)}
              >Открыть рабочий кабинет →</button>
            </>
          ) : isPending ? (
            <>
              {justSubmitted && (
                <div style={{
                  padding: '10px 14px', borderRadius: 12,
                  background: 'color-mix(in oklab, var(--green) 12%, transparent)',
                  border: '1px solid color-mix(in oklab, var(--green) 40%, transparent)',
                  maxWidth: 280, textAlign: 'right',
                  fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.4,
                }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓ Заявка отправлена.</span>{' '}
                  Владельцы рассмотрят её в течение 1–3 дней.
                </div>
              )}
              <div style={{
                padding: '12px 16px', borderRadius: 12,
                background: 'rgba(245,165,36,0.10)',
                border: '1px solid rgba(245,165,36,0.30)',
                maxWidth: 280, textAlign: 'right',
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--amber)', fontSize: 13, fontWeight: 700 }}>
                  <IconClock s={13}/> {justSubmitted ? 'Ожидает рассмотрения' : 'Заявка отправлена'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>
                  {justSubmitted ? 'Решение придёт в e-mail · 1–3 дня' : 'Ожидает рассмотрения · 1–3 дня'}
                </div>
                <button
                  onClick={() => console.log('TODO: withdraw membership application', id)}
                  style={{
                    marginTop: 8, background: 'transparent', border: 'none',
                    color: 'var(--blue)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    padding: 0,
                  }}
                >Отозвать заявку</button>
              </div>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => router.push('/dashboard/organizations/' + id + '/join')}
            >Подать заявку</button>
          )}
        </div>
      </div>

      <section style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 className="h3" style={{ margin: 0 }}>Ближайшие мероприятия</h3>
          <Link href="/dashboard/events" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>
            Все события →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {upcomingEvents.map(e => (
            <Link
              key={e.id}
              href={'/dashboard/events/' + e.id}
              className="card card-hover"
              style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <EventCover event={e} height={120}/>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{e.title}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{e.date.d} {e.date.m} · {e.time}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 className="h3" style={{ margin: 0 }}>Команда</h3>
          <span style={{ fontSize: 13, color: 'var(--fg-4)' }}>{org.members} {pluralPeople(org.members)}</span>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {TEAM.map((member, i) => {
            const pill = ROLE_PILL[member.role];
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 160px',
                gap: 16, alignItems: 'center',
                padding: '14px 20px',
                borderBottom: i === TEAM.length - 1 ? 'none' : '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', background: member.grad,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0,
                  }}>{member.ini}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)' }}>{member.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{member.sub}</div>
                  </div>
                </div>
                <div>
                  <span style={{
                    padding: '4px 10px', borderRadius: 999,
                    background: pill.bg, color: pill.color,
                    fontSize: 11, fontWeight: 600,
                  }}>{ROLE_LABEL[member.role]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function pluralPeople(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'человек';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'человека';
  return 'человек';
}
