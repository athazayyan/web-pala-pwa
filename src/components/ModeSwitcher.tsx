
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/Button"
import { RefreshCcw } from "lucide-react"

export function ModeSwitcher() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const isB2B = location.pathname.startsWith('/b2b')
  
  const toggleMode = () => {
    if (isB2B) {
      navigate('/')
    } else {
      navigate('/b2b')
    }
  }

  return (
    <Button 
      variant={isB2B ? "secondary" : "default"} 
      size="sm"
      onClick={toggleMode}
      className="flex items-center gap-2"
    >
      <RefreshCcw className="w-4 h-4" />
      {isB2B ? "Switch to Heritage Mode" : "Switch to Industrial Mode"}
    </Button>
  )
}
