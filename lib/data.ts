import type { Product } from "./types"

export const products: Product[] = [
  {
    id: "1",
    name: "Vintage Camera",
    description: "Capture timeless moments with this classic film camera.",
    price: 120.0,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "2",
    name: "Leather Backpack",
    description: "Stylish and durable, perfect for daily commutes or adventures.",
    price: 95.0,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "3",
    name: "Espresso Machine",
    description: "Brew professional-grade coffee at home with ease.",
    price: 350.0,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "4",
    name: "Wireless Headphones",
    description: "Immersive sound and comfortable fit for all-day listening.",
    price: 150.0,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "5",
    name: "Smartwatch",
    description: "Stay connected and track your fitness with this sleek device.",
    price: 220.0,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "6",
    name: "Portable Speaker",
    description: "Enjoy crisp, clear audio wherever you go.",
    price: 75.0,
    image: "/placeholder.svg?height=400&width=300",
  },
]

export async function getProducts(): Promise<Product[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 500)
  })
}
