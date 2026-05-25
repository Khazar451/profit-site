"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import SizeSelector from './SizeSelector';
import ColorSwatch from './ColorSwatch';
import ProductAccordion from './ProductAccordion';
import RelatedProducts from './RelatedProducts';
import { Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailClientProps {
  product: any;
  relatedProducts: any[];
}

const accordionItems = [
  {
    title: 'Product Details',
    content: 'Premium heavy cotton construction with reinforced seams. Designed in our Berlin studio and manufactured in Portugal using ethically sourced materials. Each piece undergoes rigorous quality control before shipping.'
  },
  {
    title: 'Shipping & Delivery',
    content: 'Free standard shipping on orders over $150. Standard delivery: 5-7 business days. Express delivery: 2-3 business days ($15). International shipping available to 40+ countries.'
  },
  {
    title: 'Returns & Exchanges',
    content: 'We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging. Exchange requests are processed within 48 hours. Free return shipping within the US.'
  },
  {
    title: 'Care Instructions',
    content: 'Machine wash cold with similar colors. Do not bleach. Tumble dry low or hang dry. Iron on low heat if needed. Do not dry clean. Detailed care labels included with each garment.'
  }
];

const ProductDetailClient = ({ product, relatedProducts }: ProductDetailClientProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize || undefined, selectedColor || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const canAdd = product.sizes?.length > 0 ? !!selectedSize : true;

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <Link href="/shop">Shop</Link>
        <span className="breadcrumb-separator">/</span>
        <span style={{ color: 'white' }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'start' }}>
        {/* Product Image */}
        <div style={{ position: 'sticky', top: '8rem' }}>
          <div style={{ position: 'relative', aspectRatio: '4/5', background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            {product.tags?.includes('limited') && (
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                <span className="badge badge-limited">Limited Edition</span>
              </div>
            )}
            {product.tags?.includes('new') && (
              <div style={{ position: 'absolute', top: '1.5rem', left: product.tags?.includes('limited') ? '8rem' : '1.5rem' }}>
                <span className="badge badge-new">New</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.75rem' }}>
              {product.category}
            </p>
            <h1 style={{ fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.1 }}>
              {product.name}
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#ccc', maxWidth: '500px' }}>
            {product.description}
          </div>

          {/* Size selector */}
          {product.sizes && product.sizes.length > 0 && (
            <SizeSelector sizes={product.sizes} selected={selectedSize} onSelect={setSelectedSize} />
          )}

          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <ColorSwatch colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
          )}

          {/* Stock and actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: product.stock > 0 ? 'var(--success)' : 'var(--danger)' }}>
              <ShieldCheck size={16} />
              <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={!canAdd || product.stock === 0}
                className="button-primary"
                style={{ flex: 1 }}
              >
                {added ? '✓ Added to Cart' : !canAdd ? 'Select a Size' : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: '56px',
                  height: '56px',
                  border: '1px solid var(--border-light)',
                  background: wishlisted ? 'white' : 'transparent',
                  color: wishlisted ? 'black' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <Heart size={20} fill={wishlisted ? 'black' : 'none'} />
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '2rem', paddingTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--muted)' }}>
              <Truck size={14} />
              <span>Free Shipping 150+</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--muted)' }}>
              <RefreshCw size={14} />
              <span>30-Day Returns</span>
            </div>
          </div>

          {/* Accordion */}
          <div style={{ marginTop: '1rem' }}>
            <ProductAccordion items={accordionItems} />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <section style={{ marginTop: '8rem', borderTop: '1px solid var(--border)', paddingTop: '6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <h2 className="section-title">Client Feedback</h2>
              <p className="section-subtitle">{product.reviews.length} total review{product.reviews.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
            {product.reviews.map((review: any) => (
              <div key={review.id} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--surface-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.2rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "white" : "none"} color="white" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#ccc' }}>
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                    {review.user?.name?.[0] || 'U'}
                  </div>
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 500 }}>{review.user?.name || 'Anonymous'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetailClient;
