import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../context/CartContext"
import { ChatbotApoteker } from "../components/ChatbotApoteker"
export function B2CLayout() {
  const location = useLocation()
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartCount } = useCart()

  const getLinkClass = (path: string) => {
    const base = "font-label-caps text-label-caps transition-colors "
    const active = "text-primary border-b-2 border-tertiary pb-1"
    const inactive = "text-on-surface-variant hover:text-tertiary"
    return location.pathname === path ? `${base}${active}` : `${base}${inactive}`
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-4 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
        <div className="flex items-center gap-12">
          <Link className="font-display-b2c text-[28px] text-primary" to="/">
            PalaMart
          </Link>
          <div className="hidden md:flex gap-8">
            <Link className={getLinkClass("/")} to="/">Beranda</Link>
            <Link className={getLinkClass("/services")} to="/services">Marketplace</Link>
            <Link className={getLinkClass("/about")} to="/about">Dampak</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link to="/cart" className="text-primary hover:text-tertiary transition-all active:scale-95 relative flex items-center p-1.5 rounded-full hover:bg-surface-container-low">
            <span className="material-symbols-outlined">shopping_basket</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-tertiary text-on-tertiary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-surface shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            /* Logged-in state */
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/30">
                <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                  {user?.avatar}
                </div>
                <span className="font-label-caps text-xs text-on-surface">{user?.nama}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 font-label-caps text-label-caps text-error border border-error/30 px-3 py-2 rounded-lg hover:bg-error/5 transition-all active:scale-95 text-xs"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Logout
              </button>
            </div>
          ) : (
            /* Guest state */
            <>
              <Link
                to="/login"
                className="hidden md:flex font-label-caps text-label-caps text-primary border border-primary/40 px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="hidden md:flex font-label-caps text-label-caps bg-primary text-on-primary px-4 py-2 rounded-lg hover:opacity-90 transition-all"
              >
                Daftar
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary hover:text-tertiary transition-all active:scale-95 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter bg-primary text-on-primary">
        <div className="col-span-1">
          <Link className="font-display-b2c text-headline-lg text-on-primary block mb-6" to="/">
            PalaMart
          </Link>
          <p className="font-body-sm text-on-primary/60 max-w-[240px]">
            Menghubungkan kearifan rempah Nusantara dengan pasar global melalui teknologi modern.
          </p>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-tertiary-fixed mb-6 uppercase tracking-wider">Platform</h5>
          <ul className="space-y-4 font-body-sm text-on-primary/80">
            <li><Link className="hover:text-secondary-fixed transition-colors" to="/services">Marketplace</Link></li>
            <li><a className="hover:text-secondary-fixed transition-colors" href="#sustain">Laporan Keberlanjutan</a></li>
            <li><a className="hover:text-secondary-fixed transition-colors" href="#guide">Panduan Rempah</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-tertiary-fixed mb-6 uppercase tracking-wider">Akun</h5>
          <ul className="space-y-4 font-body-sm text-on-primary/80">
            {isLoggedIn ? (
              <li><button onClick={handleLogout} className="hover:text-secondary-fixed transition-colors">Logout</button></li>
            ) : (
              <>
                <li><Link className="hover:text-secondary-fixed transition-colors" to="/login">Masuk</Link></li>
                <li><Link className="hover:text-secondary-fixed transition-colors" to="/register">Daftar Pembeli</Link></li>
                <li><Link className="hover:text-secondary-fixed transition-colors" to="/register">Daftar Penjual</Link></li>
              </>
            )}
          </ul>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-tertiary-fixed mb-6 uppercase tracking-wider">Newsletter</h5>
          <div className="flex">
            <input className="bg-primary-container border-none focus:ring-1 focus:ring-tertiary-fixed rounded-l-lg w-full text-on-primary placeholder:text-on-primary/40 text-sm px-4" placeholder="Email Anda" type="email" />
            <button className="bg-tertiary-fixed text-on-tertiary-fixed px-4 rounded-r-lg hover:bg-tertiary-fixed-dim transition-all">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
          <p className="mt-8 font-body-sm text-on-primary/40">© 2026 PalaMart. Dari Nusantara untuk Dunia.</p>
        </div>
      </footer>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Drawer Sheet */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-surface text-on-surface shadow-2xl z-50 md:hidden flex flex-col border-l border-outline-variant/30"
            >
              {/* Header inside drawer */}
              <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
                <span className="font-display-b2c text-xl text-primary font-bold">PalaMart</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-on-surface hover:text-primary transition-all active:scale-95 flex items-center"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 px-6 py-8 flex flex-col gap-6">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-label-caps text-[15px] tracking-wide py-2 border-b border-outline-variant/10 ${
                    location.pathname === "/" ? "text-primary font-bold" : "text-on-surface-variant"
                  }`}
                >
                  Beranda
                </Link>
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-label-caps text-[15px] tracking-wide py-2 border-b border-outline-variant/10 ${
                    location.pathname === "/services" ? "text-primary font-bold" : "text-on-surface-variant"
                  }`}
                >
                  Marketplace
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-label-caps text-[15px] tracking-wide py-2 border-b border-outline-variant/10 ${
                    location.pathname === "/about" ? "text-primary font-bold" : "text-on-surface-variant"
                  }`}
                >
                  Dampak
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-label-caps text-[15px] tracking-wide py-2 border-b border-outline-variant/10 flex justify-between items-center ${
                    location.pathname === "/cart" ? "text-primary font-bold" : "text-on-surface-variant"
                  }`}
                >
                  <span>Keranjang</span>
                  {cartCount > 0 && (
                    <span className="bg-tertiary text-on-tertiary text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Auth actions at bottom of drawer */}
              <div className="p-6 border-t border-outline-variant/20 bg-surface-container-lowest">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-lg border border-outline-variant/30">
                      <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-bold">
                        {user?.avatar}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-caps text-xs font-semibold text-on-surface truncate">{user?.nama}</span>
                        <span className="text-[10px] text-on-surface-variant truncate">{user?.email}</span>
                      </div>
                    </div>
                    {user?.role === "penjual" && (
                      <Link
                        to="/penjual/barang"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 font-label-caps text-xs bg-secondary text-on-secondary py-2.5 rounded-lg hover:opacity-90 transition-all font-semibold"
                      >
                        <span className="material-symbols-outlined text-sm">storefront</span>
                        Dashboard Penjual
                      </Link>
                    )}
                    {user?.role === "admin" && (
                      <Link
                        to="/b2b"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 font-label-caps text-xs bg-secondary text-on-secondary py-2.5 rounded-lg hover:opacity-90 transition-all font-semibold"
                      >
                        <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                        Dashboard Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center justify-center gap-1.5 font-label-caps text-xs text-error border border-error/30 py-2.5 rounded-lg hover:bg-error/5 transition-all w-full"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span>
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex justify-center items-center font-label-caps text-label-caps text-primary border border-primary/40 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all text-xs font-semibold"
                    >
                      Masuk
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex justify-center items-center font-label-caps text-label-caps bg-primary text-on-primary py-2.5 rounded-lg hover:opacity-90 transition-all text-xs font-semibold"
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <ChatbotApoteker />
    </div>
  )
}
