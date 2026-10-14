import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h2>Water Store</h2>
      <nav>
        <Link href="/">Home</Link> |
        <Link href="/products">Products</Link> |
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
  );
}
