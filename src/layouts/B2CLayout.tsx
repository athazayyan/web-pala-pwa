import { Outlet, Link, useLocation } from "react-router-dom"

export function B2CLayout() {
  const location = useLocation()

  const getLinkClass = (path: string) => {
    const base = "font-label-caps text-label-caps transition-colors "
    const active = "text-primary border-b-2 border-tertiary pb-1"
    const inactive = "text-on-surface-variant hover:text-tertiary"
    return location.pathname === path ? `${base}${active}` : `${base}${inactive}`
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
            <Link className={getLinkClass("/")} to="/">
              Beranda
            </Link>
            <Link className={getLinkClass("/jejak")} to="/jejak">
              Jejak Rempah
            </Link>
            <Link className={getLinkClass("/about")} to="/about">
              Dampak
            </Link>
            <Link className={getLinkClass("/services")} to="/services">
              Marketplace
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Cart */}
          <button className="text-primary hover:text-tertiary transition-all active:scale-95">
            <span className="material-symbols-outlined">shopping_basket</span>
          </button>

          {/* Auth Buttons */}
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

          {/* Mobile user icon */}
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
        <div className="col-span-1 md:col-span-1">
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
            <li><Link className="hover:text-secondary-fixed transition-colors" to="/jejak">Jejak Rempah</Link></li>
            <li><a className="hover:text-secondary-fixed transition-colors" href="#sustain">Laporan Keberlanjutan</a></li>
            <li><a className="hover:text-secondary-fixed transition-colors" href="#guide">Panduan Rempah</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-tertiary-fixed mb-6 uppercase tracking-wider">Akun</h5>
          <ul className="space-y-4 font-body-sm text-on-primary/80">
            <li><Link className="hover:text-secondary-fixed transition-colors" to="/login">Masuk</Link></li>
            <li><Link className="hover:text-secondary-fixed transition-colors" to="/register">Daftar Pembeli</Link></li>
            <li><Link className="hover:text-secondary-fixed transition-colors" to="/register">Daftar Penjual</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-tertiary-fixed mb-6 uppercase tracking-wider">Newsletter</h5>
          <div className="flex">
            <input
              className="bg-primary-container border-none focus:ring-1 focus:ring-tertiary-fixed rounded-l-lg w-full text-on-primary placeholder:text-on-primary/40 text-sm px-4"
              placeholder="Email Anda"
              type="email"
            />
            <button className="bg-tertiary-fixed text-on-tertiary-fixed px-4 rounded-r-lg hover:bg-tertiary-fixed-dim transition-all">
              <span className="material-symbols-outlined" data-icon="send">send</span>
            </button>
          </div>
          <p className="mt-8 font-body-sm text-on-primary/40">© 2026 Athesa Nutmeg. Dari Nusantara untuk Dunia.</p>
        </div>
      </footer>
    </div>
  )
}
