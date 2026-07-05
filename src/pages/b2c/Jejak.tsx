import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, Map, Check, ShoppingCart } from "lucide-react"

// Mocks
const qrGridInitial = Array(25).fill(0).map(() => Math.random() > 0.4)

export function Jejak() {
  // QR scan modal simulation
  const [showQRModal, setShowQRModal] = useState(false)
  const [batchId, setBatchId] = useState("AT-2024-SA01")
  const [qrGrid, setQrGrid] = useState(qrGridInitial)

  // Grove report modal simulation
  const [showGroveModal, setShowGroveModal] = useState(false)

  // Dynamic QR code pixel randomizer
  const randomizeQR = () => {
    setQrGrid(Array(25).fill(0).map(() => Math.random() > 0.4))
    const randBatch = `AT-2024-SA${Math.floor(Math.random() * 90 + 10)}`
    setBatchId(randBatch)
  }

  // Product purchase toast simulation
  const [addedProduct, setAddedProduct] = useState<string | null>(null)
  const triggerAddCart = (name: string) => {
    setAddedProduct(name)
    setTimeout(() => setAddedProduct(null), 2000)
  }

  return (
    <div className="relative font-body-md text-on-surface bg-surface selection:bg-tertiary-fixed selection:text-on-tertiary-fixed">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedProduct && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1b6d24] text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl font-mono text-sm border border-white/20"
          >
            <Check className="w-4 h-4" />
            <span>{addedProduct} added to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex flex-col items-center justify-center overflow-hidden rounded-xl">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center brightness-75 transition-transform duration-1000" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAt3Cbp5MiB8cb_lBdJTUTmYNZzVVhee4o8lOJ6xZTOJp-AzaRdOtmnfIMXLB2HKYJdSClCNQG2k17sbGIkZoBgaE1D7lwj5jHfGGPwncuj771feE-GNJOLyimn-9FRSxvGCzWdPz1Iop7JONPD7sWFcBcsvtiwOS0IHP3X4WRPJ7Z0UGdGKqEp_TLp_khEFd4pgZYHZ1QUIpCiGTkiQSI5FLcIBgTFfzns-pIpK8ciDtc4zywXsA')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-85" />
        </div>
        
        <div className="relative z-10 text-center text-white px-margin-mobile">
          <span className="font-label-caps text-label-caps tracking-[0.2em] mb-4 block uppercase opacity-85 text-tertiary-fixed">
            The Spirit of Tapaktuan
          </span>
          <h1 className="font-display-b2c text-display-b2c md:text-7xl mb-6">Jejak Rempah</h1>
          <p className="font-body-md text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            An odyssey of heritage and precision. Witness the journey from the volcanic soils of South Aceh to the global apothecary.
          </p>
          <div className="mt-12 animate-bounce flex justify-center">
            <span className="material-symbols-outlined text-4xl text-tertiary-fixed">keyboard_double_arrow_down</span>
          </div>
        </div>
      </section>

      {/* Chapter 1: The Terroir */}
      <section className="py-32 px-6 md:px-margin-desktop bg-surface-container-low overflow-hidden rounded-xl">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-6">
            <span className="font-label-caps text-label-caps text-tertiary mb-4 block">Chapter 01</span>
            <h2 className="font-display-b2c text-4xl text-primary leading-tight">
              Nurtured by the Soil of Aceh Selatan
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              In the shadow of the Barisan Mountains, our nutmeg trees thrive in mineral-rich volcanic soil. This "Technological Terroir" combines generational wisdom with real-time soil moisture monitoring.
            </p>
            <div className="flex items-center gap-4 py-4 border-l-4 border-secondary pl-6 bg-[#fbf9f5]/50 rounded-r-md">
              <span className="material-symbols-outlined text-secondary text-3xl">eco</span>
              <div>
                <p className="font-label-caps text-label-caps text-secondary">SUSTAINABILITY GRADE</p>
                <p className="font-display-b2c text-2xl font-bold text-primary">A+ Premium</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl rotate-3 transform hover:rotate-0 transition-transform duration-700">
              <img 
                className="w-full h-full object-cover" 
                alt="Nutmeg Harvest split aril"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK85RPQnfoB_xCpvGyMqDVqoLwph5cmMCFGy-uCCAhjIOInUnKrqPQ-6UcyWQOquGOlbp36dkrJmr63hRe_wNfCSnFDaz5mPUxSiXUsYjBd0AXx9ZQS1ChfDXAippHP9drRxfifMWW8x_21ZzQSSzbqJM-dgPTcIANBaisAKwLd6ozDfaaxXrwoNzqPYfJ4Vx-Ucl7uoUN2CiJikXEoZdugHmlAM31zhByYHADf7IrlcAyGaYfBQ" 
              />
            </div>
            <div className="absolute -bottom-8 -left-8 glass-panel p-8 rounded-xl shadow-lg max-w-xs">
              <p className="font-data-mono text-xs text-primary/60 mb-2">GPS: 3.2573° N, 97.2081° E</p>
              <p className="font-body-sm text-on-surface">Harvested at peak maturity by local guardians of the grove.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Distillation */}
      <section className="relative min-h-[80vh] bg-primary text-on-primary rounded-xl overflow-hidden">
        <div className="h-full w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-margin-desktop py-24 gap-12 z-10 relative">
          <div className="w-full md:w-1/2 space-y-8">
            <div>
              <span className="font-label-caps text-label-caps text-tertiary-fixed mb-4 block">Chapter 02</span>
              <h2 className="font-display-b2c text-4xl text-surface">The Alchemy of Steam</h2>
            </div>
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <span className="font-data-mono text-tertiary-fixed text-2xl">01</span>
                <div>
                  <h3 className="font-display-b2c text-xl mb-2 text-surface">Gentle Extraction</h3>
                  <p className="text-on-primary/70 text-sm leading-relaxed">
                    Using low-pressure steam distillation to preserve the volatile myristicin compounds that define our quality.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <span className="font-data-mono text-tertiary-fixed text-2xl">02</span>
                <div>
                  <h3 className="font-display-b2c text-xl mb-2 text-surface">Precision Filtration</h3>
                  <p className="text-on-primary/70 text-sm leading-relaxed">
                    A three-stage refinement process ensuring pharmaceutical-grade purity for industrial applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative flex items-center justify-center min-h-[300px]">
            {/* Spinning science gears and animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-tertiary-fixed/30 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 border border-tertiary-fixed/50 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
                  <span className="material-symbols-outlined text-6xl text-tertiary-fixed">science</span>
                </div>
              </div>
              
              <div className="absolute w-72 h-72 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Traceability Code Section */}
      <section className="py-32 px-6 md:px-margin-desktop bg-surface relative overflow-hidden rounded-xl">
        <div className="max-w-container-max mx-auto text-center mb-24 space-y-4">
          <span className="font-label-caps text-label-caps text-tertiary mb-4 block">Chapter 03</span>
          <h2 className="font-display-b2c text-4xl text-primary">From Seed to Shore</h2>
          <p className="max-w-xl mx-auto text-on-surface-variant text-sm">
            Every batch carries its own digital passport. Scan to unlock the story of its origin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-center max-w-container-max mx-auto">
          {/* Farmer Profile Card */}
          <div className="bg-surface-container rounded-xl p-8 border border-outline-variant/30 flex flex-col justify-between h-full min-h-[420px] hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4 mb-8">
              <img 
                className="w-16 h-16 rounded-full object-cover border-2 border-tertiary shrink-0" 
                alt="Portrait Bapak Syahrul"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaXt64IB2ubM_wUash5fD0D21OolvgzFS0NwUQWbrdPgX9BMOZ_gKACJ-v-9Fr3co_nL0GLPpL_rigsH4t17m7NErlQZOxJXWTNAWuMAhfbRd7o486UTp3XuPJ3o8quqrEpqfh3TE3i2fWda8GNlxm6vR1c-wNGc84J9WHVRDDgE3ZPxvhTUoQrTda9a8zWU4ItFIPM1VryxrBHZM3GI1XRao42tuxy3UqbUsgsGssreQxEFV0ww" 
              />
              <div>
                <h4 className="font-display-b2c text-lg text-primary">Bapak Syahrul</h4>
                <p className="font-label-caps text-label-caps opacity-60 text-on-surface-variant">3rd Generation Grower</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-body-sm opacity-60">Grove Location</span>
                <span className="font-body-sm font-semibold">Sawang, South Aceh</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-body-sm opacity-60">Harvest Date</span>
                <span className="font-body-sm font-semibold">Oct 12, 2024</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-body-sm opacity-60">Purity Grade</span>
                <span className="font-body-sm font-semibold text-secondary">ABCD Grade</span>
              </div>
            </div>
            
            <button 
              onClick={() => setShowGroveModal(true)}
              className="w-full py-3 bg-primary text-white rounded-lg font-label-caps text-label-caps hover:bg-primary-container active:scale-95 transition-all"
            >
              View Grove Reports
            </button>
          </div>

          {/* Central QR Interaction */}
          <div className="flex flex-col items-center justify-center p-12 bg-surface-container-highest rounded-full aspect-square border-8 border-white shadow-inner relative group select-none">
            <div className="p-6 bg-white rounded-2xl shadow-xl mb-6 relative overflow-hidden cursor-pointer" onClick={randomizeQR}>
              {/* Simulated QR Code */}
              <div className="grid grid-cols-5 gap-1 w-32 h-32 opacity-80">
                {qrGrid.map((pixel, idx) => (
                  <div key={idx} className={`w-full h-full bg-primary ${pixel ? "opacity-100" : "opacity-0"} rounded-sm transition-opacity duration-300`} />
                ))}
              </div>
              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-mono font-bold bg-white text-primary px-2.5 py-1 rounded shadow">RANDOMIZE</span>
              </div>
            </div>
            <span className="font-data-mono text-xs mb-2 text-primary">{batchId}</span>
            <button 
              onClick={() => setShowQRModal(true)}
              className="font-label-caps text-center px-8 text-secondary hover:underline cursor-pointer tracking-wider text-xs"
            >
              SCAN TO UNLOCK B2B DATA PORTAL
            </button>
          </div>

          {/* Traceability Timeline */}
          <div className="space-y-6">
            <div className="relative pl-12 before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-[-24px] before:w-[2px] before:bg-secondary">
              <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs">01</span>
              <h5 className="font-display-b2c font-bold text-primary">Cultivation</h5>
              <p className="text-sm text-on-surface-variant">Shade-grown under rainforest canopy in Tapaktuan.</p>
            </div>
            <div className="relative pl-12 before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-[-24px] before:w-[2px] before:bg-secondary">
              <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs">02</span>
              <h5 className="font-display-b2c font-bold text-primary">Extraction</h5>
              <p className="text-sm text-on-surface-variant">Processed at the Athesa Hub within 24 hours of harvest.</p>
            </div>
            <div className="relative pl-12">
              <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-tertiary text-white flex items-center justify-center font-bold text-xs">03</span>
              <h5 className="font-display-b2c font-bold text-primary">Global Export</h5>
              <p className="text-sm text-on-surface-variant">Sealed and dispatched via the Port of Tapaktuan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final B2C Showcase */}
      <section className="py-32 bg-surface-container-low px-6 md:px-margin-desktop rounded-xl">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
            <h2 className="font-display-b2c text-4xl md:text-5xl text-primary md:w-2/3">
              The Spice Apothecary: Essential Nutmeg Oil
            </h2>
            <div className="md:w-1/3 space-y-4">
              <p className="font-body-md text-on-surface-variant text-sm">
                Experience the essence of the islands. Our essential oil is the benchmark for therapeutic grade and culinary luxury.
              </p>
              <a className="font-label-caps text-label-caps text-tertiary flex items-center gap-2 group hover:gap-3 transition-all" href="#">
                Explore Marketplace 
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {[
              { 
                name: "Essential Oil (30ml)", 
                grade: "Therapeutic Grade", 
                price: "€24.00",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPQucQgNK9XOIqfh-X0N8AhK4Z6lnN4NEAYJQVjzFN6e6s1Bi2C6YiDfLKyh9grFsjqe9LsJufaOmk-Ea4hdx1ys68kvhOSJx2GD4Ws4SkuaSHrhF47l2PfHrVdF9iFrmQaRAY0WeOQCxfCSDXKiXBS1DAWmrBwruSAdAlTcbxpTL_7pbWAwY3vbp9QA4Wf3odPpq916dnnZ0RT1Og-zaFNljTPJXb915XUxc09HgBmZUL9nZxSg",
                shift: false 
              },
              { 
                name: "Whole Seeds (250g)", 
                grade: "Grade ABCD", 
                price: "€16.50",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIHaOtBYbH_nOL07TlXMt1PirltfQqdWzIe6scQgSkMKFGtwb9OLmnCfWJDpslbv-Zt62r2OScd8pmnuflFgkpoGLvZ96oOOl2kc-AAzuceTmRNfg_qVmAFmGzm6RfYjJhTb0FiX5G2b_dbxk39l0K7DclqOH-AT7cZto0B44NZo1M8BWiyukciHZ8vTXsEXQzrkgjwc5Oc2oxYOVahN3rP0UgYUODzsbIkQyZ2MUiWK4-Sc6bTA",
                shift: true 
              },
              { 
                name: "Dried Mace (100g)", 
                grade: "High-Aroma", 
                price: "€18.00",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWaPzl8hYaBl4KScRB7igtFrwiHE0Ff_bsdQRsP35hR1aruF2bTc1kY76iIGrXuw7-17IldiKVR-afKqvUOKY3pYG63qjAvOU6OZwTKD01dzivx0cDzL1V3lA6pR8yFP4GVYk25F7DlPnJzb4g0yVpnFGgXHQxTxd9f16a_WhuAJLLpF2XPK218tXxikx3j3GbTC2zyHlZRQCGKVrFCvlnA2vxr2S8pPCTo2fOeitnJoPQxFxaQ",
                shift: false 
              },
              { 
                name: "Heritage Kit", 
                grade: "Limited Batch", 
                price: "€45.00",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXaEw9-WcDfEPVy1PomEZr1xW6FeG9sntoTPAHVk-Ln8SGnb_vY9h6Zf4npIDZB8J_RoOqBMDW9Gh67Ya3zjwGxj-XcERxvxB0BQ2_FlBoDXRZXTsJedv7SP6mKoKiAUiHgRoOiJxeCLfgXysUYo0cKGkpRbLQJOnZZJ15voiBJu_FO2R7n1RIS2jymquPtUsKbx60YrqaZo0Z5zwzScoTYKy-1EGuo43tT-Twil9ST0pYW8l_1A",
                shift: true 
              }
            ].map((p, idx) => (
              <div 
                key={idx} 
                onClick={() => triggerAddCart(p.name)}
                className={`group cursor-pointer select-none ${p.shift ? "md:mt-12" : ""}`}
              >
                <div className="aspect-square overflow-hidden rounded-xl mb-4 relative shadow-sm border border-outline-variant/10">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={p.name}
                    src={p.img} 
                  />
                  <div className="absolute inset-0 bg-[#442a22]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full font-mono text-xs font-bold flex items-center gap-1">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      ADD {p.price}
                    </span>
                  </div>
                </div>
                <h6 className="font-display-b2c text-xl mb-1 text-primary">{p.name}</h6>
                <p className="font-label-caps text-secondary text-xs">{p.grade}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification / Scan Portal Overlay Modal */}
      <AnimatePresence>
        {showQRModal && (
          <div className="fixed inset-0 z-50 bg-[#131412]/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fbf9f5] border border-outline-variant/30 text-on-surface rounded-xl max-w-lg w-full p-8 shadow-2xl relative space-y-6"
            >
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                <div className="flex items-center gap-2 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="text-xl font-display-b2c font-bold">Secure Traceability Ledger</h3>
                </div>
                <button onClick={() => setShowQRModal(false)} className="text-on-surface-variant hover:text-primary font-bold text-xl">&times;</button>
              </div>

              <div className="space-y-4 font-mono text-xs text-on-surface-variant bg-surface-container-low p-5 rounded-lg border border-outline-variant/20">
                <div className="flex justify-between">
                  <span>REGISTRY RECORD:</span>
                  <span className="text-primary font-bold">#ATH-BLOCK-8204</span>
                </div>
                <div className="flex justify-between">
                  <span>BATCH ID:</span>
                  <span className="text-primary font-bold">{batchId}</span>
                </div>
                <div className="flex justify-between">
                  <span>ORIGIN NODE:</span>
                  <span>Sawang Cooperative, Aceh Selatan</span>
                </div>
                <div className="flex justify-between">
                  <span>HARVEST VERIFIED:</span>
                  <span className="text-secondary font-bold">YES &bull; Grade ABCD</span>
                </div>
                <div className="flex justify-between">
                  <span>BLOCK HASH:</span>
                  <span className="text-tertiary-container overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">0x8204f3bb91c92a94f3a8b...</span>
                </div>
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                This batch has successfully cleared myristicin distillation and purity thresholds (9.84%). Secure tracking ledger is synced with the Port of Tapaktuan freight records.
              </p>

              <button 
                onClick={() => setShowQRModal(false)}
                className="w-full py-3.5 bg-primary text-white rounded-lg font-label-caps text-label-caps hover:bg-primary-container active:scale-95 transition-all"
              >
                Close Report
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grove report modal simulation */}
      <AnimatePresence>
        {showGroveModal && (
          <div className="fixed inset-0 z-50 bg-[#131412]/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fbf9f5] border border-outline-variant/30 text-on-surface rounded-xl max-w-lg w-full p-8 shadow-2xl relative space-y-6"
            >
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                <div className="flex items-center gap-2 text-primary">
                  <Map className="w-5 h-5" />
                  <h3 className="text-xl font-display-b2c font-bold">Grove Audit Report</h3>
                </div>
                <button onClick={() => setShowGroveModal(false)} className="text-on-surface-variant hover:text-primary font-bold text-xl">&times;</button>
              </div>

              <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-lg border border-outline-variant/20">
                <img 
                  className="w-14 h-14 rounded-full object-cover border" 
                  alt="Syahrul Profile"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaXt64IB2ubM_wUash5fD0D21OolvgzFS0NwUQWbrdPgX9BMOZ_gKACJ-v-9Fr3co_nL0GLPpL_rigsH4t17m7NErlQZOxJXWTNAWuMAhfbRd7o486UTp3XuPJ3o8quqrEpqfh3TE3i2fWda8GNlxm6vR1c-wNGc84J9WHVRDDgE3ZPxvhTUoQrTda9a8zWU4ItFIPM1VryxrBHZM3GI1XRao42tuxy3UqbUsgsGssreQxEFV0ww" 
                />
                <div>
                  <h4 className="font-display-b2c font-bold text-primary">Bapak Syahrul's Grove</h4>
                  <p className="text-xs text-on-surface-variant font-mono">Sawang Agroforest Node</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="border border-outline-variant/20 p-3 rounded">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Soil Moisture</span>
                  <span className="text-sm font-bold text-primary">34.8% &bull; Optimal</span>
                </div>
                <div className="border border-outline-variant/20 p-3 rounded">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Terrace Slope</span>
                  <span className="text-sm font-bold text-primary">18&deg; Cured</span>
                </div>
                <div className="border border-outline-variant/20 p-3 rounded">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Harvest Purity</span>
                  <span className="text-sm font-bold text-[#1b6d24]">96.4% Efficiency</span>
                </div>
                <div className="border border-outline-variant/20 p-3 rounded">
                  <span className="text-[10px] text-on-surface-variant uppercase block">Fertilizer Blend</span>
                  <span className="text-sm font-bold text-primary">Organic Bio-compost</span>
                </div>
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                This grove uses shade-grown cultivation practices beneath the barisan rainforest canopy, preserving local biodiversity and retaining high soil organic matter levels.
              </p>

              <button 
                onClick={() => setShowGroveModal(false)}
                className="w-full py-3.5 bg-primary text-white rounded-lg font-label-caps text-label-caps hover:bg-primary-container active:scale-95 transition-all"
              >
                Close Report
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
