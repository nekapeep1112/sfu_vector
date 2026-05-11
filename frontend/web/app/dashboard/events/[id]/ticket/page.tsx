import { notFound } from 'next/navigation';
import { EVENTS } from '@/lib/mock-data';
import { RegBreadcrumb } from '@/components/events/RegBreadcrumb';
import { TicketView } from '@/components/events/TicketView';
import { EventInfoSidecard } from '@/components/events/EventInfoSidecard';

export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = EVENTS.find(e => e.id === Number(id));
  if (!event) notFound();

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      <RegBreadcrumb step="Мой билет" eventId={event.id} eventTitle={event.title}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'flex-start' }}>
        <TicketView event={event}/>
        <EventInfoSidecard event={event}/>
      </div>
    </div>
  );
}
