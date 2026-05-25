"use client";

import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '4rem' }}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 600,
              border: index <= currentStep ? 'none' : '1px solid var(--border-light)',
              background: index < currentStep ? 'white' : index === currentStep ? 'white' : 'transparent',
              color: index <= currentStep ? 'black' : 'var(--muted)',
              transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
            }}>
              {index < currentStep ? <Check size={16} /> : index + 1}
            </div>
            <span style={{
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: index <= currentStep ? 'white' : 'var(--text-muted)',
              fontWeight: index === currentStep ? 600 : 400,
              whiteSpace: 'nowrap',
              transition: 'color 0.3s'
            }}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div style={{
              flex: 1,
              height: '1px',
              minWidth: '40px',
              maxWidth: '120px',
              background: index < currentStep ? 'white' : 'var(--border-light)',
              marginBottom: '1.5rem',
              transition: 'background 0.4s'
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
