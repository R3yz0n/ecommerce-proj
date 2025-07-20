"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { useCart } from "@/context/cart-context"

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={300}
          className="w-full aspect-[4/3] object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-semibold mb-2">{product.name}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{product.description}</p>
        <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
