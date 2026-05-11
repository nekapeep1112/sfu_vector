'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ORGANIZATIONS, ORG_EVENTS, TEAM } from '@/lib/mock-data';
import { OrgPageHeader } from '@/components/org/OrgPageHeader';
import { AlertCard } from '@/components/org/AlertCard';
import { MetricTile } from '@/components/org/MetricTile';
import { EventsTable } from '@/components/org/EventsTable';
import { TeamCard } from '@/components/org/TeamCard';
import { ActivityCard } from '@/components/org/ActivityCard';
import {
  IconInbox, IconClock, IconBell,
  IconCal, IconUsers, IconUserAdd, IconGauge,
} from '@/components/org/icons';

export default function OrgDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = use(params);
  const id = Number(idParam);
  const org = ORGANIZATIONS.find((o) => o.id === id);
  if (!org) notFound();

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: 32 }}>
      <OrgPageHeader org={org}/>

      {/* Section 1: Требует внимания */}
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h3 className="h3" style={{ margin: 0 }}>Требует внимания</h3>
          <span style={{ fontSize: 13, color: 'var(--fg-4)', fontWeight: 500 }}>Скрыть выполненное</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <AlertCard
            color="var(--amber)"
            icon={<IconInbox s={16}/>}
            count="7"
            title="заявок ждут рассмотрения"
            sub="Самая старая — 3 дня назад"
            action="Рассмотреть"
            href={`/organizations/${id}/applications`}
          />
          <AlertCard
            color="var(--violet)"
            icon={<IconClock s={16}/>}
            count="2"
            title="события на этой неделе"
            sub="Ближайшее — Хакатон 20 мая"
            action="К списку"
            href={`/organizations/${id}/events`}
          />
          <AlertCard
            color="var(--blue)"
            icon={<IconBell s={16}/>}
            count="3"
            title="события с низкой заполненностью"
            sub="Меньше 30% мест занято"
            action="Разослать напоминание"
            onClick={() => console.log('TODO: send reminders to under-attended events')}
          />
        </div>
      </section>

      {/* Section 2: Сводка организации */}
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h3 className="h3" style={{ margin: 0 }}>Сводка организации</h3>
          <Link href={`/organizations/${id}/analytics`} style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>
            Полная аналитика →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <MetricTile color="var(--blue)"   icon={<IconCal s={14}/>}     value="4"   delta="+1 за месяц"   deltaDir="up" label="активных мероприятий"/>
          <MetricTile color="var(--violet)" icon={<IconUsers s={14}/>}   value="247" delta="+12% за месяц" deltaDir="up" label="участников в этом месяце"/>
          <MetricTile color="var(--green)"  icon={<IconUserAdd s={14}/>} value="38"  delta="+8 за неделю"  deltaDir="up" label="регистраций за неделю"/>
          <MetricTile color="var(--amber)"  icon={<IconGauge s={14}/>}   value="62%"                                    label="средняя заполняемость"/>
        </div>
      </section>

      {/* Section 3: Ближайшие мероприятия */}
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h3 className="h3" style={{ margin: 0 }}>Ближайшие мероприятия</h3>
          <Link href={`/organizations/${id}/events`} style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>
            Все мероприятия →
          </Link>
        </div>
        <EventsTable events={ORG_EVENTS} orgId={id}/>
      </section>

      {/* Section 4: Команда и активность */}
      <section>
        <h3 className="h3" style={{ margin: '0 0 16px' }}>Команда и активность</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <TeamCard team={TEAM} totalMembers={org.members} orgId={id}/>
          <ActivityCard/>
        </div>
      </section>
    </div>
  );
}
