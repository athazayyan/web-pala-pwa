import { useState, useRef, useEffect } from "react"

interface Product {
  name: string
  img: string
  alt: string
  price: string
}

interface Message {
  id: string
  text: string
  isUser: boolean
  product?: Product
}

const responses: Record<string, { text: string; product: Product }> = {
  "Sulit tidur": {
    text: "Untuk menenangkan pikiran dan mempersiapkan tubuh untuk istirahat, saya rekomendasikan **Balm Malam Pala Premium**. Senyawa myristicin-nya bekerja sebagai penenang alami ketika dioleskan di pelipis.",
    product: {
      name: "Balm Malam Pala",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDefJb0D_YxwnTy9vrcBW6TNkUDjJTlvkWFDrgtoW-uq_dk5ZZdwhEZl_w8YXUTkwdZJvAt2ADr2Ag0E4p3E-QfhOJtHEI8FywXrfNiY_5_GUMQnomtsCWaZsR7815WVIaGFn8xfdxGIKiJACZWE7AVY7KbZpxxT9vH2ue97AyIEZ8UcjEG7yUTBvVxLSelnbcL17CoVpUh6dn7KZcK13YbGLT-oQLbByC3gxBnjnrTqI089hCIjQ",
      alt: "Balm Malam Pala",
      price: "Rp 185.000",
    },
  },
  "Butuh tambahan energi": {
    text: "Untuk kejernihan pikiran dan fokus, **Sirup Hangat Pala** kami yang diperkaya jahe Nusantara sangat ideal. Merangsang sirkulasi tanpa efek jantung berdebar seperti kafein.",
    product: {
      name: "Sirup Hangat Pala",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpUSYtu0kDjtM11U0f6bhDTOMI7ZWuMnGUTQZNzTN4MRIDJci5v2AIULlNPZaFnHA2as-ox5545dH7hJYyyLDFRBVC6nGij9HIGYNFDXfC4LK5bXBFTy6v8S8SVXEXAMzM-l2u4mTyIpKDNi5nPIe3khndRPLNddz0oGxdqIvjC9l4r8eWM_6qSA_PBlGDKS6xprN8WntWcKbshUwuNBNJyQR8KkriSeVC5ho2lupNak7pqJo69g",
      alt: "Sirup Hangat Pala",
      price: "Rp 145.000",
    },
  },
  "Nyeri otot": {
    text: "**Minyak Esensial Pala Grade Apoteker** kami adalah anti-inflamasi yang kuat. Encerkan tiga tetes ke dalam minyak pembawa atau tambahkan ke rendaman air hangat untuk melepaskan ketegangan otot.",
    product: {
      name: "Minyak Esensial Murni",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDexw52erlBzdsXAMSGCOcUB2OigNuW2IOeK_oy8f_5Q1ziMlsvKC6SI94sZU_ocY7KHQBO0jrbiIvi7VqWEgstklXXTnIlT23ZqINrTbk8fqVPfHXz73nGHdF1l9g2CXA1NyV_bHl5lob3Lh_WwKhTqJ3pD0ip3XC9svTAAZsgwbyi1rzFmizg9p8OveyGS9V5k-YacGQQopOGQ6i9ew8E8yeujPBInLEyuv33pCNDSpSqHh3aA",
      alt: "Minyak Esensial Murni",
      price: "Rp 250.000",
    },
  },
}

