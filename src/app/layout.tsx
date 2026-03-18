import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "PROFIT | Modern Noir Streetwear",
  description: "High-end, minimalist streetwear for the urban elite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <footer style={{ padding: '4rem 0', borderTop: '1px solid #222', textAlign: 'center' }}>
            <div className="container">
              <p style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '2rem' }}>PROFIT</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#888' }}>
                <Link href="/terms">Terms</Link>
                <Link href="/privacy">Privacy</Link>
                <a href="https://www.instagram.com/profit_streetwear/" target="_blank" rel="noopener noreferrer">Contact</a>
              </div>
              <p style={{ marginTop: '2rem', fontSize: '0.6rem', color: '#444' }}>&copy; 2026 PROFIT STREETWEAR. ALL RIGHTS RESERVED.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
