"use client";

import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Apparel', 'Footwear', 'Accessories'];
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Name A-Z', value: 'name-asc' },
];
const TAGS = ['all', 'new', 'bestseller', 'limited', 'essentials'];

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [tag, setTag] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Tag filter
    if (tag !== 'all') {
      result = result.filter(p => p.tags?.includes(tag));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [products, category, sortBy, tag]);

  const activeFilterCount = (category !== 'All' ? 1 : 0) + (tag !== 'all' ? 1 : 0);

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>
            Shop All
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '500px', lineHeight: 1.7 }}>
            Explore the complete PROFIT collection. Modern noir streetwear designed with intention.
          </p>
        </div>

        {/* Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="button-subtle"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span style={{
                  background: 'white',
                  color: 'black',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Sort dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="button-subtle"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    minWidth: '200px',
                    zIndex: 50
                  }}
                >
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setSortOpen(false); }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1.25rem',
                        background: sortBy === option.value ? 'var(--surface-2)' : 'transparent',
                        border: 'none',
                        color: sortBy === option.value ? 'white' : 'var(--muted)',
                        fontSize: '0.75rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'background 0.2s'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', marginBottom: '3rem' }}
            >
              <div style={{
                padding: '2rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '3rem'
              }}>
                {/* Category */}
                <div>
                  <p className="input-label" style={{ marginBottom: '0.75rem' }}>Category</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        style={{
                          padding: '0.5rem 1rem',
                          border: category === cat ? '1px solid white' : '1px solid var(--border-light)',
                          background: category === cat ? 'white' : 'transparent',
                          color: category === cat ? 'black' : 'var(--muted)',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          transition: 'all 0.3s'
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <p className="input-label" style={{ marginBottom: '0.75rem' }}>Collection</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {TAGS.map(t => (
                      <button
                        key={t}
                        onClick={() => setTag(t)}
                        style={{
                          padding: '0.5rem 1rem',
                          border: tag === t ? '1px solid white' : '1px solid var(--border-light)',
                          background: tag === t ? 'white' : 'transparent',
                          color: tag === t ? 'black' : 'var(--muted)',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          transition: 'all 0.3s'
                        }}
                      >
                        {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear */}
                {activeFilterCount > 0 && (
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button
                      onClick={() => { setCategory('All'); setTag('all'); }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--danger)',
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}
                    >
                      <X size={12} /> Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '4rem 3rem' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ aspectRatio: '4/5', background: 'var(--surface)', border: '1px solid var(--border)', animation: 'pulse 2s ease-in-out infinite' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No products found</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>Try adjusting your filters.</p>
            <button onClick={() => { setCategory('All'); setTag('all'); }} className="button-ghost">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={`$${product.price.toFixed(2)}`}
                image={product.image}
                url={`/products/${product.id}`}
                tags={product.tags}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
