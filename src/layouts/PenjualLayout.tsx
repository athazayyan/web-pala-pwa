import { useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { to: "/penjual/barang", icon: "inventory_2", label: "Barang Saya" },
  { to: "/penjual/tambah", icon: "add_box", label: "Tambah Barang" },
  { to: "/penjual/pesanan", icon: "receipt_long", label: "Pemesanan" },
  { to: "/penjual/finansial", icon: "payments", label: "Finansial" },
  { to: "/penjual/kebun", icon: "forest", label: "Kelola Kebun" },
]

export function PenjualLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="flex h-screen bg-surface-container-lowest overflow-hidden">
      {/* ── Sidebar (desktop) ──────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-64 bg-primary text-on-primary shrink-0 relative z-20">
        {/* Brand */}
        <div className="px-6 pt-8 pb-6 border-b border-on-primary/10">
          <a href="/" className="font-display-b2c text-2xl text-on-primary hover:opacity-80 transition-opacity block">
            Athesa Nutmeg
          </a>
          <p className="text-[10px] font-label-caps text-on-primary/50 mt-1 uppercase tracking-widest">
            Portal Penjual
          </p>
        </div>

        {/* Seller Profile */}
        <div className="px-6 py-5 border-b border-on-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-lg shrink-0">
              {user?.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-display-b2c text-sm text-on-primary leading-tight truncate">{user?.nama}</p>
              <p className="text-[10px] text-on-primary/50 font-mono truncate">{user?.email}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
            <span className="text-[10px] text-on-primary/60 font-label-caps">Terverifikasi • Online</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-label-caps text-[13px] transition-all ${
                  isActive
                    ? "bg-on-primary/15 text-on-primary font-semibold"
                    : "text-on-primary/60 hover:bg-on-primary/8 hover:text-on-primary"
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: Help & version */}
        <div className="px-6 py-4 border-t border-on-primary/10">
          <p className="text-[10px] text-on-primary/30 font-mono">Athesa Nutmeg v2026.07</p>
        </div>
      </aside>

      {/* ── Mobile Sidebar Overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-primary text-on-primary z-40 md:hidden flex flex-col"
            >
              <div className="px-6 pt-8 pb-6 border-b border-on-primary/10">
                <a href="/" className="font-display-b2c text-2xl text-on-primary">Athesa Nutmeg</a>
                <p className="text-[10px] font-label-caps text-on-primary/50 mt-1 uppercase tracking-widest">Portal Penjual</p>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-label-caps text-[13px] transition-all ${
                        isActive ? "bg-on-primary/15 text-on-primary font-semibold" : "text-on-primary/60 hover:bg-on-primary/8 hover:text-on-primary"
                      }`
                    }
                  >
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-surface border-b border-outline-variant/20 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
              <a href="/" className="hover:text-primary transition-colors font-label-caps">Beranda</a>
              <span>/</span>
              <span className="text-on-surface font-semibold font-label-caps">Portal Penjual</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-on-error rounded-full text-[9px] flex items-center justify-center font-bold">3</span>
            </button>
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-label-caps text-error border border-error/30 px-4 py-1.5 rounded-lg hover:bg-error/5 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
