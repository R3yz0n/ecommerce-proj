"use client"

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulate auth state

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
