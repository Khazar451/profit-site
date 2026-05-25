"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image?: string;
  url: string;
  tags?: string[];
}

const ProductCard = ({ id, name, price, image, url, tags }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price: parseFloat(price.replace('$', '')), image });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Link href={url}>
        <motion.div 
          className="product-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ overflow: 'hidden', position: 'relative', aspectRatio: '4/5', marginBottom: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div 
              className="product-image-zoom"
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#333',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}
            >
              {image ? (
                <Image 
                  src={image} 
                  alt={name} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <span>No Image Available</span>
              )}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
                {tags.includes('new') && <span className="badge badge-new">New</span>}
                {tags.includes('limited') && <span className="badge badge-limited">Limited</span>}
              </div>
            )}

            {/* Wishlist heart */}
            <button
              onClick={handleWishlist}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'transform 0.3s'
              }}
            >
              <Heart size={16} fill={wishlisted ? 'white' : 'none'} color="white" />
            </button>
            
            {/* Quick add */}
            <button 
              onClick={handleAddToCart}
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: 'white',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                zIndex: 10,
                transition: 'transform 0.3s'
              }}
            >
              <Plus size={20} color="black" />
            </button>
          </div>
          
          <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem', fontWeight: 500 }}>
                {name}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                {price}
              </p>
            </div>
            <ArrowUpRight size={16} color="var(--text-muted)" />
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default ProductCard;
