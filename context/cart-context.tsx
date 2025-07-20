"use client"

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"
import type { CartItem, Product } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id)
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
          )
        } else {
          toast({
            title: "Item added to cart!",
            description: `${product.name} has been added.`,
          })
          return [...prevItems, { ...product, quantity }]
        }
      })
    },
    [toast],
  )

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const getTotalItems = useMemo(() => {
    return () => cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const getTotalPrice = useMemo(() => {
    return () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
