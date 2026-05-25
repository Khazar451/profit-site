"use client";

import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RelatedProductsProps {
  products: any[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section style={{ marginTop: '8rem', borderTop: '1px solid var(--border)', paddingTop: '6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <h2 className="section-title">You May Also Like</h2>
          <p className="section-subtitle">Complete the look with these picks.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => scroll('left')}
            style={{
              width: '40px',
              height: '40px',
              border: '1px solid var(--border-light)',
              background: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.3s'
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            style={{
              width: '40px',
              height: '40px',
              border: '1px solid var(--border-light)',
              background: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.3s'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '2rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          scrollSnapType: 'x mandatory',
          paddingBottom: '1rem'
        }}
      >
        {products.map((product: any) => (
          <div key={product.id} style={{ minWidth: '300px', scrollSnapAlign: 'start' }}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={`$${product.price.toFixed(2)}`}
              image={product.image}
              url={`/products/${product.id}`}
              tags={product.tags}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
