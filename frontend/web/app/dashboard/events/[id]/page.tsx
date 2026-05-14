import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EVENTS, INSTITUTES } from '@/lib/mock-data';
import { EventDetailHero } from '@/components/events/EventDetailHero';
import { RegistrationCard } from '@/components/events/RegistrationCard';
import { EventProgramTimeline } from '@/components/events/EventProgramTimeline';
import { OrganizerCard } from '@/components/events/OrganizerCard';
import { WhoIsGoing } from '@/components/events/WhoIsGoing';
import { EventLocationBlock } from '@/components/events/EventLocationBlock';
import { EventRequirementsRow } from '@/components/events/EventRequirementsRow';
import { SimilarEvents } from '@/components/events/SimilarEvents';
import { FinalCtaBar } from '@/components/events/FinalCtaBar';
import { BreadcrumbActions } from '@/components/events/BreadcrumbActions';

function Section({ title, action, children, top = 40 }: { title: string; action?: React.ReactNode; children: React.ReactNode; top?: number }) {
  return (
    <section style={{ marginTop: top }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <h3 className="h3" style={{ margin: 0 }}>{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export default async function EventDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = EVENTS.find(e => e.id === Number(id));
  if (!event) notFound();

  const ikitColor = INSTITUTES.find(i => i.abbr === 'ИКИТ')!.color;

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      {/* breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 16 }}>
        <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>
          <Link href="/dashboard/events" style={{ color: 'var(--fg-3)', textDecoration: 'none' }}>← Мероприятия</Link>
          <span style={{ margin: '0 6px', color: 'var(--fg-4)' }}>/</span>
          <span style={{ color: 'var(--fg-2)' }}>{event.title}</span>
        </div>
        <BreadcrumbActions/>
      </div>

      {/* Hero + right registration card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0 }}>
          <EventDetailHero event={event}/>

          <Section title="О мероприятии">
            {/* TODO: brief из реальной модели event.brief */}
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)', marginTop: 0, marginBottom: 12 }}>
              Siberian Hack 2026 — это два дня концентрированной работы над реальными задачами Сибирского федерального университета. Команды из 3–5 человек собираются на месте, выбирают трек и за 48 часов проходят путь от первой идеи до работающего прототипа.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)', margin: '0 0 12px' }}>
              В этом году четыре трека: студенческая жизнь, расписание и учебный процесс, кампус и инфраструктура, открытые данные СФУ. Менторы — действующие разработчики из ИКИТ и приглашённые специалисты из Сбера, Тинькофф и Яндекса.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)', margin: 0 }}>
              Победители получают денежные призы, стажировки у партнёров и публикацию проекта в годовом отчёте университета. Все участники — сертификаты и +16 часов в портфолио активности.
            </p>
          </Section>

          <Section title="Программа">
            <EventProgramTimeline event={event}/>
          </Section>

          <Section title="Организаторы">
            <div style={{ display: 'flex', gap: 16 }}>
              {/* DEMO: orgId=1 (Студсовет ИКИТ) как заглушка — у EventItem пока нет связи abbr → orgId. Технический долг. */}
              <OrganizerCard
                abbr="ИКИТ"
                label="ИКИТ"
                color={ikitColor}
                eventsCount={247}
                participants="1.2k"
                orgId={1}
              />
              <OrganizerCard
                abbr="ПС"
                label="Профсоюз СФУ"
                color="#9B5CFF"
                eventsCount={189}
                participants="3.4k"
                orgId={1}
              />
            </div>
          </Section>

          <Section title="Кто уже идёт">
            <WhoIsGoing event={event}/>
          </Section>

          <Section title="Где это">
            <EventLocationBlock event={event}/>
          </Section>

          <Section title="Что нужно с собой">
            <EventRequirementsRow/>
          </Section>

          <Section title="Похожие мероприятия" action={
            <Link href="/dashboard/events" style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>Вся афиша →</Link>
          }>
            <SimilarEvents excludeId={event.id}/>
          </Section>

          <div style={{ marginTop: 40 }}>
            <FinalCtaBar event={event}/>
          </div>
        </div>

        <RegistrationCard event={event}/>
      </div>
    </div>
  );
}
