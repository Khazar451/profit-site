import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | PROFIT',
  description: 'PROFIT Streetwear privacy policy — how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'white' }}>Privacy Policy</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '4rem' }}>
          Last updated: May 25, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', fontSize: '0.9rem', lineHeight: 1.8, color: '#ccc' }}>
          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when you create an account, make a purchase, subscribe to our newsletter, or contact us. This includes:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Name, email address, and shipping address</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Order history and preferences</li>
              <li>Communications you send to us</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your questions and requests</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our products, services, and website experience</li>
              <li>Prevent fraud and ensure the security of our platform</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              3. Information Sharing
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only with:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Payment processors to complete transactions</li>
              <li>Shipping carriers to deliver your orders</li>
              <li>Service providers who assist with our business operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              4. Cookies & Tracking
            </h2>
            <p>
              We use cookies and similar technologies to remember your preferences, keep items in your shopping cart, and understand how you interact with our site. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your personal information, including SSL encryption for all data transmission and secure storage practices. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              7. Newsletter
            </h2>
            <p>
              If you subscribe to our newsletter, we will use your email address to send you updates about new products, exclusive drops, and promotions. You can unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us directly.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or your personal data, please contact us at:
            </p>
            <p style={{ marginTop: '1rem', color: 'white' }}>
              <strong>Email:</strong> hello@profit.co
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
