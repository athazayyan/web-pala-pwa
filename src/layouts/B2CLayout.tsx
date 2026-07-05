
import { Outlet, Link } from "react-router-dom"
import { ModeSwitcher } from "../components/ModeSwitcher"

export function B2CLayout() {
  return (
    <div className="min-h-screen bg-cream-warm text-on-background font-playfair selection:bg-primary/20 selection:text-primary">
      <header className="sticky top-0 z-50 w-full border-b border-outline-variant/30 bg-cream-warm/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center px-gutter md:px-margin-desktop justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">Athesa</span>
            <span className="text-sm italic text-on-surface-variant font-inter">Nutmeg</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 font-inter text-sm">
            <Link to="/jejak" className="hover:text-primary transition-colors">Jejak Rempah</Link>
            <Link to="/apoteker" className="hover:text-primary transition-colors">Apoteker Rempah</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Story</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ModeSwitcher />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-gutter md:px-margin-desktop py-12 md:py-24">
        <Outlet />
      </main>
      <footer className="border-t border-outline-variant/30 py-12 mt-24 text-center font-inter text-sm text-on-surface-variant">
        <p>&copy; 2026 Athesa Nutmeg. Heritage & Efficiency.</p>
      </footer>
    </div>
  )
}
