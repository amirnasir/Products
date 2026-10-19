"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/app/types/Order";

export default function CheckoutPage() {
  const { items } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0 );

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>  ) => { e.preventDefault();

    if (submitting) return;

    if (!name.trim() || !address.trim() || !email.trim()) {
      setMessage("Please complete all fields.");
      return;
    }

    if (items.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    const order: CreateOrderRequest = {
      name: name.trim(),
      address: address.trim(),
      email: email.trim(),
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to submit order."
        );
      }

      const success = result as CreateOrderResponse;

      setMessage(
        `Demo order accepted! Order ID: ${success.orderId}. Total: $${success.total.toFixed(2)}`
      );

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ padding: "30px", maxWidth: "600px" }}>
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              border: "1px solid #aaa",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              border: "1px solid #aaa",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="address">Address</label>

          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              border: "1px solid #aaa",
            }}
          />
        </div>

        <h2>Order Summary</h2>

        {items.map((item) => (
          <p key={item.id}>
            {item.name} × {item.quantity} — $
            {(item.price * item.quantity).toFixed(2)}
          </p>
        ))}

        <h2>Total: ${total.toFixed(2)}</h2>

        <button
          type="submit"
          disabled={submitting}
          style={{
            marginTop: "15px",
            padding: "12px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            cursor: submitting ? "wait" : "pointer",
          }}
        >
          {submitting ? "Submitting..." : "Place Demo Order"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "20px" }}>
          {message}
        </p>
      )}
    </main>
  );
}