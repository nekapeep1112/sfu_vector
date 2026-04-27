'use client';

import { useState } from 'react';
import { NotificationsList, ApplicationsList, MyEventsList, SettingsPanel } from '@/components/profile/Lists';

export default function ProfilePage() {
  const [tab, setTab] = useState<string>('Уведомления');
  const tabs = ['Уведомления', 'Мои заявки', 'Мои мероприятия', 'Настройки'];

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      {/* Profile header */}
      <div className="card" style={{ padding: 32, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'var(--grad)', opacity: 0.1, filter: 'blur(40px)' }}/>
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
          <button className="btn btn-ghost btn-sm">Редактировать</button>
          <button className="btn btn-primary btn-sm">+ Подать заявку</button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { v: 12, l: 'мероприятий посещено', c: 'var(--blue)' },
          { v: 3, l: 'организации', c: 'var(--violet)' },
          { v: 5, l: 'активные заявки', c: 'var(--amber)' },
          { v: 248, l: 'часов активности', c: 'var(--green)' },
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
        {tabs.map(t => (
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

      {tab === 'Уведомления' && <NotificationsList/>}
      {tab === 'Мои заявки' && <ApplicationsList/>}
      {tab === 'Мои мероприятия' && <MyEventsList/>}
      {tab === 'Настройки' && <SettingsPanel/>}
    </div>
  );
}
