import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../../context/AuthContext"

// Simulated weather data per seller location
const weatherData = {
  ahmad: {
    lokasi: "Banda Aceh, Aceh",
    koordinat: { lat: 5.5483, lng: 95.3238 },
    suhu: 29,
    kelembaban: 84,
    curahHujan: 12,
    angin: 14,
    kondisi: "Berawan",
    icon: "cloud",
    prakiraan: [
      { hari: "Rab", kondisi: "cloud", suhu: 28 },
      { hari: "Kam", kondisi: "rainy", suhu: 26 },
      { hari: "Jum", kondisi: "partly_cloudy_day", suhu: 30 },
      { hari: "Sab", kondisi: "sunny", suhu: 31 },
      { hari: "Min", kondisi: "partly_cloudy_day", suhu: 29 },
    ],
  },
  pinkan: {
    lokasi: "Ternate, Maluku Utara",
    koordinat: { lat: 0.7828, lng: 127.3791 },
    suhu: 31,
    kelembaban: 78,
    curahHujan: 4,
    angin: 18,
    kondisi: "Cerah Berawan",
    icon: "partly_cloudy_day",
    prakiraan: [
      { hari: "Rab", kondisi: "partly_cloudy_day", suhu: 30 },
      { hari: "Kam", kondisi: "sunny", suhu: 32 },
      { hari: "Jum", kondisi: "sunny", suhu: 33 },
      { hari: "Sab", kondisi: "rainy", suhu: 27 },
      { hari: "Min", kondisi: "cloud", suhu: 28 },
    ],
  },
}

