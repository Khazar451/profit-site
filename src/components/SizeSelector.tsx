"use client";

import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selected: string | null;
  onSelect: (size: string) => void;
}

const SizeSelector = ({ sizes, selected, onSelect }: SizeSelectorProps) => {
  return (
    <div>
      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.75rem', fontWeight: 500 }}>
        Size {selected && <span style={{ color: 'white' }}>— {selected}</span>}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            style={{
              minWidth: '48px',
              height: '48px',
              padding: '0 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: selected === size ? '1px solid white' : '1px solid var(--border-light)',
              background: selected === size ? 'white' : 'transparent',
              color: selected === size ? 'black' : 'white',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
              fontFamily: 'inherit'
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
