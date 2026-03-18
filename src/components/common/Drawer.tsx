"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  side?: 'right' | 'top';
}

const Drawer = ({ isOpen, onClose, title, children, side = 'right' }: DrawerProps) => {
  const isTop = side === 'top';

  const variants = {
    hidden: isTop ? { y: '-100%' } : { x: '100%' },
    visible: isTop ? { y: 0 } : { x: 0 },
    exit: isTop ? { y: '-100%' } : { x: '100%' },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
            }}
          />

          {/* Drawer */}
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="glass"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: isTop ? '100%' : 'min(100%, 450px)',
              height: isTop ? 'auto' : '100%',
              background: 'rgba(0,0,0,0.85)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              padding: '2.5rem',
              borderLeft: isTop ? 'none' : '1px solid rgba(255,255,255,0.1)',
              borderBottom: isTop ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>{title}</h2>
              <button 
                onClick={onClose}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
