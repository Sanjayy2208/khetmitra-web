'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { CROPS, DEFAULT_PROFILE, type CropInfo, type FarmProfile, type FertilizerTask, type LedgerEntry } from '@/lib/farm-data'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
export type Screen = 'home' | 'crops' | 'scan' | 'care' | 'ledger' | 'subsidies' | 'relief' | 'devices' | 'profile'
export type Diagnosis = { id: string; date: string; image: string; verdict: 'Biological disease' | 'Pest attack' | 'Chemical burn / toxicity'; name: string; confidence: number }

type FarmState = {
  onboarded: boolean; setOnboarded: (v: boolean) => void; profile: FarmProfile; setProfile: (p: FarmProfile) => void;
  activeCrop: CropInfo; setActiveCropId: (id: string) => void; sowingDate: Date; daysSinceSowing: number;
  tasks: FertilizerTask[]; completeTask: (id: string, actualDose: number) => Promise<void>;
  ledger: LedgerEntry[]; addEntry: (e: Omit<LedgerEntry, 'id'>) => Promise<void>; removeEntry: (id: string) => Promise<void>;
  diagnoses: Diagnosis[]; addDiagnosis: (d: Diagnosis) => void; screen: Screen; go: (s: Screen) => void;
}

const FarmContext = createContext<FarmState | null>(null)

export function FarmProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [onboarded, setOnboarded] = useState(true)
  const [profile, setProfile] = useState<FarmProfile>(DEFAULT_PROFILE)
  const [activeCropId, setActiveCropId] = useState('tomato')
  const [sowingDate, setSowingDate] = useState<Date>(new Date())
  const [tasks, setTasks] = useState<FertilizerTask[]>([])
  const [ledger, setLedger] = useState<LedgerEntry[]>([])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [screen, setScreen] = useState<Screen>('home')

  useEffect(() => {
    fetch(`${API_BASE}/farm`)
      .then(res => res.json())
      .then(data => {
        setProfile(data.profile)
        setActiveCropId(data.activeCropId)
        setSowingDate(new Date(data.sowingDate))
        setTasks(data.tasks)
        setLedger(data.ledger)
        setLoading(false)
      })
      .catch(err => { console.error("Failed to load farm data", err); setLoading(false); })
  }, [])

  const activeCrop = CROPS.find((c) => c.id === activeCropId) ?? CROPS[0]
  const daysSinceSowing = Math.floor((new Date().getTime() - sowingDate.getTime()) / (1000 * 3600 * 24))

  const value: FarmState = {
    onboarded, setOnboarded, profile, setProfile, activeCrop, setActiveCropId, sowingDate, daysSinceSowing: Math.max(0, daysSinceSowing),
    tasks,
    completeTask: async (id, actualDose) => {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, done: { date: new Date().toISOString(), actualDose } } : t))
      const res = await fetch(`${API_BASE}/tasks/${id}/complete`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ actualDose }) })
      if (res.ok) {
        const farmRes = await fetch(`${API_BASE}/farm`)
        const farmData = await farmRes.json()
        setLedger(farmData.ledger)
      }
    },
    ledger,
    addEntry: async (e) => {
      const res = await fetch(`${API_BASE}/ledger`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(e) })
      const newEntry = await res.json()
      setLedger(prev => [...prev, newEntry])
    },
    removeEntry: async (id) => {
      setLedger(prev => prev.filter(e => e.id !== id))
      await fetch(`${API_BASE}/ledger/${id}`, { method: 'DELETE' })
    },
    diagnoses, addDiagnosis: (d) => setDiagnoses((prev) => [d, ...prev]), screen, go: setScreen,
  }

  if (loading) return <div className="flex h-dvh items-center justify-center bg-secondary">Connecting to Farm Server...</div>
  return <FarmContext.Provider value={value}>{children}</FarmContext.Provider>
}

export function useFarm() {
  const ctx = useContext(FarmContext)
  if (!ctx) throw new Error('useFarm must be used inside FarmProvider')
  return ctx
}