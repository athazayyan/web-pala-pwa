import { useAuth } from "../../context/AuthContext"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import img1 from "../../assets/1.jpg"
import img2 from "../../assets/2.jpg"
import img3 from "../../assets/3.jpg"
import img4 from "../../assets/4.jpeg"
import img5 from "../../assets/5.jpg"
import img6 from "../../assets/6.jpg"

const productsByAhmad = [
  { id: "p1", name: "Minyak Esensial Pala Murni", price: 185000, unit: "30ml", stock: 42, sold: 312, status: "Aktif", grade: "Grade Terapeutik", img: img1 },
  { id: "p2", name: "Biji Pala Utuh Premium", price: 125000, unit: "250g", stock: 88, sold: 215, status: "Aktif", grade: "Grade ABCD", img: img2 },
  { id: "p5", name: "Sirup Hangat Pala & Jahe", price: 145000, unit: "250ml", stock: 64, sold: 189, status: "Aktif", grade: "Artisanal", img: img5 },
]

const productsByPinkan = [
  { id: "p3", name: "Fuli Kering Nusantara", price: 145000, unit: "100g", stock: 56, sold: 143, status: "Aktif", grade: "Aroma Tinggi", img: img3 },
  { id: "p4", name: "Balm Malam Pala Premium", price: 185000, unit: "50ml", stock: 30, sold: 278, status: "Aktif", grade: "Grade Apoteker", img: img4 },
  { id: "p6", name: "Paket Warisan Nusantara", price: 345000, unit: "Set", stock: 12, sold: 87, status: "Terbatas", grade: "Batch Terbatas", img: img6 },
]

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`

export function BarangSaya() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const products = user?.penjualId === "ahmad" ? productsByAhmad : productsByPinkan
  const totalSold = products.reduce((s, p) => s + p.sold, 0)
  const totalRevenue = products.reduce((s, p) => s + p.price * p.sold, 0)

  return (
    <div className="p-8 space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display-b2c text-2xl text-primary">Barang Saya</h1>
          <p className="text-sm text-on-surface-variant mt-1">Kelola semua produk yang Anda jual di PalaMart</p>
        </div>
        <button
          onClick={() => navigate("/penjual/tambah")}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-caps text-label-caps hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Tambah Produk
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Produk", value: products.length, icon: "inventory_2", color: "text-primary" },
          { label: "Total Terjual", value: totalSold, icon: "shopping_cart_checkout", color: "text-secondary" },
          { label: "Total Pendapatan", value: formatRp(totalRevenue), icon: "payments", color: "text-tertiary" },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-outline-variant/20 rounded-xl p-5">
            <div className={`flex items-center gap-2 mb-2 ${s.color}`}>
              <span className="material-symbols-outlined text-lg">{s.icon}</span>
              <span className="font-label-caps text-[11px]">{s.label.toUpperCase()}</span>
            </div>
            <p className={`font-display-b2c text-2xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Product Table */}
      <div className="bg-surface border border-outline-variant/20 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10 flex items-center justify-between">
          <h2 className="font-display-b2c text-base text-on-surface">Daftar Produk</h2>
          <span className="text-xs text-on-surface-variant font-mono">{products.length} produk aktif</span>
        </div>
        <div className="divide-y divide-outline-variant/10">
          {products.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low transition-colors"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display-b2c text-sm text-primary truncate">{p.name}</p>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">{p.grade} • {p.unit}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-on-surface text-sm">{formatRp(p.price)}</p>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">Stok: {p.stock}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-on-surface-variant">{p.sold} terjual</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-label-caps ${
                  p.status === "Aktif" ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"
                }`}>{p.status}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary">
                  <span className="material-symbols-outlined text-base">edit</span>
                </button>
                <button className="p-2 rounded-lg hover:bg-error-container transition-colors text-on-surface-variant hover:text-error">
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
