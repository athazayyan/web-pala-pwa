import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Home() {
  // Apoteker Rempah Chat
  const [chatInput, setChatInput] = useState("")
  const [chatResponse, setChatResponse] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  const handleSearch = (query: string) => {
    setChatInput(query)
    setIsTyping(true)
    setChatResponse(null)

    setTimeout(() => {
      setIsTyping(false)
      const q = query.toLowerCase()
      if (q.includes("tidur") || q.includes("relaksasi") || q.includes("calming")) {
        setChatResponse(
          "Minyak Esensial Pala Uap Grade A sangat cocok untuk ritual malam. Kadar myristicin tinggi dari ladang vulkanik Nusantara bekerja sebagai penenang alami. Teteskan 3 tetes ke diffuser sebelum tidur untuk hasil terbaik."
        )
      } else if (q.includes("panen") || q.includes("harvest") || q.includes("musim")) {
        setChatResponse(
          "Puncak panen pala di Indonesia terjadi antara Juni hingga Agustus dan Oktober hingga Desember. Angin pesisir membantu proses pengeringan alami biji pala yang sudah terbelah, mengunci kandungan minyak atsiri terbaik."
        )
      } else if (q.includes("fuli") || q.includes("mace")) {
        setChatResponse(
          "Fuli (Mace) adalah selaput merah jaring yang membungkus biji pala. Berbeda dengan pala yang manis dan hangat, fuli memiliki aroma lebih halus dengan sentuhan sitrus. Sangat populer dalam masakan Padang dan kari Nusantara."
        )
      } else {
        setChatResponse(
          `Untuk pertanyaan tentang '${query}', kami merekomendasikan paket Rempah Utuh. Disimpan utuh dalam wadah keramik untuk menjaga kandungan minyak atsiri hingga Anda siap menggunakannya.`
        )
      }
    }, 1500)
  }

  // Kalkulator Kontribusi
  const [purchaseAmount, setPurchaseAmount] = useState(300000)
  const calculatedContribution = Math.round(purchaseAmount * 0.02).toLocaleString("id-ID")
  const hectaresRestored = (purchaseAmount * 0.000005).toFixed(3)

  // Scrollytelling active state
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center px-6 md:px-margin-desktop overflow-hidden rounded-xl">
        <div className="absolute inset-0 -z-10">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6zqMoS8kDbvYN4di4y3muAEG24VkgYKXnkWiELmiDK_oPtR9jnlN1EtUmzZz26oy7PpIVk80PyxeHR-ppfahVDuaEocIxg8AG2Q09jFoFmqcCn4aSY0XRWgAuFwrvrqNf1UGsmbTR4wIUMuZQUxWzWVFDMC9mkVC0rX0gz2XHAGkaI_Fhqw2xBxynPURG9Izjt42Ic9VS0hdfWEiF5CD-4DVlv4HZl15_hfu3osgEeILsw5Bz3Q')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="max-w-2xl">
          <span className="font-label-caps text-label-caps text-tertiary-container tracking-[0.2em] uppercase mb-4 block">
            Warisan Leluhur, Kemurnian Modern
          </span>
          <h1 className="font-display-b2c text-display-b2c text-primary mb-6 leading-[1.1] text-4xl md:text-6xl">
            Pala Terbaik dari Bumi Nusantara
          </h1>
          <p className="font-body-md text-on-surface-variant mb-10 max-w-lg">
            Dipanen tangan dari lereng subur kepulauan Indonesia, pala kami mewakili tradisi berabad-abad dalam keunggulan botani. Temukan minyak esensial paling aromatik dan sirup artisanal dari tanah rempah terbaik dunia.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-caps text-label-caps flex items-center gap-2 hover:opacity-90 transition-all active:scale-95">
              Jelajahi Koleksi
              <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
            </button>
            <a
              href="#jejak-rempah"
              className="border border-primary text-primary px-8 py-4 rounded-lg font-label-caps text-label-caps hover:bg-primary/5 transition-all text-center"
            >
              Kisah Rempah Nusantara
            </a>
          </div>
        </div>
      </section>

      {/* Apoteker Rempah AI Teaser */}
      <section className="py-12 px-6 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-xl border border-outline-variant/30 flex flex-col md:flex-row items-stretch gap-12">
            <div className="flex-1 flex flex-col justify-between py-2">
              <div>
                <h2 className="font-display-b2c text-3xl md:text-4xl text-primary mb-4">Apoteker Rempah</h2>
                <p className="font-body-md text-on-surface-variant">
                  Konsultan rempah pribadi Anda. Tanyakan tentang manfaat kesehatan, paduan rasa, atau spesifikasi batch terbaru kami.
                </p>
              </div>
              <div className="mt-8 p-4 bg-[#fbf9f5]/60 rounded-lg border border-outline-variant/20">
                <span className="text-[10px] font-label-caps text-tertiary uppercase tracking-wider block mb-1">Kemurnian Ekstrak Terdaftar</span>
                <span className="font-mono text-sm font-bold text-primary">KADAR MYRISTICIN: 9.84% • EKSTRAK MURNI</span>
              </div>
            </div>

            <div className="flex-[1.5] w-full flex flex-col justify-center space-y-4">
              <div className="relative">
                <input
                  className="w-full bg-surface-container-lowest border-2 border-outline-variant focus:border-tertiary focus:ring-0 rounded-full py-5 px-8 pr-16 font-body-md text-on-surface-variant transition-all outline-none"
                  placeholder="Coba tanya: 'Minyak mana terbaik untuk relaksasi?'"
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(chatInput)}
                />
                <button
                  onClick={() => handleSearch(chatInput)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-tertiary text-on-tertiary w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
                </button>
              </div>

              <div className="flex gap-2.5 mt-2 px-2 overflow-x-auto no-scrollbar">
                {[
                  { query: "Minyak mana terbaik untuk relaksasi dan tidur?", label: "Ritual Relaksasi" },
                  { query: "Kapan musim panen pala di Indonesia?", label: "Musim Panen" },
                  { query: "Apa perbedaan antara Fuli dan Pala?", label: "Fuli vs Pala" },
                ].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(s.query)}
                    className="text-[11px] font-label-caps bg-surface-container-high px-4 py-1.5 rounded-full text-on-surface-variant hover:bg-tertiary-fixed transition-colors whitespace-nowrap"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center gap-3 text-sm text-on-surface-variant font-mono"
                  >
                    <span className="material-symbols-outlined animate-spin" data-icon="progress_activity">progress_activity</span>
                    Menelusuri catatan rempah kuno...
                  </motion.div>
                )}
                {chatResponse && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6 rounded-lg bg-[#fbf9f5] border border-outline-variant/40 shadow-sm space-y-2"
                  >
                    <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2 mb-2">
                      <span className="font-label-caps text-xs text-tertiary uppercase tracking-wider">Rekomendasi Apoteker</span>
                      <button onClick={() => setChatResponse(null)} className="text-xs text-on-surface-variant hover:text-primary">&times; Tutup</button>
                    </div>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">{chatResponse}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Jejak Rempah (Scrollytelling) */}
      <section className="bg-primary text-on-primary py-32 overflow-hidden rounded-xl" id="jejak-rempah">
        <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-16">
              {[
                {
                  step: 1,
                  label: "01 / ASAL USUL",
                  title: "Tanah Vulkanik & Angin Laut",
                  desc: "Di antara pegunungan dan laut Nusantara, pohon pala menyerap mineral dari tanah vulkanik purba. Angin laut mengawetkan biji secara alami, menciptakan profil kimia yang tak tertandingi di belahan dunia manapun.",
                },
                {
                  step: 2,
                  label: "02 / TRADISI",
                  title: "Warisan Petani Turun-Temurun",
                  desc: "Petani generasi ketiga memanjat pohon pala yang menjulang untuk memilih dengan tangan hanya buah yang sudah terbelah alami. Teknik 'Pala Matang' ini memastikan konsentrasi minyak esensial tertinggi.",
                },
                {
                  step: 3,
                  label: "03 / KETERLACAKAN",
                  title: "Setiap Batch Punya Cerita",
                  desc: "Pindai setiap produk untuk mengenal petaninya, melihat koordinat perkebunan, dan meninjau sertifikat kemurnian dari laboratorium kami. Transparansi adalah bahan paling berharga kami.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`cursor-pointer p-6 rounded-lg transition-all duration-300 border ${
                    activeStep === item.step
                      ? "bg-white/10 border-white/20"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <span className="font-data-mono text-tertiary-fixed mb-2 block">{item.label}</span>
                  <h3 className="font-display-b2c text-2xl mb-4">{item.title}</h3>
                  <p className="text-on-primary/70 font-body-md text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="sticky top-40 hidden md:block">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-on-primary/20">
                <img
                  className="object-cover w-full h-full opacity-80 transition-all duration-500"
                  alt="Asal Rempah Nusantara"
                  src={
                    activeStep === 1
                      ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBI7VbrlXql4q7qpsmji9JhzZs1bvulJyMnn9yHnfNOQ2jlb3_Qdc1NVAp4_ggibIcLtuhF4gopUE8-s0mWfMZNZAhIPnP4u2t45rmKb0ioXBx02-pQMmDHr1mr-DHbClXOhvjCSLySTHnSM1ptKPAZ_ujlRzD_uInD2g7qb2aq4Pu9QvfU1V2MHYn86-KXHVbEhsymaNeaQ86KJo2a4-VJOpdX8JcONm0FFYWwAqLbqWNmIFq0GQ"
                      : activeStep === 2
                      ? "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
                      : "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori Produk */}
      <section className="py-24 px-6 md:px-margin-desktop bg-surface-container-lowest rounded-xl">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-display-b2c text-3xl md:text-4xl text-primary mb-4">Pilihan Unggulan</h2>
              <p className="font-body-md text-on-surface-variant">Produk rempah terbaik dari kepulauan Indonesia.</p>
            </div>
            <a className="font-label-caps text-label-caps text-primary flex items-center gap-2 hover:gap-4 transition-all group" href="#marketplace">
              Lihat Semua
              <span className="material-symbols-outlined" data-icon="trending_flat">trending_flat</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Minyak Esensial */}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-6 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Minyak Esensial Pala"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDexw52erlBzdsXAMSGCOcUB2OigNuW2IOeK_oy8f_5Q1ziMlsvKC6SI94sZU_ocY7KHQBO0jrbiIvi7VqWEgstklXXTnIlT23ZqINrTbk8fqVPfHXz73nGHdF1l9g2CXA1NyV_bHl5lob3Lh_WwKhTqJ3pD0ip3XC9svTAAZsgwbyi1rzFmizg9p8OveyGS9V5k-YacGQQopOGQ6i9ew8E8yeujPBInLEyuv33pCNDSpSqHh3aA"
                />
                <div className="absolute top-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-label-caps text-[10px]">
                  Grade Apoteker
                </div>
              </div>
              <h4 className="font-display-b2c text-xl text-primary mb-2">Minyak Esensial</h4>
              <p className="font-body-sm text-on-surface-variant mb-4">Ekstrak uap murni untuk terapi dan kuliner premium.</p>
              <span className="font-label-caps text-[12px] text-tertiary border-b border-tertiary/30 pb-1">Belanja Koleksi</span>
            </div>

            {/* Sirup Artisanal */}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-6 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Sirup Pala Artisanal"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpUSYtu0kDjtM11U0f6bhDTOMI7ZWuMnGUTQZNzTN4MRIDJci5v2AIULlNPZaFnHA2as-ox5545dH7hJYyyLDFRBVC6nGij9HIGYNFDXfC4LK5bXBFTy6v8S8SVXEXAMzM-l2u4mTyIpKDNi5nPIe3khndRPLNddz0oGxdqIvjC9l4r8eWM_6qSA_PBlGDKS6xprN8WntWcKbshUwuNBNJyQR8KkriSeVC5ho2lupNak7pqJo69g"
                />
                <div className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-[10px]">
                  Artisanal
                </div>
              </div>
              <h4 className="font-display-b2c text-xl text-primary mb-2">Sirup Artisanal</h4>
              <p className="font-body-sm text-on-surface-variant mb-4">Pemanis kompleks dari sari buah pala utuh yang istimewa.</p>
              <span className="font-label-caps text-[12px] text-tertiary border-b border-tertiary/30 pb-1">Belanja Koleksi</span>
            </div>

            {/* Rempah Utuh */}
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-6 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Biji Pala Utuh"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLqhrhDU5BGkD03BvH5WbRiuw8IzCZjNPYEyiGdb5RfmmECC_8WiMC_b1LMiSK02iK1_ymT554xTNJ8L1MhEJOukYStauIeqSK8hWnRklQh9fg0Ufph08BJvnkvKSDs59R0W4FNYolxV2fFfX8ZVp_qWYH7Sb_AnT7B36s4NtEUCQyJ-CilrK6N7zSbgXhKdzv7Tu5N1uGv_u0iCompSdd6eH-USviiTY-A0J1zvkg7KRATzmlAQ"
                />
                <div className="absolute top-4 right-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-caps text-[10px]">
                  Warisan
                </div>
              </div>
              <h4 className="font-display-b2c text-xl text-primary mb-2">Rempah Utuh</h4>
              <p className="font-body-sm text-on-surface-variant mb-4">Biji pala dan fuli merah utuh, disimpan untuk kemurnian maksimal.</p>
              <span className="font-label-caps text-[12px] text-tertiary border-b border-tertiary/30 pb-1">Belanja Koleksi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Keberlanjutan */}
      <section className="py-24 px-6 md:px-margin-desktop bg-secondary text-on-secondary rounded-xl">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div>
              <span className="font-label-caps text-label-caps text-secondary-fixed mb-6 block tracking-widest">
                PENGELOLAAN EKOSISTEM
              </span>
              <h2 className="font-display-b2c text-3xl md:text-5xl mb-8 leading-tight">
                Setiap tetes membantu bumi bernafas kembali.
              </h2>
              <p className="font-body-md text-on-secondary/80 max-w-lg">
                Melalui program 'Peremajaan Lahan', 2% dari setiap pembelian ritel diinvestasikan kembali ke kompos organik dan pemeliharaan teras untuk petani mitra kami di seluruh Nusantara.
              </p>
            </div>

            {/* Kalkulator Widget */}
            <div className="bg-white/10 p-6 rounded-lg border border-white/20 max-w-md space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span>SIMULASIKAN JUMLAH BELANJA</span>
                <span className="text-secondary-fixed font-bold">Rp {purchaseAmount.toLocaleString("id-ID")}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                className="w-full accent-secondary-fixed cursor-pointer h-1.5 bg-white/20 rounded-full appearance-none"
              />
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10 text-center font-mono">
                <div>
                  <span className="text-[10px] uppercase text-on-secondary/70 block">DIREINVESTASI</span>
                  <span className="text-lg font-bold text-secondary-fixed">Rp {calculatedContribution}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-on-secondary/70 block">DIPULIHKAN</span>
                  <span className="text-lg font-bold text-secondary-fixed">{hectaresRestored} Ha</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-on-secondary/20 pt-10 font-mono">
              <div>
                <span className="text-secondary-fixed text-3xl font-bold block mb-2">1.240+</span>
                <span className="font-label-caps text-[10px] uppercase">Hektar Terlindungi</span>
              </div>
              <div>
                <span className="text-secondary-fixed text-3xl font-bold block mb-2">450</span>
                <span className="font-label-caps text-[10px] uppercase">Keluarga Petani Didukung</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                className="w-full aspect-square object-cover"
                alt="Perkebunan Pala Indonesia"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG2WkTMMRSxOOP1s7tktaqBmCOoqQ624gzTL-zQcR1b-qxaK62tN8WVwdkWQ-bkdcK4aIbuokrPXtzYTJS4QRJxk1Kpays_A6Bptf--0hlUaW2XW0k5Edwh1MbR6kYHrnsxuFPgi6-39yV8nIW6DUNpQnokx_UZevOhUOPtn3RZOtmDSbYzhuolDBeziVBhTISiNsHfySyoxc2Bg4i0Jo43-MgmoFWEP-0intglGVzd6SEhCefqQ"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
