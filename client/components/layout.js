import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import { SessionProvider } from 'next-auth/react';

export default function Layout({ children }) {
    return (
      <>
      <SessionProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </SessionProvider>
      </>
    )
  }