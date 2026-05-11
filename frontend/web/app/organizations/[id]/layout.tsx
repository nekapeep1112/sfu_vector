import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { ORGANIZATIONS } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const org = ORGANIZATIONS.find((o) => o.id === id);
  if (!org) notFound();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh',
          alignSelf: 'flex-start', display: 'flex', zIndex: 50,
        }}>
          <Sidebar loggedIn={true} context={{ type: 'org', orgId: id }} />
        </div>
        <main style={{ flex: 1, minWidth: 0 }}>
          {children}
          <Footer/>
        </main>
      </div>
    </div>
  );
}
