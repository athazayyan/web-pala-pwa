
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Activity, ShieldCheck, TrendingUp, Package } from "lucide-react"

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-on-surface-variant font-medium">Active Farmers</p>
              <p className="text-3xl font-bold font-mono mt-2">1,204</p>
            </div>
            <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-primary">
              <Activity className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-on-surface-variant font-medium">Yield Quality</p>
              <p className="text-3xl font-bold font-mono mt-2 text-secondary">94.2%</p>
            </div>
            <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-on-surface-variant font-medium">Export Volume (MT)</p>
              <p className="text-3xl font-bold font-mono mt-2">42.5</p>
            </div>
            <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-primary">
              <Package className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-on-surface-variant font-medium">Efficiency Score</p>
              <p className="text-3xl font-bold font-mono mt-2 text-tertiary-container">+12%</p>
            </div>
            <div className="w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center text-on-tertiary-fixed">
              <TrendingUp className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Logistics Module */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-outline-variant/30 pb-4">
            <CardTitle>Modular Logistics Configurator</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              {[
                { id: "freight", label: "Freight & Transport (Farm-to-Port)", active: true },
                { id: "finance", label: "Financing (Cash-to-Farmer terms)", active: false },
                { id: "insurance", label: "Quality Insurance (Myristicin Lab Testing)", active: true },
                { id: "warehouse", label: "Warehousing (Humidity-controlled transit)", active: true },
              ].map((module) => (
                <div key={module.id} className="flex items-center justify-between p-4 border border-outline-variant/50 rounded-md">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="w-5 h-5 accent-tertiary-container" defaultChecked={module.active} />
                    <span className="font-medium">{module.label}</span>
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded ${module.active ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    {module.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="secondary">Reset</Button>
              <Button variant="industrial">Apply Configuration</Button>
            </div>
          </CardContent>
        </Card>

        {/* Traceability Feed */}
        <Card>
          <CardHeader className="border-b border-outline-variant/30 pb-4">
            <CardTitle>Traceability Feed</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant/30 before:to-transparent">
               {[
                 { time: "10:42 AM", action: "Batch B-204 Cleared QC", status: "success" },
                 { time: "09:15 AM", action: "Harvest Logged: Koperasi Mawar", status: "info" },
                 { time: "Yesterday", action: "Payment Disbursed to 12 Farmers", status: "success" },
               ].map((event, i) => (
                 <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-secondary-container text-secondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded border border-outline-variant/30 bg-surface">
                      <div className="flex items-center justify-between mb-1">
                        <time className="text-xs font-mono text-on-surface-variant">{event.time}</time>
                      </div>
                      <div className="text-sm font-medium">{event.action}</div>
                    </div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
