import Header from '@/components/Common/Header';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <section>
        <Header />
      </section>
      <section>{children}</section>
    </div>
  );
}
