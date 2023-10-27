import ReduxProvider from '@/redux/provider';
import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Hydrate from './Hydrate';
import NavBar from './NavBar';
import AuthProvider from './auth/Provider';
import './globals.css';
import './theme-config.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description:
    'Eenvoudige issue tracker, waar gebruikers problemen kunnen indienen, volgen en beheren.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Hydrate>
          <ReduxProvider>
            <AuthProvider>
              <Theme accentColor="teal">
                <NavBar />
                <main className="p-5">
                  <Container>{children}</Container>
                </main>
              </Theme>
            </AuthProvider>
          </ReduxProvider>
        </Hydrate>
      </body>
    </html>
  );
}
