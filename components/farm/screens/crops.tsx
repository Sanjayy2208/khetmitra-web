'use client'
import { useState } from 'react'
import { useFarm } from '../store'
import { Card, Pill, ScreenHeader } from '../../ui'
import { Sparkles, Mountain, TestTube } from 'lucide-react'

export function CropsScreen() {
  const { profile, activeCrop, setActiveCropId } = useFarm()
  const [recommendation, setRecommendation] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getAiRecommendation = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommend-crop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ph: profile.soil.ph,
          nitrogen: profile.soil.nitrogen === 'High' ? 3 : profile.soil.nitrogen === 'Medium' ? 2 : 1,
          phosphorus: profile.soil.phosphorus === 'High' ? 3 : 2,
          potassium: profile.soil.potassium === 'High' ? 3 : 1,
          elevation: profile.elevation
        })
      })
      const data = await res.json()
      setRecommendation(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pb-8">
      <ScreenHeader title="Crop planner" subtitle={`${profile.acres} acres`} />
      <div className="flex flex-col gap-4 px-5">
        <Card className="flex items-center gap-3 bg-secondary/60">
          <TestTube className="size-5 shrink-0 text-primary" />
          <p className="flex-1 text-sm">pH <strong>{profile.soil.ph}</strong></p>
          <Pill><Mountain className="size-3" /> {profile.elevation}m</Pill>
        </Card>

        <button onClick={getAiRecommendation} className="bg-primary text-primary-foreground py-3 rounded-2xl font-bold">
          {loading ? "Running Model..." : "Get AI Recommendation"}
        </button>

        {recommendation && (
          <Card className="border-primary p-4">
            <span className="flex items-center gap-2">
              <span className="font-semibold text-lg">{recommendation.recommended_crop}</span>
              <Pill tone="accent"><Sparkles className="size-3" /> Best Fit</Pill>
            </span>
            <ul className="mt-3 text-sm flex flex-col gap-1 text-muted-foreground">
              {recommendation.reasons.map((r: string, idx: number) => (
                <li key={idx}>✓ {r}</li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  )
}