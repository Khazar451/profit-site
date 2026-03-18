import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/db";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <ProductGrid initialProducts={products} />
      <section style={{ padding: '8rem 0', background: '#0a0a0a' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '3rem' }}>Join the Underground</h2>
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', borderBottom: '1px solid #444' }}>
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              style={{ flex: 1, background: 'none', border: 'none', color: 'white', padding: '1rem', outline: 'none' }} 
            />
            <button style={{ background: 'none', border: 'none', color: 'white', padding: '1rem', cursor: 'pointer', letterSpacing: '1px' }}>JOIN</button>
          </div>
        </div>
      </section>
    </>
  );
}
