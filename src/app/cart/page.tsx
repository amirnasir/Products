"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, increase, decrease, clearCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main>
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Shopping Cart</h1>

      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>Price: ${item.price.toFixed(2)}</p>
          <div>
            <button onClick={() => decrease(item.id)}>−</button>

            <span style={{ margin: "0 12px" }}>{item.quantity}</span>

            <button onClick={() => increase(item.id)}>+</button>
          </div>

          <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>

          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>
      <Link href="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
      
      <button onClick={clearCart}>Clear Cart</button>
    </main>
  );
}
