"use client";

import React, { useState, useEffect } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>
            Wishlist
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading ? (
          <div className="product-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ aspectRatio: '4/5', background: 'var(--surface)', border: '1px solid var(--border)', animation: 'pulse 2s ease-in-out infinite' }} />
            ))}
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <Heart size={48} color="var(--border-light)" style={{ marginBottom: '2rem' }} />
            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Your wishlist is empty</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link href="/shop" className="button-ghost">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {wishlistProducts.map((product: any) => (
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
