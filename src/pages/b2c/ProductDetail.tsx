import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../../context/AuthContext"

const allProducts = [
  { id: "p1", name: "Minyak Esensial Pala Murni", seller: "Ahmad Fauzi", sellerAvatar: "A", sellerKota: "Banda Aceh, Aceh", sellerGPS: "5.5483° N, 95.3238° E", sellerFoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaXt64IB2ubM_wUash5fD0D21OolvgzFS0NwUQWbrdPgX9BMOZ_gKACJ-v-9Fr3co_nL0GLPpL_rigsH4t17m7NErlQZOxJXWTNAWuMAhfbRd7o486UTp3XuPJ3o8quqrEpqfh3TE3i2fWda8GNlxm6vR1c-wNGc84J9WHVRDDgE3ZPxvhTUoQrTda9a8zWU4ItFIPM1VryxrBHZM3GI1XRao42tuxy3UqbUsgsGssreQxEFV0ww", category: "Minyak Esensial", price: 185000, unit: "30ml", stock: 42, rating: 4.9, sold: 312, badge: "Terlaris", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDexw52erlBzdsXAMSGCOcUB2OigNuW2IOeK_oy8f_5Q1ziMlsvKC6SI94sZU_ocY7KHQBO0jrbiIvi7VqWEgstklXXTnIlT23ZqINrTbk8fqVPfHXz73nGHdF1l9g2CXA1NyV_bHl5lob3Lh_WwKhTqJ3pD0ip3XC9svTAAZsgwbyi1rzFmizg9p8OveyGS9V5k-YacGQQopOGQ6i9ew8E8yeujPBInLEyuv33pCNDSpSqHh3aA", desc: "Diekstrak dari biji pala pilihan menggunakan distilasi uap bertekanan rendah dari tanah vulkanik Nusantara. Cocok untuk aromaterapi, perawatan kulit, dan penggunaan kuliner premium.", batchId: "AT-2024-SA01", harvestDate: "12 Okt 2024", soilMoisture: "34.8%", farmerGen: "Generasi ke-3", traceSteps: ["Budidaya naungan di bawah kanopi hutan hujan tropis Banda Aceh", "Distilasi uap bertekanan rendah dalam 24 jam setelah panen", "Dikemas dan dikirim melalui pelabuhan ekspor Aceh"] },
  { id: "p2", name: "Biji Pala Utuh Premium", seller: "Ahmad Fauzi", sellerAvatar: "A", sellerKota: "Banda Aceh, Aceh", sellerGPS: "5.5483° N, 95.3238° E", sellerFoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaXt64IB2ubM_wUash5fD0D21OolvgzFS0NwUQWbrdPgX9BMOZ_gKACJ-v-9Fr3co_nL0GLPpL_rigsH4t17m7NErlQZOxJXWTNAWuMAhfbRd7o486UTp3XuPJ3o8quqrEpqfh3TE3i2fWda8GNlxm6vR1c-wNGc84J9WHVRDDgE3ZPxvhTUoQrTda9a8zWU4ItFIPM1VryxrBHZM3GI1XRao42tuxy3UqbUsgsGssreQxEFV0ww", category: "Rempah Utuh", price: 125000, unit: "250g", stock: 88, rating: 4.8, sold: 215, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIHaOtBYbH_nOL07TlXMt1PirltfQqdWzIe6scQgSkMKFGtwb9OLmnCfWJDpslbv-Zt62r2OScd8pmnuflFgkpoGLvZ96oOOl2kc-AAzuceTmRNfg_qVmAFmGzm6RfYjJhTb0FiX5G2b_dbxk39l0K7DclqOH-AT7cZto0B44NZo1M8BWiyukciHZ8vTXsEXQzrkgjwc5Oc2oxYOVahN3rP0UgYUODzsbIkQyZ2MUiWK4-Sc6bTA", desc: "Biji pala pilihan dipanen pada kematangan puncak, disimpan utuh dalam wadah kedap udara untuk menjaga kandungan minyak atsiri sampai ke tangan Anda. Ideal untuk memasak, membuat minuman, dan keperluan herbal.", batchId: "AT-2024-SA02", harvestDate: "15 Okt 2024", soilMoisture: "34.8%", farmerGen: "Generasi ke-3", traceSteps: ["Dipilih tangan oleh petani generasi ke-3 di Banda Aceh", "Disortir manual berdasarkan ukuran dan kualitas", "Disegel vakum dan dikirim dalam 48 jam"] },
  { id: "p3", name: "Fuli Kering Nusantara", seller: "Pinkan Maharani", sellerAvatar: "P", sellerKota: "Ternate, Maluku Utara", sellerGPS: "0.7828° N, 127.3791° E", sellerFoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", category: "Rempah Utuh", price: 145000, unit: "100g", stock: 56, rating: 4.7, sold: 143, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWaPzl8hYaBl4KScRB7igtFrwiHE0Ff_bsdQRsP35hR1aruF2bTc1kY76iIGrXuw7-17IldiKVR-afKqvUOKY3pYG63qjAvOU6OZwTKD01dzivx0cDzL1V3lA6pR8yFP4GVYk25F7DlPnJzb4g0yVpnFGgXHQxTxd9f16a_WhuAJLLpF2XPK218tXxikx3j3GbTC2zyHlZRQCGKVrFCvlnA2vxr2S8pPCTo2fOeitnJoPQxFxaQ", desc: "Fuli (mace) merah kering bermutu tinggi dari Ternate. Selaput jala merah yang membungkus biji pala ini memiliki aroma lebih halus dengan sentuhan sitrus. Populer dalam masakan Padang, kari Nusantara, dan minuman herbal tradisional.", batchId: "PM-2024-TN05", harvestDate: "08 Nov 2024", soilMoisture: "31.2%", farmerGen: "Generasi ke-2", traceSteps: ["Dipetik tangan dari pohon pala berusia 15 tahun di Ternate", "Dikeringkan secara alami di bawah sinar matahari selama 7 hari", "Dikemas dalam wadah kedap udara dengan nitrogen flush"] },
  { id: "p4", name: "Balm Malam Pala Premium", seller: "Pinkan Maharani", sellerAvatar: "P", sellerKota: "Ternate, Maluku Utara", sellerGPS: "0.7828° N, 127.3791° E", sellerFoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", category: "Produk Perawatan", price: 185000, unit: "50ml", stock: 30, rating: 4.9, sold: 278, badge: "Rekomendasi AI", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDefJb0D_YxwnTy9vrcBW6TNkUDjJTlvkWFDrgtoW-uq_dk5ZZdwhEZl_w8YXUTkwdZJvAt2ADr2Ag0E4p3E-QfhOJtHEI8FywXrfNiY_5_GUMQnomtsCWaZsR7815WVIaGFn8xfdxGIKiJACZWE7AVY7KbZpxxT9vH2ue97AyIEZ8UcjEG7yUTBvVxLSelnbcL17CoVpUh6dn7KZcK13YbGLT-oQLbByC3gxBnjnrTqI089hCIjQ", desc: "Balm pelipis berbahan dasar 100% minyak esensial pala Ternate dicampur lilin lebah dan shea butter. Membantu memberikan efek menenangkan alami untuk tidur berkualitas. Tanpa bahan kimia tambahan.", batchId: "PM-2024-TN08", harvestDate: "10 Nov 2024", soilMoisture: "31.2%", farmerGen: "Generasi ke-2", traceSteps: ["Minyak diekstrak dari pala segar Ternate menggunakan CO2 superkritis", "Diformulasikan bersama ahli farmakognosi lokal", "Diproduksi di laboratorium GMP-certified Makassar"] },
  { id: "p5", name: "Sirup Hangat Pala & Jahe", seller: "Ahmad Fauzi", sellerAvatar: "A", sellerKota: "Banda Aceh, Aceh", sellerGPS: "5.5483° N, 95.3238° E", sellerFoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaXt64IB2ubM_wUash5fD0D21OolvgzFS0NwUQWbrdPgX9BMOZ_gKACJ-v-9Fr3co_nL0GLPpL_rigsH4t17m7NErlQZOxJXWTNAWuMAhfbRd7o486UTp3XuPJ3o8quqrEpqfh3TE3i2fWda8GNlxm6vR1c-wNGc84J9WHVRDDgE3ZPxvhTUoQrTda9a8zWU4ItFIPM1VryxrBHZM3GI1XRao42tuxy3UqbUsgsGssreQxEFV0ww", category: "Minuman & Sirup", price: 145000, unit: "250ml", stock: 64, rating: 4.6, sold: 189, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpUSYtu0kDjtM11U0f6bhDTOMI7ZWuMnGUTQZNzTN4MRIDJci5v2AIULlNPZaFnHA2as-ox5545dH7hJYyyLDFRBVC6nGij9HIGYNFDXfC4LK5bXBFTy6v8S8SVXEXAMzM-l2u4mTyIpKDNi5nPIe3khndRPLNddz0oGxdqIvjC9l4r8eWM_6qSA_PBlGDKS6xprN8WntWcKbshUwuNBNJyQR8KkriSeVC5ho2lupNak7pqJo69g", desc: "Sirup pala artisanal yang diinfus dengan jahe segar pilihan dari Aceh. Tanpa pengawet, tanpa pewarna buatan. Sajikan 2 sendok makan dalam air hangat atau campurkan ke dalam minuman favoritmu.", batchId: "AT-2024-SA07", harvestDate: "20 Okt 2024", soilMoisture: "34.8%", farmerGen: "Generasi ke-3", traceSteps: ["Pala dan jahe dipanen segar dari kebun Banda Aceh", "Dimasak lambat selama 4 jam pada suhu 65°C untuk menjaga enzim", "Dibotolkan manual dan disegel dengan wax alami"] },
  { id: "p6", name: "Paket Warisan Nusantara", seller: "Pinkan Maharani", sellerAvatar: "P", sellerKota: "Ternate, Maluku Utara", sellerGPS: "0.7828° N, 127.3791° E", sellerFoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", category: "Paket Spesial", price: 345000, unit: "Set", stock: 12, rating: 5.0, sold: 87, badge: "Edisi Terbatas", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXaEw9-WcDfEPVy1PomEZr1xW6FeG9sntoTPAHVk-Ln8SGnb_vY9h6Zf4npIDZB8J_RoOqBMDW9Gh67Ya3zjwGxj-XcERxvxB0BQ2_FlBoDXRZXTsJedv7SP6mKoKiAUiHgRoOiJxeCLfgXysUYo0cKGkpRbLQJOnZZJ15voiBJu_FO2R7n1RIS2jymquPtUsKbx60YrqaZo0Z5zwzScoTYKy-1EGuo43tT-Twil9ST0pYW8l_1A", desc: "Koleksi premium eksklusif: Minyak Esensial 15ml, Biji Pala Utuh 100g, Fuli Kering 50g, dan Sirup Pala 100ml. Dikemas dalam kotak kayu jati berukir dengan sertifikat keaslian. Edisi terbatas hanya 50 set per batch.", batchId: "PM-2024-TN12", harvestDate: "25 Nov 2024", soilMoisture: "31.2%", farmerGen: "Generasi ke-2", traceSteps: ["Setiap komponen dipilih dari batch terbaik panen Ternate", "Dikurasi dan dikemas oleh tim apoteker PalaMart", "Dikirim dengan asuransi pengiriman dan tracking real-time"] },
]

