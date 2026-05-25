"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const values = [
  {
    title: 'Intentional Design',
    description: 'Every stitch, every cut, every detail is deliberate. We don\'t follow trends — we define them. Each piece is designed to transcend seasons and stand the test of time.',
  },
  {
    title: 'Ethical Production',
    description: 'Manufactured in Portugal using ethically sourced materials. We work directly with factories to ensure fair wages, safe conditions, and minimal environmental impact.',
  },
  {
    title: 'Uncompromising Quality',
    description: 'Premium fabrics, heavyweight construction, reinforced seams. Our garments are built to be worn hard and loved for years. Quality you can feel the moment you put it on.',
  },
  {
    title: 'Community First',
    description: 'PROFIT isn\'t just a brand — it\'s a movement. We build for the people who challenge norms, who demand more from the clothes they wear, who define their own path.',
  }
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '500px', overflow: 'hidden' }}>
        <Image
          src="/images/hero.png"
          alt="PROFIT Streetwear"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.3)' }}
          priority
        />
        <div className="container" style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.165, 0.84, 0.44, 1] }}
          >
            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--muted)', marginBottom: '2rem' }}>
              Est. 2026
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginBottom: '1.5rem' }}>
              Our Story
            </h1>
            <p style={{ color: '#ccc', fontSize: '1rem', maxWidth: '600px', lineHeight: 1.8 }}>
              Born from the streets. Refined in the studio. PROFIT exists at the intersection of raw urban culture and meticulous craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--muted)', marginBottom: '2rem' }}>
              The Mission
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0.02em', marginBottom: '2rem' }}>
              We believe that what you wear should be as intentional as how you live. PROFIT creates garments that demand presence — pieces that speak before you do.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
              Every collection starts with a single question: would we wear this every day? If the answer isn&apos;t an immediate yes, it doesn&apos;t ship. This uncompromising approach is why PROFIT has become the uniform of choice for those who refuse to blend in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Break */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '60vh' }}>
        <div style={{ position: 'relative' }}>
          <Image src="/images/hoodie.png" alt="PROFIT Hoodie" fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <Image src="/images/sneakers.png" alt="PROFIT Sneakers" fill style={{ objectFit: 'cover' }} />
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--muted)', marginBottom: '1.5rem' }}>
              What We Stand For
            </p>
            <h2 className="section-title">Our Values</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{ padding: '2.5rem', border: '1px solid var(--border)', background: 'var(--surface)' }}
              >
                <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--border-light)', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                  0{i + 1}
                </p>
                <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '1rem' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.8 }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '8rem 0', background: 'var(--surface)', textAlign: 'center' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '1.5rem' }}>
              Join the Movement
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>
              Explore the collection and find your uniform.
            </p>
            <Link href="/shop" className="button-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
              Shop Now <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
