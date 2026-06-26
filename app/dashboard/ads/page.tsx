"use client";

import { useState } from "react";
import {
  BarChart3, TrendingUp, TrendingDown, DollarSign, Users, MousePointerClick,
  Eye, Plus, Play, Pause, Settings2, ExternalLink, AlertCircle, CheckCircle,
  RefreshCw, Sparkles, ChevronRight, ChevronLeft, Copy, Zap, Target,
  MessageCircle, Search, Megaphone, Globe, Smartphone, Star,
  ArrowRight, Info, Clock, Award
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from "recharts";

// ─── TYPES ─────────────────────────────────────────────────────────────────────
type AdCopy = {
  headlines: string[];
  descriptions: string[];
  ctas: string[];
  hashtags: string[];
  audience_suggestion: string;
  budget_suggestion: string;
  tip: string;
};

type Campaign = {
  id: number;
  name: string;
  platform: string;
  status: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  cpl: number;
  roas: number;
  trend: string;
  creative: string;
  objective: string;
  type?: string;
};

// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
const PLATFORMS_LIST = [
  { id: "facebook", label: "Facebook", icon: "👤", color: "#1877F2", desc: "Largest SA audience. Best for lead gen & retargeting." },
  { id: "instagram", label: "Instagram", icon: "📸", color: "#E1306C", desc: "Visual content. Beauty, food, lifestyle brands thrive." },
  { id: "whatsapp", label: "Click-to-WhatsApp", icon: "💬", color: "#25D366", desc: "SA's #1 channel. 96% of SA internet users on WhatsApp.", popular: true },
  { id: "tiktok", label: "TikTok", icon: "🎵", color: "#FE2C55", desc: "R0.004/view. Fastest growing in SA. Use Spark Ads." },
  { id: "google", label: "Google Search", icon: "🔍", color: "#4285F4", desc: "Capture high-intent searches. Performance Max campaigns." },
];

const INDUSTRIES = [
  { id: "beauty", label: "Beauty & Wellness", icon: "💅", color: "#EC4899" },
  { id: "health", label: "Health & Medical", icon: "🏥", color: "#10B981" },
  { id: "food", label: "Food & Restaurant", icon: "🍽️", color: "#F59E0B" },
  { id: "trades", label: "Trades & Services", icon: "🔧", color: "#6366F1" },
  { id: "education", label: "Education & Training", icon: "📚", color: "#8B5CF6" },
  { id: "retail", label: "Retail & eCommerce", icon: "🛍️", color: "#F97316" },
  { id: "realestate", label: "Real Estate", icon: "🏠", color: "#0D7A4E" },
  { id: "finance", label: "Finance & Insurance", icon: "💼", color: "#0EA5E9" },
];

const OBJECTIVES = [
  { id: "leads", label: "Generate Leads", icon: Users, desc: "Collect contact details from interested people" },
  { id: "whatsapp_leads", label: "WhatsApp Leads", icon: MessageCircle, desc: "Start conversations via Click-to-WhatsApp" },
  { id: "bookings", label: "Drive Bookings", icon: Clock, desc: "Get people to book appointments or events" },
  { id: "awareness", label: "Brand Awareness", icon: Eye, desc: "Reach more people in your target area" },
  { id: "traffic", label: "Website Traffic", icon: Globe, desc: "Send people to your website or landing page" },
  { id: "sales", label: "Direct Sales", icon: DollarSign, desc: "Drive online purchases or orders" },
];

const CAMPAIGNS: Campaign[] = [
  { id: 1, name: "Free Consult — Cape Town", platform: "whatsapp", status: "active", budget: 5000, spend: 3240, impressions: 48200, clicks: 1926, leads: 89, cpl: 36, roas: 4.2, trend: "up", creative: "Video", objective: "WhatsApp Leads", type: "ctwa" },
  { id: 2, name: "Before/After Results", platform: "instagram", status: "active", budget: 3000, spend: 2100, impressions: 31400, clicks: 942, leads: 54, cpl: 39, roas: 3.8, trend: "up", creative: "Carousel", objective: "Leads" },
  { id: 3, name: "Retarget — Website Visitors", platform: "facebook", status: "active", budget: 2000, spend: 1680, impressions: 12800, clicks: 640, leads: 41, cpl: 41, roas: 3.1, trend: "down", creative: "Image", objective: "Leads" },
  { id: 4, name: "Whitening Special TikTok", platform: "tiktok", status: "active", budget: 1500, spend: 620, impressions: 155000, clicks: 3100, leads: 28, cpl: 22, roas: 5.1, trend: "up", creative: "Spark Ad", objective: "Leads" },
  { id: 5, name: "Google — Dental Cape Town", platform: "google", status: "active", budget: 4000, spend: 3100, impressions: 8900, clicks: 534, leads: 67, cpl: 46, roas: 3.3, trend: "up", creative: "Search", objective: "Leads" },
];

const CHART_DATA = [
  { day: "Mon", leads: 18, spend: 820, revenue: 6400 },
  { day: "Tue", leads: 24, spend: 940, revenue: 8200 },
  { day: "Wed", leads: 31, spend: 1100, revenue: 11800 },
  { day: "Thu", leads: 22, spend: 890, revenue: 7600 },
  { day: "Fri", leads: 38, spend: 1250, revenue: 14200 },
  { day: "Sat", leads: 29, spend: 980, revenue: 10400 },
  { day: "Sun", leads: 14, spend: 710, revenue: 4800 },
];

const ATTRIBUTION_DATA = [
  { name: "WhatsApp Ads", leads: 89, revenue: 38200, spend: 3240, color: "#25D366" },
  { name: "Instagram", leads: 54, revenue: 22400, spend: 2100, color: "#E1306C" },
  { name: "Google Search", leads: 67, revenue: 28600, spend: 3100, color: "#4285F4" },
  { name: "TikTok", leads: 28, revenue: 10800, spend: 620, color: "#FE2C55" },
  { name: "Facebook", leads: 41, revenue: 16800, spend: 1680, color: "#1877F2" },
];

const AI_SUGGESTIONS = [
  {
    id: 1, confidence: 94, platform: "whatsapp", icon: "💬", color: "#25D366",
    title: "Click-to-WhatsApp Lead Campaign",
    desc: "Your consultation leads convert at 34% — 2x the SA average. A CTWA campaign targeting Cape Town women 25-45 interested in wellness could generate 60+ leads/month at ~R28 CPL.",
    estimatedLeads: "55-70", estimatedCPL: "R25-35", budget: "R2,500/mo",
  },
  {
    id: 2, confidence: 87, platform: "tiktok", icon: "🎵", color: "#FE2C55",
    title: "TikTok Spark Ad — Boost Your Best Post",
    desc: "Your @capetowndental before/after reel has 4.2K organic views. Boosting it as a Spark Ad could reach 500K+ Capetonians at R0.004/view — your cheapest cost-per-view of any channel.",
    estimatedLeads: "30-45", estimatedCPL: "R18-24", budget: "R800/mo",
  },
  {
    id: 3, confidence: 79, platform: "facebook", icon: "👤", color: "#1877F2",
    title: "Retarget Your WhatsApp Leads",
    desc: "148 leads haven't booked yet. A Facebook retargeting campaign showing a limited-time offer to these warm contacts typically closes 20-30% who were on the fence.",
    estimatedLeads: "30-44", estimatedCPL: "R15-22", budget: "R1,200/mo",
  },
];

// ─── WIZARD COMPONENT ───────────────────────────────────────────────────────────
function AdCreatorWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedObjective, setSelectedObjective] = useState("");
  const [language, setLanguage] = useState("english");
  const [offer, setOffer] = useState("");
  const [budget, setBudget] = useState("50");
  const [generatedAd, setGeneratedAd] = useState<AdCopy | null>(null);
  const [generating, setGenerating] = useState(false);
  const [selectedHeadline, setSelectedHeadline] = useState(0);
  const [selectedDesc, setSelectedDesc] = useState(0);
  const [selectedCta, setSelectedCta] = useState(0);
  const [location, setLocation] = useState("Cape Town, Western Cape");
  const [ageMin, setAgeMin] = useState("25");
  const [ageMax, setAgeMax] = useState("45");

  const industry = INDUSTRIES.find((i) => i.id === selectedIndustry);
  const platform = PLATFORMS_LIST.find((p) => p.id === selectedPlatform);

  const generateCopy = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: industry?.label,
          objective: selectedObjective,
          platform: platform?.label,
          businessName: "Cape Town Dental Studio",
          offer,
          language,
        }),
      });
      const data = await res.json();
      if (data.ad) setGeneratedAd(data.ad);
    } catch {
      // fallback mock
      setGeneratedAd({
        headlines: [
          "Your Perfect Smile Starts Here",
          "Affordable Dental Care in Cape Town",
          "Book Your Free Consultation Today",
          "Transform Your Smile This Week",
          "Trusted by 2,400+ Cape Town Locals",
        ],
        descriptions: [
          "Get the smile you've always wanted — without breaking the bank. Our Cape Town team offers world-class dental care at prices that make sense. Book online in 60 seconds.",
          "Tired of hiding your smile? We help Cape Town families get the dental care they deserve. Flexible payment plans, warm team, and results that last.",
          "From whitening to full smile makeovers — we've helped 2,400+ people in Cape Town love their smile. Your free consultation is waiting.",
        ],
        ctas: ["Book Free Consult", "Chat on WhatsApp", "See Our Work"],
        hashtags: ["#CapeTownDentist", "#SmileMakeover", "#AffordableDental", "#CapeTownHealth", "#DentalCT"],
        audience_suggestion: "Women + men aged 25-45 in Cape Town, Stellenbosch, Paarl. Interests: beauty, wellness, health, personal care.",
        budget_suggestion: "R50-150/day recommended. At R80/day you can expect 2-4 WhatsApp leads daily based on current SA benchmarks.",
        tip: "In SA, Click-to-WhatsApp ads outperform landing page ads by 3x for service businesses. Set up a 30-second welcome template to reply instantly.",
      });
    } finally {
      setGenerating(false);
    }
  };

  const steps = [
    { n: 1, label: "Platform" },
    { n: 2, label: "Industry" },
    { n: 3, label: "Objective" },
    { n: 4, label: "AI Copywriter" },
    { n: 5, label: "Audience" },
    { n: 6, label: "Budget" },
    { n: 7, label: "Review" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0D7A4E] flex items-center justify-center">
                <Sparkles size={15} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-[#1E293B] text-base">AI Ad Creator</h2>
                <p className="text-[11px] text-[#94A3B8]">Powered by Claude — built for SA businesses</p>
              </div>
            </div>
            <button onClick={onClose} className="text-[#94A3B8] hover:text-[#1E293B] text-lg font-bold px-2">✕</button>
          </div>
          {/* Progress */}
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1">
                <div className={`flex items-center gap-1.5 ${s.n === step ? "text-[#0D7A4E]" : s.n < step ? "text-[#10B981]" : "text-[#CBD5E1]"}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${s.n === step ? "bg-[#0D7A4E] text-white" : s.n < step ? "bg-[#10B981] text-white" : "bg-[#F1F5F9] text-[#CBD5E1]"}`}>
                    {s.n < step ? "✓" : s.n}
                  </div>
                  <span className="text-[10px] font-medium hidden sm:block">{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-px mx-1 ${s.n < step ? "bg-[#10B981]" : "bg-[#E2E8F0]"}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* Step 1: Platform */}
          {step === 1 && (
            <div>
              <h3 className="font-bold text-[#1E293B] mb-1">Where do you want to advertise?</h3>
              <p className="text-sm text-[#64748B] mb-5">Pick the platform where your customers spend time.</p>
              <div className="space-y-3">
                {PLATFORMS_LIST.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${selectedPlatform === p.id ? "border-[#0D7A4E] bg-[#E8F5EE]" : "border-[#E2E8F0] hover:border-[#CBD5E1]"}`}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1E293B] text-sm">{p.label}</span>
                        {p.popular && <span className="text-[9px] font-bold bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full">#1 IN SA</span>}
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5">{p.desc}</p>
                    </div>
                    {selectedPlatform === p.id && <CheckCircle size={18} className="text-[#0D7A4E] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Industry */}
          {step === 2 && (
            <div>
              <h3 className="font-bold text-[#1E293B] mb-1">What industry are you in?</h3>
              <p className="text-sm text-[#64748B] mb-5">This helps Claude write copy that resonates with your specific customers.</p>
              <div className="grid grid-cols-2 gap-3">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedIndustry(ind.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${selectedIndustry === ind.id ? "border-[#0D7A4E] bg-[#E8F5EE]" : "border-[#E2E8F0] hover:border-[#CBD5E1]"}`}
                  >
                    <span className="text-2xl">{ind.icon}</span>
                    <span className="font-semibold text-[#1E293B] text-sm">{ind.label}</span>
                    {selectedIndustry === ind.id && <CheckCircle size={15} className="text-[#0D7A4E] ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Objective */}
          {step === 3 && (
            <div>
              <h3 className="font-bold text-[#1E293B] mb-1">What&apos;s your goal?</h3>
              <p className="text-sm text-[#64748B] mb-5">Choose one objective — each requires different ad setup and copy.</p>
              <div className="space-y-2">
                {OBJECTIVES.map((obj) => (
                  <button
                    key={obj.id}
                    onClick={() => setSelectedObjective(obj.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${selectedObjective === obj.id ? "border-[#0D7A4E] bg-[#E8F5EE]" : "border-[#E2E8F0] hover:border-[#CBD5E1]"}`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${selectedObjective === obj.id ? "bg-[#0D7A4E]" : "bg-[#F1F5F9]"}`}>
                      <obj.icon size={17} className={selectedObjective === obj.id ? "text-white" : "text-[#64748B]"} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#1E293B] text-sm">{obj.label}</div>
                      <div className="text-xs text-[#94A3B8]">{obj.desc}</div>
                    </div>
                    {selectedObjective === obj.id && <CheckCircle size={16} className="text-[#0D7A4E] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: AI Copywriter */}
          {step === 4 && (
            <div>
              <h3 className="font-bold text-[#1E293B] mb-1">AI Copywriter</h3>
              <p className="text-sm text-[#64748B] mb-4">Tell Claude what you&apos;re offering and it will write your ad copy in seconds.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#475569] mb-1.5 block">Your offer or service</label>
                  <input
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder="e.g. Free dental consultation, 20% off whitening, Family cleaning package..."
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475569] mb-1.5 block">Language</label>
                  <div className="flex gap-2">
                    {[
                      { id: "english", label: "English" },
                      { id: "afrikaans", label: "Afrikaans" },
                      { id: "zulu", label: "isiZulu" },
                      { id: "xhosa", label: "isiXhosa" },
                    ].map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setLanguage(l.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${language === l.id ? "border-[#0D7A4E] bg-[#E8F5EE] text-[#0D7A4E]" : "border-[#E2E8F0] text-[#64748B]"}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                {!generatedAd ? (
                  <button
                    onClick={generateCopy}
                    disabled={generating || !offer.trim()}
                    className="w-full py-4 bg-[#0D7A4E] text-white rounded-2xl font-bold text-sm hover:bg-[#065A38] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {generating ? (
                      <><RefreshCw size={16} className="animate-spin" /> Claude is writing your ads...</>
                    ) : (
                      <><Sparkles size={16} /> Generate Ad Copy</>
                    )}
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* Headlines */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-[#475569]">Headlines — pick one</label>
                        <button onClick={generateCopy} className="text-xs text-[#0D7A4E] font-semibold flex items-center gap-1 hover:underline">
                          <RefreshCw size={10} /> Regenerate
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {generatedAd.headlines.map((h, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedHeadline(i)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm transition-all ${selectedHeadline === i ? "border-[#0D7A4E] bg-[#E8F5EE] font-semibold text-[#065A38]" : "border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]"}`}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div>
                      <label className="text-xs font-bold text-[#475569] mb-2 block">Ad Body Copy — pick one</label>
                      <div className="space-y-1.5">
                        {generatedAd.descriptions.map((d, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedDesc(i)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs leading-relaxed transition-all ${selectedDesc === i ? "border-[#0D7A4E] bg-[#E8F5EE] text-[#065A38]" : "border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]"}`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div>
                      <label className="text-xs font-bold text-[#475569] mb-2 block">Call to Action</label>
                      <div className="flex gap-2 flex-wrap">
                        {generatedAd.ctas.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedCta(i)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${selectedCta === i ? "border-[#0D7A4E] bg-[#0D7A4E] text-white" : "border-[#E2E8F0] text-[#475569]"}`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Hashtags */}
                    <div>
                      <label className="text-xs font-bold text-[#475569] mb-2 block">Suggested Hashtags</label>
                      <div className="flex gap-1.5 flex-wrap">
                        {generatedAd.hashtags.map((h) => (
                          <span key={h} className="text-xs text-[#0D7A4E] bg-[#E8F5EE] px-2 py-1 rounded-lg font-medium">{h}</span>
                        ))}
                      </div>
                    </div>

                    {/* AI tip */}
                    {generatedAd.tip && (
                      <div className="flex items-start gap-2 p-3 bg-[#FEF3C7] rounded-xl border border-[#FDE68A]">
                        <Info size={13} className="text-[#92400E] mt-0.5 shrink-0" />
                        <p className="text-xs text-[#92400E]"><strong>Claude tip:</strong> {generatedAd.tip}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Audience */}
          {step === 5 && (
            <div>
              <h3 className="font-bold text-[#1E293B] mb-1">Target Audience</h3>
              <p className="text-sm text-[#64748B] mb-5">Define who should see your ad.</p>

              {generatedAd?.audience_suggestion && (
                <div className="mb-4 p-3 bg-[#E8F5EE] rounded-xl border border-[#A7D7BF] flex items-start gap-2">
                  <Sparkles size={13} className="text-[#0D7A4E] mt-0.5 shrink-0" />
                  <p className="text-xs text-[#065A38]"><strong>Claude suggests:</strong> {generatedAd.audience_suggestion}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#475569] mb-1.5 block">Location</label>
                  <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#475569] mb-1.5 block">Age Min</label>
                    <select value={ageMin} onChange={(e) => setAgeMin(e.target.value)} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]">
                      {[18, 21, 25, 30, 35, 40, 45, 50].map((a) => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#475569] mb-1.5 block">Age Max</label>
                    <select value={ageMax} onChange={(e) => setAgeMax(e.target.value)} className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]">
                      {[25, 30, 35, 40, 45, 50, 55, 65].map((a) => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475569] mb-2 block">Gender</label>
                  <div className="flex gap-2">
                    {["All", "Women", "Men"].map((g) => (
                      <button key={g} className="px-4 py-2 rounded-xl text-xs font-semibold border-2 border-[#0D7A4E] bg-[#E8F5EE] text-[#0D7A4E]">{g}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475569] mb-2 block">Interests (separate with commas)</label>
                  <input defaultValue="beauty, wellness, health, personal care" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]" />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Budget */}
          {step === 6 && (
            <div>
              <h3 className="font-bold text-[#1E293B] mb-1">Budget</h3>
              <p className="text-sm text-[#64748B] mb-5">Set your daily spend. You can pause or adjust at any time.</p>

              {generatedAd?.budget_suggestion && (
                <div className="mb-4 p-3 bg-[#E8F5EE] rounded-xl border border-[#A7D7BF] flex items-start gap-2">
                  <Sparkles size={13} className="text-[#0D7A4E] mt-0.5 shrink-0" />
                  <p className="text-xs text-[#065A38]"><strong>Claude recommends:</strong> {generatedAd.budget_suggestion}</p>
                </div>
              )}

              <div className="space-y-4">
                {/* Quick presets */}
                <div>
                  <label className="text-xs font-bold text-[#475569] mb-2 block">Quick budgets</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { amount: "25", label: "Starter", desc: "~2 leads/day" },
                      { amount: "50", label: "Growth", desc: "~4 leads/day" },
                      { amount: "100", label: "Scale", desc: "~8 leads/day" },
                      { amount: "200", label: "Dominate", desc: "~16 leads/day" },
                    ].map((b) => (
                      <button
                        key={b.amount}
                        onClick={() => setBudget(b.amount)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${budget === b.amount ? "border-[#0D7A4E] bg-[#E8F5EE]" : "border-[#E2E8F0]"}`}
                      >
                        <div className="font-bold text-[#1E293B] text-sm">R{b.amount}/day</div>
                        <div className="text-[10px] text-[#94A3B8]">{b.label}</div>
                        <div className="text-[10px] text-[#0D7A4E] font-medium">{b.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475569] mb-1.5 block">Custom daily budget (ZAR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#94A3B8]">R</span>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
                    />
                  </div>
                </div>

                {/* Projections */}
                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                  <p className="text-xs font-bold text-[#475569] mb-3">Monthly projections at R{budget}/day</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Est. Monthly Spend", value: `R${(Number(budget) * 30).toLocaleString()}` },
                      { label: "Est. Leads", value: `${Math.round((Number(budget) / 35) * 30)}` },
                      { label: "Est. Revenue", value: `R${Math.round((Number(budget) / 35) * 30 * 420).toLocaleString()}` },
                    ].map((p) => (
                      <div key={p.label} className="text-center">
                        <div className="text-lg font-bold text-[#1E293B]">{p.value}</div>
                        <div className="text-[10px] text-[#94A3B8]">{p.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#94A3B8] mt-2 text-center">Based on your average CPL of R35 and deal value of R420</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Review */}
          {step === 7 && (
            <div className="space-y-4">
              <h3 className="font-bold text-[#1E293B] mb-1">Review Your Ad</h3>
              <p className="text-sm text-[#64748B] mb-4">Everything looks good? Click Launch to activate your campaign.</p>

              {/* Ad preview */}
              <div className="border-2 border-[#E2E8F0] rounded-2xl overflow-hidden">
                <div className="bg-[#F8FAFC] px-4 py-2 flex items-center gap-2 border-b border-[#E2E8F0]">
                  <span className="text-sm">{platform?.icon}</span>
                  <span className="text-xs font-semibold text-[#475569]">{platform?.label} Ad Preview</span>
                  <span className="ml-auto text-[10px] text-[#94A3B8]">Sponsored</span>
                </div>
                <div className="p-4">
                  <div className="bg-[#E2E8F0] rounded-xl h-32 flex items-center justify-center mb-3">
                    <span className="text-[#94A3B8] text-xs">Your image / video here</span>
                  </div>
                  <div className="font-bold text-[#1E293B]">{generatedAd?.headlines[selectedHeadline] ?? "Your headline"}</div>
                  <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{generatedAd?.descriptions[selectedDesc] ?? "Your description"}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-[#94A3B8]">capetowndentalstudio.co.za</span>
                    <button className="px-3 py-1.5 bg-[#0D7A4E] text-white rounded-lg text-xs font-bold">
                      {generatedAd?.ctas[selectedCta] ?? "Learn More"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Platform", value: platform?.label ?? "—" },
                  { label: "Objective", value: OBJECTIVES.find((o) => o.id === selectedObjective)?.label ?? "—" },
                  { label: "Daily Budget", value: `R${budget}` },
                  { label: "Monthly Budget", value: `R${(Number(budget) * 30).toLocaleString()}` },
                  { label: "Location", value: location },
                  { label: "Language", value: language.charAt(0).toUpperCase() + language.slice(1) },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between p-3 bg-[#F8FAFC] rounded-xl text-xs">
                    <span className="text-[#64748B]">{s.label}</span>
                    <span className="font-bold text-[#1E293B]">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-between">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#F1F5F9] text-[#475569] rounded-xl text-sm font-semibold hover:bg-[#E2E8F0] transition-colors"
          >
            <ChevronLeft size={15} /> {step === 1 ? "Cancel" : "Back"}
          </button>

          {step < 7 ? (
            <button
              onClick={() => { if (step === 3 && !generatedAd) setStep(4); else setStep(step + 1); }}
              disabled={
                (step === 1 && !selectedPlatform) ||
                (step === 2 && !selectedIndustry) ||
                (step === 3 && !selectedObjective)
              }
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors disabled:opacity-40"
            >
              Continue <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-[#0D7A4E] text-white rounded-xl text-sm font-bold hover:bg-[#065A38] transition-colors"
            >
              <Zap size={15} /> Launch Campaign
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────────
export default function AdsPage() {
  const [tab, setTab] = useState<"overview" | "campaigns" | "attribution" | "sales" | "setup">("overview");
  const [showWizard, setShowWizard] = useState(false);
  const [platform, setPlatform] = useState("all");

  const filtered = CAMPAIGNS.filter((c) => platform === "all" || c.platform === platform);
  const totals = {
    spend: filtered.reduce((a, c) => a + c.spend, 0),
    leads: filtered.reduce((a, c) => a + c.leads, 0),
    revenue: ATTRIBUTION_DATA.reduce((a, c) => a + c.revenue, 0),
    roas: (ATTRIBUTION_DATA.reduce((a, c) => a + c.revenue, 0) / ATTRIBUTION_DATA.reduce((a, c) => a + c.spend, 0)).toFixed(1),
    avgCpl: Math.round(filtered.reduce((a, c) => a + c.spend, 0) / Math.max(1, filtered.reduce((a, c) => a + c.leads, 0))),
  };

  const SALES_DATA = [
    { month: "Feb", adLeads: 89, closed: 19, revenue: 38200, cac: 171 },
    { month: "Mar", adLeads: 112, closed: 26, revenue: 49800, cac: 164 },
    { month: "Apr", adLeads: 134, closed: 33, revenue: 62400, cac: 157 },
    { month: "May", adLeads: 148, closed: 38, revenue: 71600, cac: 152 },
    { month: "Jun", adLeads: 167, closed: 44, revenue: 84200, cac: 148 },
  ];

  return (
    <>
      {showWizard && <AdCreatorWizard onClose={() => setShowWizard(false)} />}

      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 border-b border-[#E2E8F0] flex-1">
            {(["overview", "campaigns", "attribution", "sales", "setup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm font-semibold capitalize transition-colors border-b-2 shrink-0 ${tab === t ? "border-[#0D7A4E] text-[#0D7A4E]" : "border-transparent text-[#64748B] hover:text-[#1E293B]"}`}
              >
                {t === "attribution" ? "Attribution" : t === "setup" ? "Pixel Setup" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-4">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E2E8F0] text-[#475569] rounded-xl text-sm font-semibold hover:bg-[#F8FAFC] transition-colors">
              <RefreshCw size={13} /> Sync
            </button>
            <button
              onClick={() => setShowWizard(true)}
              className="flex items-center gap-2 bg-[#0D7A4E] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors"
            >
              <Sparkles size={14} /> Create Ad with AI
            </button>
          </div>
        </div>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="space-y-5">
            {/* KPIs */}
            <div className="grid grid-cols-5 gap-3">
              {[
                { label: "Total Spend", value: `R${totals.spend.toLocaleString()}`, icon: DollarSign, color: "#EF4444", sub: "This month" },
                { label: "Total Leads", value: totals.leads.toString(), icon: Users, color: "#0D7A4E", sub: "From all ads" },
                { label: "Revenue Generated", value: `R${totals.revenue.toLocaleString()}`, icon: TrendingUp, color: "#10B981", sub: "Attributed to ads" },
                { label: "True ROAS", value: `${totals.roas}x`, icon: Award, color: "#8B5CF6", sub: "CRM-verified" },
                { label: "Avg. CPL", value: `R${totals.avgCpl}`, icon: Target, color: "#F59E0B", sub: "Per qualified lead" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: `${s.color}15` }}>
                    <s.icon size={15} color={s.color} />
                  </div>
                  <div className="text-xl font-bold text-[#1E293B] leading-none">{s.value}</div>
                  <div className="text-[10px] text-[#94A3B8] mt-1">{s.label}</div>
                  <div className="text-[10px] text-[#64748B]">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* AI Suggestions */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-xl bg-[#0D7A4E] flex items-center justify-center">
                  <Sparkles size={13} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B] text-sm">Claude Ad Recommendations</h3>
                  <p className="text-[11px] text-[#94A3B8]">Based on your pipeline data, industry benchmarks, and SA market trends</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {AI_SUGGESTIONS.map((s) => (
                  <div key={s.id} className="border border-[#E2E8F0] rounded-2xl p-4 hover:border-[#0D7A4E] hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl">{s.icon}</span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#0D7A4E] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                        <Star size={9} /> {s.confidence}% match
                      </div>
                    </div>
                    <h4 className="font-bold text-[#1E293B] text-xs mb-2">{s.title}</h4>
                    <p className="text-[11px] text-[#64748B] leading-relaxed mb-3">{s.desc}</p>
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 bg-[#F8FAFC] rounded-xl p-2 text-center">
                        <div className="text-sm font-bold text-[#0D7A4E]">{s.estimatedLeads}</div>
                        <div className="text-[9px] text-[#94A3B8]">leads/mo</div>
                      </div>
                      <div className="flex-1 bg-[#F8FAFC] rounded-xl p-2 text-center">
                        <div className="text-sm font-bold text-[#0D7A4E]">{s.estimatedCPL}</div>
                        <div className="text-[9px] text-[#94A3B8]">CPL</div>
                      </div>
                      <div className="flex-1 bg-[#F8FAFC] rounded-xl p-2 text-center">
                        <div className="text-sm font-bold text-[#1E293B]">{s.budget}</div>
                        <div className="text-[9px] text-[#94A3B8]">budget</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowWizard(true)}
                      className="w-full py-2 bg-[#0D7A4E] text-white rounded-xl text-xs font-bold hover:bg-[#065A38] transition-colors flex items-center justify-center gap-1"
                    >
                      <Zap size={11} /> Launch This Campaign
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <h3 className="font-bold text-[#1E293B] text-sm mb-1">Daily Leads + Revenue</h3>
                <p className="text-xs text-[#94A3B8] mb-4">This week across all campaigns</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={CHART_DATA} barSize={16}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #E2E8F0" }} />
                    <Bar dataKey="leads" fill="#0D7A4E" radius={[4, 4, 0, 0]} name="Leads" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <h3 className="font-bold text-[#1E293B] text-sm mb-1">Revenue by Platform</h3>
                <p className="text-xs text-[#94A3B8] mb-4">CRM-verified (not inflated platform data)</p>
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width="50%" height={160}>
                    <PieChart>
                      <Pie data={ATTRIBUTION_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="revenue" paddingAngle={3}>
                        {ATTRIBUTION_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => [`R${Number(v).toLocaleString()}`, "Revenue"]} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2">
                    {ATTRIBUTION_DATA.map((d) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }}></div>
                        <span className="text-[11px] text-[#475569] flex-1 truncate">{d.name}</span>
                        <span className="text-[11px] font-bold text-[#1E293B]">R{(d.revenue / 1000).toFixed(0)}K</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CAMPAIGNS */}
        {tab === "campaigns" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {["all", "whatsapp", "facebook", "instagram", "tiktok", "google"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${platform === p ? "bg-[#0D7A4E] text-white" : "bg-white border border-[#E2E8F0] text-[#64748B]"}`}
                >
                  {p === "all" ? "All" : p === "whatsapp" ? "💬" : p === "facebook" ? "👤" : p === "instagram" ? "📸" : p === "tiktok" ? "🎵" : "🔍"} {p !== "all" && p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#F1F5F9] bg-[#FAFBFC]">
                    {["Campaign", "Budget", "Spend", "Leads", "CPL", "ROAS", "Status", ""].map((h) => (
                      <th key={h} className={`px-4 py-3 text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider ${h === "Campaign" ? "text-left" : "text-right"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{c.platform === "whatsapp" ? "💬" : c.platform === "facebook" ? "👤" : c.platform === "instagram" ? "📸" : c.platform === "tiktok" ? "🎵" : "🔍"}</span>
                          <div>
                            <div className="font-semibold text-[#1E293B] text-xs">{c.name}</div>
                            <div className="text-[10px] text-[#94A3B8]">{c.objective} · {c.creative}</div>
                          </div>
                          {c.type === "ctwa" && <span className="text-[9px] font-bold bg-[#DCFCE7] text-[#166534] px-1.5 py-0.5 rounded-full">CTWA</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-[#64748B]">R{c.budget.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-[#1E293B]">R{c.spend.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right"><span className="text-xs font-bold text-[#0D7A4E]">{c.leads}</span></td>
                      <td className="px-4 py-3 text-right text-xs text-[#64748B]">R{c.cpl}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span className={`text-xs font-bold ${c.roas >= 4 ? "text-[#10B981]" : c.roas >= 3 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>{c.roas}x</span>
                          {c.trend === "up" ? <TrendingUp size={11} className="text-[#10B981]" /> : <TrendingDown size={11} className="text-[#EF4444]" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${c.status === "active" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEF3C7] text-[#92400E]"}`}>
                          {c.status === "active" ? "LIVE" : "PAUSED"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 justify-end">
                          {c.status === "active" ? <button className="p-1.5 rounded-lg hover:bg-[#FEF3C7]"><Pause size={12} className="text-[#F59E0B]" /></button> : <button className="p-1.5 rounded-lg hover:bg-[#DCFCE7]"><Play size={12} className="text-[#10B981]" /></button>}
                          <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9]"><Copy size={12} className="text-[#64748B]" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9]"><Settings2 size={12} className="text-[#64748B]" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ATTRIBUTION */}
        {tab === "attribution" && (
          <div className="space-y-4">
            <div className="bg-[#E8F5EE] rounded-2xl border border-[#A7D7BF] p-4 flex items-start gap-3">
              <Info size={16} className="text-[#0D7A4E] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#065A38]">True Attribution — not platform-reported</p>
                <p className="text-xs text-[#065A38] mt-0.5">Platform ROAS is typically inflated by 2.3x because each platform claims the same sale. KHULA cross-references your CRM pipeline to show your real revenue per ad source.</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {ATTRIBUTION_DATA.map((a) => {
                const realRoas = (a.revenue / a.spend).toFixed(1);
                const platformRoas = (Number(realRoas) * 2.3).toFixed(1);
                return (
                  <div key={a.name} className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: `${a.color}20` }}>
                      <Megaphone size={14} color={a.color} />
                    </div>
                    <div className="font-bold text-[#1E293B] text-xs mb-3">{a.name}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px]"><span className="text-[#94A3B8]">Leads</span><span className="font-bold">{a.leads}</span></div>
                      <div className="flex justify-between text-[11px]"><span className="text-[#94A3B8]">Spend</span><span className="font-bold">R{a.spend.toLocaleString()}</span></div>
                      <div className="flex justify-between text-[11px]"><span className="text-[#94A3B8]">Revenue</span><span className="font-bold text-[#0D7A4E]">R{a.revenue.toLocaleString()}</span></div>
                      <div className="h-px bg-[#F1F5F9] my-1"></div>
                      <div className="flex justify-between text-[11px]"><span className="text-[#94A3B8]">True ROAS</span><span className="font-bold text-[#10B981]">{realRoas}x</span></div>
                      <div className="flex justify-between text-[11px]"><span className="text-[#94A3B8]">Platform says</span><span className="font-bold text-[#EF4444] line-through">{platformRoas}x</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SALES TRACKING */}
        {tab === "sales" && (
          <div className="space-y-4">
            {/* Sales KPIs */}
            <div className="grid grid-cols-5 gap-3">
              {[
                { label: "Total Customers", value: "44", icon: Users, color: "#0D7A4E", sub: "This month" },
                { label: "Avg. Deal Value", value: "R1,914", icon: DollarSign, color: "#F59E0B", sub: "per customer" },
                { label: "CAC", value: "R148", icon: Target, color: "#EF4444", sub: "Cost to acquire" },
                { label: "LTV:CAC Ratio", value: "12.9x", icon: TrendingUp, color: "#8B5CF6", sub: "Target: 3x+" },
                { label: "Avg. Pipeline Velocity", value: "6.2 days", icon: Clock, color: "#6366F1", sub: "Lead to close" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: `${s.color}15` }}>
                    <s.icon size={15} color={s.color} />
                  </div>
                  <div className="text-xl font-bold text-[#1E293B]">{s.value}</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">{s.label}</div>
                  <div className="text-[10px] text-[#64748B]">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Revenue trend */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <h3 className="font-bold text-[#1E293B] text-sm mb-1">Revenue from Ads — 5-Month Trend</h3>
                <p className="text-xs text-[#94A3B8] mb-4">CRM-attributed revenue vs ad spend</p>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={SALES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v, n) => [n === "revenue" ? `R${Number(v).toLocaleString()}` : v, n === "revenue" ? "Revenue" : "Leads"]} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Line type="monotone" dataKey="revenue" stroke="#0D7A4E" strokeWidth={2.5} dot={{ fill: "#0D7A4E", r: 4 }} name="revenue" />
                    <Line type="monotone" dataKey="adLeads" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="adLeads" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* CAC trend */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <h3 className="font-bold text-[#1E293B] text-sm mb-1">CAC Improving Month-on-Month</h3>
                <p className="text-xs text-[#94A3B8] mb-4">Your cost to acquire each paying customer is dropping</p>
                <div className="space-y-3 mt-2">
                  {SALES_DATA.map((d) => (
                    <div key={d.month}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-[#475569]">{d.month} 2026</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#94A3B8]">{d.closed} customers</span>
                          <span className="font-bold text-[#0D7A4E]">R{d.cac} CAC</span>
                        </div>
                      </div>
                      <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                        <div className="h-2 rounded-full bg-[#0D7A4E] transition-all" style={{ width: `${(d.cac / 200) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-[#E8F5EE] rounded-xl">
                  <p className="text-xs font-bold text-[#0D7A4E]">↓ 13.5% CAC reduction in 5 months</p>
                  <p className="text-[11px] text-[#065A38]">Your targeting and retargeting improvements are working</p>
                </div>
              </div>
            </div>

            {/* Lead source breakdown */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="font-bold text-[#1E293B] mb-4">Sales by Lead Source</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#F1F5F9]">
                    {["Source", "Leads", "Closed", "Conv. Rate", "Revenue", "CAC", "LTV:CAC"].map((h) => (
                      <th key={h} className={`pb-3 text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider ${h === "Source" ? "text-left" : "text-right"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { source: "💬 WhatsApp Ads", leads: 89, closed: 26, revenue: 49800, spend: 3240, ltv: 8200 },
                    { source: "🔍 Google Search", leads: 67, closed: 21, revenue: 40200, spend: 3100, ltv: 8200 },
                    { source: "📸 Instagram", leads: 54, closed: 14, revenue: 26800, spend: 2100, ltv: 8200 },
                    { source: "🎵 TikTok", leads: 28, closed: 9, revenue: 17200, spend: 620, ltv: 8200 },
                    { source: "👤 Facebook", leads: 41, closed: 10, revenue: 19100, spend: 1680, ltv: 8200 },
                    { source: "🤝 Referral", leads: 23, closed: 14, revenue: 26800, spend: 0, ltv: 8200 },
                  ].map((r) => {
                    const convRate = Math.round((r.closed / r.leads) * 100);
                    const cac = r.spend > 0 ? Math.round(r.spend / r.closed) : 0;
                    const ltvCac = r.spend > 0 ? (r.ltv / cac).toFixed(1) : "∞";
                    return (
                      <tr key={r.source} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC]">
                        <td className="py-3 font-medium text-[#1E293B] text-xs">{r.source}</td>
                        <td className="py-3 text-right text-xs text-[#64748B]">{r.leads}</td>
                        <td className="py-3 text-right text-xs font-bold text-[#1E293B]">{r.closed}</td>
                        <td className="py-3 text-right">
                          <span className={`text-xs font-bold ${convRate >= 30 ? "text-[#10B981]" : convRate >= 20 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>{convRate}%</span>
                        </td>
                        <td className="py-3 text-right text-xs font-bold text-[#0D7A4E]">R{r.revenue.toLocaleString()}</td>
                        <td className="py-3 text-right text-xs text-[#64748B]">{cac > 0 ? `R${cac}` : "Free"}</td>
                        <td className="py-3 text-right">
                          <span className={`text-xs font-bold ${ltvCac === "∞" ? "text-[#0D7A4E]" : Number(ltvCac) >= 10 ? "text-[#10B981]" : "text-[#F59E0B]"}`}>{ltvCac}x</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PIXEL SETUP */}
        {tab === "setup" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="font-bold text-[#1E293B] mb-4">Platform Connections</h3>
              <div className="space-y-3">
                {[
                  { name: "Meta Business Manager", icon: "👤", connected: true, detail: "2 ad accounts connected" },
                  { name: "Meta Pixel", icon: "📊", connected: true, detail: "ID: 1234567890123456" },
                  { name: "Meta Conversions API", icon: "🔗", connected: false, detail: "Recommended — recovers 40-60% lost conversions" },
                  { name: "Google Ads", icon: "🔍", connected: false, detail: "Connect to track search campaigns" },
                  { name: "TikTok Ads Manager", icon: "🎵", connected: false, detail: "Connect to track TikTok campaigns" },
                  { name: "Google Analytics 4", icon: "📈", connected: false, detail: "Website tracking" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{c.icon}</span>
                      <div>
                        <div className="text-xs font-semibold text-[#1E293B]">{c.name}</div>
                        <div className="text-[10px] text-[#94A3B8]">{c.detail}</div>
                      </div>
                    </div>
                    {c.connected
                      ? <CheckCircle size={16} className="text-[#10B981]" />
                      : <button className="text-xs font-bold text-[#0D7A4E] hover:underline">Connect</button>}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <h3 className="font-bold text-[#1E293B] mb-2">WhatsApp Business API</h3>
                <p className="text-xs text-[#64748B] mb-4">Enable Click-to-WhatsApp ads and broadcast messaging. 96% of SA internet users are on WhatsApp.</p>
                <div className="space-y-2 mb-4">
                  {["Click-to-WhatsApp ad tracking", "72-hour free messaging window", "Broadcast campaigns to contacts", "Automated welcome sequences"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-[#475569]">
                      <CheckCircle size={12} className="text-[#0D7A4E]" /> {f}
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <MessageCircle size={15} /> Connect WhatsApp Business API
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <h3 className="font-bold text-[#1E293B] mb-2">SA Budget Benchmarks</h3>
                <p className="text-xs text-[#64748B] mb-3">Typical CPL by platform for SA service businesses</p>
                <div className="space-y-2.5">
                  {[
                    { platform: "💬 WhatsApp CTWA", cpl: "R22-38", quality: "Highest" },
                    { platform: "🎵 TikTok Spark", cpl: "R18-32", quality: "High" },
                    { platform: "📸 Instagram", cpl: "R35-55", quality: "High" },
                    { platform: "👤 Facebook", cpl: "R38-62", quality: "Medium" },
                    { platform: "🔍 Google Search", cpl: "R45-80", quality: "Highest" },
                  ].map((b) => (
                    <div key={b.platform} className="flex items-center justify-between text-xs">
                      <span className="text-[#475569]">{b.platform}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1E293B]">{b.cpl}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${b.quality === "Highest" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#DBEAFE] text-[#1E40AF]"}`}>{b.quality}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#E8F5EE] rounded-2xl border border-[#A7D7BF] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Search size={14} className="text-[#0D7A4E]" />
                  <h4 className="font-bold text-[#065A38] text-sm">Meta Ad Library</h4>
                </div>
                <p className="text-xs text-[#065A38] mb-3">See what your competitors are running right now. Free public tool from Meta.</p>
                <a href="https://www.facebook.com/ads/library" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0D7A4E] text-white rounded-xl text-xs font-bold hover:bg-[#065A38] transition-colors">
                  <ExternalLink size={12} /> Open Meta Ad Library
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
