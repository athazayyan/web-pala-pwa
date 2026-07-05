import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function B2CLayout() {
  const location = useLocation()
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

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
            Athesa Nutmeg
          </Link>
          <div className="hidden md:flex gap-8">
            <Link className={getLinkClass("/")} to="/">Beranda</Link>
            <Link className={getLinkClass("/services")} to="/services">Marketplace</Link>
            <Link className={getLinkClass("/about")} to="/about">Dampak</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Cart */}
          <button className="text-primary hover:text-tertiary transition-all active:scale-95">
            <span className="material-symbols-outlined">shopping_basket</span>
          </button>

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

          {/* Mobile */}
          <button className="md:hidden text-primary hover:text-tertiary transition-all active:scale-95">
            <span className="material-symbols-outlined">account_circle</span>
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
            Athesa Nutmeg
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
          <p className="mt-8 font-body-sm text-on-primary/40">© 2026 Athesa Nutmeg. Dari Nusantara untuk Dunia.</p>
        </div>
      </footer>
    </div>
  )
}