export function Services() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `"Selamat datang. Saya adalah Apoteker Rempah. Dari kearifan leluhur Nusantara, saya membawa khasiat penyembuhan pala terbaik Indonesia. Bagaimana saya bisa membantu kesehatan Anda hari ini?"`,
      isUser: false,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const [activeCategory, setActiveCategory] = useState("Tidur & Relaksasi")

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      text: text,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const matchedResponse = responses[text]

      const botMsg: Message = matchedResponse
        ? {
            id: `bot-${Date.now()}`,
            text: matchedResponse.text,
            isUser: false,
            product: matchedResponse.product,
          }
        : {
            id: `bot-${Date.now()}`,
            text: "Itu kekhawatiran yang menarik. Pala Nusantara kaya akan berbagai senyawa bermanfaat. Boleh saya sarankan untuk melihat kategori Tidur atau Vitalitas kami untuk solusi herbal alami?",
            isUser: false,
          }

      setMessages((prev) => [...prev, botMsg])
    }, 1000)
  }

  return (
    <div className="flex pt-4 h-[calc(100vh-140px)]">
      {/* Sidebar: Kategori Kebaikan */}
      <aside className="hidden lg:flex flex-col w-80 bg-surface-container-low border-r border-outline-variant p-8 gap-8 overflow-y-auto">
        <div>
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 opacity-70">
            KATEGORI KESEHATAN
          </h3>
          <ul className="space-y-2">
            {[
              { name: "Tidur & Relaksasi", icon: "nights_stay" },
              { name: "Vitalitas Alami", icon: "bolt" },
              { name: "Ramuan Apoteker", icon: "spa" },
              { name: "Fokus & Kejernihan", icon: "self_care" },
            ].map((cat) => (
              <li key={cat.name}>
                <button
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all ${
                    activeCategory === cat.name
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined">{cat.icon}</span>
                  <span className="font-body-sm text-body-sm">{cat.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 opacity-70">
            PRODUK POPULER
          </h3>
          <div className="space-y-4">
            <div className="group cursor-pointer">
              <div className="h-32 w-full rounded-xl mb-2 overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDefJb0D_YxwnTy9vrcBW6TNkUDjJTlvkWFDrgtoW-uq_dk5ZZdwhEZl_w8YXUTkwdZJvAt2ADr2Ag0E4p3E-QfhOJtHEI8FywXrfNiY_5_GUMQnomtsCWaZsR7815WVIaGFn8xfdxGIKiJACZWE7AVY7KbZpxxT9vH2ue97AyIEZ8UcjEG7yUTBvVxLSelnbcL17CoVpUh6dn7KZcK13YbGLT-oQLbByC3gxBnjnrTqI089hCIjQ')`,
                  }}
                />
              </div>
              <p className="font-display-b2c text-body-md text-primary">Balm Tidur Pala</p>
              <p className="font-body-sm text-label-caps text-outline">Cadangan Nusantara</p>
            </div>

            <div className="group cursor-pointer">
              <div className="h-32 w-full rounded-xl mb-2 overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDL7LgR4WyThUv9TIn2eH0jl1DtVHsEngS7URgkx1443jiNCXW21QPhtco1Z4bNpr7weU24zq_Z3zvIf9kOrw_UUJgobP5xJe1Jd8jtuZBevIrV1wZWrk8BAUeV2moMXAf4TL0jcK9lWdPgf-qrOCnx1uW9-qnDg7wIPmZTE4G5IFYFuUYB_V7-9_pQFV68N6oCdmEytVAKGKu2FabW5c12DOGCtWO6d_mykRNfN7yB1Bngce7LKw')`,
                  }}
                />
              </div>
              <p className="font-display-b2c text-body-md text-primary">Elixir Vitalitas</p>
              <p className="font-body-sm text-label-caps text-outline">Ekstrak Murni</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Chat Container */}
      <section className="flex-grow flex flex-col relative bg-surface-bright">
        {/* Chat Header */}
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                medical_services
              </span>
            </div>
            <div>
              <h2 className="font-display-b2c text-body-md text-primary leading-tight">Apoteker Rempah</h2>
              <p className="font-body-sm text-label-caps text-on-surface-variant/70">Konsultan Rempah Pribadi Anda</p>
            </div>
          </div>
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <span className="material-symbols-outlined text-outline">history</span>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto chat-scroll p-8 space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              <div className={`flex gap-4 ${msg.isUser ? "justify-end" : "justify-start"}`}>
                {!msg.isUser && (
                  <div className="w-8 h-8 rounded-full bg-primary-container shrink-0 flex items-center justify-center text-on-primary-container">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  </div>
                )}

                <div
                  className={`max-w-xl ${
                    msg.isUser
                      ? "bg-primary text-white p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl shadow-md"
                      : "bg-surface-container-low p-5 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-outline-variant/20 shadow-sm"
                  }`}
                >
                  <p className="font-body-md leading-relaxed">{msg.text}</p>
                </div>

                {msg.isUser && (
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest shrink-0 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">person</span>
                  </div>
                )}
              </div>

              {/* Rekomendasi Produk */}
              {msg.product && (
                <div className="flex gap-4 ml-12">
                  <div className="bg-white border border-outline-variant/30 rounded-2xl p-4 shadow-sm flex items-center gap-4 max-w-sm">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface shrink-0">
                      <img src={msg.product.img} alt={msg.product.alt} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-display-b2c text-body-md text-primary leading-tight">{msg.product.name}</h4>
                      <p className="text-tertiary font-bold">{msg.product.price}</p>
                      <button className="mt-2 text-label-caps font-label-caps text-secondary hover:text-on-secondary-container flex items-center gap-1">
                        TAMBAH KE KERANJANG{" "}
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary-container shrink-0 flex items-center justify-center text-on-primary-container">
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
              </div>
              <div className="bg-surface-container-low p-4 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-outline-variant/20 shadow-sm text-xs font-mono text-on-surface-variant">
                Apoteker Rempah sedang meracik solusi...
              </div>
            </div>
          )}

          {/* Pilihan cepat di awal */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 ml-12">
              <button
                onClick={() => handleSend("Sulit tidur")}
                className="px-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant font-label-caps text-label-caps hover:bg-tertiary-fixed hover:border-tertiary transition-all"
              >
                Sulit tidur
              </button>
              <button
                onClick={() => handleSend("Butuh tambahan energi")}
                className="px-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant font-label-caps text-label-caps hover:bg-tertiary-fixed hover:border-tertiary transition-all"
              >
                Butuh tambahan energi
              </button>
              <button
                onClick={() => handleSend("Nyeri otot")}
                className="px-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant font-label-caps text-label-caps hover:bg-tertiary-fixed hover:border-tertiary transition-all"
              >
                Nyeri otot
              </button>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-8 pt-0">
          <div className="relative max-w-4xl mx-auto">
            <input
              className="w-full bg-white border-2 border-outline-variant/30 rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-tertiary shadow-lg transition-all font-body-md text-on-background outline-none"
              placeholder="Ceritakan keluhan kesehatan Anda..."
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
            />
            <button
              onClick={() => handleSend(inputValue)}
              className="absolute right-2 top-2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-tertiary transition-all shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
          <p className="text-center mt-4 font-label-caps text-label-caps text-on-surface-variant/50">
            Rekomendasi berbasis kearifan rempah. Konsultasikan dengan dokter untuk kondisi kronis.
          </p>
        </div>
      </section>
    </div>
  )
}
