'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CURRENT_USER } from '@/lib/mock-data';
import { NotificationsList, ApplicationsList, MyEventsList, SettingsPanel, InterestsPanel } from '@/components/profile/Lists';
import { ProfileEditModal } from '@/components/profile/ProfileEditModal';

const TABS = ['Уведомления', 'Мои заявки', 'Мои мероприятия', 'Интересы', 'Настройки'] as const;
type TabName = typeof TABS[number];

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfileContent/>
    </Suspense>
  );
}

function ProfileContent() {
  const searchParams = useSearchParams();
  const initialTab: TabName = searchParams.get('tab') === 'interests' ? 'Интересы' : 'Уведомления';
  const [tab, setTab] = useState<TabName>(initialTab);
  const [editOpen, setEditOpen] = useState(false);
  const [daysOnPlatform, setDaysOnPlatform] = useState(0);

  useEffect(() => {
    setDaysOnPlatform(Math.floor((Date.now() - new Date(CURRENT_USER.joinedAt).getTime()) / 86400000));
  }, []);

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      {/* Profile header */}
      <div className="card" style={{ padding: 32, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'var(--grad)', opacity: 0.1, filter: 'blur(40px)', pointerEvents: 'none' }}/>
        <div style={{ width: 88, height: 88, borderRadius: 22, background: 'linear-gradient(135deg, #F5A524, #F25E5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 28, color: 'white', flexShrink: 0 }}>ИП</div>
        <div className="col" style={{ flex: 1 }}>
          <h2 className="h2" style={{ margin: 0 }}>Иван Петров</h2>
          <div className="row gap-2" style={{ marginTop: 8 }}>
            <span className="chip">ИКИТ · 3 курс</span>
            <span className="chip">Общежитие №7</span>
            <span className="chip" style={{ background: 'rgba(61,214,140,0.1)', borderColor: 'rgba(61,214,140,0.3)', color: 'var(--green)' }}>● На платформе с сентября 2024</span>
          </div>
        </div>
        <div className="row gap-2">
          <button className="btn btn-ghost btn-sm" onClick={() => setEditOpen(true)}>Редактировать</button>
        </div>
      </div>

      {/* About me block */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h3 className="h3" style={{ margin: 0 }}>О себе</h3>
          <span style={{ fontSize: 12, color: 'var(--fg-4)' }}>Видно только тебе · из настроек</span>
        </div>
        {CURRENT_USER.bio ? (
          <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)', margin: 0, marginBottom: 16 }}>
            {CURRENT_USER.bio}
          </p>
        ) : (
          <p style={{ fontSize: 13, color: 'var(--fg-4)', fontStyle: 'italic', margin: 0, marginBottom: 16 }}>
            Расскажи о себе. Нажми «Редактировать» в шапке.
          </p>
        )}
        <div style={{ display: 'flex', gap: 24, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 4 }}>
              Email
            </div>
            <div style={{ fontSize: 14, color: 'var(--fg)' }}>{CURRENT_USER.email}</div>
          </div>
          {CURRENT_USER.phone && (
            <div>
              <div style={{ fontSize: 11, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 4 }}>
                Телефон
              </div>
              <div style={{ fontSize: 14, color: 'var(--fg)' }}>{CURRENT_USER.phone}</div>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { v: 12,              l: 'мероприятий посещено', c: 'var(--blue)' },
          { v: daysOnPlatform,  l: 'дней на платформе',    c: 'var(--violet)' },
          { v: 5,               l: 'активные заявки',      c: 'var(--amber)' },
          { v: 248,             l: 'часов активности',     c: 'var(--green)' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.c, marginBottom: 12, boxShadow: `0 0 8px ${s.c}` }}/>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 20, width: 'fit-content' }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '10px 18px', borderRadius: 8,
            background: tab === t ? 'var(--grad-soft)' : 'transparent',
            border: '1px solid ' + (tab === t ? 'rgba(155,92,255,0.3)' : 'transparent'),
            fontSize: 13, fontWeight: 500,
            color: tab === t ? 'var(--fg)' : 'var(--fg-3)',
            position: 'relative',
          }}>
            {t}
            {t === 'Уведомления' && <span style={{ marginLeft: 6, padding: '1px 6px', borderRadius: 6, background: 'var(--violet)', color: 'white', fontSize: 10, fontWeight: 700 }}>3</span>}
          </button>
        ))}
      </div>

      {tab === 'Уведомления'    && <NotificationsList/>}
      {tab === 'Мои заявки'      && <ApplicationsList/>}
      {tab === 'Мои мероприятия' && <MyEventsList/>}
      {tab === 'Интересы'        && <InterestsPanel/>}
      {tab === 'Настройки'       && <SettingsPanel/>}

      {editOpen && <ProfileEditModal onClose={() => setEditOpen(false)}/>}
    </div>
  );
}
