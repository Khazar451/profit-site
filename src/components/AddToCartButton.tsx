"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
  product: any;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="button-ghost" 
      style={{ width: '100%' }}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
