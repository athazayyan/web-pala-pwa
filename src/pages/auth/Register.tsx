import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

type Role = "pembeli" | "penjual" | "admin"

const roles: { value: Role; label: string; desc: string; icon: string }[] = [
  { value: "pembeli", label: "Pembeli", desc: "Beli produk rempah pilihan", icon: "shopping_basket" },
  { value: "penjual", label: "Penjual", desc: "Jual hasil rempah Anda", icon: "storefront" },
  { value: "admin", label: "Admin", desc: "Kelola platform Athesa", icon: "admin_panel_settings" },
]

export function Register() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    konfirmasi: "",
  })
  const [selectedRole, setSelectedRole] = useState<Role>("pembeli")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const navigate = useNavigate()

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.nama.trim()) e.nama = "Nama lengkap wajib diisi"
    if (!form.email.includes("@")) e.email = "Email tidak valid"
    if (form.password.length < 6) e.password = "Password minimal 6 karakter"
    if (form.password !== form.konfirmasi) e.konfirmasi = "Password tidak cocok"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate("/login")
    }, 1800)
  }

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
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
        <h1 className="font-display-b2c text-xl text-on-surface">Buat Akun Baru</h1>
        <p className="text-on-surface-variant text-sm">Bergabunglah dengan ekosistem rempah Nusantara</p>
      </div>

      {/* Role Selector */}
      <div className="grid grid-cols-3 gap-2">
        {roles.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => setSelectedRole(r.value)}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-center transition-all text-xs ${
              selectedRole === r.value
                ? "border-primary bg-primary/5 text-primary"
                : "border-outline-variant/30 text-on-surface-variant hover:border-primary/40"
            }`}
          >
            <span className="material-symbols-outlined text-xl">{r.icon}</span>
            <span className="font-label-caps font-semibold">{r.label}</span>
            <span className="text-[10px] opacity-70 leading-tight">{r.desc}</span>
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <div>
          <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
            Nama Lengkap
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">
              person
            </span>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => handleChange("nama", e.target.value)}
              placeholder="Masukkan nama lengkap"
              className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.nama ? "border-error focus:ring-error/30" : "border-outline-variant focus:ring-primary/30 focus:border-primary"
              }`}
            />
          </div>
          {errors.nama && <p className="text-error text-xs mt-1">{errors.nama}</p>}
        </div>

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
              className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.email ? "border-error focus:ring-error/30" : "border-outline-variant focus:ring-primary/30 focus:border-primary"
              }`}
            />
          </div>
          {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
            Password
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">
              lock
            </span>
            <input
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Minimal 6 karakter"
              className={`w-full pl-10 pr-12 py-3 rounded-lg border bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.password ? "border-error focus:ring-error/30" : "border-outline-variant focus:ring-primary/30 focus:border-primary"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary"
            >
              <span className="material-symbols-outlined text-lg">{showPass ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
          {errors.password && <p className="text-error text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Konfirmasi Password */}
        <div>
          <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
            Konfirmasi Password
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">
              lock_reset
            </span>
            <input
              type={showPass ? "text" : "password"}
              value={form.konfirmasi}
              onChange={(e) => handleChange("konfirmasi", e.target.value)}
              placeholder="Ulangi password"
              className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.konfirmasi ? "border-error focus:ring-error/30" : "border-outline-variant focus:ring-primary/30 focus:border-primary"
              }`}
            />
          </div>
          {errors.konfirmasi && <p className="text-error text-xs mt-1">{errors.konfirmasi}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
              Mendaftarkan akun...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">how_to_reg</span>
              Daftar sebagai {roles.find((r) => r.value === selectedRole)?.label}
            </>
          )}
        </button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-on-surface-variant">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-primary font-semibold hover:underline">
          Masuk di sini
        </Link>
      </p>
    </motion.div>
  )
}
