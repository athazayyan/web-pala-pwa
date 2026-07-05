import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type OrderStatus = "Baru" | "Diproses" | "Dikirim" | "Selesai"

interface Order {
  id: string
  produk: string
  pembeli: string
  jumlah: number
  total: number
  status: OrderStatus
  tanggal: string
  kota: string
}

const orders: Order[] = [
  { id: "ORD-8821", produk: "Minyak Esensial Pala Murni", pembeli: "Dewi Rahayu", jumlah: 2, total: 370000, status: "Baru", tanggal: "05 Jul 2026", kota: "Jakarta Selatan" },
  { id: "ORD-8817", produk: "Sirup Hangat Pala & Jahe", pembeli: "Reza Firmansyah", jumlah: 1, total: 145000, status: "Diproses", tanggal: "04 Jul 2026", kota: "Bandung" },
  { id: "ORD-8809", produk: "Biji Pala Utuh Premium", pembeli: "Anisa Putri", jumlah: 3, total: 375000, status: "Dikirim", tanggal: "03 Jul 2026", kota: "Surabaya" },
  { id: "ORD-8801", produk: "Minyak Esensial Pala Murni", pembeli: "Budi Santoso", jumlah: 1, total: 185000, status: "Selesai", tanggal: "01 Jul 2026", kota: "Medan" },
  { id: "ORD-8795", produk: "Sirup Hangat Pala & Jahe", pembeli: "Lina Marlina", jumlah: 2, total: 290000, status: "Selesai", tanggal: "28 Jun 2026", kota: "Yogyakarta" },
]

const statusConfig: Record<OrderStatus, { color: string; icon: string }> = {
  Baru: { color: "bg-tertiary-fixed text-on-tertiary", icon: "fiber_new" },
  Diproses: { color: "bg-primary-container text-on-primary-container", icon: "autorenew" },
  Dikirim: { color: "bg-secondary-container text-on-secondary-container", icon: "local_shipping" },
  Selesai: { color: "bg-surface-container text-on-surface-variant", icon: "check_circle" },
}

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`

export function Pemesanan() {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "Semua">("Semua")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered = filterStatus === "Semua" ? orders : orders.filter((o) => o.status === filterStatus)

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="font-display-b2c text-2xl text-primary">Pemesanan</h1>
        <p className="text-sm text-on-surface-variant mt-1">Kelola semua pesanan yang masuk dari pembeli</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3">
        {(["Baru", "Diproses", "Dikirim", "Selesai"] as OrderStatus[]).map((s) => {
          const count = orders.filter((o) => o.status === s).length
          const conf = statusConfig[s]
          return (
            <button key={s} onClick={() => setFilterStatus(s === filterStatus ? "Semua" : s)}
              className={`p-4 rounded-xl border transition-all text-left ${filterStatus === s ? "border-primary shadow-sm" : "border-outline-variant/20 bg-surface"}`}>
              <span className={`inline-flex items-center gap-1 text-[10px] font-label-caps px-2 py-0.5 rounded-full mb-2 ${conf.color}`}>
                <span className="material-symbols-outlined text-xs">{conf.icon}</span>{s}
              </span>
              <p className="font-display-b2c text-2xl text-on-surface">{count}</p>
            </button>
          )
        })}
      </div>

      {/* Order List */}
      <div className="bg-surface border border-outline-variant/20 rounded-xl overflow-hidden">
        <div className="px-6 py-3 border-b border-outline-variant/10 flex items-center gap-3">
          <span className="text-xs font-label-caps text-on-surface-variant">FILTER:</span>
          {(["Semua", "Baru", "Diproses", "Dikirim", "Selesai"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 rounded-full text-xs font-label-caps transition-all ${filterStatus === s ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container"}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="divide-y divide-outline-variant/10">
          {filtered.map((o) => {
            const conf = statusConfig[o.status]
            return (
              <motion.div key={o.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={() => setSelectedOrder(o)}
                className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low cursor-pointer transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-on-surface-variant">{o.id}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-label-caps px-2 py-0.5 rounded-full ${conf.color}`}>
                      <span className="material-symbols-outlined text-xs">{conf.icon}</span>{o.status}
                    </span>
                  </div>
                  <p className="font-display-b2c text-sm text-primary truncate">{o.produk}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{o.pembeli} • {o.kota}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-on-surface text-sm">{formatRp(o.total)}</p>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">{o.jumlah} item • {o.tanggal}</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/40">chevron_right</span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display-b2c text-lg text-primary">Detail Pesanan</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-on-surface-variant hover:text-primary text-xl font-bold">&times;</button>
              </div>
              <div className="space-y-3 text-sm bg-surface-container-low p-4 rounded-lg font-mono">
                {[
                  ["ID Pesanan", selectedOrder.id],
                  ["Produk", selectedOrder.produk],
                  ["Pembeli", selectedOrder.pembeli],
                  ["Kota", selectedOrder.kota],
                  ["Jumlah", `${selectedOrder.jumlah} item`],
                  ["Total", formatRp(selectedOrder.total)],
                  ["Tanggal", selectedOrder.tanggal],
                  ["Status", selectedOrder.status],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-on-surface-variant text-xs">{k}:</span>
                    <span className="text-on-surface font-bold text-xs">{v}</span>
                  </div>
                ))}
              </div>
              {selectedOrder.status === "Baru" && (
                <button onClick={() => setSelectedOrder(null)}
                  className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-all">
                  Proses Pesanan
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
