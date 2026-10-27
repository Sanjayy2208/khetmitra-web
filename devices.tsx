'use client'
import { useState } from 'react'
import { Droplets, Fan, Power, Thermometer, Waves, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFarm } from '../store'
import { Card, Meter, Pill, ScreenHeader, SectionTitle, Segmented } from '../../ui'

const ZONES = [{ id: 'A', name: 'Zone A · North', moisture: 31 }, { id: 'B', name: 'Zone B · Center', moisture: 46 }, { id: 'C', name: 'Zone C · South slope', moisture: 22 }]

export function DevicesScreen() {
  const { profile, activeCrop } = useFarm()
  const [tab, setTab] = useState<'poly' | 'soil'>(profile.hasPolyhouse ? 'poly' : 'soil')
  const [auto, setAuto] = useState(true)
  const [vent, setVent] = useState(40)
  const [target, setTarget] = useState({ temp: 26, rh: 70 })
  const temp = 27.4
  const rh = 68
  const autoVent = Math.max(0, Math.min(100, Math.round((temp - target.temp) * 30 + (rh - target.rh) * 2 + 30)))
  const openPct = auto ? autoVent : vent

  return (
    <div className="pb-8">
      <ScreenHeader title="Field devices" subtitle={`${activeCrop.name} climate needs`} back="home" />
      <div className="flex flex-col gap-4 px-5">
        <Segmented label="Device type" value={tab} onChange={setTab} options={[{ value: 'poly', label: 'Polyhouse' }, { value: 'soil', label: 'Soil moisture' }]} />

        {tab === 'poly' ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Card><Thermometer className="size-5 text-warning" /><p className="mt-2 text-3xl font-bold">{temp}°</p><p className="text-xs text-muted-foreground">Target {target.temp}°C</p></Card>
              <Card><Droplets className="size-5 text-primary" /><p className="mt-2 text-3xl font-bold">{rh}%</p><p className="text-xs text-muted-foreground">Target RH {target.rh}%</p></Card>
            </div>
            <section className="rounded-3xl bg-primary p-5 text-primary-foreground">
              <div className="flex items-center justify-between">
                <div><p className="text-sm opacity-80">Roof vents</p><p className="font-serif text-4xl font-semibold">{openPct}% open</p></div>
                <Fan className={cn('size-10', openPct > 0 && 'animate-spin [animation-duration:3s]')} />
              </div>
              <div className="mt-4 flex h-16 items-end gap-1.5" aria-hidden="true">
                {Array.from({ length: 10 }).map((_, i) => (<div key={i} className={cn('flex-1 rounded-t-md transition-all', i < openPct / 10 ? 'bg-accent' : 'bg-primary-foreground/20')} style={{ height: `${30 + i * 7}%` }} />))}
              </div>
            </section>
          </>
        ) : (
          <>
            <Card className="flex items-center gap-4">
              <div className="relative flex size-20 shrink-0 items-center justify-center">
                <svg viewBox="0 0 36 36" className="size-20 -rotate-90" aria-hidden="true"><circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--muted)" strokeWidth="3.5" /><circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--warning)" strokeWidth="3.5" strokeDasharray={`${33 * 0.974} 100`} strokeLinecap="round" /></svg>
                <span className="absolute text-lg font-bold">33%</span>
              </div>
              <div><p className="text-sm text-muted-foreground">Average field moisture</p><p className="font-serif text-xl font-semibold">Irrigate tomorrow, 6 AM</p></div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}