import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type UserRole = "pembeli" | "penjual" | "admin"

export interface AuthUser {
  role: UserRole
  nama: string
  email: string
  penjualId?: "ahmad" | "pinkan"
  avatar: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem("athesa_user")
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = (u: AuthUser) => {
    setUser(u)
    localStorage.setItem("athesa_user", JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("athesa_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
