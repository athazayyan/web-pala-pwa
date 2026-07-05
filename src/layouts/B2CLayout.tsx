import { Outlet, Link } from "react-router-dom"
import { ModeSwitcher } from "../components/ModeSwitcher"

export function B2CLayout() {
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-4 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
        <div className="flex items-center gap-12">
          <Link className="font-display-b2c text-[32px] text-primary" to="/">
            Athesa Nutmeg
          </Link>
          <div className="hidden md:flex gap-8">
            <Link className="font-label-caps text-label-caps text-primary border-b-2 border-tertiary pb-1 hover:text-tertiary transition-colors" to="/">
              Marketplace
            </Link>
            <Link className="font-label-caps text-label-caps text-on-surface-variant hover:text-tertiary transition-colors" to="/jejak">
              Traceability
            </Link>
            <Link className="font-label-caps text-label-caps text-on-surface-variant hover:text-tertiary transition-colors" to="/about">
              Impact
            </Link>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-tertiary transition-colors" href="#services">
              Services
            </a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* Dual-Market Switcher */}
          <ModeSwitcher />
          
          <div className="flex items-center gap-4 text-primary">
            <button className="hover:text-tertiary transition-all active:scale-95">
              <span className="material-symbols-outlined" data-icon="shopping_basket">shopping_basket</span>
            </button>
            <button className="hover:text-tertiary transition-all active:scale-95">
              <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
            </button>
          </div>
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
            Bridging the terroir of Tapaktuan with the global epicurean market.
          </p>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-tertiary-fixed mb-6 uppercase tracking-wider">Protocol</h5>
          <ul className="space-y-4 font-body-sm text-on-primary/80">
            <li><a className="hover:text-secondary-fixed transition-colors" href="#trace">Traceability Protocol</a></li>
            <li><a className="hover:text-secondary-fixed transition-colors" href="#sustain">Sustainability Report</a></li>
            <li><Link className="hover:text-secondary-fixed transition-colors" to="/b2b">B2B Terms</Link></li>
            <li><a className="hover:text-secondary-fixed transition-colors" href="#guide">Spice Apothecary Guide</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-tertiary-fixed mb-6 uppercase tracking-wider">Connect</h5>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-on-primary/20 flex items-center justify-center hover:bg-on-primary hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined text-sm" data-icon="public">public</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-on-primary/20 flex items-center justify-center hover:bg-on-primary hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined text-sm" data-icon="mail">mail</span>
            </a>
          </div>
        </div>
        <div>
          <h5 className="font-label-caps text-label-caps text-tertiary-fixed mb-6 uppercase tracking-wider">Newsletter</h5>
          <div className="flex">
            <input className="bg-primary-container border-none focus:ring-1 focus:ring-tertiary-fixed rounded-l-lg w-full text-on-primary placeholder:text-on-primary/40 text-sm" placeholder="Email" type="email" />
            <button className="bg-tertiary-fixed text-on-tertiary-fixed px-4 rounded-r-lg hover:bg-tertiary-fixed-dim transition-all">
              <span className="material-symbols-outlined" data-icon="send">send</span>
            </button>
          </div>
          <p className="mt-8 font-body-sm text-on-primary/40">© 2026 Athesa Nutmeg. From Tapaktuan with Wisdom.</p>
        </div>
      </footer>
    </div>
  )
}
