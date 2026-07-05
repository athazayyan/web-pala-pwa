import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6zqMoS8kDbvYN4di4y3muAEG24VkgYKXnkWiELmiDK_oPtR9jnlN1EtUmzZz26oy7PpIVk80PyxeHR-ppfahVDuaEocIxg8AG2Q09jFoFmqcCn4aSY0XRWgAuFwrvrqNf1UGsmbTR4wIUMuZQUxWzWVFDMC9mkVC0rX0gz2XHAGkaI_Fhqw2xBxynPURG9Izjt42Ic9VS0hdfWEiF5CD-4DVlv4HZl15_hfu3osgEeILsw5Bz3Q')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface/95 to-primary/10" />
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Auth card */}
      <div className="w-full max-w-md px-4 py-12 relative z-10">
        <Outlet />
      </div>
    </div>
  )
}
