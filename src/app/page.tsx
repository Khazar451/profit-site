import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getProductsByTag, getCollections } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, RefreshCw, Star } from "lucide-react";

export default async function Home() {
  const products = await getProducts();
  const newArrivals = await getProductsByTag('new');
  const bestsellers = await getProductsByTag('bestseller');
  const collections = await getCollections();

  return (
    <>
      <Hero />
      
      {/* New Arrivals */}
      <ProductGrid 
        initialProducts={newArrivals.slice(0, 4)} 
        title="New Arrivals"
        subtitle="Fresh drops, just landed."
        viewAllHref="/collections/new-arrivals"
      />

      {/* Featured Collections */}
      <section style={{ padding: '4rem 0 8rem' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Collections</h2>
            <p className="section-subtitle">Curated selections for every facet of the urban experience.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {collections.map((collection: any) => (
              <Link key={collection.slug} href={`/collections/${collection.slug}`}>
                <div style={{
                  position: 'relative',
                  height: '400px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'border-color 0.4s'
                }}>
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    style={{ objectFit: 'cover', filter: 'brightness(0.35)', transition: 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2.5rem',
                    background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.6) 100%)'
                  }}>
                    <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {collection.name}
                    </h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '300px' }}>
                      {collection.description}
                    </p>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      Explore <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section style={{ background: 'var(--surface)' }}>
        <ProductGrid 
          initialProducts={bestsellers.slice(0, 4)} 
          title="Bestsellers"
          subtitle="The pieces our community can't live without."
          viewAllHref="/shop"
        />
      </section>

      {/* Brand Values */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', border: '1px solid var(--border-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={20} color="var(--muted)" />
              </div>
              <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>Free Shipping</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>On all orders over $150</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', border: '1px solid var(--border-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RefreshCw size={20} color="var(--muted)" />
              </div>
              <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>30-Day Returns</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>Easy, hassle-free returns</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', border: '1px solid var(--border-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={20} color="var(--muted)" />
              </div>
              <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>Secure Checkout</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>SSL encrypted payment</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', border: '1px solid var(--border-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={20} color="var(--muted)" />
              </div>
              <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>Premium Quality</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>Ethically made in Europe</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
