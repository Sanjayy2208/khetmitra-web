'use client'
import { useState, useRef } from 'react'
import { Camera, Upload, AlertCircle } from 'lucide-react'
import { ScreenHeader, Card, Pill } from '../../ui'

export function ScanScreen() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [diagnosis, setDiagnosis] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)) }
  }

  const analyzeLeaf = async () => {
    if (!image) return
    setLoading(true)
    const formData = new FormData()
    formData.append("file", image)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diagnose`, { method: 'POST', body: formData })
      const data = await res.json()
      setDiagnosis(data)
    } catch (error) { console.error("Diagnosis failed", error) } finally { setLoading(false) }
  }

  return (
    <div className="pb-8">
      <ScreenHeader title="Leaf Diagnosis" subtitle="AI disease & toxicity scanner" />
      <div className="px-5 flex flex-col gap-4">
        {!preview ? (
          <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center gap-3 h-64 border-2 border-dashed border-primary/50 rounded-2xl bg-card">
            <Camera className="size-10 text-primary" />
            <span className="font-semibold text-primary">Take photo of affected leaf</span>
          </button>
        ) : (
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <img src={preview} alt="Leaf preview" className="w-full h-full object-cover" />
            <button onClick={() => setPreview(null)} className="absolute top-2 right-2 bg-background/80 p-2 rounded-full">Retake</button>
          </div>
        )}
        <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleCapture} className="hidden" />
        <button onClick={analyzeLeaf} disabled={!image || loading} className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? "Analyzing..." : <><Upload className="size-5" /> Analyze Leaf</>}
        </button>
        {diagnosis && (
          <Card className="mt-4 border-destructive bg-destructive/10">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-6 text-destructive shrink-0" />
              <div>
                <Pill tone="danger">{diagnosis.verdict}</Pill>
                <h3 className="text-xl font-bold mt-2">{diagnosis.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Confidence: {(diagnosis.confidence * 100).toFixed(1)}%</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}