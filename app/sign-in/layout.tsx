interface RootLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col bg-muted/50">{children}</main>
    </div>
  );
}

export default AuthLayout;
