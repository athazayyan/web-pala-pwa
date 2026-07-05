
import { motion } from "framer-motion"
import { Button } from "../../components/ui/Button"
import { Card, CardContent } from "../../components/ui/Card"

export function Home() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-tertiary">Heritage & Healing</span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            The Ancestral <br /> <span className="italic font-light">Wisdom of Nutmeg</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-md font-inter">
            Bridging the ancient spice routes of Aceh Selatan with modern wellness. Trace your spices from our volcanic soils directly to your apothecary.
          </p>
          <div className="pt-4 flex gap-4">
            <Button size="lg" className="rounded-soft-arch">Explore Jejak Rempah</Button>
            <Button size="lg" variant="ghost">Consult Apoteker</Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] rounded-soft-arch overflow-hidden shadow-2xl"
        >
          {/* Placeholder for actual image */}
          <div className="absolute inset-0 bg-surface-tint/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80" 
            alt="Nutmeg Farm" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-sm font-inter tracking-wider uppercase opacity-80 mb-1">Origin</p>
            <p className="text-2xl font-playfair font-semibold">Tapaktuan, Aceh Selatan</p>
          </div>
        </motion.div>
      </section>

      {/* Featured Products / AI Assistant */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Apoteker Rempah</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">Tell our AI botanical assistant how you're feeling, and discover the perfect natural remedy from our heritage collection.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-soft-arch border-none bg-surface/50 backdrop-blur">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6">
                  {i}
                </div>
                <h3 className="text-xl font-semibold font-playfair">Essential Oil Blend {i}</h3>
                <p className="text-sm text-on-surface-variant">Pure Myristica fragrans extract, perfect for calming the nervous system and promoting deep rest.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
