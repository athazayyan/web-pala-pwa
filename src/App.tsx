import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { B2CLayout } from "./layouts/B2CLayout"
import { B2BLayout } from "./layouts/B2BLayout"
import { AuthLayout } from "./layouts/AuthLayout"
import { PenjualLayout } from "./layouts/PenjualLayout"
import { Home } from "./pages/b2c/Home"
import { Services } from "./pages/b2c/Services"
import { ProductDetail } from "./pages/b2c/ProductDetail"
import { Dashboard } from "./pages/b2b/Dashboard"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { BarangSaya } from "./pages/penjual/BarangSaya"
import { TambahBarang } from "./pages/penjual/TambahBarang"
import { Pemesanan } from "./pages/penjual/Pemesanan"
import { Finansial } from "./pages/penjual/Finansial"
import { KelolaKebun } from "./pages/penjual/KelolaKebun"
import { CartProvider } from "./context/CartContext"
import { Cart } from "./pages/b2c/Cart"
import { PreOrder } from "./pages/b2c/PreOrder"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Penjual Routes */}
          <Route path="/penjual" element={<PenjualLayout />}>
            <Route index element={<Navigate to="/penjual/barang" replace />} />
            <Route path="barang" element={<BarangSaya />} />
            <Route path="tambah" element={<TambahBarang />} />
            <Route path="pesanan" element={<Pemesanan />} />
            <Route path="finansial" element={<Finansial />} />
            <Route path="kebun" element={<KelolaKebun />} />
          </Route>

          {/* B2C Routes */}
          <Route path="/" element={<B2CLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="produk/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="pre-order" element={<PreOrder />} />
            <Route path="about" element={<div className="p-8 text-center text-on-surface">Dampak — Segera Hadir</div>} />
          </Route>

          {/* B2B Routes */}
          <Route path="/b2b" element={<B2BLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="logistics" element={<div className="p-8">Logistik Modular</div>} />
            <Route path="marketplace" element={<div className="p-8">Pala Marketplace</div>} />
            <Route path="farmers" element={<div className="p-8">Jaringan Petani</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
