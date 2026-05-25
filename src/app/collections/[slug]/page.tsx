import React from 'react';
import { notFound } from 'next/navigation';
import { getCollectionBySlug } from '@/lib/db';
import ProductGrid from '@/components/ProductGrid';
import Link from 'next/link';
import Image from 'next/image';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <div>
      {/* Hero Banner */}
      <div style={{ position: 'relative', height: '50vh', minHeight: '350px', overflow: 'hidden' }}>
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.35)' }}
          priority
        />
        <div className="container" style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '4rem'
        }}>
          <div className="breadcrumb" style={{ marginBottom: '1rem' }}>
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/collections">Collections</Link>
            <span className="breadcrumb-separator">/</span>
            <span style={{ color: 'white' }}>{collection.name}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>
            {collection.name}
          </h1>
          <p style={{ color: '#ccc', fontSize: '0.9rem', maxWidth: '500px', lineHeight: 1.7 }}>
            {collection.description}
          </p>
        </div>
      </div>

      {/* Products */}
      <ProductGrid
        initialProducts={collection.products}
        title={`${collection.name}`}
        subtitle={`${collection.products.length} product${collection.products.length !== 1 ? 's' : ''}`}
        showViewAll={false}
      />
    </div>
  );
}
