import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import img1 from "../../assets/1.jpg"
import img2 from "../../assets/2.jpg"
import img3 from "../../assets/3.jpg"
import img4 from "../../assets/4.jpeg"
import img5 from "../../assets/5.jpg"
import img6 from "../../assets/6.jpg"

// ─── Types ────────────────────────────────────────────────────────────────────
interface PreOrderProduct {
  id: string
  name: string
  seller: string
  sellerAvatar: string
  category: string
  price: number
  unit: string
  grade: string
  img: string
  desc: string
  status: "segera-hadir" | "habis"
  estimasiTanggal: string
  preOrderCount: number
  preOrderTarget: number
  rating: number
  badge?: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const preOrderProducts: PreOrderProduct[] = [
  {
    id: "po1",
    name: "Minyak Pala Cold-Press Edisi Panen Raya",
    seller: "Ahmad Fauzi",
    sellerAvatar: "A",
    category: "Minyak Esensial",
    price: 245000,
    unit: "50ml",
    grade: "Cold-Press Premium",
    img: img1,
    desc: "Edisi terbatas dari panen raya Juli 2026. Diekstrak dengan metode cold-press untuk mempertahankan profil aroma kompleks dan kandungan myristicin tertinggi.",
    status: "segera-hadir",
    estimasiTanggal: "25 Jul 2026",
    preOrderCount: 87,
    preOrderTarget: 100,
    rating: 0,
    badge: "Edisi Panen Raya",
  },
  {
    id: "po2",
    name: "Fuli Merah Kering — Batch Monsun",
    seller: "Pinkan Maharani",
    sellerAvatar: "P",
    category: "Rempah Utuh",
    price: 175000,
    unit: "100g",
    grade: "Aroma Ekstra",
    img: img3,
    desc: "Fuli yang dipanen saat musim hujan memiliki kandungan minyak atsiri 15% lebih tinggi. Batch monsun ini sangat dicari oleh koki profesional di seluruh Nusantara.",
    status: "segera-hadir",
    estimasiTanggal: "10 Agu 2026",
    preOrderCount: 42,
    preOrderTarget: 80,
    rating: 0,
    badge: "Batch Monsun",
  },
  {
    id: "po3",
    name: "Paket Degustasi Rempah Nusantara",
    seller: "Ahmad Fauzi",
    sellerAvatar: "A",
    category: "Paket Spesial",
    price: 425000,
    unit: "Set",
    grade: "Kurasi Apoteker",
    img: img6,
    desc: "Set kurasi eksklusif berisi 7 varian pala dan fuli dari 3 terroir berbeda. Dilengkapi kartu panduan aroma dan sertifikat keaslian individual.",
    status: "segera-hadir",
    estimasiTanggal: "01 Sep 2026",
    preOrderCount: 23,
    preOrderTarget: 50,
    rating: 0,
    badge: "Kurasi Eksklusif",
  },
  {
    id: "po4",
    name: "Minyak Esensial Pala Murni",
    seller: "Ahmad Fauzi",
    sellerAvatar: "A",
    category: "Minyak Esensial",
    price: 185000,
    unit: "30ml",
    grade: "Grade Terapeutik",
    img: img1,
    desc: "Diekstrak dari biji pala pilihan menggunakan distilasi uap bertekanan rendah. Kadar myristicin 9.84%. Stok saat ini habis — batch baru sedang diproses.",
    status: "habis",
    estimasiTanggal: "18 Jul 2026",
    preOrderCount: 156,
    preOrderTarget: 200,
    rating: 4.9,
    badge: "Terlaris",
  },
  {
    id: "po5",
    name: "Sirup Hangat Pala & Jahe",
    seller: "Ahmad Fauzi",
    sellerAvatar: "A",
    category: "Minuman & Sirup",
    price: 145000,
    unit: "250ml",
    grade: "Artisanal",
    img: img5,
    desc: "Sirup pala yang diinfus dengan jahe segar. Batch terakhir habis dalam 48 jam — restok sedang dalam proses fermentasi alami.",
    status: "habis",
    estimasiTanggal: "20 Jul 2026",
    preOrderCount: 94,
    preOrderTarget: 150,
    rating: 4.6,
  },
  {
    id: "po6",
    name: "Balm Malam Pala Premium",
    seller: "Pinkan Maharani",
    sellerAvatar: "P",
    category: "Produk Perawatan",
    price: 185000,
    unit: "50ml",
    grade: "Grade Apoteker",
    img: img4,
    desc: "Balm pelipis berbahan dasar pala untuk relaksasi dan tidur berkualitas. Batch handmade terbatas — formulasi baru dengan lavender Aceh.",
    status: "habis",
    estimasiTanggal: "22 Jul 2026",
    preOrderCount: 112,
    preOrderTarget: 120,
    rating: 4.9,
    badge: "Hampir Penuh",
  },
]

const categories = ["Semua", "Minyak Esensial", "Rempah Utuh", "Produk Perawatan", "Minuman & Sirup", "Paket Spesial"]

// ─── Component ────────────────────────────────────────────────────────────────
export function PreOrder() {
  const [activeTab, setActiveTab] = useState<"segera-hadir" | "habis">("segera-hadir")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [sortBy, setSortBy] = useState("populer")
  const [toast, setToast] = useState<string | null>(null)

  // Modal state
  const [modalProduct, setModalProduct] = useState<PreOrderProduct | null>(null)
  const [notifiedIds, setNotifiedIds] = useState<Set<string>>(new Set())
  const [preOrderedIds, setPreOrderedIds] = useState<Set<string>>(new Set())

  const filteredProducts = preOrderProducts
    .filter((p) => {
      const matchStatus = p.status === activeTab
      const matchCat = selectedCategory === "Semua" || p.category === selectedCategory
      return matchStatus && matchCat
    })
    .sort((a, b) => {
      if (sortBy === "populer") return b.preOrderCount - a.preOrderCount
      if (sortBy === "terdekat") return new Date(a.estimasiTanggal).getTime() - new Date(b.estimasiTanggal).getTime()
      if (sortBy === "harga-asc") return a.price - b.price
      if (sortBy === "harga-desc") return b.price - a.price
      return 0
    })

  const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`
  const progressPct = (count: number, target: number) => Math.min((count / target) * 100, 100)

  const handlePreOrder = (product: PreOrderProduct) => {
    setModalProduct(product)
  }

  const confirmPreOrder = () => {
    if (!modalProduct) return
    setPreOrderedIds((prev) => new Set(prev).add(modalProduct.id))
    setModalProduct(null)
    setToast(modalProduct.name)
    setTimeout(() => setToast(null), 3000)
  }

  const handleNotify = (product: PreOrderProduct) => {
    setNotifiedIds((prev) => new Set(prev).add(product.id))
    setToast(`Notifikasi aktif untuk ${product.name}`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-secondary text-on-secondary px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl font-mono text-sm border border-white/20"
          >
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary text-on-primary">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative px-6 md:px-margin-desktop py-16 md:py-24 max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="font-label-caps text-label-caps text-tertiary-fixed tracking-[0.2em] uppercase mb-4 block">
                  ✦ Pre-Order Eksklusif
                </span>
                <h1 className="font-display-b2c text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                  Pesan Sekarang,<br />
                  <span className="text-tertiary-fixed">Nikmati Nanti</span>
                </h1>
                <p className="font-body-md text-on-primary/70 max-w-lg mb-8 mx-auto md:mx-0">
                  Amankan produk rempah premium yang sedang dalam proses produksi atau yang stoknya sudah habis. 
                  Jadilah yang pertama menikmati batch terbaru dari ladang terbaik Nusantara.
                </p>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-6 justify-center md:justify-start"
              >
                <div className="bg-white/10 border border-white/10 rounded-xl px-5 py-4 text-center min-w-[120px]">
                  <span className="font-data-mono text-2xl font-bold text-tertiary-fixed block">
                    {preOrderProducts.length}
                  </span>
                  <span className="font-label-caps text-[10px] text-on-primary/60 uppercase tracking-wider">
                    Produk Tersedia
                  </span>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-xl px-5 py-4 text-center min-w-[120px]">
                  <span className="font-data-mono text-2xl font-bold text-secondary-fixed block">
                    {preOrderProducts.reduce((acc, p) => acc + p.preOrderCount, 0)}+
                  </span>
                  <span className="font-label-caps text-[10px] text-on-primary/60 uppercase tracking-wider">
                    Pre-Order Masuk
                  </span>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-xl px-5 py-4 text-center min-w-[120px]">
                  <span className="font-data-mono text-2xl font-bold text-primary-fixed-dim block">
                    2
                  </span>
                  <span className="font-label-caps text-[10px] text-on-primary/60 uppercase tracking-wider">
                    Penjual Verified
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-shrink-0 hidden md:block"
            >
              <div className="relative w-72 h-72 lg:w-80 lg:h-80">
                {/* Stacked cards visual */}
                <div className="absolute top-4 left-4 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl rotate-[-6deg] border border-white/10">
                  <img src={img2} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                </div>
                <div className="absolute top-0 right-0 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl rotate-[4deg] border border-white/10">
                  <img src={img3} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-tertiary text-on-tertiary px-4 py-2 rounded-full font-label-caps text-xs shadow-xl flex items-center gap-2 whitespace-nowrap z-10">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  Segera Hadir
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="h-6 bg-background" style={{ borderRadius: "24px 24px 0 0", marginBottom: "-1px" }} />
      </section>

      {/* ─── Filters & Content ─────────────────────────────────────────────────── */}
      <div className="px-6 md:px-margin-desktop py-8 max-w-container-max mx-auto">
        {/* Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex bg-surface-container rounded-xl p-1 gap-1 self-start">
            <button
              onClick={() => setActiveTab("segera-hadir")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-caps text-label-caps transition-all ${
                activeTab === "segera-hadir"
                  ? "bg-tertiary text-on-tertiary shadow-sm"
                  : "text-on-surface-variant hover:text-tertiary"
              }`}
            >
              <span className="material-symbols-outlined text-lg">schedule</span>
              Segera Hadir
            </button>
            <button
              onClick={() => setActiveTab("habis")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-caps text-label-caps transition-all ${
                activeTab === "habis"
                  ? "bg-error text-on-error shadow-sm"
                  : "text-on-surface-variant hover:text-error"
              }`}
            >
              <span className="material-symbols-outlined text-lg">inventory_2</span>
              Stok Habis
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer self-start"
          >
            <option value="populer">Paling Diminati</option>
            <option value="terdekat">Tersedia Terdekat</option>
            <option value="harga-asc">Harga: Rendah → Tinggi</option>
            <option value="harga-desc">Harga: Tinggi → Rendah</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-label-caps whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-primary text-on-primary border-primary"
                  : "border-outline-variant text-on-surface-variant hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status info banner */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-4 rounded-xl border flex items-start gap-3 ${
            activeTab === "segera-hadir"
              ? "bg-tertiary-fixed/10 border-tertiary-fixed/30"
              : "bg-error-container/30 border-error/20"
          }`}
        >
          <span className={`material-symbols-outlined text-lg mt-0.5 ${
            activeTab === "segera-hadir" ? "text-tertiary" : "text-error"
          }`}>
            {activeTab === "segera-hadir" ? "new_releases" : "info"}
          </span>
          <div>
            <p className={`font-label-caps text-xs mb-1 ${
              activeTab === "segera-hadir" ? "text-tertiary" : "text-error"
            }`}>
              {activeTab === "segera-hadir" ? "PRODUK SEGERA HADIR" : "STOK HABIS — RESTOK DALAM PROSES"}
            </p>
            <p className="font-body-sm text-on-surface-variant text-xs">
              {activeTab === "segera-hadir"
                ? "Produk-produk baru yang sedang dalam tahap produksi. Pre-order sekarang untuk menjamin ketersediaan saat produk diluncurkan."
                : "Produk populer yang stoknya sedang habis. Pre-order sekarang dan kami akan mengirimkan segera setelah batch baru siap."}
            </p>
          </div>
        </motion.div>

