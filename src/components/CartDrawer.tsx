"use client";

import React from 'react';
import Drawer from './common/Drawer';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Shopping Cart">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '2rem' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>Your cart is empty</p>
              <button 
                onClick={onClose}
                className="button-ghost" 
                style={{ marginTop: '2rem', width: '100%' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #111', paddingBottom: '1.5rem' }}>
                <div style={{ width: '80px', height: '80px', background: '#111', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{item.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>${item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #222' }}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', color: 'white', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.75rem', width: '2rem', textAlign: 'center' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', color: 'white', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid #222', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888' }}>Subtotal</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>${subtotal.toFixed(2)}</p>
            </div>
            <Link 
              href="/checkout" 
              className="button-ghost"
              style={{ width: '100%', background: 'white', color: 'black' }}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
