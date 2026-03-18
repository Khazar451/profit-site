"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="hero" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundImage: 'url("/images/hero.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }} 
      />
      
      <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.165, 0.84, 0.44, 1] }}
        >
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '2rem', textTransform: 'uppercase' }}>
            Elevate Your PROFIT
          </h1>
          <Link href="/#products" className="button-ghost">
            Shop Now
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator overlay */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}>
        <div style={{ width: '1px', height: '60px', background: 'white' }}></div>
      </div>
    </section>
  );
};

export default Hero;
