import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/db';
import { Star, ShieldCheck } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'start' }}>
        {/* Product Images */}
        <div style={{ position: 'sticky', top: '8rem' }}>
          <div style={{ position: 'relative', aspectRatio: '4/5', background: '#0a0a0a', border: '1px solid #1a1a1a', overflow: 'hidden' }}>
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>
              {product.name}
            </h1>
            <p style={{ fontSize: '1.5rem', color: '#888', fontFamily: 'monospace' }}>
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#ccc', maxWidth: '500px' }}>
            {product.description}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: product.stock > 0 ? '#4ade80' : '#f87171' }}>
              <ShieldCheck size={16} />
              <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
            </div>
            <AddToCartButton product={product} />
          </div>

          {/* Details */}
          <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#888', marginBottom: '1.5rem' }}>Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Premium heavy cotton', 'Standard fit', 'Reinforced seams', 'Made in Europe'].map((detail, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', paddingBottom: '0.5rem', borderBottom: '1px solid #050505' }}>
                  <span style={{ color: '#444' }}>Feature {idx + 1}</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section style={{ marginTop: '10rem', borderTop: '1px solid #1a1a1a', paddingTop: '6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Client Feedback</h2>
            <p style={{ color: '#888', marginTop: '0.5rem' }}>{product.reviews.length} total reviews</p>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Write a Review
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '4rem' }}>
          {product.reviews.map((review: any) => (
            <div key={review.id} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem', background: '#050505', border: '1px solid #111' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "white" : "none"} color="white" />
                  ))}
                </div>
                <span style={{ fontSize: '0.65rem', color: '#444' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#ccc' }}>
                "{review.comment}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                  {review.user.name?.[0] || 'U'}
                </div>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 500 }}>{review.user.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
