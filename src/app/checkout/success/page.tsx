"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ paddingTop: '12rem', paddingBottom: '8rem' }}>
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        {/* Confetti-like particles */}
        {showConfetti && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 100 }}>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${Math.random() * 100}vw`,
                  y: -20,
                  rotate: 0,
                  opacity: 1
                }}
                animate={{
                  y: '110vh',
                  rotate: Math.random() * 720 - 360,
                  opacity: 0
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeIn'
                }}
                style={{
                  position: 'absolute',
                  width: `${4 + Math.random() * 6}px`,
                  height: `${4 + Math.random() * 6}px`,
                  background: ['#fff', '#ccc', '#888', '#4ade80'][Math.floor(Math.random() * 4)],
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
        >
          <CheckCircle size={80} color="var(--success)" style={{ marginBottom: '2rem' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 style={{ fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>
            Order Confirmed
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Thank you for your purchase. Your order has been placed and is being processed.
          </p>

          {orderId && (
            <div style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                Order Number
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'monospace' }}>{orderId}</p>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: '3rem' }}>
            <Package size={18} color="var(--muted)" />
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              Estimated delivery: <strong style={{ color: 'white' }}>5-7 business days</strong>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/shop" className="button-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Continue Shopping <ArrowRight size={14} />
            </Link>
            <Link href="/" className="button-subtle">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: '12rem', paddingBottom: '8rem', textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--muted)' }}>Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
