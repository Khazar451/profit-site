"use client";

import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import SearchDrawer from './SearchDrawer';
import CartDrawer from './CartDrawer';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load products for search
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error("Failed to load products", err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-8'}`}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button 
              className="md-hidden" 
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              <Link href="/#products" style={{ borderBottom: '1px solid transparent', transition: 'border 0.3s' }}>Shop</Link>
              <Link href="/#products" style={{ borderBottom: '1px solid transparent', transition: 'border 0.3s' }}>Collections</Link>
              <a href="https://www.instagram.com/profit_streetwear/" target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid transparent', transition: 'border 0.3s' }}>Contact</a>
            </nav>
          </div>

          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase' }}>
            PROFIT
          </Link>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button 
              onClick={() => setSearchOpen(true)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', position: 'relative' }}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'white',
                  color: 'black',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'black',
            zIndex: 100,
            display: mobileMenuOpen ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem'
          }}
        >
          <button 
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: 'absolute', top: '2.5rem', left: '2rem', background: 'none', border: 'none', color: 'white' }}
          >
            <X size={24} />
          </button>
          <Link href="/#products" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Shop</Link>
          <Link href="/#products" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Collections</Link>
          <a href="https://www.instagram.com/profit_streetwear/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Contact</a>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.3em' }}>About</Link>
        </div>

        <style jsx>{`
          .md-hidden { display: none; }
          @media (max-width: 768px) {
            .md-hidden { display: block; }
            .desktop-nav { display: none !important; }
          }
          nav a:hover { border-bottom-color: white !important; }
        `}</style>
      </header>
      <SearchDrawer isOpen={searchOpen} onClose={() => setSearchOpen(false)} products={products} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
