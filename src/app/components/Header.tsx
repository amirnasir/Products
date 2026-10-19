"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";


export default function Header() {
  const { items } = useCart();

const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>

      <nav style={{display: "flex", gap: "20px" , padding: "20px" , borderBottom: "1px solid #ddd"} }>
        <Link href="/">Home</Link> |
        <Link href="/products">Products</Link> |
        <Link href="/cart">Cart ({cartCount})</Link>
      </nav>
    </header>
  );
}
