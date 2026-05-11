import { notFound } from 'next/navigation';
import { EVENTS } from '@/lib/mock-data';
import { RegBreadcrumb } from '@/components/events/RegBreadcrumb';
import { RegistrationSuccess } from '@/components/events/RegistrationSuccess';

export default async function RegisterSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = EVENTS.find(e => e.id === Number(id));
  if (!event) notFound();

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 32 }}>
      <RegBreadcrumb step="Регистрация · Подтверждение" eventId={event.id} eventTitle={event.title}/>
      <RegistrationSuccess event={event}/>
    </div>
  );
}
