import React from 'react';
import { notFound } from 'next/navigation';
import { getProductById, getRelatedProducts } from '@/lib/db';
import ProductDetailClient from '@/components/ProductDetailClient';

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

  const relatedProducts = await getRelatedProducts(id, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
