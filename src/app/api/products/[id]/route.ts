import { products } from "@/app/data/products";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(  request: Request,  context: RouteContext
) {
  const { id } = await context.params;

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return Response.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return Response.json(product);
}