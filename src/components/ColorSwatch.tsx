"use client";

import React from 'react';

interface ColorSwatchProps {
  colors: { name: string; hex: string }[];
  selected: string | null;
  onSelect: (colorName: string) => void;
}

const ColorSwatch = ({ colors, selected, onSelect }: ColorSwatchProps) => {
  return (
    <div>
      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '0.75rem', fontWeight: 500 }}>
        Color {selected && <span style={{ color: 'white' }}>— {selected}</span>}
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {colors.map(color => (
          <button
            key={color.name}
            onClick={() => onSelect(color.name)}
            title={color.name}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: color.hex,
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'transform 0.3s',
              outline: selected === color.name ? '2px solid white' : '2px solid transparent',
              outlineOffset: '3px',
              boxShadow: color.hex === '#000000' || color.hex === '#0a0a0a' || color.hex === '#111111' || color.hex === '#1a1a1a'
                ? 'inset 0 0 0 1px rgba(255,255,255,0.15)'
                : 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSwatch;