        {/* ─── Product Grid ──────────────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">inventory_2</span>
            <p className="font-display-b2c text-lg">Belum ada produk pre-order</p>
            <p className="text-sm mt-1">Coba ubah filter atau kategori</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p, index) => {
                const pct = progressPct(p.preOrderCount, p.preOrderTarget)
                const isPreOrdered = preOrderedIds.has(p.id)
                const isNotified = notifiedIds.has(p.id)

                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="bg-surface border border-outline-variant/20 rounded-xl overflow-hidden hover:shadow-lg hover:border-outline-variant/50 transition-all group flex flex-col"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Status overlay */}
                      {p.status === "habis" && (
                        <div className="absolute inset-0 bg-on-surface/30 flex items-center justify-center">
                          <div className="bg-error text-on-error px-4 py-1.5 rounded-full font-label-caps text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-lg">
                            <span className="material-symbols-outlined text-sm">block</span>
                            STOK HABIS
                          </div>
                        </div>
                      )}

                      {/* Badge */}
                      {p.badge && (
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full font-label-caps text-[10px] font-bold shadow-sm ${
                          p.status === "segera-hadir"
                            ? "bg-tertiary-fixed text-on-tertiary-fixed"
                            : p.badge === "Hampir Penuh"
                              ? "bg-error text-on-error"
                              : "bg-tertiary-fixed text-on-tertiary-fixed"
                        }`}>
                          {p.badge}
                        </span>
                      )}

                      {/* Rating (only for existing products) */}
                      {p.rating > 0 && (
                        <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                          <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="font-mono text-xs font-bold text-on-surface">{p.rating}</span>
                        </div>
                      )}

                      {/* Upcoming marker */}
                      {p.status === "segera-hadir" && (
                        <div className="absolute bottom-3 right-3 bg-primary/90 backdrop-blur-sm text-on-primary px-2.5 py-1 rounded-full flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-xs">schedule</span>
                          <span className="font-data-mono text-[10px]">{p.estimasiTanggal}</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Seller */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold shrink-0">
                            {p.sellerAvatar}
                          </div>
                          <span className="text-xs text-on-surface-variant font-mono">{p.seller}</span>
                          <span className="ml-auto font-label-caps text-[10px] text-secondary border border-secondary/30 px-2 py-0.5 rounded-full">{p.grade}</span>
                        </div>

                        <h3 className="font-display-b2c text-base text-primary mb-1 leading-snug">
                          {p.name}
                        </h3>
                        <p className="font-body-sm text-on-surface-variant text-xs mb-4 line-clamp-2">{p.desc}</p>
                      </div>

                      <div className="space-y-4">
                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-display-b2c text-lg text-primary">{formatRp(p.price)}</span>
                            <span className="text-xs text-on-surface-variant ml-1">/{p.unit}</span>
                          </div>
                        </div>

                        {/* Pre-order Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">
                              Pre-order
                            </span>
                            <span className="font-data-mono text-on-surface">
                              {p.preOrderCount} / {p.preOrderTarget}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                              className={`h-full rounded-full ${
                                pct >= 90 ? "bg-error" : pct >= 60 ? "bg-tertiary" : "bg-secondary"
                              }`}
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`text-[10px] font-label-caps ${
                              pct >= 90 ? "text-error" : "text-on-surface-variant"
                            }`}>
                              {pct >= 90 ? "⚡ Hampir penuh!" : `${Math.round(pct)}% tercapai`}
                            </span>
                            {p.status === "habis" && (
                              <span className="font-data-mono text-[10px] text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">schedule</span>
                                Est. {p.estimasiTanggal}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-2">
                          {isPreOrdered ? (
                            <button
                              disabled
                              className="flex-1 py-2.5 bg-secondary/10 text-secondary rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 border border-secondary/30 cursor-default"
                            >
                              <span className="material-symbols-outlined text-sm">check_circle</span>
                              Pre-Order Berhasil
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePreOrder(p)}
                              className="flex-1 py-2.5 bg-tertiary text-on-tertiary rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all shadow-sm"
                            >
                              <span className="material-symbols-outlined text-sm">shopping_bag</span>
                              Pre-Order
                            </button>
                          )}
                          {isNotified ? (
                            <button
                              disabled
                              className="px-3 py-2.5 border border-secondary/30 text-secondary rounded-lg flex items-center justify-center cursor-default"
                            >
                              <span className="material-symbols-outlined text-sm">notifications_active</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleNotify(p)}
                              title="Beritahu saya saat tersedia"
                              className="px-3 py-2.5 border border-secondary text-secondary rounded-lg hover:bg-secondary/5 active:scale-95 transition-all flex items-center justify-center"
                            >
                              <span className="material-symbols-outlined text-sm">notification_add</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* ─── Info Section ──────────────────────────────────────────────────────── */}
        <section className="mt-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "verified",
                title: "Jaminan Kualitas",
                desc: "Setiap produk pre-order melewati kontrol kualitas ketat sebelum dikirim. Uang kembali jika tidak sesuai.",
                color: "text-secondary",
              },
              {
                icon: "local_shipping",
                title: "Prioritas Pengiriman",
                desc: "Pre-order mendapat prioritas pengiriman di hari pertama batch tersedia. Gratis ongkir untuk pesanan pertama.",
                color: "text-tertiary",
              },
              {
                icon: "lock",
                title: "Harga Terkunci",
                desc: "Harga saat pre-order dijamin tidak berubah, meskipun harga naik saat produk tersedia untuk publik.",
                color: "text-primary",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 text-center hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4 ${item.color}`}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h3 className="font-display-b2c text-base text-primary mb-2">{item.title}</h3>
                <p className="font-body-sm text-on-surface-variant text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ─── Confirmation Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalProduct(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-surface rounded-2xl max-w-md w-full shadow-2xl border border-outline-variant/30 overflow-hidden">
                {/* Modal Header */}
                <div className="relative h-40 overflow-hidden">
                  <img src={modalProduct.img} alt={modalProduct.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  <button
                    onClick={() => setModalProduct(null)}
                    className="absolute top-3 right-3 w-8 h-8 bg-surface/80 backdrop-blur-sm rounded-full flex items-center justify-center text-on-surface hover:bg-surface transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 -mt-8 relative">
                  <span className="font-label-caps text-[10px] text-tertiary uppercase tracking-wider">
                    Konfirmasi Pre-Order
                  </span>
                  <h3 className="font-display-b2c text-xl text-primary mt-1 mb-2">{modalProduct.name}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[9px] font-bold">
                      {modalProduct.sellerAvatar}
                    </div>
                    <span className="text-xs text-on-surface-variant font-mono">{modalProduct.seller}</span>
                  </div>

                  <div className="bg-surface-container-low rounded-lg p-4 space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Harga</span>
                      <span className="font-display-b2c text-primary font-bold">{formatRp(modalProduct.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Satuan</span>
                      <span className="font-mono text-on-surface">{modalProduct.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Estimasi Tersedia</span>
                      <span className="font-data-mono text-on-surface">{modalProduct.estimasiTanggal}</span>
                    </div>
                    <div className="border-t border-outline-variant/20 pt-3 flex justify-between text-sm">
                      <span className="text-on-surface-variant">Pre-order saat ini</span>
                      <span className="font-data-mono text-secondary font-bold">
                        {modalProduct.preOrderCount} / {modalProduct.preOrderTarget}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                    Dengan melakukan pre-order, Anda menjamin mendapatkan produk ini saat tersedia. 
                    Pembayaran akan diproses saat produk siap dikirim. Harga yang tertera tidak akan berubah.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setModalProduct(null)}
                      className="flex-1 py-3 border border-outline-variant text-on-surface-variant rounded-lg font-label-caps text-label-caps hover:bg-surface-container-low transition-all"
                    >
                      Batal
                    </button>
                    <button
                      onClick={confirmPreOrder}
                      className="flex-1 py-3 bg-tertiary text-on-tertiary rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">shopping_bag</span>
                      Konfirmasi Pre-Order
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
