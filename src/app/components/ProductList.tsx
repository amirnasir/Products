"use client";

import { useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import type { Product } from "@/app/types/product";
type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default"); // New state for sorting

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "name":
        return a.name.localeCompare(b.name);

      default:
        return 0;
    }
  });

  return (
    <section>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Reverse Osmosis">Reverse Osmosis</option>
        <option value="Whole House">Whole House</option>
        <option value="Filters">Filters</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name">Name</option>
      </select>

      <p>Showing {filteredProducts.length} products</p>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </section>
  );
}
