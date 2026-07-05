import { useAuth } from "../../context/AuthContext"

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`

const dataAhmad = {
  totalPendapatan: 98_625_000,
  bulanIni: 12_850_000,
  transaksi: 312,
  rataRata: 185_000,
  months: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
  chart: [7200000, 8900000, 9400000, 11000000, 10200000, 11800000, 12850000],
}
const dataPinkan = {
  totalPendapatan: 73_290_000,
  bulanIni: 9_420_000,
  transaksi: 278,
  rataRata: 172_000,
  months: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
  chart: [5800000, 7100000, 8200000, 9500000, 8900000, 10300000, 9420000],
}

export function Finansial() {
  const { user } = useAuth()
  const data = user?.penjualId === "ahmad" ? dataAhmad : dataPinkan
  const maxVal = Math.max(...data.chart)

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-display-b2c text-2xl text-primary">Finansial</h1>
        <p className="text-sm text-on-surface-variant mt-1">Ringkasan pendapatan dan performa penjualan Anda</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Pendapatan", value: formatRp(data.totalPendapatan), icon: "account_balance_wallet", sub: "Sejak bergabung", color: "text-primary" },
          { label: "Bulan Ini", value: formatRp(data.bulanIni), icon: "trending_up", sub: "+8.7% dari bulan lalu", color: "text-secondary" },
          { label: "Total Transaksi", value: data.transaksi, icon: "receipt_long", sub: "Pesanan berhasil", color: "text-tertiary" },
          { label: "Rata-rata Order", value: formatRp(data.rataRata), icon: "shopping_cart", sub: "Per transaksi", color: "text-primary" },
        ].map((k) => (
          <div key={k.label} className="bg-surface border border-outline-variant/20 rounded-xl p-5">
            <div className={`flex items-center gap-2 mb-2 ${k.color}`}>
              <span className="material-symbols-outlined text-lg">{k.icon}</span>
              <span className="font-label-caps text-[11px]">{k.label.toUpperCase()}</span>
            </div>
            <p className={`font-display-b2c text-xl ${k.color}`}>{k.value}</p>
            <p className="text-[10px] text-on-surface-variant font-mono mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-surface border border-outline-variant/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display-b2c text-base text-on-surface">Pendapatan Bulanan</h2>
          <span className="text-xs text-on-surface-variant font-mono">2026</span>
        </div>
        <div className="flex items-end gap-3 h-48">
          {data.chart.map((val, i) => {
            const pct = (val / maxVal) * 100
            const isLast = i === data.chart.length - 1
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className={`text-[10px] font-mono transition-opacity ${isLast ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-100 text-on-surface-variant"}`}>
                  {formatRp(val).replace("Rp ", "")}
                </span>
                <div className="w-full relative" style={{ height: `${pct}%` }}>
                  <div className={`w-full h-full rounded-t-md transition-all duration-300 ${isLast ? "bg-primary" : "bg-primary/20 group-hover:bg-primary/40"}`} />
                </div>
                <span className={`text-[10px] font-mono ${isLast ? "text-primary font-bold" : "text-on-surface-variant"}`}>{data.months[i]}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Riwayat Pembayaran */}
      <div className="bg-surface border border-outline-variant/20 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10">
          <h2 className="font-display-b2c text-base text-on-surface">Riwayat Transfer Dana</h2>
        </div>
        <div className="divide-y divide-outline-variant/10">
          {[
            { tanggal: "01 Jul 2026", nominal: 8_200_000, status: "Masuk", ket: "Pencairan Dana Juni" },
            { tanggal: "01 Jun 2026", nominal: 7_950_000, status: "Masuk", ket: "Pencairan Dana Mei" },
            { tanggal: "01 Mei 2026", nominal: 6_800_000, status: "Masuk", ket: "Pencairan Dana Apr" },
          ].map((t) => (
            <div key={t.tanggal} className="flex items-center gap-4 px-6 py-4">
              <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined text-sm">south_west</span>
              </div>
              <div className="flex-1">
                <p className="font-label-caps text-sm text-on-surface">{t.ket}</p>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">{t.tanggal}</p>
              </div>
              <p className="font-bold text-secondary">{formatRp(t.nominal)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
