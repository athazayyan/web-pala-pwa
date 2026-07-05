import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const categories = ["Minyak Esensial", "Rempah Utuh", "Produk Perawatan", "Minuman & Sirup", "Paket Spesial"]
const grades = ["Grade Terapeutik", "Grade ABCD", "Grade Apoteker", "Aroma Tinggi", "Artisanal", "Batch Terbatas"]

export function TambahBarang() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nama: "", kategori: "", grade: "", harga: "", unit: "", stok: "", deskripsi: "",
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: string, val: string) =>
    setForm((f) => ({ ...f, [field]: val }))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      navigate("/penjual/barang")
    }, 1800)
  }

  const inputClass = "w-full border border-outline-variant bg-surface-container-lowest text-on-surface text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-on-surface-variant/40"
  const labelClass = "block font-label-caps text-label-caps text-on-surface-variant mb-1.5"

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display-b2c text-2xl text-primary">Tambah Barang Baru</h1>
        <p className="text-sm text-on-surface-variant mt-1">Isi detail produk untuk mulai berjualan di PalaMart</p>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary-container rounded-xl p-10 text-center space-y-4"
        >
          <span className="material-symbols-outlined text-5xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <h2 className="font-display-b2c text-xl text-secondary">Produk Berhasil Ditambahkan!</h2>
          <p className="text-sm text-on-surface-variant">Mengarahkan ke daftar barang...</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Foto Produk */}
          <div className="bg-surface border border-outline-variant/20 rounded-xl p-6 space-y-4">
            <h2 className="font-display-b2c text-base text-on-surface">Foto Produk</h2>
            <div className="flex gap-4 items-start">
              <div
                className="w-36 h-36 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container flex items-center justify-center overflow-hidden shrink-0 cursor-pointer hover:border-primary transition-colors"
                onClick={() => document.getElementById("foto-input")?.click()}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-on-surface-variant/50">
                    <span className="material-symbols-outlined text-3xl block">add_photo_alternate</span>
                    <p className="text-xs mt-1">Unggah foto</p>
                  </div>
                )}
              </div>
              <div className="text-sm text-on-surface-variant space-y-1">
                <p className="font-label-caps">Format yang didukung:</p>
                <p className="font-mono text-xs">JPG, PNG, WEBP</p>
                <p className="text-xs mt-2">Ukuran maksimum 5MB. Gunakan foto resolusi tinggi (min. 800×800px) untuk tampilan terbaik di marketplace.</p>
                <input id="foto-input" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                <button type="button" onClick={() => document.getElementById("foto-input")?.click()} className="mt-3 text-xs font-label-caps text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-all">
                  Pilih File
                </button>
              </div>
            </div>
          </div>

          {/* Info Produk */}
          <div className="bg-surface border border-outline-variant/20 rounded-xl p-6 space-y-4">
            <h2 className="font-display-b2c text-base text-on-surface">Informasi Produk</h2>
            <div>
              <label className={labelClass}>Nama Produk *</label>
              <input required className={inputClass} placeholder="cth. Minyak Esensial Pala Murni 30ml" value={form.nama} onChange={(e) => handleChange("nama", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Kategori *</label>
                <select required className={inputClass} value={form.kategori} onChange={(e) => handleChange("kategori", e.target.value)}>
                  <option value="">Pilih kategori...</option>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Grade Produk *</label>
                <select required className={inputClass} value={form.grade} onChange={(e) => handleChange("grade", e.target.value)}>
                  <option value="">Pilih grade...</option>
                  {grades.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Deskripsi Produk *</label>
              <textarea required rows={4} className={inputClass} placeholder="Deskripsikan produk Anda secara detail: asal bahan, proses pengolahan, manfaat, cara penggunaan..." value={form.deskripsi} onChange={(e) => handleChange("deskripsi", e.target.value)} />
            </div>
          </div>

          {/* Harga & Stok */}
          <div className="bg-surface border border-outline-variant/20 rounded-xl p-6 space-y-4">
            <h2 className="font-display-b2c text-base text-on-surface">Harga & Stok</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Harga (Rp) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant font-mono">Rp</span>
                  <input required type="number" className={`${inputClass} pl-9`} placeholder="150000" value={form.harga} onChange={(e) => handleChange("harga", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Satuan *</label>
                <input required className={inputClass} placeholder="cth. 30ml / 250g / Set" value={form.unit} onChange={(e) => handleChange("unit", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Stok Tersedia *</label>
                <input required type="number" className={inputClass} placeholder="50" value={form.stok} onChange={(e) => handleChange("stok", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button type="submit" className="flex-1 py-3.5 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-base">publish</span>
              Terbitkan Produk
            </button>
            <button type="button" onClick={() => navigate("/penjual/barang")} className="px-6 py-3.5 border border-outline-variant text-on-surface-variant rounded-lg font-label-caps text-label-caps hover:bg-surface-container transition-all">
              Batal
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
