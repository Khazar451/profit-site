"use client";

import React from 'react';
import ProductCard from './ProductCard';

interface ProductGridProps {
  initialProducts: any[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

const ProductGrid = ({ initialProducts, title = "The Collection", subtitle = "Limited release profit streetwear.", showViewAll = true, viewAllHref = "/shop" }: ProductGridProps) => {
  return (
    <section id="products" className="section">
      <div className="container">
        <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">{subtitle}</p>
          </div>
          {showViewAll && (
            <a href={viewAllHref} className="button-subtle">View All</a>
          )}
        </div>
        
        <div className="product-grid">
          {initialProducts.map((product: any) => (
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
      </div>
    </section>
  );
};

export default ProductGrid;
