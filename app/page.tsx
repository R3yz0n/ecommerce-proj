import Header from "@/components/header"
import ProductGrid from "@/components/product-grid"
import { getProducts } from "@/lib/data"

export default async function Home() {
  const products = await getProducts() // Server-side data fetching

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6">
        <h1 className="text-4xl font-extrabold text-center mb-12 tracking-tight">Discover Our Collection</h1>
        <ProductGrid products={products} />
      </main>
      <footer className="w-full py-6 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} AcmeStore. All rights reserved.
      </footer>
    </div>
  )
}
