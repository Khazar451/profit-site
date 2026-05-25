"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const lookbookItems = [
  { src: '/images/hero.png', alt: 'Urban Explorer', span: 'tall', product: 'p4' },
  { src: '/images/hoodie.png', alt: 'Signature Hoodie', span: 'normal', product: 'p1' },
  { src: '/images/tee.png', alt: 'Essential Tee', span: 'normal', product: 'p2' },
  { src: '/images/sneakers.png', alt: 'Shadow Sneakers', span: 'wide', product: 'p3' },
  { src: '/images/hero.png', alt: 'Night Session', span: 'normal', product: 'p7' },
  { src: '/images/hoodie.png', alt: 'Layer Up', span: 'tall', product: 'p6' },
  { src: '/images/tee.png', alt: 'Street Ready', span: 'normal', product: 'p9' },
  { src: '/images/sneakers.png', alt: 'Runner V2', span: 'normal', product: 'p11' },
];

export default function LookbookPage() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--muted)', marginBottom: '1.5rem' }}>
            SS26 Collection
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '1rem' }}>
            Lookbook
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Modern noir through the lens. Explore the latest PROFIT collection captured in its natural habitat — the city.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          gridAutoFlow: 'dense'
        }}>
          {lookbookItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                gridRow: item.span === 'tall' ? 'span 2' : 'span 1',
                gridColumn: item.span === 'wide' ? 'span 2' : 'span 1',
                aspectRatio: item.span === 'tall' ? '3/5' : item.span === 'wide' ? '16/9' : '4/5',
              }}
            >
              <Link href={`/products/${item.product}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.4s'
                  }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay on hover */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0)',
                  transition: 'background 0.4s',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '2rem'
                }}
                className="lookbook-overlay"
                >
                  <div style={{ opacity: 0, transform: 'translateY(10px)', transition: 'all 0.4s' }} className="lookbook-caption">
                    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>
                      {item.alt}
                    </p>
                    <p style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      Shop Now →
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <style jsx>{`
          .lookbook-overlay:hover {
            background: rgba(0,0,0,0.5) !important;
          }
          .lookbook-overlay:hover .lookbook-caption {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          @media (max-width: 768px) {
            div[style*="grid-template-columns: repeat(3"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
