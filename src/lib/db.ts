import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

export async function getDb() {
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function getProducts() {
  const db = await getDb();
  return db.products;
}

export async function getProductById(id: string) {
  const db = await getDb();
  const product = db.products.find((p: any) => p.id === id);
  if (!product) return null;
  
  // Attach reviews and stock info (mocking the Prisma include)
  const productReviews = db.reviews.filter((r: any) => r.productId === id).map((r: any) => ({
    ...r,
    user: db.users.find((u: any) => u.id === r.userId)
  }));

  return {
    ...product,
    reviews: productReviews
  };
}

export async function getUsers() {
  const db = await getDb();
  return db.users;
}

export async function getReviews() {
  const db = await getDb();
  return db.reviews;
}
