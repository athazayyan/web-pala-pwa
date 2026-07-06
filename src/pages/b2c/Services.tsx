import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import img1 from "../../assets/1.jpg"
import img2 from "../../assets/2.jpg"
import img3 from "../../assets/3.jpg"
import img4 from "../../assets/4.jpeg"
import img5 from "../../assets/5.jpg"
import img6 from "../../assets/6.jpg"

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
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
  stock: number
  rating: number
  sold: number
  badge?: string
}

interface Message {
  id: string
  text: string
  isUser: boolean
  products?: Product[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const products: Product[] = [
  {
    id: "p1",
    name: "Minyak Esensial Pala Murni",
    seller: "Ahmad Fauzi",
    sellerAvatar: "A",
    category: "Minyak Esensial",
    price: 185000,
    unit: "30ml",
    grade: "Grade Terapeutik",
    img: img1,
    desc: "Diekstrak dari biji pala pilihan menggunakan distilasi uap bertekanan rendah. Kadar myristicin 9.84%.",
    stock: 42,
    rating: 4.9,
    sold: 312,
    badge: "Terlaris",
  },
  {
    id: "p2",
    name: "Biji Pala Utuh Premium",
    seller: "Ahmad Fauzi",
    sellerAvatar: "A",
    category: "Rempah Utuh",
    price: 125000,
    unit: "250g",
    grade: "Grade ABCD",
    img: img2,
    desc: "Biji pala pilihan, disimpan utuh dalam wadah kedap udara untuk menjaga kandungan minyak atsiri.",
    stock: 88,
    rating: 4.8,
    sold: 215,
  },
  {
    id: "p3",
    name: "Fuli Kering Nusantara",
    seller: "Pinkan Maharani",
    sellerAvatar: "P",
    category: "Rempah Utuh",
    price: 145000,
    unit: "100g",
    grade: "Aroma Tinggi",
    img: img3,
    desc: "Fuli (mace) merah kering bermutu tinggi, ideal untuk masakan Padang, kari, dan minuman herbal.",
    stock: 56,
    rating: 4.7,
    sold: 143,
  },
  {
    id: "p4",
    name: "Balm Malam Pala Premium",
    seller: "Pinkan Maharani",
    sellerAvatar: "P",
    category: "Produk Perawatan",
    price: 185000,
    unit: "50ml",
    grade: "Grade Apoteker",
    img: img4,
    desc: "Balm pelipis berbahan dasar pala untuk membantu relaksasi dan tidur berkualitas.",
    stock: 30,
    rating: 4.9,
    sold: 278,
    badge: "Rekomendasi AI",
  },
  {
    id: "p5",
    name: "Sirup Hangat Pala & Jahe",
    seller: "Ahmad Fauzi",
    sellerAvatar: "A",
    category: "Minuman & Sirup",
    price: 145000,
    unit: "250ml",
    grade: "Artisanal",
    img: img5,
    desc: "Sirup pala yang diinfus dengan jahe segar, merangsang sirkulasi dan menghangatkan tubuh.",
    stock: 64,
    rating: 4.6,
    sold: 189,
  },
  {
    id: "p6",
    name: "Paket Warisan Nusantara",
    seller: "Pinkan Maharani",
    sellerAvatar: "P",
    category: "Paket Spesial",
    price: 345000,
    unit: "Set",
    grade: "Batch Terbatas",
    img: img6,
    desc: "Koleksi premium: minyak esensial, biji utuh, fuli kering, dan sirup pala dalam kemasan eksklusif.",
    stock: 12,
    rating: 5.0,
    sold: 87,
    badge: "Edisi Terbatas",
  },
]

const categories = ["Semua", "Minyak Esensial", "Rempah Utuh", "Produk Perawatan", "Minuman & Sirup", "Paket Spesial"]
const sellers = ["Semua Penjual", "Ahmad Fauzi", "Pinkan Maharani"]

// ─── AI Responses ──────────────────────────────────────────────────────────────
const aiResponses: Record<string, { text: string; productIds: string[] }> = {
  tidur: {
    text: "Untuk masalah tidur, saya rekomendasikan produk dengan senyawa myristicin tinggi yang bekerja sebagai penenang alami. Berikut pilihan terbaik dari koleksi kami:",
    productIds: ["p4", "p1"],
  },
  energi: {
    text: "Untuk meningkatkan energi dan vitalitas, kombinasi pala dan jahe sangat efektif merangsang sirkulasi. Produk-produk ini cocok untuk rutinitas pagi hari:",
    productIds: ["p5", "p2"],
  },
  masak: {
    text: "Untuk keperluan memasak, rempah-rempah utuh memberikan cita rasa terbaik. Fuli dan biji pala adalah pilihan para koki profesional:",
    productIds: ["p3", "p2"],
  },
  nyeri: {
    text: "Minyak esensial pala adalah anti-inflamasi alami yang efektif. Encerkan dengan minyak pembawa untuk pijatan pereda nyeri otot:",
    productIds: ["p1", "p4"],
  },
  hadiah: {
    text: "Untuk kado spesial, paket warisan Nusantara adalah pilihan premium yang berkesan. Dikemas eksklusif siap hadir:",
    productIds: ["p6"],
  },
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Services() {
  const [activeTab, setActiveTab] = useState<"belanja" | "konsultasi">("belanja")

  // Marketplace state
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedSeller, setSelectedSeller] = useState("Semua Penjual")
  const [sortBy, setSortBy] = useState("terlaris")
  const { cartItems, addToCart } = useCart()
  const [addedToast, setAddedToast] = useState<string | null>(null)

  // AI Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `"Selamat datang. Saya adalah Apoteker Rempah. Ceritakan kebutuhan atau keluhan Anda, dan saya akan merekomendasikan produk terbaik dari koleksi PalaMart."`,
      isUser: false,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // ─── Marketplace Logic ──────────────────────────────────────────────────────
  const filteredProducts = products
    .filter((p) => {
      const matchSearch = searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCat = selectedCategory === "Semua" || p.category === selectedCategory
      const matchSeller = selectedSeller === "Semua Penjual" || p.seller === selectedSeller
      return matchSearch && matchCat && matchSeller
    })
    .sort((a, b) => {
      if (sortBy === "terlaris") return b.sold - a.sold
      if (sortBy === "harga-asc") return a.price - b.price
      if (sortBy === "harga-desc") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  const handleAddToCart = (productId: string, productName: string) => {
    const prod = products.find((p) => p.id === productId)
    if (prod) {
      addToCart({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        unit: prod.unit,
        img: prod.img,
        seller: prod.seller,
        stock: prod.stock,
      })
    }
    setAddedToast(productName)
    setTimeout(() => setAddedToast(null), 2000)
  }

  // ─── AI Chat Logic ──────────────────────────────────────────────────────────
  const handleAiSend = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, text, isUser: true }])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const q = text.toLowerCase()
      let matched = Object.entries(aiResponses).find(([key]) => q.includes(key))
      if (!matched) matched = ["default", { text: `Untuk kebutuhan "${text}", saya sarankan memulai dengan koleksi minyak esensial atau biji utuh kami. Apakah Anda ingin saya jelaskan manfaat spesifiknya?`, productIds: ["p1", "p2"] }]

      const recs = matched[1].productIds.map((id) => products.find((p) => p.id === id)!).filter(Boolean)
      setMessages((prev) => [...prev, {
        id: `b-${Date.now()}`,
        text: matched![1].text,
        isUser: false,
        products: recs,
      }])
    }, 1200)
  }

  const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`

  return (
    <div className="min-h-screen bg-background">
      {/* Cart toast */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-secondary text-on-secondary px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl font-mono text-sm border border-white/20"
          >
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{addedToast} ditambahkan ke keranjang!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="px-6 md:px-margin-desktop py-8 border-b border-outline-variant/20 bg-surface">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display-b2c text-3xl text-primary mb-1">Pasar Rempah Nusantara</h1>
            <p className="font-body-sm text-on-surface-variant">
              {products.length} produk dari {sellers.length - 1} penjual terverifikasi
            </p>
          </div>
          {/* Tab Switcher */}
          <div className="flex bg-surface-container rounded-xl p-1 gap-1 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("belanja")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-caps text-label-caps transition-all ${
                activeTab === "belanja"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-lg">grid_view</span>
              Belanja
            </button>
            <button
              onClick={() => setActiveTab("konsultasi")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-caps text-label-caps transition-all ${
                activeTab === "konsultasi"
                  ? "bg-tertiary text-on-tertiary shadow-sm"
                  : "text-on-surface-variant hover:text-tertiary"
              }`}
            >
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
              Tanya AI
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ─── Tab: Belanja ─────────────────────────────────────────────────────── */}
        {activeTab === "belanja" && (
          <motion.div
            key="belanja"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="px-6 md:px-margin-desktop py-8 max-w-container-max mx-auto"
          >
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-3 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk rempah..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              {/* Seller filter */}
              <select
                value={selectedSeller}
                onChange={(e) => setSelectedSeller(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              >
                {sellers.map((s) => <option key={s}>{s}</option>)}
              </select>
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              >
                <option value="terlaris">Terlaris</option>
                <option value="rating">Rating Tertinggi</option>
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

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">inventory_2</span>
                <p className="font-display-b2c text-lg">Produk tidak ditemukan</p>
                <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-surface border border-outline-variant/20 rounded-xl overflow-hidden hover:shadow-lg hover:border-outline-variant/50 transition-all group flex flex-col justify-between"
                  >
                    {/* Product Image */}
                    <div 
                      onClick={() => navigate(`/produk/${p.id}`)}
                      className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {p.badge && (
                        <span className="absolute top-3 left-3 bg-tertiary-fixed text-on-tertiary px-2.5 py-1 rounded-full font-label-caps text-[10px] font-bold">
                          {p.badge}
                        </span>
                      )}
                      <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-tertiary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-mono text-xs font-bold text-on-surface">{p.rating}</span>
                      </div>
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

                        <h3 
                          onClick={() => navigate(`/produk/${p.id}`)}
                          className="font-display-b2c text-base text-primary mb-1 leading-snug cursor-pointer hover:underline"
                        >
                          {p.name}
                        </h3>
                        <p className="font-body-sm text-on-surface-variant text-xs mb-3 line-clamp-2">{p.desc}</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="font-display-b2c text-lg text-primary">{formatRp(p.price)}</span>
                            <span className="text-xs text-on-surface-variant ml-1">/{p.unit}</span>
                          </div>
                          <span className="text-xs text-on-surface-variant font-mono">{p.sold} terjual</span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(p.id, p.name)}
                          className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                          Tambah ke Keranjang
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Cart summary sticky */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate("/cart")}
                className="fixed bottom-6 right-6 z-40 bg-primary text-on-primary px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 cursor-pointer hover:opacity-90 transition-all"
              >
                <span className="material-symbols-outlined">shopping_basket</span>
                <span className="font-label-caps">{cartItems.length} jenis produk</span>
                <div className="w-6 h-6 bg-tertiary text-on-tertiary rounded-full flex items-center justify-center text-xs font-bold">
                  {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ─── Tab: Konsultasi AI ───────────────────────────────────────────────── */}
        {activeTab === "konsultasi" && (
          <motion.div
            key="konsultasi"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex h-[calc(100vh-200px)]"
          >
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 bg-surface-container-low border-r border-outline-variant p-6 gap-6 overflow-y-auto">
              <div>
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-3 opacity-70">CONTOH PERTANYAAN</h3>
                <div className="space-y-2">
                  {[
                    { q: "tidur", label: "🌙 Masalah tidur & relaksasi" },
                    { q: "energi", label: "⚡ Butuh tambahan energi" },
                    { q: "masak", label: "🍳 Rempah untuk memasak" },
                    { q: "nyeri", label: "💪 Pereda nyeri otot" },
                    { q: "hadiah", label: "🎁 Cari ide hadiah" },
                  ].map((item) => (
                    <button
                      key={item.q}
                      onClick={() => handleAiSend(item.q)}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all border border-transparent hover:border-outline-variant/30"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-surface p-4 rounded-lg border border-outline-variant/20">
                <p className="font-label-caps text-[10px] text-tertiary uppercase tracking-wider mb-2">Kemurnian Batch</p>
                <p className="font-mono text-xs font-bold text-primary">MYRISTICIN: 9.84%</p>
                <p className="font-mono text-[10px] text-on-surface-variant mt-1">EKSTRAK MURNI NUSANTARA</p>
              </div>
            </aside>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-surface-bright">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-outline-variant/20 flex items-center gap-3 bg-surface/80 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div>
                  <h2 className="font-display-b2c text-sm text-primary leading-tight">Apoteker Rempah AI</h2>
                  <p className="text-[10px] text-on-surface-variant font-mono">Rekomendasi produk berbasis kearifan rempah</p>
                </div>
                <button
                  onClick={() => setActiveTab("belanja")}
                  className="ml-auto flex items-center gap-1.5 text-xs font-label-caps text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/5 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  Lihat Semua Produk
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-4">
                    <div className={`flex gap-3 ${msg.isUser ? "justify-end" : "justify-start"}`}>
                      {!msg.isUser && (
                        <div className="w-8 h-8 rounded-full bg-tertiary shrink-0 flex items-center justify-center text-on-tertiary">
                          <span className="material-symbols-outlined text-sm">auto_awesome</span>
                        </div>
                      )}
                      <div className={`max-w-lg text-sm leading-relaxed rounded-2xl px-4 py-3 ${
                        msg.isUser
                          ? "bg-primary text-on-primary rounded-tr-sm"
                          : "bg-surface-container-low border border-outline-variant/20 text-on-surface rounded-tl-sm"
                      }`}>
                        {msg.text}
                      </div>
                      {msg.isUser && (
                        <div className="w-8 h-8 rounded-full bg-surface-container-highest shrink-0 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-sm">person</span>
                        </div>
                      )}
                    </div>

                    {/* AI Product Recommendations */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="ml-11 flex flex-wrap gap-3">
                        {msg.products.map((prod) => (
                          <div key={prod.id} className="bg-white border border-outline-variant/20 rounded-xl p-3 flex gap-3 shadow-sm max-w-xs">
                            <div 
                              onClick={() => navigate(`/produk/${prod.id}`)}
                              className="w-16 h-16 rounded-lg overflow-hidden shrink-0 cursor-pointer"
                            >
                              <img src={prod.img} alt={prod.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p 
                                onClick={() => navigate(`/produk/${prod.id}`)}
                                className="font-display-b2c text-sm text-primary leading-tight truncate cursor-pointer hover:underline"
                              >
                                {prod.name}
                              </p>
                              <p className="text-xs text-on-surface-variant font-mono mt-0.5">{prod.seller}</p>
                              <p className="font-bold text-tertiary text-sm mt-1">{formatRp(prod.price)}</p>
                              <button
                                onClick={() => navigate(`/produk/${prod.id}`)}
                                className="mt-1.5 text-[10px] font-label-caps text-secondary flex items-center gap-1 hover:text-on-secondary-container transition-colors"
                              >
                                LIHAT DETAIL <span className="material-symbols-outlined text-xs">arrow_forward</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-tertiary shrink-0 flex items-center justify-center text-on-tertiary">
                      <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    </div>
                    <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl rounded-tl-sm px-4 py-3 text-xs font-mono text-on-surface-variant">
                      Apoteker sedang menganalisis kebutuhan Anda...
                    </div>
                  </div>
                )}

                {/* Quick prompts */}
                {messages.length === 1 && (
                  <div className="flex flex-wrap gap-2 ml-11">
                    {["tidur", "energi", "masak", "hadiah"].map((q) => (
                      <button
                        key={q}
                        onClick={() => handleAiSend(q)}
                        className="px-3 py-1.5 rounded-full border border-outline-variant text-xs font-label-caps text-on-surface-variant hover:bg-tertiary-fixed hover:border-tertiary transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-outline-variant/20">
                <div className="relative max-w-3xl mx-auto">
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-full py-3.5 pl-5 pr-14 text-sm focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 transition-all text-on-surface"
                    placeholder="Tanyakan tentang produk, manfaat, atau kebutuhan kesehatan Anda..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAiSend(inputValue)}
                  />
                  <button
                    onClick={() => handleAiSend(inputValue)}
                    className="absolute right-1.5 top-1.5 w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </div>
                <p className="text-center mt-2 text-[10px] text-on-surface-variant/50 font-label-caps">
                  Rekomendasi berbasis kearifan rempah. Konsultasikan dengan dokter untuk kondisi kronis.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
