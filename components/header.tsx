"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import CartDrawer from "./cart-drawer"
import { Input } from "@/components/ui/input"
import { SearchIcon, UserIcon } from "lucide-react"
import type React from "react"

export default function Header({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string
  onSearchChange: (term: string) => void
}) {
  const { isLoggedIn, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className="font-extrabold text-2xl text-gray-900">E</span>
          <span className="text-xl font-semibold text-gray-900">EliteShop</span>
        </Link>
        <div className="relative flex-1 max-w-md mx-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
        </div>
        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button onClick={logout} variant="ghost" className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Logout
            </Button>
          ) : (
            <Link href="/login" passHref>
              <Button variant="ghost" className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Login
              </Button>
            </Link>
          )}
          <CartDrawer />
        </nav>
      </div>
    </header>
  )
}
