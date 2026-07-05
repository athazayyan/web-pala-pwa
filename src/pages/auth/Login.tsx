import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../../context/AuthContext"
import type { AuthUser } from "../../context/AuthContext"

type Role = "pembeli" | "penjual" | "admin"
type PenjualAccount = "ahmad" | "pinkan"

const dummyAccounts = {
  pembeli: { email: "budi@gmail.com", password: "budi123", nama: "Budi Santoso", avatar: "B" },
  penjual: {
    ahmad: { email: "ahmad@athesa.id", password: "ahmad123", nama: "Ahmad Fauzi", avatar: "A" },
    pinkan: { email: "pinkan@athesa.id", password: "pinkan123", nama: "Pinkan Maharani", avatar: "P" },
  },
  admin: { email: "admin@athesa.id", password: "admin2026", nama: "Administrator", avatar: "AD" },
}

const roles: { value: Role; label: string; icon: string }[] = [
  { value: "pembeli", label: "Pembeli", icon: "shopping_basket" },
  { value: "penjual", label: "Penjual", icon: "storefront" },
  { value: "admin", label: "Admin", icon: "admin_panel_settings" },
]

const penjualAccounts: { value: PenjualAccount; nama: string }[] = [
  { value: "ahmad", nama: "Ahmad Fauzi" },
  { value: "pinkan", nama: "Pinkan Maharani" },
]

export function Login() {
  const [selectedRole, setSelectedRole] = useState<Role>("pembeli")
  const [selectedPenjual, setSelectedPenjual] = useState<PenjualAccount>("ahmad")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const currentAccount =
    selectedRole === "penjual"
      ? dummyAccounts.penjual[selectedPenjual]
      : dummyAccounts[selectedRole]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const user: AuthUser = {
        role: selectedRole,
        nama: currentAccount.nama,
        email: currentAccount.email,
        avatar: currentAccount.avatar,
        ...(selectedRole === "penjual" ? { penjualId: selectedPenjual } : {}),
      }
      login(user)
      if (selectedRole === "admin") navigate("/b2b")
      else if (selectedRole === "penjual") navigate("/penjual/barang")
      else navigate("/")
    }, 1600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-surface border border-outline-variant/30 rounded-xl shadow-2xl p-8 space-y-5"
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
          <button key={r.value} type="button" onClick={() => setSelectedRole(r.value)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-center transition-all ${
              selectedRole === r.value ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-outline-variant/30 text-on-surface-variant hover:border-primary/40"
            }`}>
            <span className="material-symbols-outlined text-xl">{r.icon}</span>
            <span className="font-label-caps text-[11px] font-semibold">{r.label}</span>
          </button>
        ))}
      </div>

      {/* Penjual Sub-Selector */}
      <AnimatePresence>
        {selectedRole === "penjual" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-2 text-[10px]">PILIH AKUN PENJUAL</p>
            <div className="grid grid-cols-2 gap-2">
              {penjualAccounts.map((acc) => (
                <button key={acc.value} type="button" onClick={() => setSelectedPenjual(acc.value)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                    selectedPenjual === acc.value ? "border-secondary bg-secondary/5 text-secondary" : "border-outline-variant/30 text-on-surface-variant hover:border-secondary/40"
                  }`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${selectedPenjual === acc.value ? "bg-secondary text-white" : "bg-surface-container-high"}`}>
                    {acc.value === "ahmad" ? "A" : "P"}
                  </div>
                  <div>
                    <p className="font-label-caps text-[11px] font-semibold leading-tight">{acc.nama}</p>
                    <p className="text-[9px] opacity-60 font-mono">{dummyAccounts.penjual[acc.value].email}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Badge */}
      <div className="bg-tertiary-fixed/30 border border-tertiary/20 rounded-lg px-4 py-2.5 flex items-start gap-2">
        <span className="material-symbols-outlined text-tertiary text-sm mt-0.5">info</span>
        <div>
          <p className="font-label-caps text-[10px] text-tertiary font-semibold">AKUN DEMO</p>
          <p className="text-[11px] text-on-surface-variant font-mono">
            Masuk sebagai <span className="text-primary font-bold">{currentAccount.nama}</span>
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Alamat Email</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">mail</span>
            <input type="email" value={currentAccount.email} readOnly className="w-full pl-10 pr-10 py-3 rounded-lg border border-outline-variant bg-surface-container text-on-surface text-sm focus:outline-none cursor-not-allowed opacity-80 font-mono" />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary text-base">lock</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="font-label-caps text-label-caps text-on-surface-variant">Password</label>
            <a href="#" className="text-xs text-primary hover:underline">Lupa password?</a>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">lock</span>
            <input type={showPass ? "text" : "password"} value={currentAccount.password} readOnly className="w-full pl-10 pr-12 py-3 rounded-lg border border-outline-variant bg-surface-container text-on-surface text-sm focus:outline-none cursor-not-allowed opacity-80 font-mono" />
            <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary">
              <span className="material-symbols-outlined text-lg">{showPass ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
          <p className="text-[10px] text-on-surface-variant/50 mt-1 font-mono">Kredensial demo — tidak dapat diubah</p>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3.5 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-60">
          {loading ? (
            <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Memverifikasi...</>
          ) : (
            <><span className="material-symbols-outlined text-sm">login</span>Masuk sebagai {currentAccount.nama}</>
          )}
        </button>
      </form>

      <div className="flex items-center gap-3 text-on-surface-variant/40 text-xs">
        <div className="flex-1 h-px bg-outline-variant/30" />atau<div className="flex-1 h-px bg-outline-variant/30" />
      </div>

      <p className="text-center text-sm text-on-surface-variant">
        Belum punya akun?{" "}
        <Link to="/register" className="text-primary font-semibold hover:underline">Daftar gratis</Link>
      </p>
    </motion.div>
  )
}
