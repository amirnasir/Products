
import  ProductList from "@/app/components/ProductList";
import {getProducts} from "@/app/lib/products";

export default async function ProductsPage() {    
    const products = await getProducts();
    return (
        <main>
            <h1>Products</h1>
            <ProductList products={products} />
        </main>
    );
}





// import ProductCard from "@/app/components/ProductCard";
// import { getProducts } from "@/app/lib/products";

// export default async function ProductsPage() {
//   const products = await getProducts();
//   return (
//     <main>
//       <h1>Poducts</h1>

//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </main>
//   );
// }
