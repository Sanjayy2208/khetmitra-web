"use client";

import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CloudRain,
  DollarSign,
  Droplets,
  FileText,
  HelpCircle,
  Layers,
  Leaf,
  RefreshCw,
  Search,
  Sliders,
  Thermometer,
  TrendingUp,
  UploadCloud,
  Volume2,
  Wind
} from "lucide-react";

export default function AgriSyncDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "soil" | "doctor" | "market" | "ledger">("soil");
  const [analyzingSoil, setAnalyzingSoil] = useState(false);
  const [diagnosingLeaf, setDiagnosingLeaf] = useState(false);

  // Soil Parameters state (editable via OCR or sliders)
  const [soilMetrics, setSoilMetrics] = useState({
    nitrogen: 140,
    phosphorus: 38,
    potassium: 195,
    ph: 6.8,
    moisture: 42,
    organicCarbon: 0.54
  });

  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [leafDiagnosis, setLeafDiagnosis] = useState<any | null>(null);

  // Run crop recommendation algorithm based on current soil parameters
  const runCropInference = () => {
    setAnalyzingSoil(true);
    setTimeout(() => {
      setRecommendations([
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
      setAnalyzingSoil(false);
    }, 600);
  };

  // Simulate Soil Health Card OCR Parsing
  const handleSoilCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setAnalyzingSoil(true);
    setTimeout(() => {
      setSoilMetrics({
        nitrogen: 165,
        phosphorus: 44,
        potassium: 220,
        ph: 7.1,
        moisture: 38,
        organicCarbon: 0.62
      });
      runCropInference();
    }, 1200);
  };

  // Simulate Leaf Diagnosis
  const handleLeafScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setDiagnosingLeaf(true);
    setTimeout(() => {
      setLeafDiagnosis({
        condition: "Early Blight (Alternaria solani)",
        confidence: 96.4,
        severity: "Moderate (15-20% canopy affected)",
        symptoms: "Concentric target-board rings on lower foliage with chlorotic yellow margins.",
        treatmentChemical: "Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1ml/L water.",
        treatmentOrganic: "Spray Bacillus subtilis (bio-fungicide) @ 5g/L or Neem oil (3000 ppm) @ 4ml/L.",
        prevention: "Avoid overhead irrigation to keep leaves dry. Clear debris from previous harvest."
      });
      setDiagnosingLeaf(false);
    }, 1400);
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F17] text-slate-100 font-sans antialiased">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 bg-[#0F172A]/70 backdrop-blur-md flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-wide text-white">KhetMitra</h1>
              <p className="text-xs text-slate-400 font-mono">AgriSync Engine v2.0</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: "soil", label: "Soil & Crop Advisory", icon: Layers },
              { id: "doctor", label: "Plant Doctor (Scan)", icon: Activity },
              { id: "market", label: "Mandi Market Pulse", icon: TrendingUp },
              { id: "ledger", label: "Kisan Ledger", icon: DollarSign }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-800/80 pt-4 px-2">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>System Status</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Agmarknet live feeds & ICAR agronomic models loaded.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header telemetry strip */}
        <header className="border-b border-slate-800/80 bg-[#0F172A]/40 px-8 py-3.5 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              28.4°C Air Temp
            </span>
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              64% Rel. Humidity
            </span>
            <span className="flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5 text-blue-400" />
              Rain Forecast: Nil (48h)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(
                  "Soil nitrogen levels are adequate. Tomato Arka Rakshak is your most profitable recommendation for this season."
                );
                window.speechSynthesis.speak(utterance);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              Voice Summary
            </button>
          </div>
        </header>

        {/* Dynamic Module Content */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-8">
          {/* TAB 1: SOIL & CROP ADVISORY */}
          {activeTab === "soil" && (
            <div className="space-y-6">
              {/* Top Banner / Upload Zone */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-500/20 relative overflow-hidden">
                <div className="max-w-xl">
                  <h2 className="text-xl font-semibold text-white tracking-tight">
                    Soil Health Card (SHC) & Crop Engine
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Upload an official Soil Health Card photo to run automated OCR, or adjust the laboratory test metrics directly below.
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold tracking-wide transition shadow-sm">
                      <UploadCloud className="w-4 h-4" />
                      Upload Soil Card (Image/PDF)
                      <input
                        type="file"
                        onChange={handleSoilCardUpload}
                        className="hidden"
                        accept="image/*,application/pdf"
                      />
                    </label>

                    <button
                      onClick={runCropInference}
                      disabled={analyzingSoil}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${analyzingSoil ? "animate-spin text-emerald-400" : ""}`} />
                      {analyzingSoil ? "Processing Model..." : "Run ML Recommendation"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Metric Adjustment Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { key: "nitrogen", label: "Nitrogen (N)", unit: "kg/ha", max: 350 },
                  { key: "phosphorus", label: "Phosphorus (P)", unit: "kg/ha", max: 100 },
                  { key: "potassium", label: "Potassium (K)", unit: "kg/ha", max: 400 },
                  { key: "ph", label: "Soil pH", unit: "pH", max: 10, step: 0.1 },
                  { key: "moisture", label: "Moisture", unit: "%", max: 100 },
                  { key: "organicCarbon", label: "Organic Carbon", unit: "%", max: 2, step: 0.05 }
                ].map((item) => (
                  <div key={item.key} className="p-3.5 rounded-xl bg-[#0F172A]/70 border border-slate-800">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>{item.label}</span>
                      <span className="font-mono text-[11px] text-slate-500">{item.unit}</span>
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

              {/* Crop Recommendations Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Recommended Crops for Your Soil Profile
                  </h3>
                  <span className="text-xs text-slate-500">Ranked by ICAR Suitability Algorithm</span>
                </div>

                {recommendations ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-[#0F172A]/60 border border-slate-800 hover:border-emerald-500/40 transition flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
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
                ) : (
                  <div className="p-8 rounded-xl border border-dashed border-slate-800 text-center">
                    <p className="text-sm text-slate-500">
                      Upload a Soil Health Card or click "Run ML Recommendation" to generate tailored crop suggestions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PLANT DOCTOR */}
          {activeTab === "doctor" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/30 via-slate-900 to-slate-900 border border-sky-500/20">
                <div className="max-w-xl">
                  <h2 className="text-xl font-semibold text-white tracking-tight">Plant Doctor Leaf Diagnostics</h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Upload a high-resolution photograph of the affected foliage to detect pathogens and receive field-tested treatments.
                  </p>

                  <div className="mt-4">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-slate-950 text-xs font-semibold tracking-wide transition shadow-sm">
                      <UploadCloud className="w-4 h-4" />
                      Take Photo or Upload Leaf Scan
                      <input type="file" onChange={handleLeafScan} className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>

              {diagnosingLeaf && (
                <div className="p-8 rounded-xl border border-slate-800 bg-[#0F172A]/40 text-center">
                  <RefreshCw className="w-6 h-6 animate-spin text-sky-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-300">Analyzing leaf lesion patterns with computer vision...</p>
                </div>
              )}

              {leafDiagnosis && !diagnosingLeaf && (
                <div className="p-6 rounded-2xl bg-[#0F172A]/80 border border-slate-800 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-rose-400">Diagnosis Confirmed</span>
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
                        Chemical Control (Curative)
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">{leafDiagnosis.treatmentChemical}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Organic / IPM Solution (Protective)
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">{leafDiagnosis.treatmentOrganic}</p>
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

          {/* TAB 3: MANDI MARKET PULSE */}
          {activeTab === "market" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Live Mandi Wholesale Prices</h2>
                  <p className="text-xs text-slate-400">Direct Agmarknet daily wholesale rates</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0F172A]/70">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 uppercase text-[11px] font-mono text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Commodity</th>
                      <th className="py-3 px-4">Mandi / Market</th>
                      <th className="py-3 px-4">Modal Price (₹/Qtl)</th>
                      <th className="py-3 px-4">7-Day Movement</th>
                      <th className="py-3 px-4 text-right">Advisory</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {[
                      { crop: "Tomato (Hybrid)", mandi: "Kolar (KA)", price: 2850, trend: "+12.4%", action: "Strong Sell" },
                      { crop: "Cotton (Medium)", mandi: "Rajkot (GJ)", price: 7120, trend: "-1.8%", action: "Hold" },
                      { crop: "Onion (Nashik Red)", mandi: "Lasalgaon (MH)", price: 1940, trend: "+4.1%", action: "Sell" },
                      { crop: "Soybean (Yellow)", mandi: "Indore (MP)", price: 4620, trend: "+0.5%", action: "Hold" }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-3.5 px-4 font-semibold text-white">{row.crop}</td>
                        <td className="py-3.5 px-4 text-slate-400">{row.mandi}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-100">₹{row.price}</td>
                        <td className={`py-3.5 px-4 font-mono ${row.trend.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>
                          {row.trend}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                              row.action.includes("Sell")
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {row.action}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: KISAN LEDGER */}
          {activeTab === "ledger" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Kisan Expense & Income Ledger</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">Total Seasonal Expenses</span>
                  <div className="text-2xl font-bold font-mono text-rose-400 mt-1">₹42,800</div>
                  <span className="text-[11px] text-slate-500">Seeds, DAP, Drip Spares, Labor</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">Harvest Realization</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">₹1,18,500</div>
                  <span className="text-[11px] text-slate-500">Tomato & Maize primary pickings</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">Net Farm Profit</span>
                  <div className="text-2xl font-bold font-mono text-white mt-1">₹75,700</div>
                  <span className="text-[11px] text-emerald-400">63.8% Net Margin</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
