import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

interface RootLayoutProps {
  children: React.ReactNode;
}

function PlaygroundLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col bg-muted/50">{children}</main>
      <Footer />
    </div>
  );
}

export default PlaygroundLayout;
