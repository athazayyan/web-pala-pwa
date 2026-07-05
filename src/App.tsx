
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { B2CLayout } from "./layouts/B2CLayout"
import { B2BLayout } from "./layouts/B2BLayout"
import { AuthLayout } from "./layouts/AuthLayout"
import { Home } from "./pages/b2c/Home"
import { Services } from "./pages/b2c/Services"
import { Jejak } from "./pages/b2c/Jejak"
import { Dashboard } from "./pages/b2b/Dashboard"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* B2C Routes */}
        <Route path="/" element={<B2CLayout />}>
          <Route index element={<Home />} />
          <Route path="jejak" element={<Jejak />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<div className="p-8 text-center text-on-surface">Dampak — Segera Hadir</div>} />
        </Route>

        {/* B2B Routes */}
        <Route path="/b2b" element={<B2BLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="logistics" element={<div className="p-8">Logistik Modular - Segera Hadir</div>} />
          <Route path="marketplace" element={<div className="p-8">Pala Marketplace - Segera Hadir</div>} />
          <Route path="farmers" element={<div className="p-8">Jaringan Petani - Segera Hadir</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