// Tree health analysis simulation results
const analysisResults = [
  { status: "Sehat", desc: "Daun berwarna hijau segar, tidak ada tanda serangan hama atau penyakit. Kadar klorofil baik.", color: "text-secondary", bg: "bg-secondary-container", icon: "check_circle" },
  { status: "Perlu Perhatian", desc: "Terdeteksi bercak cokelat kecil pada tepi daun. Kemungkinan kekurangan magnesium. Rekomendasi: tambahkan pupuk dolomit.", color: "text-tertiary", bg: "bg-tertiary-fixed/20", icon: "warning", refImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Magnesium_deficiency_in_tomato.jpg/320px-Magnesium_deficiency_in_tomato.jpg" },
  { status: "Sakit", desc: "Daun menguning (klorosis) di area luas. Kemungkinan serangan jamur Cercospora. Segera isolasi pohon dan aplikasikan fungisida nabati.", color: "text-error", bg: "bg-error-container", icon: "sick", refImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Cercospora_leaf_spot_on_sugar_beet.jpg/320px-Cercospora_leaf_spot_on_sugar_beet.jpg" },
]

export function KelolaKebun() {
  const { user } = useAuth()
  const weather = weatherData[user?.penjualId ?? "ahmad"]
  const geoUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${weather.koordinat.lng - 0.1},${weather.koordinat.lat - 0.1},${weather.koordinat.lng + 0.1},${weather.koordinat.lat + 0.1}&layer=mapnik&marker=${weather.koordinat.lat},${weather.koordinat.lng}`

  const [analysisResult, setAnalysisResult] = useState<(typeof analysisResults)[0] | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoPreview(URL.createObjectURL(file))
    setAnalysisResult(null)
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalysisResult(analysisResults[Math.floor(Math.random() * analysisResults.length)])
    }, 2200)
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-display-b2c text-2xl text-primary">Kelola Kebun</h1>
        <p className="text-sm text-on-surface-variant mt-1">Pantau kondisi kebun, kesehatan pohon, dan cuaca lokal secara real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Geotagging Peta ──────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="bg-surface border border-outline-variant/20 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-outline-variant/10 flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-xl">location_on</span>
              <div>
                <h2 className="font-display-b2c text-base text-on-surface">Lokasi Kebun</h2>
                <p className="text-xs text-on-surface-variant font-mono">{weather.lokasi}</p>
              </div>
            </div>
            {/* Map embed */}
            <div className="relative h-52 bg-surface-container">
              <iframe
                src={geoUrl}
                className="w-full h-full border-0"
                title="Peta Kebun"
                loading="lazy"
              />
            </div>
            <div className="px-5 py-4 grid grid-cols-2 gap-3 border-t border-outline-variant/10">
              {[
                { label: "Latitude", value: weather.koordinat.lat.toFixed(4) + "° N" },
                { label: "Longitude", value: weather.koordinat.lng.toFixed(4) + "° E" },
                { label: "Luas Kebun", value: user?.penjualId === "ahmad" ? "2.4 Ha" : "1.8 Ha" },
                { label: "Jumlah Pohon", value: user?.penjualId === "ahmad" ? "148 pohon" : "112 pohon" },
              ].map((d) => (
                <div key={d.label} className="text-center p-3 bg-surface-container-low rounded-lg">
                  <p className="text-[10px] text-on-surface-variant font-label-caps mb-1">{d.label.toUpperCase()}</p>
                  <p className="font-mono font-bold text-sm text-primary">{d.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Cuaca Lokal ─────────────────────────────────────────── */}
          <div className="bg-gradient-to-br from-primary to-primary-container rounded-xl p-5 text-on-primary">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-label-caps text-[11px] text-on-primary/60 mb-1">CUACA LOKAL — {weather.lokasi.toUpperCase()}</p>
                <div className="flex items-end gap-2">
                  <span className="font-display-b2c text-5xl">{weather.suhu}°</span>
                  <div>
                    <p className="font-label-caps text-sm">{weather.kondisi}</p>
                    <p className="text-[10px] text-on-primary/60 font-mono">Hari ini, 05 Jul 2026</p>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-5xl text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>{weather.icon}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4 border-t border-on-primary/10 pt-4">
              {[
                { label: "Kelembaban", value: `${weather.kelembaban}%`, icon: "humidity_percentage" },
                { label: "Curah Hujan", value: `${weather.curahHujan}mm`, icon: "rainy" },
                { label: "Angin", value: `${weather.angin}km/h`, icon: "air" },
              ].map((w) => (
                <div key={w.label} className="text-center">
                  <span className="material-symbols-outlined text-tertiary-fixed text-xl">{w.icon}</span>
                  <p className="font-mono font-bold text-sm mt-1">{w.value}</p>
                  <p className="text-[10px] text-on-primary/50 font-label-caps">{w.label.toUpperCase()}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between border-t border-on-primary/10 pt-4">
              {weather.prakiraan.map((p) => (
                <div key={p.hari} className="text-center">
                  <p className="text-[10px] text-on-primary/60 font-label-caps">{p.hari}</p>
                  <span className="material-symbols-outlined text-tertiary-fixed text-xl my-1 block" style={{ fontVariationSettings: "'FILL' 1" }}>{p.kondisi}</span>
                  <p className="font-mono text-sm font-bold">{p.suhu}°</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cek Kesehatan Pohon ─────────────────────────────────── */}
        <div className="bg-surface border border-outline-variant/20 rounded-xl overflow-hidden h-fit">
          <div className="px-5 py-4 border-b border-outline-variant/10 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-xl">yard</span>
            <div>
              <h2 className="font-display-b2c text-base text-on-surface">Cek Kesehatan Pohon</h2>
              <p className="text-xs text-on-surface-variant">Upload foto daun untuk analisis AI</p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Upload area */}
            <div
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${photoPreview ? "border-secondary" : "border-outline-variant hover:border-secondary/60"}`}
            >
              {photoPreview ? (
                <div className="relative inline-block">
                  <img src={photoPreview} alt="Daun" className="w-40 h-40 object-cover rounded-lg mx-auto" />
                  {analyzing && (
                    <div className="absolute inset-0 bg-primary/40 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white animate-spin text-3xl">progress_activity</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl opacity-40">photo_camera</span>
                  <p className="text-sm font-label-caps">Klik untuk upload foto daun</p>
                  <p className="text-xs font-mono opacity-60">JPG / PNG / WEBP • Maks 5MB</p>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </div>

            {/* AI Analysis Result */}
            <AnimatePresence mode="wait">
              {analyzing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="p-4 bg-surface-container rounded-xl flex items-center gap-3 text-sm text-on-surface-variant font-mono">
                  <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
                  AI sedang menganalisis foto daun...
                </motion.div>
              )}
              {analysisResult && !analyzing && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-xl border ${analysisResult.bg}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`material-symbols-outlined text-2xl ${analysisResult.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{analysisResult.icon}</span>
                    <div>
                      <p className="font-label-caps text-xs text-on-surface-variant">HASIL ANALISIS</p>
                      <p className={`font-display-b2c text-lg ${analysisResult.color}`}>{analysisResult.status}</p>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-3">{analysisResult.desc}</p>
                  
                  {/* @ts-ignore - refImg is optional */}
                  {analysisResult.refImg && (
                    <div className="flex items-start gap-3 mt-4 pt-4 border-t border-outline-variant/10">
                      {/* @ts-ignore */}
                      <img src={analysisResult.refImg} alt="Referensi Penyakit" className="w-16 h-16 rounded-md object-cover border border-outline-variant/20" />
                      <div>
                        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">Referensi Visual Identik</p>
                        <p className="text-xs text-on-surface-variant font-mono mt-1">Sistem menemukan kemiripan 94% dengan kasus ini di database.</p>
                      </div>
                    </div>
                  )}

                  <button onClick={() => { setPhotoPreview(null); setAnalysisResult(null); }} className="mt-4 text-xs font-label-caps text-primary hover:bg-surface-container-low w-full text-center p-2 rounded-lg border border-outline-variant/10 transition-colors">
                    Analisis foto lain →
                  </button>
                </motion.div>
              )}
              {!photoPreview && !analyzing && !analysisResult && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-4 bg-surface-container-low rounded-xl text-xs text-on-surface-variant font-mono space-y-1.5">
                  <p className="font-label-caps text-[10px] text-tertiary">TIPS PENGAMBILAN FOTO</p>
                  <p>• Foto daun di bawah cahaya alami yang cukup</p>
                  <p>• Pastikan seluruh permukaan daun terlihat jelas</p>
                  <p>• Gunakan latar belakang bersih (putih/hitam)</p>
                  <p>• Sertakan daun dari area yang dicurigai sakit</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Health Overview */}
            <div className="border-t border-outline-variant/10 pt-4">
              <p className="font-label-caps text-[11px] text-on-surface-variant mb-3">RINGKASAN KESEHATAN KEBUN</p>
              <div className="space-y-2">
                {[
                  { label: "Pohon Sehat", pct: 82, color: "bg-secondary" },
                  { label: "Butuh Perhatian", pct: 14, color: "bg-tertiary-fixed" },
                  { label: "Teridentifikasi Sakit", pct: 4, color: "bg-error" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <span className="text-xs text-on-surface-variant w-36 shrink-0 font-label-caps">{b.label}</span>
                    <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} />
                    </div>
                    <span className="text-xs font-mono text-on-surface-variant w-8 text-right">{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
