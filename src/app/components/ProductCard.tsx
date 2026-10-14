"use client";
import type { Product } from "@/app/types/product";
import Link from "next/link";
import {useCart}  from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
};



export default function ProductCard({ product }: ProductCardProps) {
  const {addItem} = useCart();
  return (
    <div>
      <h2>{product.name}</h2>

      <p>{product.category}</p>

      <p>${product.price.toFixed(2)}</p>

      <Link href={`/products/${product.id}`}>View Details</Link>

      <button
        onClick={() => {addItem(product)}}>
        Add to Cart
      </button>
    </div>
  );
}
