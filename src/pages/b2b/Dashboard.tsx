import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Activity, 
  ShieldCheck, 
  Package, 
  Camera, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  Truck,
  Building,
  UserCheck,
  ChevronRight,
  Database,
  MapPin,
  Flame,
  Award
} from "lucide-react"
import { Button } from "../../components/ui/Button"

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

  // Toggle logistics item
  const toggleLogistics = (id: string) => {
    setLogistics(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item))
  }

  // Calculate total logistics price
  const totalLogisticsPrice = logistics.reduce((acc, curr) => curr.active ? acc + curr.price : acc, 0)

  // AI Scanner state
  const [scanImage, setScanImage] = useState<string | null>(null)
  const [scanState, setScanState] = useState<"idle" | "scanning" | "success">("idle")
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null)

  const handleMockScan = (imageType: "healthy" | "diseased") => {
    setScanState("scanning")
    setScanImage(
      imageType === "healthy"
        ? "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80"
        : "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=300&q=80"
    )

    setTimeout(() => {
      setScanState("success")
      if (imageType === "healthy") {
        setDiagnosticResult({
          status: "healthy",
          diagnosis: "Optimal Cultivar Health",
          confidence: "98.4%",
          recommendation: "Nutrient balance is perfect. Standard organic mulch application recommended at next rain cycle."
        })
      } else {
        setDiagnosticResult({
          status: "infected",
          diagnosis: "Anthracnose (Colletotrichum)",
          confidence: "94.2%",
          recommendation: "Immediate isolation of affected stems. Apply 2% neem-garlic aqueous spray directly to surrounding leaves."
        })
      }
    }, 2500)
  }

  return (
    <div className="space-y-8 bg-[#131412] text-[#f2f0ed] min-h-screen p-8 rounded-lg border border-outline/10 shadow-2xl relative overflow-hidden">
      
      {/* Background Subtle Tech Grid Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-outline/20">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-tertiary-fixed-dim">TECHNICAL OPERATION CENTER</span>
          <h2 className="text-3xl font-bold font-inter mt-1 tracking-tight text-white flex items-center gap-3">
            Industrial Sourcing & Diagnostics
            <span className="text-xs font-normal font-mono bg-secondary/20 text-secondary border border-secondary/30 px-2 py-0.5 rounded">
              GRADE ABCD
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-4 bg-[#1e201d] px-4 py-2 rounded border border-outline/20 font-mono text-sm">
          <Database className="w-4 h-4 text-secondary animate-pulse" />
          <span>LEDGER BLOCK: #8204-T</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Network Cooperatives", val: "14 Active", label: "Direct Sourced", icon: Building, color: "text-[#ffdeac]" },
          { title: "Batch Yield Quality", val: "96.2%", label: "+1.4% Target", icon: ShieldCheck, color: "text-secondary" },
          { title: "Humidity Margin", val: "11.4%", label: "Safe Level (<12%)", icon: Activity, color: "text-secondary" },
          { title: "Contracts Pending", val: "3 Active", label: "Direct Shipments", icon: Package, color: "text-tertiary-fixed-dim" }
        ].map((m, idx) => (
          <div key={idx} className="bg-[#1e201d] border border-outline/20 p-5 rounded flex items-center justify-between hover:border-outline/40 transition-all">
            <div>
              <p className="text-xs text-on-surface-variant font-mono uppercase tracking-wider">{m.title}</p>
              <p className="text-2xl font-bold font-mono mt-1 text-white">{m.val}</p>
              <span className="text-[10px] text-on-surface-variant">{m.label}</span>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
              <m.icon className={`w-5 h-5 ${m.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sourcing Paths & Farmers */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Dual Sourcing Panel */}
          <div className="bg-[#1e201d] border border-outline/20 rounded p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-outline/10 pb-4">
              <h3 className="text-lg font-bold font-inter text-white">Dual-Sourcing Path</h3>
              <div className="flex bg-[#131412] p-1 rounded border border-outline/10">
                <button 
                  onClick={() => setSourcingPath("marketplace")}
                  className={`px-4 py-1.5 rounded text-xs font-mono transition-all ${sourcingPath === "marketplace" ? "bg-primary text-white" : "text-on-surface-variant hover:text-white"}`}
                >
                  Pala Marketplace
                </button>
                <button 
                  onClick={() => setSourcingPath("partnerships")}
                  className={`px-4 py-1.5 rounded text-xs font-mono transition-all ${sourcingPath === "partnerships" ? "bg-primary text-white" : "text-on-surface-variant hover:text-white"}`}
                >
                  Existing Networks
                </button>
              </div>
            </div>

            {sourcingPath === "marketplace" ? (
              <div className="space-y-4">
                <p className="text-sm text-on-surface-variant font-inter">
                  Direct access to IG-certified cooperatives. Order laboratory samples prior to tonnage purchasing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Koperasi Pala Mawar", location: "Tapaktuan Hills", grade: "ABCD", moisture: "11%", price: "$4.20/kg" },
                    { name: "Sinar Atsiri Cooperative", location: "Kwala Hulu", grade: "Atsiri-Oil", purity: "99.8%", price: "$24.50/L" }
                  ].map((coop, idx) => (
                    <div key={idx} className="border border-outline/10 p-4 rounded bg-[#131412] flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-mono text-secondary">● IG-CERTIFIED</span>
                          <span className="text-xs bg-primary/40 px-2 py-0.5 rounded text-white font-mono">{coop.price}</span>
                        </div>
                        <h4 className="font-bold text-white mt-2">{coop.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-on-surface-variant mt-1 font-mono">
                          <MapPin className="w-3 h-3 text-[#ffba38]" />
                          {coop.location}
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-outline/5">
                        <span className="text-xs text-on-surface-variant font-mono">Grade: {coop.grade}</span>
                        <Button 
                          variant="industrial" 
                          size="sm"
                          onClick={() => setOrderedCoop(coop.name)}
                          className="text-xs h-8"
                        >
                          Order Sample
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-on-surface-variant font-inter">
                  Managing your own pre-existing farmer networks and verifying operational transparency.
                </p>
                <div className="space-y-3">
                  {[
                    { id: "net-1", name: "South Aceh Organic Growers Group", locations: "12 Farms", status: "Verified" },
                    { id: "net-2", name: "Kuala Batee Cooperatives", locations: "8 Farms", status: "Inspected" }
                  ].map((net, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-outline/10 rounded bg-[#131412]">
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-5 h-5 text-secondary" />
                        <div>
                          <p className="font-semibold text-white">{net.name}</p>
                          <span className="text-xs text-on-surface-variant font-mono">{net.locations}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-secondary/10 border border-secondary/20 text-secondary px-3 py-1 rounded">
                        {net.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Gamified Farmer HUD */}
          <div className="bg-[#1e201d] border border-outline/20 rounded p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline/10 pb-4">
              <div>
                <h3 className="text-lg font-bold font-inter text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#ffba38]" />
                  Farmer Performance HUD
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Empowering community-driven agroforestry</p>
              </div>
              <div className="flex gap-2">
                {farmersList.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFarmerId(f.id)}
                    className={`px-3 py-1 rounded text-xs font-mono border transition-all ${selectedFarmerId === f.id ? "bg-secondary text-white border-secondary" : "bg-[#131412] text-on-surface-variant border-outline/20 hover:text-white"}`}
                  >
                    Farmer #{f.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Farmer Bio / Level */}
              <div className="md:col-span-2 space-y-4 bg-[#131412] p-4 rounded border border-outline/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-primary/40 flex items-center justify-center font-bold text-white border border-outline/20">
                    {activeFarmer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-white leading-tight">{activeFarmer.name}</h4>
                    <span className="text-xs text-on-surface-variant font-mono">{activeFarmer.location}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-on-surface-variant">Level {activeFarmer.level} Grower</span>
                    <span className="text-[#ffba38]">{activeFarmer.xp} / {activeFarmer.nextLevelXp} XP</span>
                  </div>
                  {/* XP Bar */}
                  <div className="h-2 bg-[#1e201d] rounded-full overflow-hidden border border-outline/10">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary to-[#ffba38]"
                      style={{ width: `${(activeFarmer.xp / activeFarmer.nextLevelXp) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-[#604100]/20 text-[#ffdeac] border border-[#604100]/40 px-2 py-1 rounded">
                    <Flame className="w-3.5 h-3.5" />
                    {activeFarmer.badge}
                  </span>
                </div>
              </div>

              {/* Farmer RPG stats */}
              <div className="md:col-span-3 grid grid-cols-3 gap-4 items-center">
                {[
                  { label: "Yield Quality", value: activeFarmer.yield, desc: "Lab purity rate" },
                  { label: "Efficiency", value: activeFarmer.efficiency, desc: "Fulfillment lead" },
                  { label: "Soil Resilience", value: activeFarmer.soil, desc: "Organic matter Index" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-[#131412] p-4 rounded border border-outline/10 text-center hover:border-secondary/30 transition-all">
                    <p className="text-xs text-on-surface-variant font-mono">{stat.label}</p>
                    <p className="text-xl font-bold font-mono text-white mt-1">{stat.value}</p>
                    <p className="text-[9px] text-on-surface-variant mt-1 leading-tight">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Disease Scanner & Logistics Config */}
        <div className="space-y-8">
          
          {/* AI Plant Disease Scanner */}
          <div className="bg-[#1e201d] border border-outline/20 rounded p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold font-inter text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-secondary" />
                AI Plant Disease Scanner
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Instant crop diagnostic computer vision</p>
            </div>

            <div className="bg-[#131412] border border-outline/20 aspect-video rounded relative overflow-hidden flex items-center justify-center">
              {scanState === "idle" && (
                <div className="text-center p-6 space-y-4">
                  <Camera className="w-8 h-8 mx-auto text-on-surface-variant opacity-60" />
                  <p className="text-xs text-on-surface-variant max-w-[200px]">Simulate crop photo diagnosis</p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="secondary" size="sm" onClick={() => handleMockScan("healthy")}>
                      Healthy Leaf
                    </Button>
                    <Button variant="industrial" size="sm" onClick={() => handleMockScan("diseased")}>
                      Infected Leaf
                    </Button>
                  </div>
                </div>
              )}

              {scanState === "scanning" && (
                <div className="text-center space-y-4">
                  {/* Mock Scanning Grid Animation */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
                    <div className="w-full h-[1px] bg-secondary/50 animate-bounce" />
                  </div>
                  {scanImage && (
                    <img src={scanImage} alt="Scanning" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                  )}
                  <Loader2 className="w-8 h-8 text-secondary animate-spin mx-auto relative z-10" />
                  <p className="text-xs text-secondary font-mono animate-pulse relative z-10">ANALYZING LEAF LAYER...</p>
                </div>
              )}

              {scanState === "success" && scanImage && (
                <div className="absolute inset-0">
                  <img src={scanImage} alt="Scanned Leaf" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#131412]/80 flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between text-xs border-b border-outline/20 pb-2 mb-2">
                      <span className="font-mono text-on-surface-variant">DIAGNOSIS COMPLETE</span>
                      <button 
                        onClick={() => setScanState("idle")}
                        className="text-secondary hover:underline font-mono"
                      >
                        Reset
                      </button>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        {diagnosticResult.status === "healthy" ? (
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-[#ffba38]" />
                        )}
                        <h4 className="font-bold text-white text-sm">{diagnosticResult.diagnosis}</h4>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">
                        {diagnosticResult.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Logistics Configurator */}
          <div className="bg-[#1e201d] border border-outline/20 rounded p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-outline/10 pb-4">
              <div>
                <h3 className="text-lg font-bold font-inter text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-secondary" />
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
                  className={`p-3 rounded border transition-all cursor-pointer select-none ${item.active ? "border-secondary/40 bg-secondary/5" : "border-outline/10 bg-[#131412]"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={item.active} 
                        onChange={() => {}} // handled by div onClick
                        className="rounded border-outline/30 text-secondary focus:ring-0 focus:ring-offset-0 w-4 h-4" 
                      />
                      <span className="font-medium text-sm text-white">{item.name}</span>
                    </div>
                    <span className="text-xs font-mono text-[#ffba38]">${item.price}/MT</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-outline/20 pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-mono">ESTIMATED LOGISTICS FEE</p>
                <p className="text-2xl font-bold font-mono text-white mt-1">${totalLogisticsPrice}<span className="text-xs text-on-surface-variant">/MT</span></p>
              </div>
              <Button variant="industrial" className="flex items-center gap-2 h-10">
                Lock Quote
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>

      </div>

      {/* Traceability Feed */}
      <div className="bg-[#1e201d] border border-outline/20 rounded p-6">
        <h3 className="text-lg font-bold font-inter text-white mb-6">{"Traceability Timeline (Tapaktuan ➔ Export)"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {[
            { step: "Harvesting & Extraction", detail: "Cooperatives tap raw nutmeg from South Aceh hillside. Steam-distilled in local Atsiri facility.", date: "Completed Jul 02", active: true },
            { step: "SGS Lab Clearance", detail: "Myristicin purity rated at 9.8%, fully safe for global phytosanitary custom certifications.", date: "Completed Jul 04", active: true },
            { step: "Malahayati Cargo loading", detail: "Sealed cargo under strict humidity control. Ready for ocean port freight container loading.", date: "Transit Pending", active: false }
          ].map((milestone, idx) => (
            <div key={idx} className="bg-[#131412] border border-outline/10 p-5 rounded relative flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-on-surface-variant">MILESTONE 0{idx + 1}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${milestone.active ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-on-primary-container'}`}>
                  {milestone.active ? 'VERIFIED' : 'PENDING'}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{milestone.step}</h4>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">{milestone.detail}</p>
              </div>
              <div className="text-[10px] text-[#ffba38] font-mono border-t border-outline/5 pt-2">
                {milestone.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Ordered Modal Popup overlay */}
      <AnimatePresence>
        {orderedCoop && (
          <div className="fixed inset-0 z-50 bg-[#131412]/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1e201d] border border-outline/20 rounded max-w-md w-full p-6 text-center space-y-6 shadow-2xl relative"
            >
              <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mx-auto text-on-secondary-container">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-inter text-white">Sample Order Successful</h3>
                <p className="text-sm text-on-surface-variant mt-2 font-inter">
                  We have dispatched a lab sample order request to <strong>{orderedCoop}</strong>.
                </p>
                <div className="bg-[#131412] p-4 rounded border border-outline/10 mt-4 text-left space-y-2">
                  <p className="text-xs font-mono text-on-surface-variant">TRACKING: <span className="text-white">#ATH-7729-QC</span></p>
                  <p className="text-xs font-mono text-on-surface-variant">VOLUME: <span className="text-white">250g Pouch (Whole seed / Extract)</span></p>
                  <p className="text-xs font-mono text-on-surface-variant">LEDGER REGISTRY: <span className="text-secondary">0x8a92...fc9a</span></p>
                </div>
              </div>
              <Button 
                variant="default" 
                onClick={() => setOrderedCoop(null)}
                className="w-full"
              >
                Close Panel
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
