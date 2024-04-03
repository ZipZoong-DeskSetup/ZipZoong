import Footer from '@/components/Common/Footer/Footer';
import Header from '@/components/Common/Header';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <section>
        <Header />
      </section>
      <section>{children}</section>
      <Footer />
    </div>
  );
}
