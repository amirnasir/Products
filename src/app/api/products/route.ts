import { products } from "@/app/data/products";

export async function GET() {
  return Response.json(products);
}