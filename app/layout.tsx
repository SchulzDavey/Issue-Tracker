import './theme-config.css';
import './globals.css';
import '@radix-ui/themes/styles.css';
import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import AuthProvider from './auth/Provider';

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
        <AuthProvider>
          <Theme accentColor="teal">
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
            {/* <ThemePanel /> */}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
