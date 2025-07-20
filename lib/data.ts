import type { Product } from "./types"

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    price: 299.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Audio",
    rating: { stars: 4, count: 127 },
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Advanced smartwatch with health monitoring, GPS, and long-lasting battery...",
    price: 399.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Wearable",
    rating: { stars: 4, count: 127 },
  },
  {
    id: "3",
    name: "Ultra-thin Laptop",
    description: "Powerful and portable laptop perfect for work, creativity, and entertainment.",
    price: 1299.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Computing",
    rating: { stars: 4, count: 127 },
  },
  {
    id: "4",
    name: "Wireless Gaming Mouse",
    description: "High-precision wireless gaming mouse with customizable RGB lighting.",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Gaming",
    rating: { stars: 4, count: 127 },
  },
  {
    id: "5",
    name: "Professional DSLR Camera",
    description: "Capture stunning photos and videos with this high-performance camera.",
    price: 1499.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Photography",
    rating: { stars: 4, count: 127 },
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description: "Enjoy crisp, clear audio wherever you go with this compact speaker.",
    price: 75.0,
    image: "/placeholder.svg?height=400&width=300",
    category: "Audio",
    rating: { stars: 4, count: 127 },
  },
  {
    id: "7",
    name: "Ergonomic Keyboard",
    description: "Designed for comfort and efficiency, perfect for long typing sessions.",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Gaming",
    rating: { stars: 4, count: 127 },
  },
  {
    id: "8",
    name: "Fitness Tracker Band",
    description: "Monitor your health and activity with this sleek and comfortable band.",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Wearable",
    rating: { stars: 4, count: 127 },
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
