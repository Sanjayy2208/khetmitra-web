"use client";

import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  CloudRain,
  Cpu,
  DollarSign,
  Droplets,
  FileCheck,
  FileText,
  Filter,
  Flame,
  Globe,
  HelpCircle,
  Layers,
  Leaf,
  Lightbulb,
  Maximize2,
  MoreVertical,
  Plus,
  Power,
  RefreshCw,
  Search,
  ShieldCheck,
  Sliders,
  Sparkles,
  Sprout,
  Sun,
  Thermometer,
  TrendingUp,
  UploadCloud,
  Volume2,
  Wind,
  Zap
} from "lucide-react";

export default function AgriSyncFullPlatform() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "soil" | "doctor" | "irrigation" | "devices" | "market" | "subsidies" | "ledger"
  >("overview");

  const [language, setLanguage] = useState<"en" | "hi" | "ta">("en");
  const [pumpStatus, setPumpStatus] = useState<boolean>(false);
  const [analyzingSoil, setAnalyzingSoil] = useState(false);
  const [diagnosingLeaf, setDiagnosingLeaf] = useState(false);

  // Editable Soil Metrics
  const [soilMetrics, setSoilMetrics] = useState({
    nitrogen: 145,
    phosphorus: 38,
    potassium: 195,
    ph: 6.8,
    moisture: 42,
    organicCarbon: 0.54,
    zinc: 0.8
  });

  const [recommendations, setRecommendations] = useState<any[]>([
    {
      crop: "Tomato (Arka Rakshak / Hybrid)",
      matchScore: 94,
      waterReq: "Moderate (Drip 4L/hr)",
      estYield: "35 - 40 MT/ha",
      suitability: "High N and balanced pH provide optimal vegetative and fruiting conditions.",
      marketTrend: "Rising (₹28 - ₹34/kg in local mandis)"
    },
    {
      crop: "Maize (Hybrid HQPM-1)",
      matchScore: 88,
      waterReq: "500 - 600 mm",
      estYield: "6.5 - 7.5 MT/ha",
      suitability: "Matches high nitrogen availability; excellent crop rotation benefit.",
      marketTrend: "Stable (MSP ₹2,225/Qtl)"
    },
    {
      crop: "Groundnut (TMV-7 / Kadiri-6)",
      matchScore: 79,
      waterReq: "Low to Moderate",
      estYield: "2.8 - 3.2 MT/ha",
      suitability: "Moderate potassium levels support kernel development with minimal nitrogen requirement.",
      marketTrend: "Strong (₹6,800/Qtl)"
    }
  ]);

  const [leafDiagnosis, setLeafDiagnosis] = useState<any>({
    condition: "Early Blight (Alternaria solani)",
    confidence: 96.4,
    severity: "Moderate (15-20% canopy affected)",
    symptoms: "Concentric target-board rings on lower foliage with chlorotic yellow margins.",
    treatmentChemical: "Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1ml/L water.",
    treatmentOrganic: "Spray Bacillus subtilis (bio-fungicide) @ 5g/L or Neem oil (3000 ppm) @ 4ml/L.",
    prevention: "Avoid overhead irrigation to keep leaves dry. Clear debris from previous harvest."
  });

  // Multilingual voice reader
  const handleVoiceAssistant = () => {
    let text = "Welcome to KhetMitra. Your soil nitrogen is optimal. Tomato is recommended this season.";
    if (language === "hi") {
      text = "खेतमित्र में आपका स्वागत है। आपके खेत में नाइट्रोजन का स्तर सही है। इस मौसम के लिए टमाटर सबसे उपयुक्त है।";
    } else if (language === "ta") {
      text = "கேத்மித்ராவிற்கு நல்வரவு. மண்ணில் தழைச்சத்து சீராக உள்ளது. இந்த பருவத்திற்கு தக்காளி சிறந்த பரிந்துரை.";
    }
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleSoilUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setAnalyzingSoil(true);
    setTimeout(() => {
      setSoilMetrics({
        nitrogen: 172,
        phosphorus: 46,
        potassium: 215,
        ph: 7.1,
        moisture: 39,
        organicCarbon: 0.65,
        zinc: 1.1
      });
      setAnalyzingSoil(false);
    }, 1200);
  };

  const handleLeafScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setDiagnosingLeaf(true);
    setTimeout(() => {
      setDiagnosingLeaf(false);
    }, 1300);
  };

  return (
    <div className="flex min-h-screen bg-[#080C14] text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-black">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800/80 bg-[#0D1322]/80 backdrop-blur-xl flex flex-col justify-between p-4 shrink-0">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-[1px] shadow-lg shadow-emerald-950/50">
              <div className="w-full h-full bg-[#080C14] rounded-[11px] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold tracking-tight text-white">KhetMitra</h1>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">AgriSync Engine v2.0</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: "overview", label: "Farm Overview", icon: Activity },
              { id: "soil", label: "Soil Card & Crops", icon: Layers },
              { id: "doctor", label: "Plant Doctor", icon: ShieldCheck },
              { id: "irrigation", label: "Smart Irrigation", icon: Droplets },
              { id: "devices", label: "IoT Sensors (ESP32)", icon: Cpu },
              { id: "market", label: "Mandi Pulse", icon: TrendingUp },
              { id: "subsidies", label: "Kisan Subsidies", icon: FileCheck },
              { id: "ledger", label: "Kisan Ledger", icon: DollarSign }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Language & Server Telemetry */}
        <div className="border-t border-slate-800/80 pt-4 px-2 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-500" /> Lang
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {(["en", "hi", "ta"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-1.5 py-0.5 rounded uppercase ${
                    language === l
                      ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>FastAPI Backend</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="border-b border-slate-800/80 bg-[#0D1322]/50 backdrop-blur-md px-8 py-3.5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              28.2°C Air Temp
            </span>
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              62% Humidity
            </span>
            <span className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-teal-400" />
              11 km/h Wind
            </span>
            <span className="flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5 text-blue-400" />
              Rain Forecast: 0mm (Next 48h)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleVoiceAssistant}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 transition"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Voice Summary
            </button>
          </div>
        </header>

        {/* Dynamic Views */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-8">
          {/* 1. OVERVIEW DASHBOARD */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Top Highlights Banner */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0D1322] border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Overall Soil Fertility</span>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-2">84 / 100</div>
                  <p className="text-[11px] text-slate-500 mt-1">Sufficient Nitrogen & Potassium</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D1322] border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Soil Moisture (Plot A)</span>
                    <Droplets className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-sky-400 mt-2">42%</div>
                  <p className="text-[11px] text-emerald-400 mt-1">Within optimal root zone target</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D1322] border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Pest / Disease Risk</span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-amber-400 mt-2">Low - Moderate</div>
                  <p className="text-[11px] text-slate-500 mt-1">Early Blight preventative check</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D1322] border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Estimated Net Profit</span>
                    <DollarSign className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white mt-2">₹75,700</div>
                  <p className="text-[11px] text-emerald-400 mt-1">Harvest cycle margin: +63.8%</p>
                </div>
              </div>

              {/* Recommended Top-Dressing Fertilizer Dosage */}
              <div className="p-6 rounded-2xl bg-[#0D1322] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide">
                      Automated Top-Dressing Fertilizer Calculation (Per Acre)
                    </h3>
                    <p className="text-xs text-slate-400">Based on ICAR soil testing formulas and current crop stage</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    Target Crop: Tomato
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Urea (46% N)</span>
                    <div className="text-xl font-bold font-mono text-slate-100 mt-1">32 kg / acre</div>
                    <p className="text-[11px] text-slate-500 mt-1">Split in 2 intervals at 20 & 45 DAT</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Di-Ammonium Phosphate (DAP)</span>
                    <div className="text-xl font-bold font-mono text-slate-100 mt-1">50 kg / acre</div>
                    <p className="text-[11px] text-slate-500 mt-1">Basal dressing during bed preparation</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Muriate of Potash (MOP)</span>
                    <div className="text-xl font-bold font-mono text-slate-100 mt-1">25 kg / acre</div>
                    <p className="text-[11px] text-slate-500 mt-1">Apply at flower initiation stage</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. SOIL HEALTH CARD & CROP ADVISORY */}
          {activeTab === "soil" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 relative overflow-hidden">
                <div className="max-w-xl">
                  <h2 className="text-xl font-bold text-white tracking-tight">Soil Health Card OCR & Crop Engine</h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Upload an official Soil Health Card (SHC) image to extract nutrients via OCR, or adjust values manually below to run the ML recommendation model.
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold tracking-wide transition shadow-sm">
                      <UploadCloud className="w-4 h-4" />
                      {analyzingSoil ? "Parsing Document..." : "Upload Soil Card"}
                      <input type="file" onChange={handleSoilUpload} className="hidden" accept="image/*,application/pdf" />
                    </label>

                    <button
                      onClick={() => {
                        setAnalyzingSoil(true);
                        setTimeout(() => setAnalyzingSoil(false), 600);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${analyzingSoil ? "animate-spin text-emerald-400" : ""}`} />
                      Recalculate Model
                    </button>
                  </div>
                </div>
              </div>

              {/* Editable Sliders Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { key: "nitrogen", label: "Nitrogen (N)", unit: "kg/ha", max: 350 },
                  { key: "phosphorus", label: "Phosphorus (P)", unit: "kg/ha", max: 100 },
                  { key: "potassium", label: "Potassium (K)", unit: "kg/ha", max: 400 },
                  { key: "ph", label: "Soil pH", unit: "pH", max: 10, step: 0.1 },
                  { key: "moisture", label: "Moisture", unit: "%", max: 100 },
                  { key: "organicCarbon", label: "Org. Carbon", unit: "%", max: 2, step: 0.05 },
                  { key: "zinc", label: "Zinc (Zn)", unit: "ppm", max: 5, step: 0.1 }
                ].map((item) => (
                  <div key={item.key} className="p-3.5 rounded-xl bg-[#0D1322] border border-slate-800/80">
                    <div className="flex justify-between items-center text-[11px] text-slate-400">
                      <span>{item.label}</span>
                      <span className="font-mono text-slate-500">{item.unit}</span>
                    </div>
                    <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                      {(soilMetrics as any)[item.key]}
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={item.max}
                      step={item.step || 1}
                      value={(soilMetrics as any)[item.key]}
                      onChange={(e) =>
                        setSoilMetrics({
                          ...soilMetrics,
                          [item.key]: parseFloat(e.target.value) || 0
                        })
                      }
                      className="w-full mt-2 h-1 bg-slate-800 accent-emerald-500 rounded-lg cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              {/* Crop Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#0D1322] border border-slate-800/80 hover:border-emerald-500/40 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                          {rec.matchScore}% Match
                        </span>
                        <span className="text-xs text-slate-400">{rec.waterReq}</span>
                      </div>
                      <h4 className="text-base font-semibold text-white mt-3">{rec.crop}</h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{rec.suitability}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs">
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Projected Yield:</span>
                        <span className="text-slate-200 font-medium">{rec.estYield}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Market Realization:</span>
                        <span className="text-emerald-400 font-medium">{rec.marketTrend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. PLANT DOCTOR */}
          {activeTab === "doctor" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border border-sky-500/20">
                <div className="max-w-xl">
                  <h2 className="text-xl font-bold text-white tracking-tight">Plant Doctor Leaf Diagnostics</h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Upload an image of a diseased crop leaf. The model classifies foliar lesions and outputs exact chemical active ingredients and organic remedies.
                  </p>

                  <div className="mt-4">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 text-xs font-semibold tracking-wide transition shadow-sm">
                      <UploadCloud className="w-4 h-4" />
                      Take Photo or Upload Leaf Scan
                      <input type="file" onChange={handleLeafScan} className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>

              {diagnosingLeaf ? (
                <div className="p-8 rounded-2xl border border-slate-800 bg-[#0D1322] text-center">
                  <RefreshCw className="w-6 h-6 animate-spin text-sky-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-300">Scanning leaf contours and fungal lesions...</p>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#0D1322] border border-slate-800/80 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400">
                        Pathogen Detected
                      </span>
                      <h3 className="text-xl font-bold text-white mt-0.5">{leafDiagnosis.condition}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                        {leafDiagnosis.confidence}% Confidence
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                        {leafDiagnosis.severity}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80">
                      <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        Chemical Fungicide (Curative)
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{leafDiagnosis.treatmentChemical}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Organic / IPM Bio-Shield
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{leafDiagnosis.treatmentOrganic}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-400">
                    <strong className="text-slate-300 font-semibold block mb-1">Preventive Farm Management:</strong>
                    {leafDiagnosis.prevention}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. SMART IRRIGATION */}
          {activeTab === "irrigation" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Smart Drip Irrigation Controls</h2>
                  <p className="text-xs text-slate-400">Automated solenoid valve triggers based on field moisture</p>
                </div>

                <button
                  onClick={() => setPumpStatus(!pumpStatus)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    pumpStatus
                      ? "bg-rose-500 hover:bg-rose-600 text-white"
                      : "bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                  }`}
                >
                  <Power className="w-4 h-4" />
                  {pumpStatus ? "STOP MOTOR PUMP" : "START MOTOR PUMP"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#0D1322] border border-slate-800">
                  <span className="text-xs text-slate-400">Zone 1 (Tomatoes - North)</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-2">42% Moisture</div>
                  <div className="mt-3 text-xs text-slate-500 flex justify-between">
                    <span>Target: 40-50%</span>
                    <span className="text-emerald-400">Status: Stable</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D1322] border border-slate-800">
                  <span className="text-xs text-slate-400">Zone 2 (Maize - South)</span>
                  <div className="text-2xl font-bold font-mono text-amber-400 mt-2">31% Moisture</div>
                  <div className="mt-3 text-xs text-slate-500 flex justify-between">
                    <span>Target: 35-45%</span>
                    <span className="text-amber-400">Irrigation scheduled in 2h</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D1322] border border-slate-800">
                  <span className="text-xs text-slate-400">Water Storage Tank</span>
                  <div className="text-2xl font-bold font-mono text-sky-400 mt-2">78% Full</div>
                  <div className="mt-3 text-xs text-slate-500 flex justify-between">
                    <span>Capacity: 5,000 L</span>
                    <span className="text-sky-400">Borewell ready</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. IOT DEVICES (ESP32) */}
          {activeTab === "devices" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Field Sensor Nodes (ESP32 & LoRa)</h2>
                  <p className="text-xs text-slate-400">Microcontroller telemetry reporting every 60 seconds</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#0D1322] border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-emerald-400" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">ESP32 Soil Node - Field #1</h4>
                        <span className="text-[11px] font-mono text-slate-500">MAC: 24:6F:28:B1:0C:44</span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      ONLINE
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">Battery</span>
                      <span className="text-slate-200 font-mono font-bold">3.92V (91%)</span>
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">LDR Light</span>
                      <span className="text-slate-200 font-mono font-bold">420 Lux</span>
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">RSSI Signal</span>
                      <span className="text-slate-200 font-mono font-bold">-68 dBm</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D1322] border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-sky-400" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">ESP32 Polyhouse Weather Node</h4>
                        <span className="text-[11px] font-mono text-slate-500">MAC: 40:22:D8:E5:19:90</span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      ONLINE
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">Temp (DHT22)</span>
                      <span className="text-slate-200 font-mono font-bold">29.1°C</span>
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">Relay State</span>
                      <span className="text-emerald-400 font-mono font-bold">Auto-Closed</span>
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">RSSI Signal</span>
                      <span className="text-slate-200 font-mono font-bold">-62 dBm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. MANDI PULSE */}
          {activeTab === "market
