import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Activity, 
  ShieldCheck, 
  Package, 
  CheckCircle2, 
  Truck,
  Building,
  UserCheck,
  ChevronRight,
  Database,
  MapPin,
  Flame,
  Award,
  TrendingUp,
  LineChart
} from "lucide-react"

// Types
interface LogisticsModule {
  id: string
  name: string
  description: string
  price: number
  active: boolean
}

export function Dashboard() {
  // Sourcing path toggle
  const [sourcingPath, setSourcingPath] = useState<"marketplace" | "partnerships">("marketplace")
  
  // Sample Order Success Modal state
  const [orderedCoop, setOrderedCoop] = useState<string | null>(null)

  // Gamified Farmers state
  const [selectedFarmerId, setSelectedFarmerId] = useState<number>(1)
  const farmersList = [
    { id: 1, name: "Syukur Syahputra", location: "Tapaktuan Hills", level: 5, xp: 840, nextLevelXp: 1000, yield: "96.4%", efficiency: "94%", soil: "91%", badge: "Master Cultivator" },
    { id: 2, name: "Farhan Husni", location: "Kwala Hulu", level: 4, xp: 420, nextLevelXp: 800, yield: "92.8%", efficiency: "88%", soil: "85%", badge: "Senior Grower" },
    { id: 3, name: "Zubaidah Yusuf", location: "Samadua Valley", level: 6, xp: 950, nextLevelXp: 1200, yield: "98.1%", efficiency: "97%", soil: "94%", badge: "Terroir Specialist" }
  ]
  const activeFarmer = farmersList.find(f => f.id === selectedFarmerId) || farmersList[0]

  // Logistics configurator state
  const [logistics, setLogistics] = useState<LogisticsModule[]>([
    { id: "freight", name: "Freight & Transport (Farm-to-Port)", description: "Managed local flatbeds and bulk containers straight to Port of Malahayati.", price: 420, active: true },
    { id: "finance", name: "Financing (Cash-to-Farmer / Net-30)", description: "Advance payouts to farmers with credit terms matching your customs clearance.", price: 280, active: false },
    { id: "insurance", name: "Quality Insurance & Lab Test", description: "Independent SGS lab checks for Myristicin (>9.8%) and Aflatoxin compliance.", price: 150, active: true },
    { id: "warehouse", name: "Humidity-Controlled Transit", description: "Storage in smart warehouses utilizing sensors to keep humidity strictly below 12%.", price: 310, active: true }
  ])

  const toggleLogistics = (id: string) => {
    setLogistics(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item))
  }

  const totalLogisticsPrice = logistics.reduce((acc, curr) => curr.active ? acc + curr.price : acc, 0)

  return (
    <div className="space-y-8 bg-[#fbf9f5] text-[#1b1c1a] min-h-screen p-8 font-body-md border-t-4 border-primary">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-tertiary">TECHNICAL OPERATION CENTER</span>
          <h2 className="text-3xl font-display-b2c mt-1 text-primary flex items-center gap-3 font-bold">
            B2B Dashboard: Rantai Pasok
            <span className="text-xs font-mono bg-secondary/10 text-secondary border border-secondary/30 px-2 py-0.5 rounded">
              GRADE ABCD
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded border border-outline-variant/30 font-mono text-sm">
          <Database className="w-4 h-4 text-primary animate-pulse" />
          <span>LEDGER BLOCK: #8204-T</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Koperasi Aktif", val: "14", label: "Direct Sourced", icon: Building, color: "text-tertiary" },
          { title: "Kualitas Panen", val: "96.2%", label: "+1.4% Target", icon: ShieldCheck, color: "text-secondary" },
          { title: "Margin Kelembaban", val: "11.4%", label: "Aman (<12%)", icon: Activity, color: "text-secondary" },
          { title: "Kontrak Berjalan", val: "3", label: "Direct Shipments", icon: Package, color: "text-primary" }
        ].map((m, idx) => (
          <div key={idx} className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-none flex items-center justify-between">
            <div>
              <p className="text-xs text-on-surface-variant font-mono uppercase tracking-wider">{m.title}</p>
              <p className="text-2xl font-bold font-mono mt-1 text-primary">{m.val}</p>
              <span className="text-[10px] text-on-surface-variant">{m.label}</span>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
              <m.icon className={`w-5 h-5 ${m.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Market Price Trends */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-none">
        <h3 className="text-lg font-bold font-display-b2c text-primary flex items-center gap-2 mb-4">
          <LineChart className="w-5 h-5 text-tertiary" />
          Market Price Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
            <span className="font-mono text-xs text-on-surface-variant uppercase">Minyak Esensial (Liter)</span>
            <div className="flex items-end justify-between mt-2">
              <span className="font-bold text-2xl font-mono text-primary">$24.50</span>
              <span className="flex items-center text-xs text-secondary font-mono"><TrendingUp className="w-3 h-3 mr-1" /> +2.4%</span>
            </div>
          </div>
          <div className="p-4 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
            <span className="font-mono text-xs text-on-surface-variant uppercase">Biji Pala Grade A (Kg)</span>
            <div className="flex items-end justify-between mt-2">
              <span className="font-bold text-2xl font-mono text-primary">$4.20</span>
              <span className="flex items-center text-xs text-secondary font-mono"><TrendingUp className="w-3 h-3 mr-1" /> +1.1%</span>
            </div>
          </div>
          <div className="p-4 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
            <span className="font-mono text-xs text-on-surface-variant uppercase">Fuli Kering (Kg)</span>
            <div className="flex items-end justify-between mt-2">
              <span className="font-bold text-2xl font-mono text-primary">$18.90</span>
              <span className="flex items-center text-xs text-tertiary font-mono"><TrendingUp className="w-3 h-3 mr-1" /> -0.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sourcing Paths & Farmers */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Dual Sourcing Panel */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-none p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <h3 className="text-lg font-bold font-display-b2c text-primary">Dual-Sourcing Path</h3>
              <div className="flex bg-surface-container-low p-1 rounded border border-outline-variant/20">
                <button 
                  onClick={() => setSourcingPath("marketplace")}
                  className={`px-4 py-1.5 rounded text-xs font-mono transition-all ${sourcingPath === "marketplace" ? "bg-primary text-white" : "text-on-surface-variant hover:text-primary"}`}
                >
                  Pala Marketplace
                </button>
                <button 
                  onClick={() => setSourcingPath("partnerships")}
                  className={`px-4 py-1.5 rounded text-xs font-mono transition-all ${sourcingPath === "partnerships" ? "bg-primary text-white" : "text-on-surface-variant hover:text-primary"}`}
                >
                  Existing Networks
                </button>
              </div>
            </div>

            {sourcingPath === "marketplace" ? (
              <div className="space-y-4">
                <p className="text-sm text-on-surface-variant font-body-md">
                  Akses langsung ke koperasi tersertifikasi Indikasi Geografis (IG). Pesan sampel lab sebelum pembelian partai besar.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Koperasi Pala Mawar", location: "Tapaktuan Hills", grade: "ABCD", moisture: "11%", price: "$4.20/kg" },
                    { name: "Sinar Atsiri Cooperative", location: "Kwala Hulu", grade: "Atsiri-Oil", purity: "99.8%", price: "$24.50/L" }
                  ].map((coop, idx) => (
                    <div key={idx} className="border border-outline-variant/20 p-4 bg-surface flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all rounded-none">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-mono text-secondary font-bold">● IG-CERTIFIED</span>
                          <span className="text-xs bg-primary/10 px-2 py-0.5 rounded text-primary font-mono font-bold">{coop.price}</span>
                        </div>
                        <h4 className="font-bold text-primary mt-2">{coop.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-on-surface-variant mt-1 font-mono">
                          <MapPin className="w-3 h-3 text-tertiary" />
                          {coop.location}
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
                        <span className="text-xs text-on-surface-variant font-mono">Grade: {coop.grade}</span>
                        <button 
                          onClick={() => setOrderedCoop(coop.name)}
                          className="bg-primary text-white text-xs px-3 py-1.5 hover:bg-primary-container hover:text-primary transition-colors"
                        >
                          Order Sample
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-on-surface-variant">
                  Manajemen jaringan petani yang sudah ada dan pantau transparansi operasional.
                </p>
                <div className="space-y-3">
                  {[
                    { id: "net-1", name: "South Aceh Organic Growers Group", locations: "12 Farms", status: "Verified" },
                    { id: "net-2", name: "Kuala Batee Cooperatives", locations: "8 Farms", status: "Inspected" }
                  ].map((net, i) => (
                     <div key={i} className="flex items-center justify-between p-4 border border-outline-variant/20 bg-surface rounded-none">
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-5 h-5 text-secondary" />
                        <div>
                          <p className="font-semibold text-primary">{net.name}</p>
                          <span className="text-xs text-on-surface-variant font-mono">{net.locations}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-secondary/10 border border-secondary/20 text-secondary font-bold px-3 py-1 rounded">
                        {net.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Gamified Farmer HUD */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-none p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display-b2c text-primary flex items-center gap-2">
                  <Award className="w-5 h-5 text-tertiary" />
                  Farmer Performance HUD
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Empowering community-driven agroforestry</p>
              </div>
              <div className="flex gap-2">
                {farmersList.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFarmerId(f.id)}
                    className={`px-3 py-1 text-xs font-mono border transition-all ${selectedFarmerId === f.id ? "bg-primary text-white border-primary" : "bg-surface text-on-surface-variant border-outline-variant/30 hover:text-primary"}`}
                  >
                    Farmer #{f.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2 space-y-4 bg-surface p-4 border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-none bg-primary/10 flex items-center justify-center font-bold text-primary border border-primary/20">
                    {activeFarmer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary leading-tight">{activeFarmer.name}</h4>
                    <span className="text-xs text-on-surface-variant font-mono">{activeFarmer.location}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-on-surface-variant">Level {activeFarmer.level} Grower</span>
                    <span className="text-tertiary font-bold">{activeFarmer.xp} / {activeFarmer.nextLevelXp} XP</span>
                  </div>
                  <div className="h-2 bg-surface-container-high rounded-none overflow-hidden border border-outline-variant/20">
                    <div 
                      className="h-full bg-secondary"
                      style={{ width: `${(activeFarmer.xp / activeFarmer.nextLevelXp) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-tertiary/10 text-tertiary border border-tertiary/20 px-2 py-1">
                    <Flame className="w-3.5 h-3.5" />
                    {activeFarmer.badge}
                  </span>
                </div>
              </div>

              <div className="md:col-span-3 grid grid-cols-3 gap-4 items-center">
                {[
                  { label: "Yield Quality", value: activeFarmer.yield, desc: "Lab purity rate" },
                  { label: "Efficiency", value: activeFarmer.efficiency, desc: "Fulfillment lead" },
                  { label: "Soil Resilience", value: activeFarmer.soil, desc: "Organic matter Index" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-surface p-4 border border-outline-variant/20 text-center hover:border-primary/30 transition-all">
                    <p className="text-xs text-on-surface-variant font-mono">{stat.label}</p>
                    <p className="text-xl font-bold font-mono text-primary mt-1">{stat.value}</p>
                    <p className="text-[9px] text-on-surface-variant mt-1 leading-tight">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Logistics Config & Live Logistics Status */}
        <div className="space-y-8">
          
          {/* Live Logistics */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-none p-6 space-y-6">
             <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display-b2c text-primary flex items-center gap-2">
                  <Truck className="w-5 h-5 text-secondary" />
                  Live Logistics Status
                </h3>
              </div>
            </div>
            
            <div className="relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-[-8px] before:w-[2px] before:bg-secondary/30">
               {[
                { step: "Ekstraksi Selesai", detail: "Fasilitas Atsiri Tapaktuan", active: true },
                { step: "SGS Lab Clearance", detail: "Kadar Myristicin >9.8%", active: true },
                { step: "Transit Gudang", detail: "Kelembaban dikontrol 11.4%", active: true },
                { step: "Pelabuhan Malahayati", detail: "Menunggu Kapal Kargo", active: false }
              ].map((milestone, idx) => (
                 <div key={idx} className="relative mb-6 last:mb-0">
                    <span className={`absolute -left-6 w-4 h-4 rounded-full flex items-center justify-center font-bold text-xs ${milestone.active ? 'bg-secondary text-white ring-4 ring-secondary/20' : 'bg-surface-container border border-outline-variant'}`}>
                      {milestone.active && <CheckCircle2 className="w-3 h-3" />}
                    </span>
                    <h5 className={`font-bold font-mono text-sm ${milestone.active ? 'text-primary' : 'text-on-surface-variant'}`}>{milestone.step}</h5>
                    <p className="text-xs text-on-surface-variant mt-1">{milestone.detail}</p>
                 </div>
              ))}
            </div>
          </div>

          {/* Logistics Configurator */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-none p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display-b2c text-primary flex items-center gap-2">
                  <Package className="w-5 h-5 text-secondary" />
                  Modular Logistics
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Checkbox pipeline configuration</p>
              </div>
            </div>

            <div className="space-y-3">
              {logistics.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleLogistics(item.id)}
                  className={`p-3 border transition-all cursor-pointer select-none ${item.active ? "border-secondary bg-secondary/5" : "border-outline-variant/30 bg-surface"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={item.active} 
                        onChange={() => {}} 
                        className="rounded-sm border-outline-variant/30 text-secondary focus:ring-0 w-4 h-4" 
                      />
                      <span className="font-bold text-sm text-primary">{item.name}</span>
                    </div>
                    <span className="text-xs font-mono text-tertiary font-bold">${item.price}/MT</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-outline-variant/20 pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-mono">ESTIMATED FEE</p>
                <p className="text-2xl font-bold font-mono text-primary mt-1">${totalLogisticsPrice}<span className="text-xs text-on-surface-variant">/MT</span></p>
              </div>
              <button className="flex items-center gap-2 bg-primary text-white font-mono px-4 h-10 hover:bg-primary-container hover:text-primary transition-colors text-sm">
                Lock Quote
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Sample Ordered Modal Popup overlay */}
      <AnimatePresence>
        {orderedCoop && (
          <div className="fixed inset-0 z-50 bg-[#1b1c1a]/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-none max-w-md w-full p-8 text-center space-y-6 shadow-2xl relative"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto text-secondary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display-b2c text-primary">Sample Order Berhasil</h3>
                <p className="text-sm text-on-surface-variant mt-2 font-body-md">
                  Permintaan sampel lab telah dikirimkan ke <strong>{orderedCoop}</strong>.
                </p>
                <div className="bg-surface p-4 border border-outline-variant/20 mt-4 text-left space-y-2">
                  <p className="text-xs font-mono text-on-surface-variant">TRACKING: <span className="text-primary font-bold">#ATH-7729-QC</span></p>
                  <p className="text-xs font-mono text-on-surface-variant">VOLUME: <span className="text-primary font-bold">250g Pouch (Whole seed)</span></p>
                  <p className="text-xs font-mono text-on-surface-variant">LEDGER REGISTRY: <span className="text-secondary font-bold">0x8a92...fc9a</span></p>
                </div>
              </div>
              <button 
                onClick={() => setOrderedCoop(null)}
                className="w-full bg-primary text-white py-3 hover:bg-primary-container hover:text-primary transition-colors font-bold font-mono"
              >
                Close Panel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
