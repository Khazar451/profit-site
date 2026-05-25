"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import StepIndicator from '@/components/StepIndicator';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock } from 'lucide-react';
import Link from 'next/link';

const STEPS = ['Shipping', 'Payment', 'Review'];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shipping: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
  shipping: 'standard',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
};

export default function CheckoutPage() {
  const { cart, subtotal, clearCart, getCartKey } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);

  const shippingCost = form.shipping === 'express' ? 15 : subtotal >= 150 ? 0 : 10;
  const total = subtotal + shippingCost;

  const update = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateShipping = () => {
    const e: Partial<FormData> = {};
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName) e.lastName = 'Required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.address) e.address = 'Required';
    if (!form.city) e.city = 'Required';
    if (!form.zip) e.zip = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Partial<FormData> = {};
    if (!form.cardName) e.cardName = 'Required';
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Valid card number required';
    if (!form.cardExpiry || !/^\d{2}\/\d{2}$/.test(form.cardExpiry)) e.cardExpiry = 'MM/YY format';
    if (!form.cardCvc || form.cardCvc.length < 3) e.cardCvc = 'Valid CVC required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (step === 0 && !validateShipping()) return;
    if (step === 1 && !validatePayment()) return;
    setStep(prev => Math.min(prev + 1, 2));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const order = {
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        })),
        shipping: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
          method: form.shipping
        },
        subtotal,
        shippingCost,
        total
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      const data = await res.json();
      clearCart();
      router.push(`/checkout/success?orderId=${data.id}`);
    } catch (err) {
      console.error('Order failed', err);
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '12rem', paddingBottom: '8rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Your Cart is Empty</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Add some items to your cart before checking out.</p>
        <Link href="/shop" className="button-ghost">Shop Now</Link>
      </div>
    );
  }

  const renderInput = (label: string, field: keyof FormData, type = 'text', placeholder = '') => (
    <div>
      <label className="input-label">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder}
        className={`input ${errors[field] ? 'input-error' : ''}`}
      />
      {errors[field] && <p className="error-text">{errors[field]}</p>}
    </div>
  );

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h1 style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>
          Checkout
        </h1>

        <StepIndicator steps={STEPS} currentStep={step} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem', alignItems: 'start' }}>
          {/* Form Area */}
          <div>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>Shipping Information</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      {renderInput('First Name', 'firstName', 'text', 'John')}
                      {renderInput('Last Name', 'lastName', 'text', 'Doe')}
                    </div>
                    {renderInput('Email', 'email', 'email', 'john@example.com')}
                    {renderInput('Address', 'address', 'text', '123 Main St')}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      {renderInput('City', 'city', 'text', 'New York')}
                      {renderInput('State', 'state', 'text', 'NY')}
                    </div>
                    {renderInput('ZIP Code', 'zip', 'text', '10001')}

                    <div style={{ marginTop: '1rem' }}>
                      <p className="input-label">Shipping Method</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <label style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1rem 1.25rem',
                          border: form.shipping === 'standard' ? '1px solid white' : '1px solid var(--border)',
                          cursor: 'pointer',
                          transition: 'border-color 0.3s'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <input
                              type="radio"
                              name="shipping"
                              value="standard"
                              checked={form.shipping === 'standard'}
                              onChange={() => update('shipping', 'standard')}
                              style={{ accentColor: 'white' }}
                            />
                            <div>
                              <p style={{ fontSize: '0.8rem', fontWeight: 500 }}>Standard Shipping</p>
                              <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>5-7 business days</p>
                            </div>
                          </div>
                          <span style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>{subtotal >= 150 ? 'Free' : '$10.00'}</span>
                        </label>
                        <label style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1rem 1.25rem',
                          border: form.shipping === 'express' ? '1px solid white' : '1px solid var(--border)',
                          cursor: 'pointer',
                          transition: 'border-color 0.3s'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <input
                              type="radio"
                              name="shipping"
                              value="express"
                              checked={form.shipping === 'express'}
                              onChange={() => update('shipping', 'express')}
                              style={{ accentColor: 'white' }}
                            />
                            <div>
                              <p style={{ fontSize: '0.8rem', fontWeight: 500 }}>Express Shipping</p>
                              <p style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>2-3 business days</p>
                            </div>
                          </div>
                          <span style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>$15.00</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>Payment Details</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.7rem', color: 'var(--muted)' }}>
                    <Lock size={14} />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {renderInput('Name on Card', 'cardName', 'text', 'John Doe')}
                    {renderInput('Card Number', 'cardNumber', 'text', '4242 4242 4242 4242')}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      {renderInput('Expiry', 'cardExpiry', 'text', 'MM/YY')}
                      {renderInput('CVC', 'cardCvc', 'text', '123')}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>Order Review</h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <p className="input-label" style={{ marginBottom: '1rem' }}>Shipping To</p>
                      <p style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
                        {form.firstName} {form.lastName}<br />
                        {form.address}<br />
                        {form.city}, {form.state} {form.zip}<br />
                        {form.email}
                      </p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.75rem' }}>
                        {form.shipping === 'express' ? 'Express (2-3 days)' : 'Standard (5-7 days)'}
                      </p>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <p className="input-label" style={{ marginBottom: '1rem' }}>Payment</p>
                      <p style={{ fontSize: '0.85rem' }}>
                        •••• •••• •••• {form.cardNumber.slice(-4)}
                      </p>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <p className="input-label" style={{ marginBottom: '1rem' }}>Items ({cart.length})</p>
                      {cart.map(item => (
                        <div key={getCartKey(item.id, item.size, item.color)} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                          <span>{item.name} × {item.quantity}{item.size ? ` (${item.size})` : ''}</span>
                          <span style={{ fontFamily: 'monospace' }}>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
              {step > 0 ? (
                <button onClick={prevStep} className="button-subtle">Back</button>
              ) : (
                <div />
              )}
              {step < 2 ? (
                <button onClick={nextStep} className="button-primary">Continue</button>
              ) : (
                <button onClick={handleSubmit} className="button-primary" disabled={submitting} style={{ minWidth: '200px' }}>
                  {submitting ? 'Processing...' : 'Place Order'}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '2rem',
            position: 'sticky',
            top: '8rem'
          }}>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, marginBottom: '2rem' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
              {cart.map(item => (
                <div key={getCartKey(item.id, item.size, item.color)} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '56px', height: '56px', background: 'var(--surface-2)', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase' }}>{item.name}</p>
                    {item.size && <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Size: {item.size}</p>}
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Qty {item.quantity} — ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                <span style={{ fontFamily: 'monospace' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Shipping</span>
                <span style={{ fontFamily: 'monospace' }}>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="divider" style={{ margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '1rem' }}>
                <span>Total</span>
                <span style={{ fontFamily: 'monospace' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem', fontSize: '0.65rem', color: 'var(--muted)' }}>
              <ShieldCheck size={14} />
              <span>Secure checkout — SSL encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
