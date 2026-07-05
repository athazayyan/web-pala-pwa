import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { motion, AnimatePresence } from "framer-motion"

interface ShippingOption {
  id: string
  name: string
  price: number
  desc: string
}

const shippingOptions: ShippingOption[] = [
  { id: "std", name: "Pengiriman Standar", price: 15000, desc: "2 - 3 Hari Kerja" },
  { id: "exp", name: "Pengiriman Kilat (Express)", price: 35000, desc: "1 Hari Kerja" },
  { id: "inst", name: "Layanan Instan", price: 50000, desc: "3 - 6 Jam Selesai" },
]

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()
  const navigate = useNavigate()

  // Shipping state
  const [selectedShipping, setSelectedShipping] = useState<string>("std")
  const currentShipping = shippingOptions.find((s) => s.id === selectedShipping) || shippingOptions[0]

  // Checkout modal states
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<"address" | "payment" | "success">("address")
  
  // Checkout form data
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Banda Aceh",
  })
  const [paymentMethod, setPaymentMethod] = useState<string>("va")

  const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`

  // Subtotal details
  const subtotal = cartTotal
  const tax = Math.round(subtotal * 0.11) // PPN 11%
  const shippingCost = currentShipping.price
  const grandTotal = subtotal + tax + shippingCost

  const handleQtyChange = (id: string, newQty: number) => {
    updateQuantity(id, newQty)
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkoutStep === "address") {
      setCheckoutStep("payment")
    } else if (checkoutStep === "payment") {
      setCheckoutStep("success")
      // Simulated delay for payment success
      setTimeout(() => {
        clearCart()
      }, 500)
    }
  }

  const closeCheckoutFlow = () => {
    setCheckoutModalOpen(false)
    setCheckoutStep("address")
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        
        {/* Breadcrumb / Back Link */}
        <button 
          onClick={() => navigate("/services")}
          className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors mb-6 font-label-caps focus:outline-none"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Kembali ke Marketplace
        </button>

        <h1 className="font-display-b2c text-3xl md:text-4xl text-primary mb-10">Keranjang Belanja Anda</h1>

        {cartItems.length === 0 ? (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-surface border border-outline-variant/30 rounded-2xl shadow-sm"
          >
            <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-primary mb-6 shadow-inner">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_basket</span>
            </div>
            <h2 className="font-display-b2c text-xl text-on-surface mb-2 font-bold">Keranjang Anda Kosong</h2>
            <p className="text-sm text-on-surface-variant max-w-sm mb-8 leading-relaxed">
              Anda belum menambahkan produk rempah apa pun ke dalam keranjang belanja.
            </p>
            <Link 
              to="/services" 
              className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-caps text-label-caps hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              Mulai Belanja
            </Link>
          </motion.div>
        ) : (
          /* Active Cart State */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-surface border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-lowest">
                  <h3 className="font-display-b2c font-semibold text-primary">Daftar Produk ({cartItems.length})</h3>
                  <button 
                    onClick={clearCart}
                    className="text-xs text-error font-label-caps hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">delete_sweep</span>
                    Bersihkan Keranjang
                  </button>
                </div>

                <div className="divide-y divide-outline-variant/20">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-surface-container-low border border-outline-variant/20">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display-b2c text-[16px] text-on-surface font-semibold leading-tight hover:text-primary transition-colors">
                          <Link to={`/produk/${item.id}`}>{item.name}</Link>
                        </h4>
                        <p className="text-xs text-on-surface-variant font-mono mt-1">Penjual: {item.seller}</p>
                        <p className="text-xs text-primary font-label-caps mt-1 bg-primary-container/20 px-2 py-0.5 rounded-full inline-block">
                          Stok: {item.stock} {item.unit}
                        </p>
                      </div>

                      {/* Pricing and Qty Selector */}
                      <div className="flex sm:flex-col items-end gap-3 justify-between sm:justify-start w-full sm:w-auto">
                        <div className="text-right">
                          <span className="font-bold text-tertiary block text-sm sm:text-base">{formatRp(item.price)}</span>
                          <span className="text-[10px] text-on-surface-variant">per {item.unit}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Qty Selector */}
                          <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden bg-background">
                            <button 
                              onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-on-surface-variant hover:bg-surface-container-low transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <span className="material-symbols-outlined text-xs font-bold">remove</span>
                            </button>
                            <span className="px-3 py-1 font-mono font-bold text-xs text-on-surface border-x border-outline-variant">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-on-surface-variant hover:bg-surface-container-low transition-colors"
                              disabled={item.quantity >= item.stock}
                            >
                              <span className="material-symbols-outlined text-xs font-bold">add</span>
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-lg hover:bg-error-container/10"
                            title="Hapus Produk"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="space-y-6">
              
              {/* Shipping Selection */}
              <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 shadow-sm">
                <h3 className="font-display-b2c font-semibold text-primary mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">local_shipping</span>
                  Pilihan Pengiriman
                </h3>
                <div className="space-y-3">
                  {shippingOptions.map((opt) => (
                    <label 
                      key={opt.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedShipping === opt.id 
                          ? "border-primary bg-primary/5 shadow-sm" 
                          : "border-outline-variant/30 hover:border-primary/45"
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="shipping" 
                        value={opt.id} 
                        checked={selectedShipping === opt.id}
                        onChange={() => setSelectedShipping(opt.id)}
                        className="mt-1 text-primary focus:ring-primary focus:ring-offset-0 focus:ring-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-xs font-bold text-on-surface truncate">{opt.name}</span>
                          <span className="text-xs font-bold text-tertiary">{formatRp(opt.price)}</span>
                        </div>
                        <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Calculations */}
              <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="font-display-b2c font-semibold text-primary border-b border-outline-variant/20 pb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">receipt_long</span>
                  Ringkasan Belanja
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Total Harga ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} Item)</span>
                    <span className="font-mono">{formatRp(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Pajak (PPN 11%)</span>
                    <span className="font-mono">{formatRp(tax)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant border-b border-outline-variant/15 pb-2">
                    <span>Ongkos Kirim ({currentShipping.name})</span>
                    <span className="font-mono">{formatRp(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-on-surface pt-2">
                    <span>Total Pembayaran</span>
                    <span className="text-primary font-mono">{formatRp(grandTotal)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-3.5 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
                  Checkout Sekarang
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* ─── Checkout Flow Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCheckoutFlow}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            >
              {/* Modal Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing
                className="bg-surface border border-outline-variant/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              >
                
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-outline-variant/20 bg-surface-container-lowest flex justify-between items-center">
                  <h3 className="font-display-b2c text-lg font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined">payments</span>
                    Proses Pembayaran B2C
                  </h3>
                  <button 
                    onClick={closeCheckoutFlow}
                    className="text-on-surface-variant hover:text-primary transition-colors flex items-center"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-6">
                  {checkoutStep === "address" && (
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Langkah 1/2</span>
                        <span className="text-xs text-on-surface-variant font-label-caps">Informasi Pengiriman</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-label-caps text-on-surface-variant mb-1">Nama Penerima</label>
                          <input 
                            type="text"
                            required
                            placeholder="Contoh: Budi Santoso"
                            value={addressForm.name}
                            onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                            className="w-full border border-outline-variant bg-surface text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-label-caps text-on-surface-variant mb-1">Nomor Telepon</label>
                          <input 
                            type="tel"
                            required
                            placeholder="Contoh: 081234567890"
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                            className="w-full border border-outline-variant bg-surface text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-label-caps text-on-surface-variant mb-1">Kota</label>
                          <select 
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                            className="w-full border border-outline-variant bg-surface text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
                          >
                            <option value="Banda Aceh">Banda Aceh</option>
                            <option value="Ternate">Ternate</option>
                            <option value="Aceh Selatan">Aceh Selatan</option>
                            <option value="Jakarta">Jakarta</option>
                            <option value="Surabaya">Surabaya</option>
                            <option value="Medan">Medan</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-label-caps text-on-surface-variant mb-1">Alamat Lengkap</label>
                          <textarea 
                            rows={3}
                            required
                            placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                            value={addressForm.address}
                            onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                            className="w-full border border-outline-variant bg-surface text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface resize-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-outline-variant/15 flex justify-between items-center gap-4">
                        <div className="text-left">
                          <span className="text-[10px] text-on-surface-variant block uppercase">Total Pembayaran</span>
                          <span className="font-mono text-base font-bold text-primary">{formatRp(grandTotal)}</span>
                        </div>
                        <button 
                          type="submit"
                          className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-caps text-label-caps hover:opacity-90 active:scale-95 transition-all shadow flex items-center gap-1 text-xs"
                        >
                          Lanjut Pembayaran
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {checkoutStep === "payment" && (
                    <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Langkah 2/2</span>
                        <span className="text-xs text-on-surface-variant font-label-caps">Metode Pembayaran</span>
                      </div>

                      <div className="space-y-3">
                        <label 
                          className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                            paymentMethod === "va" ? "border-primary bg-primary/5 shadow-sm" : "border-outline-variant/30"
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="payment" 
                            value="va" 
                            checked={paymentMethod === "va"}
                            onChange={() => setPaymentMethod("va")}
                            className="text-primary focus:ring-primary"
                          />
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl text-primary">account_balance</span>
                            <div>
                              <span className="text-xs font-bold text-on-surface block">Virtual Account (VA)</span>
                              <span className="text-[10px] text-on-surface-variant">Mandiri, BCA, BNI, BRI</span>
                            </div>
                          </div>
                        </label>

                        <label 
                          className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                            paymentMethod === "qris" ? "border-primary bg-primary/5 shadow-sm" : "border-outline-variant/30"
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="payment" 
                            value="qris" 
                            checked={paymentMethod === "qris"}
                            onChange={() => setPaymentMethod("qris")}
                            className="text-primary focus:ring-primary"
                          />
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl text-primary">qr_code_2</span>
                            <div>
                              <span className="text-xs font-bold text-on-surface block">QRIS / E-Wallet</span>
                              <span className="text-[10px] text-on-surface-variant">GoPay, OVO, Dana, LinkAja</span>
                            </div>
                          </div>
                        </label>

                        <label 
                          className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                            paymentMethod === "cc" ? "border-primary bg-primary/5 shadow-sm" : "border-outline-variant/30"
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="payment" 
                            value="cc" 
                            checked={paymentMethod === "cc"}
                            onChange={() => setPaymentMethod("cc")}
                            className="text-primary focus:ring-primary"
                          />
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl text-primary">credit_card</span>
                            <div>
                              <span className="text-xs font-bold text-on-surface block">Kartu Kredit</span>
                              <span className="text-[10px] text-on-surface-variant">Visa, MasterCard, JCB</span>
                            </div>
                          </div>
                        </label>
                      </div>

                      {/* Summary recap */}
                      <div className="bg-surface-container-low rounded-xl p-4 text-xs space-y-2 border border-outline-variant/10">
                        <div className="flex justify-between text-on-surface-variant">
                          <span>Kirim Ke:</span>
                          <span className="font-bold text-on-surface">{addressForm.name} ({addressForm.city})</span>
                        </div>
                        <div className="flex justify-between text-on-surface-variant">
                          <span>Alamat:</span>
                          <span className="text-on-surface text-right truncate max-w-[200px]" title={addressForm.address}>
                            {addressForm.address}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-outline-variant/15 flex justify-between items-center gap-4">
                        <button 
                          type="button"
                          onClick={() => setCheckoutStep("address")}
                          className="text-xs text-on-surface-variant hover:text-primary transition-colors font-label-caps flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">arrow_back</span>
                          Kembali
                        </button>
                        <button 
                          type="submit"
                          className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-caps text-label-caps hover:opacity-90 active:scale-95 transition-all shadow flex items-center gap-2 text-xs font-semibold"
                        >
                          <span className="material-symbols-outlined text-sm">verified_user</span>
                          Konfirmasi & Bayar
                        </button>
                      </div>
                    </form>
                  )}

                  {checkoutStep === "success" && (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto shadow-inner relative">
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                          className="material-symbols-outlined text-5xl"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </motion.span>
                      </div>
                      
                      <div>
                        <h4 className="font-display-b2c text-xl font-bold text-secondary">Pesanan Berhasil Dibuat!</h4>
                        <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                          Terima kasih atas pesanan Anda. Sistem kami sedang mengabari petani dan penjual untuk memproses produk rempah Anda.
                        </p>
                      </div>

                      <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/15 text-xs text-left max-w-sm mx-auto space-y-2 font-mono">
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Penerima:</span>
                          <span className="text-on-surface font-semibold">{addressForm.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Status:</span>
                          <span className="text-secondary font-semibold">Sedang Diproses</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Estimasi Tiba:</span>
                          <span className="text-on-surface font-semibold">{currentShipping.desc}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Total Pembayaran:</span>
                          <span className="text-primary font-bold">{formatRp(grandTotal)}</span>
                        </div>
                      </div>

                      <button 
                        type="button"
                        onClick={closeCheckoutFlow}
                        className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-caps text-label-caps hover:opacity-90 active:scale-95 transition-all shadow-md text-xs"
                      >
                        Kembali Berbelanja
                      </button>
                    </motion.div>
                  )}
                </div>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
