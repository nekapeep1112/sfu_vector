import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = true;
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', alignSelf: 'flex-start', display: 'flex', zIndex: 50 }}>
          <Sidebar loggedIn={loggedIn} />
        </div>
        <main style={{ flex: 1, minWidth: 0 }}>
          {children}
          <Footer/>
        </main>
      </div>
    </div>
  );
}
