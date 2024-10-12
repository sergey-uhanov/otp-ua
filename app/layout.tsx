import type { Metadata } from 'next';
import { Alexandria } from 'next/font/google';
import '@/styles/globals.css';
import TheHeader from '@/components/TheHeader';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import TheFooter from '@/components/TheFooter';

const alexandria = Alexandria({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OTP-UA',
  description: 'Сервіс для тестування та опитування',
  icons: {
    icon: '/public/icon/bank.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&display=swap"
            rel="stylesheet"
          />
        </head>

        <body className={alexandria.className}>
          <TheHeader />
          {children}

          <TheFooter />
        </body>
      </html>
    </SessionProvider>
  );
}
