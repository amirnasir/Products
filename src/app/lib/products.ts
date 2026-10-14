import { products } from "../data/products";
import type { Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  return products;
};