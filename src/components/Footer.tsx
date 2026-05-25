"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error('Newsletter signup failed', err);
    }
  };

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--background)' }}>
      {/* Newsletter Section */}
      <div style={{ padding: '6rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem' }}>
          <h3 style={{ fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>
            Join the Underground
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', maxWidth: '400px', lineHeight: 1.7 }}>
            Exclusive access to drops, early releases, and members-only pricing. No spam, ever.
          </p>
          {subscribed ? (
            <p style={{ color: 'var(--success)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              ✓ You&apos;re in. Welcome to PROFIT.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', maxWidth: '500px', width: '100%', border: '1px solid var(--border-light)' }}>
              <input
                type="email"
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  padding: '1.2rem 1.5rem',
                  outline: 'none',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  fontFamily: 'inherit'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'white',
                  border: 'none',
                  color: 'black',
                  padding: '1.2rem 1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer Links */}
      <div className="container" style={{ padding: '4rem 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem'
        }}>
          {/* Brand */}
          <div>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              PROFIT
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '250px' }}>
              Modern noir streetwear for the urban elite. Designed with intention, built to last.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--muted)' }}>
              Shop
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <Link href="/shop" style={{ fontSize: '0.8rem', color: '#ccc', transition: 'color 0.3s' }}>All Products</Link>
              <Link href="/collections/new-arrivals" style={{ fontSize: '0.8rem', color: '#ccc', transition: 'color 0.3s' }}>New Arrivals</Link>
              <Link href="/collections/essentials" style={{ fontSize: '0.8rem', color: '#ccc', transition: 'color 0.3s' }}>Essentials</Link>
              <Link href="/collections/limited-drops" style={{ fontSize: '0.8rem', color: '#ccc', transition: 'color 0.3s' }}>Limited Drops</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--muted)' }}>
              Info
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <Link href="/about" style={{ fontSize: '0.8rem', color: '#ccc', transition: 'color 0.3s' }}>About Us</Link>
              <Link href="/lookbook" style={{ fontSize: '0.8rem', color: '#ccc', transition: 'color 0.3s' }}>Lookbook</Link>
              <Link href="/terms" style={{ fontSize: '0.8rem', color: '#ccc', transition: 'color 0.3s' }}>Terms & Conditions</Link>
              <Link href="/privacy" style={{ fontSize: '0.8rem', color: '#ccc', transition: 'color 0.3s' }}>Privacy Policy</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--muted)' }}>
              Connect
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <a
                href="https://www.instagram.com/profit_streetwear/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ccc', transition: 'color 0.3s' }}
              >
                <Instagram size={20} />
              </a>
              <a href="mailto:hello@profit.co" style={{ color: '#ccc', transition: 'color 0.3s' }}>
                <Mail size={20} />
              </a>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.8 }}>
              hello@profit.co
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '2rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            &copy; 2026 PROFIT STREETWEAR. ALL RIGHTS RESERVED.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Apple Pay</span>
            <span>Google Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
