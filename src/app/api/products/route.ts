import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getProductsByCategory, getProductsByTag, searchProducts } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const q = searchParams.get('q');
    const sort = searchParams.get('sort');

    let products;

    if (q) {
      products = await searchProducts(q);
    } else if (category) {
      products = await getProductsByCategory(category);
    } else if (tag) {
      products = await getProductsByTag(tag);
    } else {
      products = await getProducts();
    }

    // Sort
    if (sort) {
      switch (sort) {
        case 'price-asc':
          products.sort((a: any, b: any) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a: any, b: any) => b.price - a.price);
          break;
        case 'name-asc':
          products.sort((a: any, b: any) => a.name.localeCompare(b.name));
          break;
        case 'newest':
          products.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
