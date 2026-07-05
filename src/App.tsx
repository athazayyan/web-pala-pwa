
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { B2CLayout } from "./layouts/B2CLayout"
import { B2BLayout } from "./layouts/B2BLayout"
import { Home } from "./pages/b2c/Home"
import { Services } from "./pages/b2c/Services"
import { Dashboard } from "./pages/b2b/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* B2C Routes */}
        <Route path="/" element={<B2CLayout />}>
          <Route index element={<Home />} />
          <Route path="jejak" element={<div className="p-8 text-center">Jejak Rempah - Coming Soon</div>} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<div className="p-8 text-center">Story - Coming Soon</div>} />
        </Route>
        
        {/* B2B Routes */}
        <Route path="/b2b" element={<B2BLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="logistics" element={<div className="p-8">Modular Logistics - Coming Soon</div>} />
          <Route path="marketplace" element={<div className="p-8">Pala Marketplace - Coming Soon</div>} />
          <Route path="farmers" element={<div className="p-8">Farmer Network - Coming Soon</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