const testimoniByProduct: Record<string, { nama: string; kota: string; rating: number; teks: string; tanggal: string }[]> = {
  p1: [
    { nama: "Sari W.", kota: "Jakarta", rating: 5, teks: "Aromanya luar biasa! Saya pakai untuk diffuser sebelum tidur, tidur jadi jauh lebih nyenyak. Kualitas benar-benar premium.", tanggal: "28 Jun 2026" },
    { nama: "Budi K.", kota: "Surabaya", rating: 5, teks: "Sudah order 3 kali dan selalu puas. Minyaknya bersih, tidak ada endapan. Recommended banget!", tanggal: "20 Jun 2026" },
    { nama: "Rina H.", kota: "Bandung", rating: 4, teks: "Kualitas bagus, pengiriman cepat. Aromanya kuat dan tahan lama. Minus 1 karena botol agak susah dibuka.", tanggal: "15 Jun 2026" },
  ],
  p2: [
    { nama: "Chef Arman", kota: "Makassar", rating: 5, teks: "Biji pala terbaik yang pernah saya coba. Aromanya sangat segar dan kuat. Cocok untuk masakan rendang dan kari.", tanggal: "01 Jul 2026" },
    { nama: "Dewi P.", kota: "Yogyakarta", rating: 5, teks: "Pemesanan mudah, packing aman, kualitas top! Saya pakai untuk bikin minuman herbal dan hasilnya memuaskan.", tanggal: "25 Jun 2026" },
    { nama: "Agus S.", kota: "Medan", rating: 4, teks: "Stok banyak, pengiriman cepat. Kualitas sesuai dengan harga yang ditawarkan.", tanggal: "18 Jun 2026" },
  ],
  default: [
    { nama: "Andi R.", kota: "Jakarta", rating: 5, teks: "Produk yang sangat berkualitas! Saya sangat puas dengan pembelian ini. Seller responsif dan packing aman.", tanggal: "03 Jul 2026" },
    { nama: "Maya L.", kota: "Bali", rating: 5, teks: "Kualitas top, harga sepadan. Sudah beli dua kali dan akan beli lagi. Highly recommended!", tanggal: "27 Jun 2026" },
    { nama: "Dani W.", kota: "Semarang", rating: 4, teks: "Pengiriman cepat, produk sesuai deskripsi. Penjual komunikatif. Puas dengan pembelian ini.", tanggal: "22 Jun 2026" },
  ],
}

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`

export function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [qty, setQty] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const product = allProducts.find((p) => p.id === id)

  if (!product) return (
    <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant">
      <span className="material-symbols-outlined text-6xl mb-4 opacity-30">inventory_2</span>
      <h2 className="font-display-b2c text-xl">Produk tidak ditemukan</h2>
      <button onClick={() => navigate("/services")} className="mt-4 text-primary font-label-caps hover:underline">← Kembali ke Marketplace</button>
    </div>
  )

  const testimoni = testimoniByProduct[id ?? ""] ?? testimoniByProduct.default

  const handleAddCart = () => {
    if (!isLoggedIn) { navigate("/login"); return }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-margin-desktop py-10">
      {/* Back */}
      <button onClick={() => navigate("/services")} className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors mb-8 font-label-caps">
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Kembali ke Marketplace
      </button>

      {/* Cart Toast */}
      <AnimatePresence>
        {addedToCart && (
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-secondary text-on-secondary px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl font-mono text-sm">
            <span className="material-symbols-outlined text-base">check_circle</span>
            {product.name} ditambahkan ke keranjang!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.badge && (
            <span className="absolute top-4 left-4 bg-tertiary-fixed text-on-tertiary px-3 py-1.5 rounded-full font-label-caps text-xs font-bold">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <span className="font-label-caps text-[11px] text-tertiary uppercase tracking-widest">{product.category}</span>
            <h1 className="font-display-b2c text-3xl text-primary mt-1 leading-tight">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`material-symbols-outlined text-base ${i < Math.round(product.rating) ? "text-tertiary-fixed" : "text-outline-variant"}`} style={{ fontVariationSettings: i < Math.round(product.rating) ? "'FILL' 1" : "'FILL' 0" }}>star</span>
              ))}
            </div>
            <span className="font-mono font-bold text-sm text-on-surface">{product.rating}</span>
            <span className="text-xs text-on-surface-variant">({product.sold} terjual)</span>
            <span className="text-xs text-on-surface-variant">• Stok: {product.stock}</span>
          </div>

          {/* Price */}
          <div className="bg-surface-container-low rounded-xl p-4">
            <span className="font-display-b2c text-3xl text-primary">{formatRp(product.price)}</span>
            <span className="text-sm text-on-surface-variant ml-2">/{product.unit}</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-label-caps text-[10px] text-secondary border border-secondary/30 px-2 py-0.5 rounded-full">Garansi Kualitas</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-on-surface-variant leading-relaxed">{product.desc}</p>

          {/* Qty & Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-base">remove</span>
              </button>
              <span className="px-5 py-2 font-mono font-bold text-on-surface border-x border-outline-variant">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-base">add</span>
              </button>
            </div>
            <button onClick={handleAddCart}
              className="flex-1 py-3 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-base">add_shopping_cart</span>
              Tambah ke Keranjang • {formatRp(product.price * qty)}
            </button>
          </div>

          {!isLoggedIn && (
            <p className="text-xs text-on-surface-variant text-center font-label-caps">
              <button onClick={() => navigate("/login")} className="text-primary hover:underline">Masuk</button> untuk membeli produk ini
            </p>
          )}
        </div>
      </div>

      {/* ── Jejak Petani ─────────────────────────────────────────────── */}
      <section className="mb-12 bg-primary rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Farmer Profile */}
          <div className="p-8 border-r border-on-primary/10">
            <span className="font-label-caps text-[10px] text-on-primary/50 block mb-4 uppercase tracking-widest">Profil Petani</span>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-tertiary-fixed shrink-0">
                <img src={product.sellerFoto} alt={product.seller} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-display-b2c text-lg text-on-primary">{product.seller}</p>
                <p className="text-xs text-on-primary/60 font-mono">{product.farmerGen}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-on-primary/50">LOKASI</span>
                <span className="text-on-primary">{product.sellerKota}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-primary/50">GPS</span>
                <span className="text-on-primary">{product.sellerGPS}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-primary/50">PANEN</span>
                <span className="text-on-primary">{product.harvestDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-on-primary/50">KELEMBABAN TANAH</span>
                <span className="text-on-primary">{product.soilMoisture} Optimal</span>
              </div>
            </div>
          </div>

          {/* Batch Info */}
          <div className="p-8 border-r border-on-primary/10">
            <span className="font-label-caps text-[10px] text-on-primary/50 block mb-4 uppercase tracking-widest">Buku Besar Keterlacakan</span>
            <div className="space-y-3 text-xs font-mono bg-on-primary/5 p-4 rounded-xl">
              <div className="flex justify-between">
                <span className="text-on-primary/50">CATATAN REGISTRI</span>
                <span className="text-tertiary-fixed font-bold">#ATH-BLOCK-{product.batchId.slice(-4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-primary/50">ID BATCH</span>
                <span className="text-on-primary">{product.batchId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-on-primary/50">PANEN TERVERIFIKASI</span>
                <span className="text-secondary-fixed font-bold">YA</span>
              </div>

            </div>
          </div>

          {/* Rantai Pasok */}
          <div className="p-8">
            <span className="font-label-caps text-[10px] text-on-primary/50 block mb-4 uppercase tracking-widest">Rantai Pasok</span>
            <div className="space-y-5">
              {product.traceSteps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-tertiary-fixed text-on-tertiary flex items-center justify-center text-[10px] font-bold shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {i < product.traceSteps.length - 1 && <div className="w-px flex-1 bg-on-primary/20 my-1" />}
                  </div>
                  <p className="text-xs text-on-primary/70 leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimoni ─────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display-b2c text-2xl text-primary">Ulasan Pembeli</h2>
          <div className="flex items-center gap-2">
            <span className="font-display-b2c text-3xl text-primary">{product.rating}</span>
            <div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-xs text-on-surface-variant font-mono">{testimoni.length} ulasan</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {testimoni.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-surface border border-outline-variant/20 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
                    {t.nama[0]}
                  </div>
                  <div>
                    <p className="font-label-caps text-sm text-on-surface">{t.nama}</p>
                    <p className="text-xs text-on-surface-variant font-mono">{t.kota}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="material-symbols-outlined text-xs text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                  <span className="text-[10px] text-on-surface-variant ml-2 font-mono">{t.tanggal}</span>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">{t.teks}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
