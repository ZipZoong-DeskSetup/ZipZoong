import Header from '@/components/Common/Header';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <header>
        <Header />
      </header>
      <body>{children}</body>
    </>
  );
}
