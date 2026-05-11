import { notFound } from 'next/navigation';
import { EVENTS } from '@/lib/mock-data';
import { RegBreadcrumb } from '@/components/events/RegBreadcrumb';
import { RegistrationForm } from '@/components/events/RegistrationForm';
import { MiniSummaryCard } from '@/components/events/MiniSummaryCard';

export default async function RegisterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = EVENTS.find(e => e.id === Number(id));
  if (!event) notFound();

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      <RegBreadcrumb step="Регистрация" eventId={event.id} eventTitle={event.title}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'flex-start' }}>
        <RegistrationForm event={event}/>
        <MiniSummaryCard event={event}/>
      </div>
    </div>
  );
}
