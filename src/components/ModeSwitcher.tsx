import { useNavigate, useLocation } from "react-router-dom"

export function ModeSwitcher() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const isB2B = location.pathname.startsWith('/b2b')
  
  const toggleMode = (targetB2B: boolean) => {
    if (targetB2B) {
      navigate('/b2b')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="flex bg-surface-container rounded-full p-1 border border-outline-variant/20">
      <button 
        onClick={() => toggleMode(false)}
        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
          !isB2B 
            ? "bg-primary text-on-primary" 
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        Retail
      </button>
      <button 
        onClick={() => toggleMode(true)}
        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
          isB2B 
            ? "bg-primary text-on-primary" 
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        Industrial Mode
      </button>
    </div>
  )
}
