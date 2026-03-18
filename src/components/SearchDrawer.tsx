"use client";

import React, { useState, useEffect } from 'react';
import Drawer from './common/Drawer';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: any[];
}

const SearchDrawer = ({ isOpen, onClose, products }: SearchDrawerProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query, products]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Search PROFIT" side="top">
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          <SearchIcon size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input 
            type="text" 
            placeholder="Search for hoodies, tees, sneakers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              background: '#111',
              border: '1px solid #222',
              padding: '1.25rem 1.25rem 1.25rem 3.5rem',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
          {results.map(product => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              onClick={onClose}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ aspectRatio: '1/1', background: '#111', overflow: 'hidden' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{product.name}</p>
                <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
          {query && results.length === 0 && (
            <p style={{ color: '#666', gridColumn: '1/-1', textAlign: 'center' }}>No results found for "{query}"</p>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default SearchDrawer;
