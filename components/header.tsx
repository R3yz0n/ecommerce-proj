"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import CartDrawer from "./cart-drawer"

export default function Header() {
  const { isLoggedIn, login, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-bold">AcmeStore</span>
        </Link>
        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button onClick={logout} variant="ghost">
              Logout
            </Button>
          ) : (
            <Link href="/login" passHref>
              <Button variant="ghost">Login / Signup</Button>
            </Link>
          )}
          <CartDrawer />
        </nav>
      </div>
    </header>
  )
}
