import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot } from "lucide-react"

export function ChatbotApoteker() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Selamat datang. Saya Asisten Rempah. Bagaimana saya bisa membantu keluhan Anda hari ini?", sender: "bot" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = input
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: "user" }])
    setInput("")
    setIsTyping(true)

    // Simulasi respons AI
    setTimeout(() => {
      setIsTyping(false)
      const lowerInput = userMsg.toLowerCase()
      let botResponse = "Biji pala memiliki banyak khasiat. Bisa dijelaskan lebih detail keluhan Anda?"
      
      if (lowerInput.includes("tidur") || lowerInput.includes("insomnia") || lowerInput.includes("susah")) {
        botResponse = "Untuk masalah tidur, saya sangat merekomendasikan *Nutmeg Sleep Salve*. Minyak atsirinya dapat menenangkan saraf dan membantu Anda terlelap. Apakah Anda ingin menambahkannya ke keranjang?"
      } else if (lowerInput.includes("pegal") || lowerInput.includes("otot") || lowerInput.includes("sakit")) {
        botResponse = "Minyak esensial pala mengandung myristicin yang baik untuk meredakan nyeri otot. *Balm Malam Pala Premium* kami sangat cocok untuk dioleskan pada otot yang pegal."
      } else if (lowerInput.includes("resep") || lowerInput.includes("masak") || lowerInput.includes("makan")) {
        botResponse = "Biji pala utuh premium (Grade ABCD) dari Tapaktuan adalah pilihan terbaik untuk kuliner. Aromanya sangat kuat."
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botResponse, sender: "bot" }])
    }, 1500)
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setIsOpen(true)}
              className="bg-[#442a22] text-white p-4 rounded-full shadow-lg hover:bg-[#5d4037] transition flex items-center justify-center relative group"
            >
              <MessageCircle size={28} />
              <div className="absolute -top-1 -right-1 bg-[#efa800] w-4 h-4 rounded-full border-2 border-[#fbf9f5]"></div>
              
              {/* Tooltip */}
              <div className="absolute right-full mr-4 bg-[#fbf9f5] text-[#1b1c1a] px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-md border border-[#eae8e4] font-medium pointer-events-none">
                Tanya Asisten Rempah
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="absolute bottom-0 right-0 w-80 sm:w-96 bg-[#fbf9f5] rounded-xl shadow-2xl overflow-hidden border border-[#eae8e4] flex flex-col"
              style={{ height: "500px", maxHeight: "80vh" }}
            >
              {/* Header */}
              <div className="bg-[#442a22] text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#5d4037] rounded-full flex items-center justify-center">
                    <Bot size={24} className="text-[#e7bdb1]" />
                  </div>
                  <div>
                    <h3 className="font-bold font-serif">Apoteker Rempah</h3>
                    <p className="text-xs text-[#d4ada1]">Asisten Pribadi Anda</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-[#d4ada1] hover:text-white transition">
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#1b6d24] text-white rounded-tr-sm"
                          : "bg-white border border-[#eae8e4] text-[#1b1c1a] rounded-tl-sm"
                      }`}
                      dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*(.*?)\*/g, "<strong>$1</strong>") }}
                    />
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#eae8e4] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 shadow-sm">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-[#827470] rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-[#827470] rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-[#827470] rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-[#eae8e4]">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ceritakan keluhan Anda..."
                    className="flex-1 bg-[#f5f3ef] border border-[#e4e2de] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#77574d] text-[#1b1c1a]"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="bg-[#efa800] text-[#432c00] p-2 rounded-full hover:bg-[#ffba38] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <div className="text-center mt-2">
                  <p className="text-[10px] text-[#827470]">Rekomendasi herbal. Konsultasikan dengan dokter untuk keluhan medis.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
