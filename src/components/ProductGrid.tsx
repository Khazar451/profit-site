"use client";

import React from 'react';
import ProductCard from './ProductCard';

interface ProductGridProps {
  initialProducts: any[];
}

const ProductGrid = ({ initialProducts }: ProductGridProps) => {
  return (
    <section id="products" style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>The Collection</h2>
            <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '0.9rem' }}>Limited release profit streetwear.</p>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>View All</button>
        </div>
        
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '4rem 3rem' 
          }}
        >
          {initialProducts.map((product: any) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={`$${product.price.toFixed(2)}`}
              image={product.image}
              url={`/products/${product.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
