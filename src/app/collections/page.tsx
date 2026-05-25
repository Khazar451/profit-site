import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCollections } from '@/lib/db';
import { ArrowRight } from 'lucide-react';

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>
            Collections
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '500px', lineHeight: 1.7 }}>
            Curated selections from the PROFIT universe. Each collection tells a story.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {collections.map((collection: any, index: number) => (
            <Link key={collection.slug} href={`/collections/${collection.slug}`}>
              <div style={{
                position: 'relative',
                height: 'clamp(300px, 40vh, 500px)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'border-color 0.4s'
              }}>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(0.4)', transition: 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.4s' }}
                  sizes="100vw"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'clamp(2rem, 4vw, 4rem)',
                  background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.7) 100%)'
                }}>
                  <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--muted)', marginBottom: '0.75rem' }}>
                    Collection 0{index + 1}
                  </p>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1rem' }}>
                    {collection.name}
                  </h2>
                  <p style={{ color: '#ccc', fontSize: '0.85rem', maxWidth: '500px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {collection.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    <span>Explore</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
