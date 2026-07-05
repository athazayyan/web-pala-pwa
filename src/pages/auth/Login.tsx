import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

type Role = "pembeli" | "penjual" | "admin"

const roles: { value: Role; label: string; icon: string }[] = [
  { value: "pembeli", label: "Pembeli", icon: "shopping_basket" },
  { value: "penjual", label: "Penjual", icon: "storefront" },
  { value: "admin", label: "Admin", icon: "admin_panel_settings" },
]

export function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [selectedRole, setSelectedRole] = useState<Role>("pembeli")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi.")
      return
    }
    setError(null)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Redirect based on role
      if (selectedRole === "admin") navigate("/b2b")
      else navigate("/")
    }, 1600)
  }

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    setError(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-surface border border-outline-variant/30 rounded-xl shadow-2xl p-8 space-y-6"
    >
      {/* Brand */}
      <div className="text-center space-y-1">
        <Link to="/" className="font-display-b2c text-2xl text-primary block hover:opacity-80 transition-opacity">
          Athesa Nutmeg
        </Link>
        <h1 className="font-display-b2c text-xl text-on-surface">Masuk ke Akun</h1>
        <p className="text-on-surface-variant text-sm">Selamat datang kembali di platform rempah Nusantara</p>
      </div>

      {/* Role Selector */}
      <div className="grid grid-cols-3 gap-2">
        {roles.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => setSelectedRole(r.value)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-center transition-all ${
              selectedRole === r.value
                ? "border-primary bg-primary/5 text-primary"
                : "border-outline-variant/30 text-on-surface-variant hover:border-primary/40"
            }`}
          >
            <span className="material-symbols-outlined text-xl">{r.icon}</span>
            <span className="font-label-caps text-[11px] font-semibold">{r.label}</span>
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
            Alamat Email
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">
              mail
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="contoh@email.com"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="font-label-caps text-label-caps text-on-surface-variant">
              Password
            </label>
            <a href="#" className="text-xs text-primary hover:underline">
              Lupa password?
            </a>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">
              lock
            </span>
            <input
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Masukkan password"
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary"
            >
              <span className="material-symbols-outlined text-lg">
                {showPass ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-error text-sm bg-error-container/30 px-4 py-2.5 rounded-lg border border-error/20"
          >
            <span className="material-symbols-outlined text-base">error</span>
            {error}
          </motion.div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
              Memverifikasi...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">login</span>
              Masuk sebagai {roles.find((r) => r.value === selectedRole)?.label}
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 text-on-surface-variant/40 text-xs">
        <div className="flex-1 h-px bg-outline-variant/30" />
        atau
        <div className="flex-1 h-px bg-outline-variant/30" />
      </div>

      {/* Register link */}
      <p className="text-center text-sm text-on-surface-variant">
        Belum punya akun?{" "}
        <Link to="/register" className="text-primary font-semibold hover:underline">
          Daftar gratis
        </Link>
      </p>
    </motion.div>
  )
}
