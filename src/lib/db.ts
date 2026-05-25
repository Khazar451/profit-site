import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

export async function getDb() {
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function writeDb(db: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export async function getProducts() {
  const db = await getDb();
  return db.products;
}

export async function getProductById(id: string) {
  const db = await getDb();
  const product = db.products.find((p: any) => p.id === id);
  if (!product) return null;
  
  const productReviews = db.reviews.filter((r: any) => r.productId === id).map((r: any) => ({
    ...r,
    user: db.users.find((u: any) => u.id === r.userId)
  }));

  return {
    ...product,
    reviews: productReviews
  };
}

export async function getProductsByCategory(category: string) {
  const db = await getDb();
  return db.products.filter((p: any) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getProductsByTag(tag: string) {
  const db = await getDb();
  return db.products.filter((p: any) => p.tags?.includes(tag));
}

export async function getCategories(): Promise<string[]> {
  const db = await getDb();
  const categories = new Set<string>(db.products.map((p: any) => p.category));
  return Array.from(categories);
}

export async function searchProducts(query: string) {
  const db = await getDb();
  const q = query.toLowerCase();
  return db.products.filter((p: any) =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags?.some((t: string) => t.toLowerCase().includes(q))
  );
}

export async function getCollections() {
  const db = await getDb();
  return db.collections || [];
}

export async function getCollectionBySlug(slug: string) {
  const db = await getDb();
  const collection = db.collections?.find((c: any) => c.slug === slug);
  if (!collection) return null;
  
  const products = db.products.filter((p: any) =>
    p.tags?.some((t: string) => collection.tags.includes(t))
  );
  
  return { ...collection, products };
}

export async function getRelatedProducts(productId: string, limit = 4) {
  const db = await getDb();
  const product = db.products.find((p: any) => p.id === productId);
  if (!product) return [];
  
  return db.products
    .filter((p: any) => p.id !== productId && (p.category === product.category || p.tags?.some((t: string) => product.tags?.includes(t))))
    .slice(0, limit);
}

export async function createOrder(order: any) {
  const db = await getDb();
  const newOrder = {
    ...order,
    id: `o${Date.now()}`,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  db.orders = db.orders || [];
  db.orders.push(newOrder);
  await writeDb(db);
  return newOrder;
}

export async function addNewsletterEmail(email: string) {
  const db = await getDb();
  db.newsletter = db.newsletter || [];
  if (!db.newsletter.includes(email)) {
    db.newsletter.push(email);
    await writeDb(db);
  }
  return { success: true };
}

export async function getUsers() {
  const db = await getDb();
  return db.users;
}

export async function getReviews() {
  const db = await getDb();
  return db.reviews;
}
