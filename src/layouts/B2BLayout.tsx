
import { Outlet, Link } from "react-router-dom"
import { ModeSwitcher } from "../components/ModeSwitcher"
import { LayoutDashboard, Truck, Leaf, PackageSearch } from "lucide-react"

export function B2BLayout() {
  return (
    <div className="flex min-h-screen bg-slate-clean text-on-surface font-inter selection:bg-tertiary-container/20 selection:text-tertiary-container">
      {/* Sidebar */}
      <aside className="w-64 border-r border-outline-variant/30 bg-surface-container-lowest flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-outline-variant/30">
          <Link to="/b2b" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-on-surface">Athesa</span>
            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-mono">B2B Core</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <Link to="/b2b" className="flex items-center gap-3 px-3 py-2 rounded-md bg-surface-container hover:bg-surface-container-high transition-colors font-medium">
            <LayoutDashboard className="w-4 h-4 text-tertiary-container" />
            Control Center
          </Link>
          <Link to="/b2b/logistics" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-on-surface-variant">
            <Truck className="w-4 h-4" />
            Modular Logistics
          </Link>
          <Link to="/b2b/marketplace" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-on-surface-variant">
            <PackageSearch className="w-4 h-4" />
            Pala Marketplace
          </Link>
          <Link to="/b2b/farmers" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-container transition-colors text-on-surface-variant">
            <Leaf className="w-4 h-4" />
            Farmer Network
          </Link>
        </nav>
        <div className="p-4 border-t border-outline-variant/30">
           <ModeSwitcher />
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center px-8 border-b border-outline-variant/30 bg-surface-container-lowest justify-between sticky top-0 z-10">
          <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-4 text-sm font-mono text-on-surface-variant">
            <span>SYS.OP: NORMAL</span>
            <span className="text-secondary font-bold">● CONNECTED</span>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
