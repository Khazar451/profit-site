"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image?: string;
  url: string;
}

const ProductCard = ({ id, name, price, image, url }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price: parseFloat(price.replace('$', '')), image });
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
          <div style={{ overflow: 'hidden', position: 'relative', aspectRatio: '4/5', marginBottom: '1.5rem', background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
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
                zIndex: 10
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
              <p style={{ fontSize: '0.9rem', color: '#888', fontFamily: 'monospace' }}>
                {price}
              </p>
            </div>
            <ArrowUpRight size={16} color="#444" />
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default ProductCard;
