import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import { SessionProvider } from 'next-auth/react';

export default function Layout({ children }) {
    return (
      <>
          <Navbar />
          <main>{children}</main>
          <Footer />
      </>
    )
  }