import { useAuth } from "../../context/AuthContext"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const productsByAhmad = [
  { id: "p1", name: "Minyak Esensial Pala Murni", price: 185000, unit: "30ml", stock: 42, sold: 312, status: "Aktif", grade: "Grade Terapeutik", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDexw52erlBzdsXAMSGCOcUB2OigNuW2IOeK_oy8f_5Q1ziMlsvKC6SI94sZU_ocY7KHQBO0jrbiIvi7VqWEgstklXXTnIlT23ZqINrTbk8fqVPfHXz73nGHdF1l9g2CXA1NyV_bHl5lob3Lh_WwKhTqJ3pD0ip3XC9svTAAZsgwbyi1rzFmizg9p8OveyGS9V5k-YacGQQopOGQ6i9ew8E8yeujPBInLEyuv33pCNDSpSqHh3aA" },
  { id: "p2", name: "Biji Pala Utuh Premium", price: 125000, unit: "250g", stock: 88, sold: 215, status: "Aktif", grade: "Grade ABCD", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIHaOtBYbH_nOL07TlXMt1PirltfQqdWzIe6scQgSkMKFGtwb9OLmnCfWJDpslbv-Zt62r2OScd8pmnuflFgkpoGLvZ96oOOl2kc-AAzuceTmRNfg_qVmAFmGzm6RfYjJhTb0FiX5G2b_dbxk39l0K7DclqOH-AT7cZto0B44NZo1M8BWiyukciHZ8vTXsEXQzrkgjwc5Oc2oxYOVahN3rP0UgYUODzsbIkQyZ2MUiWK4-Sc6bTA" },
  { id: "p5", name: "Sirup Hangat Pala & Jahe", price: 145000, unit: "250ml", stock: 64, sold: 189, status: "Aktif", grade: "Artisanal", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpUSYtu0kDjtM11U0f6bhDTOMI7ZWuMnGUTQZNzTN4MRIDJci5v2AIULlNPZaFnHA2as-ox5545dH7hJYyyLDFRBVC6nGij9HIGYNFDXfC4LK5bXBFTy6v8S8SVXEXAMzM-l2u4mTyIpKDNi5nPIe3khndRPLNddz0oGxdqIvjC9l4r8eWM_6qSA_PBlGDKS6xprN8WntWcKbshUwuNBNJyQR8KkriSeVC5ho2lupNak7pqJo69g" },
]

const productsByPinkan = [
  { id: "p3", name: "Fuli Kering Nusantara", price: 145000, unit: "100g", stock: 56, sold: 143, status: "Aktif", grade: "Aroma Tinggi", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWaPzl8hYaBl4KScRB7igtFrwiHE0Ff_bsdQRsP35hR1aruF2bTc1kY76iIGrXuw7-17IldiKVR-afKqvUOKY3pYG63qjAvOU6OZwTKD01dzivx0cDzL1V3lA6pR8yFP4GVYk25F7DlPnJzb4g0yVpnFGgXHQxTxd9f16a_WhuAJLLpF2XPK218tXxikx3j3GbTC2zyHlZRQCGKVrFCvlnA2vxr2S8pPCTo2fOeitnJoPQxFxaQ" },
  { id: "p4", name: "Balm Malam Pala Premium", price: 185000, unit: "50ml", stock: 30, sold: 278, status: "Aktif", grade: "Grade Apoteker", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDefJb0D_YxwnTy9vrcBW6TNkUDjJTlvkWFDrgtoW-uq_dk5ZZdwhEZl_w8YXUTkwdZJvAt2ADr2Ag0E4p3E-QfhOJtHEI8FywXrfNiY_5_GUMQnomtsCWaZsR7815WVIaGFn8xfdxGIKiJACZWE7AVY7KbZpxxT9vH2ue97AyIEZ8UcjEG7yUTBvVxLSelnbcL17CoVpUh6dn7KZcK13YbGLT-oQLbByC3gxBnjnrTqI089hCIjQ" },
  { id: "p6", name: "Paket Warisan Nusantara", price: 345000, unit: "Set", stock: 12, sold: 87, status: "Terbatas", grade: "Batch Terbatas", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXaEw9-WcDfEPVy1PomEZr1xW6FeG9sntoTPAHVk-Ln8SGnb_vY9h6Zf4npIDZB8J_RoOqBMDW9Gh67Ya3zjwGxj-XcERxvxB0BQ2_FlBoDXRZXTsJedv7SP6mKoKiAUiHgRoOiJxeCLfgXysUYo0cKGkpRbLQJOnZZJ15voiBJu_FO2R7n1RIS2jymquPtUsKbx60YrqaZo0Z5zwzScoTYKy-1EGuo43tT-Twil9ST0pYW8l_1A" },
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
          <p className="text-sm text-on-surface-variant mt-1">Kelola semua produk yang Anda jual di Athesa Nutmeg</p>
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
