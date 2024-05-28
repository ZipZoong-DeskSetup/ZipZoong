import Header from '@/components/Common/Header';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
