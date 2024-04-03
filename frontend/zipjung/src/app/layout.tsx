import '@/styles/globals.css';

export const metadata = {
  title: 'ZIPZOONG | 집중',
  description: '',
  icons: {
    icon: '/Images/LOGO3.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" style={{backgroundColor: '#FBF9F1'}}>
      <body>{children}</body>
    </html>
  );
}
