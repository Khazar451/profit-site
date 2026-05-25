import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | PROFIT',
  description: 'PROFIT Streetwear terms and conditions — rules governing the use of our website and purchase of products.',
};

export default function TermsPage() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'white' }}>Terms & Conditions</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>
          Terms & Conditions
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '4rem' }}>
          Last updated: May 25, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', fontSize: '0.9rem', lineHeight: 1.8, color: '#ccc' }}>
          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              1. General
            </h2>
            <p>
              By accessing and using the PROFIT website (profit.co), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              2. Products & Pricing
            </h2>
            <p>
              All prices are listed in USD and are subject to change without notice. We make every effort to ensure product descriptions and images are accurate, but we do not guarantee that colors displayed on your screen match the actual product exactly. Limited edition items are sold on a first-come, first-served basis.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              3. Orders & Payment
            </h2>
            <p>
              By placing an order, you are making an offer to purchase. We reserve the right to refuse or cancel any order for any reason, including product availability, errors in pricing or product information, or suspected fraud. Payment is processed securely at the time of order placement.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              4. Shipping
            </h2>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Free standard shipping on orders over $150</li>
              <li>Standard shipping (5-7 business days): $10</li>
              <li>Express shipping (2-3 business days): $15</li>
              <li>International shipping available to 40+ countries</li>
              <li>Delivery times are estimates and not guaranteed</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              5. Returns & Exchanges
            </h2>
            <p>
              We accept returns within 30 days of delivery. To be eligible for a return, items must be unworn, unwashed, and in their original packaging with all tags attached. Sale items and accessories are final sale unless defective.
            </p>
            <p style={{ marginTop: '1rem' }}>
              To initiate a return, contact us at hello@profit.co with your order number. Return shipping is free within the United States. Refunds are processed within 5-7 business days after we receive the returned item.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              6. Intellectual Property
            </h2>
            <p>
              All content on this website — including text, images, logos, graphics, and design — is the property of PROFIT Streetwear and is protected by copyright and trademark laws. You may not reproduce, distribute, or use any content without our prior written consent.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              7. Limitation of Liability
            </h2>
            <p>
              PROFIT Streetwear shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or products. Our total liability shall not exceed the amount paid for the product in question.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
              8. Contact
            </h2>
            <p>
              For questions about these terms, reach out to us:
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
