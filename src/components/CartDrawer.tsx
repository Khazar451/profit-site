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
  const { cart, removeFromCart, updateQuantity, subtotal, getCartKey } = useCart();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Shopping Cart">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '2rem' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Your cart is empty</p>
              <button 
                onClick={onClose}
                className="button-ghost" 
                style={{ marginTop: '2rem', width: '100%' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => {
              const key = getCartKey(item.id, item.size, item.color);
              return (
                <div key={key} style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--surface-2)', paddingBottom: '1.5rem' }}>
                  <div style={{ width: '80px', height: '80px', background: 'var(--surface-2)', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{item.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.25rem' }}>${item.price.toFixed(2)}</p>
                        {(item.size || item.color) && (
                          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                            {item.size && `Size: ${item.size}`}{item.size && item.color && ' / '}{item.color && `Color: ${item.color}`}
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={() => removeFromCart(key)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-light)' }}>
                        <button 
                          onClick={() => updateQuantity(key, item.quantity - 1)}
                          style={{ background: 'none', border: 'none', color: 'white', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.75rem', width: '2rem', textAlign: 'center' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(key, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', color: 'white', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted)' }}>Subtotal</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>${subtotal.toFixed(2)}</p>
            </div>
            <Link 
              href="/checkout" 
              className="button-primary"
              style={{ width: '100%' }}
              onClick={onClose}
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
