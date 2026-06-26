"use client";

import { useState } from "react";
import {
  Search, Sparkles, TrendingUp, TrendingDown, MessageCircle,
  Heart, Share2, Eye, Plus, Send, Image, Link2, Hash,
  CheckCircle, AlertCircle, Clock, BarChart3, Flame,
  ThumbsUp, ThumbsDown, Minus, RefreshCw
} from "lucide-react";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "📸", color: "#E1306C", followers: "2.4K", growth: "+8.2%", connected: true },
  { id: "facebook", label: "Facebook", icon: "👤", color: "#1877F2", followers: "1.8K", growth: "+3.1%", connected: true },
  { id: "tiktok", label: "TikTok", icon: "🎵", color: "#FE2C55", followers: "—", growth: "—", connected: false },
  { id: "twitter", label: "X (Twitter)", icon: "✖️", color: "#000000", followers: "—", growth: "—", connected: false },
  { id: "linkedin", label: "LinkedIn", icon: "💼", color: "#0A66C2", followers: "—", growth: "—", connected: false },
  { id: "youtube", label: "YouTube", icon: "▶️", color: "#FF0000", followers: "—", growth: "—", connected: false },
  { id: "google", label: "Google Business", icon: "🔍", color: "#4285F4", followers: "—", growth: "—", connected: false },
  { id: "pinterest", label: "Pinterest", icon: "📌", color: "#E60023", followers: "—", growth: "—", connected: false },
];

const FEED = [
  { id: 1, platform: "instagram", type: "comment", author: "@thabo_ct", text: "Amazing results!! I went to these guys and my teeth look 10x better 🙌🙌", sentiment: "positive", time: "2m", post: "Before/After post", likes: 12 },
  { id: 2, platform: "facebook", type: "comment", author: "Riaan van der Berg", text: "How much does the whitening cost? Can't find pricing on the page", sentiment: "neutral", time: "8m", post: "Services post", likes: 3 },
  { id: 3, platform: "instagram", type: "comment", author: "@nomsa_beauty", text: "Been waiting 3 weeks for a callback 😩 Not happy", sentiment: "negative", time: "15m", post: "Promotion reel", likes: 0 },
  { id: 4, platform: "tiktok", type: "comment", author: "lerato_sa22", text: "where is this?? need this rn 🔥🔥🔥", sentiment: "positive", time: "22m", post: "TikTok video", likes: 41 },
  { id: 5, platform: "facebook", type: "review", author: "Fatima Patel", text: "5 stars! Professional, quick, and affordable. The team was so warm and welcoming. Will be back!", sentiment: "positive", time: "1h", post: "Google Review", likes: 8 },
  { id: 6, platform: "instagram", type: "comment", author: "@yusuf.photo", text: "Do you have Saturday appointments? I work during the week", sentiment: "neutral", time: "1h", post: "Story", likes: 1 },
];

type SentimentResult = {
  query: string;
  overall: "positive" | "negative" | "mixed";
  score: { positive: number; neutral: number; negative: number };
  themes: string[];
  opportunities: string[];
  threats: string[];
  posts: { platform: string; text: string; sentiment: string; engagement: number }[];
  summary: string;
};

const MOCK_RESULTS: Record<string, SentimentResult> = {
  default: {
    query: "",
    overall: "mixed",
    score: { positive: 54, neutral: 28, negative: 18 },
    themes: ["Pricing transparency", "Wait times / responsiveness", "Results quality", "Appointment availability", "Professionalism"],
    opportunities: ["Customers asking for Saturday hours — opportunity to offer weekend bookings", "Price questions unanswered — add pricing page or FAQ", "Competitors slow on DMs — faster response = win"],
    threats: ["Competitor running aggressive discount ads this week", "Negative reviews about wait times spreading on Facebook", "New player entering Cape Town market"],
    posts: [
      { platform: "instagram", text: "Tired of waiting weeks for dental appointments? Try SmilePerfect — book same day! 🦷", sentiment: "competitor_ad", engagement: 234 },
      { platform: "facebook", text: "Honestly not impressed with my experience here. 2 week wait for a basic cleaning?", sentiment: "negative", engagement: 18 },
      { platform: "tiktok", text: "POV: you finally find a dentist that actually listens to you 🙌 #CapeT ownDental", sentiment: "positive", engagement: 1420 },
      { platform: "twitter", text: "Why is dental care so expensive in SA? Looking for affordable options in Cape Town", sentiment: "neutral", engagement: 45 },
    ],
    summary: "Mixed sentiment overall. Strong positive experiences with results quality, but responsiveness and pricing transparency are recurring pain points. A competitor is running discount campaigns — consider a limited-time offer to counter."
  }
};

const sentimentIcon = (s: string) => {
  if (s === "positive") return <ThumbsUp size={12} className="text-[#10B981]" />;
  if (s === "negative") return <ThumbsDown size={12} className="text-[#EF4444]" />;
  return <Minus size={12} className="text-[#F59E0B]" />;
};

const sentimentColor = (s: string) => {
  if (s === "positive") return { bg: "#DCFCE7", text: "#166534" };
  if (s === "negative") return { bg: "#FEE2E2", text: "#DC2626" };
  if (s === "competitor_ad") return { bg: "#EDE9FE", text: "#5B21B6" };
  return { bg: "#FEF3C7", text: "#92400E" };
};

const platformIcon = (p: string) => {
  const icons: Record<string, string> = { instagram: "📸", facebook: "👤", tiktok: "🎵", twitter: "✖️", linkedin: "💼" };
  return icons[p] ?? "🌐";
};

export default function SocialPage() {
  const [tab, setTab] = useState<"overview" | "monitor" | "publish" | "research">("overview");
  const [researchQuery, setResearchQuery] = useState("");
  const [researchLoading, setResearchLoading] = useState(false);
  const [researchResult, setResearchResult] = useState<SentimentResult | null>(null);
  const [postText, setPostText] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram", "facebook"]);

  const handleResearch = async () => {
    if (!researchQuery.trim()) return;
    setResearchLoading(true);
    setResearchResult(null);
    try {
      const res = await fetch("/api/ai/social-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: researchQuery }),
      });
      const data = await res.json();
      setResearchResult(data.result ?? { ...MOCK_RESULTS.default, query: researchQuery });
    } catch {
      setResearchResult({ ...MOCK_RESULTS.default, query: researchQuery });
    } finally {
      setResearchLoading(false);
    }
  };

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#E2E8F0]">
        {(["overview", "monitor", "publish", "research"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold capitalize transition-colors border-b-2 flex items-center gap-1.5 ${tab === t ? "border-[#0D7A4E] text-[#0D7A4E]" : "border-transparent text-[#64748B] hover:text-[#1E293B]"}`}
          >
            {t === "research" && <Sparkles size={13} />}
            {t === "monitor" && <Eye size={13} />}
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {t === "research" && <span className="text-[9px] font-bold bg-[#4ADE80] text-[#065A38] px-1.5 py-0.5 rounded-full">AI</span>}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1E293B]">Connected Platforms</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">
              <Plus size={13} /> Connect Platform
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {PLATFORMS.map((p) => (
              <div key={p.id} className={`bg-white rounded-2xl border p-4 transition-all ${p.connected ? "border-[#E2E8F0]" : "border-dashed border-[#E2E8F0] opacity-70"}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{p.icon}</span>
                  {p.connected
                    ? <CheckCircle size={16} className="text-[#10B981]" />
                    : <span className="text-[10px] font-bold text-[#94A3B8] border border-[#E2E8F0] px-2 py-0.5 rounded-full">Connect</span>}
                </div>
                <div className="font-bold text-[#1E293B] text-sm">{p.label}</div>
                <div className="text-xl font-bold mt-1" style={{ color: p.connected ? p.color : "#CBD5E1" }}>{p.followers}</div>
                <div className={`text-xs mt-0.5 font-semibold ${p.connected ? "text-[#10B981]" : "text-[#94A3B8]"}`}>{p.growth}</div>
              </div>
            ))}
          </div>

          {/* Engagement summary */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Reach", value: "48.2K", icon: Eye, color: "#6366F1", sub: "This month" },
              { label: "Engagement Rate", value: "4.8%", icon: Heart, color: "#EF4444", sub: "Above average" },
              { label: "Comments", value: "284", icon: MessageCircle, color: "#0D7A4E", sub: "9 need reply" },
              { label: "Shares", value: "127", icon: Share2, color: "#F59E0B", sub: "This month" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                    <s.icon size={15} color={s.color} />
                  </div>
                  <span className="text-xs text-[#64748B]">{s.label}</span>
                </div>
                <div className="text-2xl font-bold text-[#1E293B]">{s.value}</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MONITOR */}
      {tab === "monitor" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {["All", "💬 Comments", "⭐ Reviews", "📸 Instagram", "👤 Facebook", "🎵 TikTok"].map((f) => (
                <button key={f} className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${f === "All" ? "bg-[#0D7A4E] text-white" : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"}`}>
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E2E8F0] text-[#475569] rounded-xl text-xs font-semibold hover:bg-[#F8FAFC]">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>

          <div className="space-y-2">
            {FEED.map((item) => {
              const sc = sentimentColor(item.sentiment);
              return (
                <div key={item.id} className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex items-start gap-4 hover:shadow-sm transition-shadow">
                  <span className="text-xl shrink-0 mt-0.5">{platformIcon(item.platform)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#1E293B]">{item.author}</span>
                      <span className="text-[10px] text-[#94A3B8]">on {item.post}</span>
                      <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ml-auto shrink-0" style={{ background: sc.bg, color: sc.text }}>
                        {sentimentIcon(item.sentiment)}
                        <span className="ml-0.5 capitalize">{item.sentiment}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#475569]">"{item.text}"</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-[10px] text-[#94A3B8] flex items-center gap-1"><Clock size={10} /> {item.time} ago</span>
                      <span className="text-[10px] text-[#94A3B8] flex items-center gap-1"><Heart size={10} /> {item.likes}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <button className="px-3 py-1.5 bg-[#0D7A4E] text-white rounded-lg text-xs font-semibold hover:bg-[#065A38] transition-colors">Reply</button>
                    <button className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] rounded-lg text-xs font-semibold hover:bg-[#F1F5F9] transition-colors">Hide</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PUBLISH */}
      {tab === "publish" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="font-bold text-[#1E293B] mb-4">Create Post</h3>

              {/* Platform selector */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#64748B] mb-2">Publish to:</p>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.filter((p) => p.connected).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${selectedPlatforms.includes(p.id) ? "border-[#0D7A4E] bg-[#E8F5EE] text-[#0D7A4E]" : "border-[#E2E8F0] text-[#94A3B8] hover:border-[#CBD5E1]"}`}
                    >
                      <span>{p.icon}</span> {p.label}
                      {selectedPlatforms.includes(p.id) && <CheckCircle size={11} />}
                    </button>
                  ))}
                  {PLATFORMS.filter((p) => !p.connected).map((p) => (
                    <button key={p.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-dashed border-[#E2E8F0] text-[#CBD5E1]">
                      <span>{p.icon}</span> {p.label} — Connect
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Write your post... (use # for hashtags, @ to mention)"
                rows={5}
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#1E293B] placeholder-[#94A3B8] resize-none focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
              />

              <div className="flex items-center gap-2 mt-3">
                <button className="p-2.5 rounded-xl hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors flex items-center gap-1.5 text-xs text-[#475569]">
                  <Image size={13} /> Media
                </button>
                <button className="p-2.5 rounded-xl hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors flex items-center gap-1.5 text-xs text-[#475569]">
                  <Link2 size={13} /> Link
                </button>
                <button className="p-2.5 rounded-xl hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-colors flex items-center gap-1.5 text-xs text-[#475569]">
                  <Hash size={13} /> Hashtags
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <button className="px-4 py-2 bg-[#F1F5F9] text-[#475569] rounded-xl text-xs font-semibold hover:bg-[#E2E8F0] transition-colors">
                    Schedule
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0D7A4E] text-white rounded-xl text-xs font-semibold hover:bg-[#065A38] transition-colors">
                    <Send size={12} /> Publish Now
                  </button>
                </div>
              </div>
            </div>

            {/* Scheduled posts */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="font-bold text-[#1E293B] mb-4">Scheduled Posts</h3>
              <div className="space-y-3">
                {[
                  { text: "Book your free consultation this week! Limited slots available 🦷✨ #CapeT ownDentist #SmileMakeover", platforms: ["📸", "👤"], time: "Tomorrow, 9:00 AM" },
                  { text: "Did you know most people wait too long between dental checkups? Here's why regular visits matter...", platforms: ["📸"], time: "Friday, 6:00 PM" },
                  { text: "Weekend special: 20% off teeth whitening. Book now via the link in bio!", platforms: ["📸", "👤"], time: "Saturday, 8:00 AM" },
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                    <Clock size={15} className="text-[#94A3B8] mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#475569] truncate">{p.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-[#94A3B8]">{p.time}</span>
                        <span className="text-[10px]">{p.platforms.join(" ")}</span>
                      </div>
                    </div>
                    <button className="text-[10px] text-[#EF4444] hover:underline">Cancel</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Posting tips */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
              <h3 className="font-bold text-[#1E293B] mb-3 flex items-center gap-2"><Flame size={14} className="text-[#F59E0B]" /> Best Times to Post</h3>
              <div className="space-y-2">
                {[
                  { platform: "📸 Instagram", times: "Tue/Thu 9am, 6pm" },
                  { platform: "👤 Facebook", times: "Mon/Wed/Fri 1pm" },
                  { platform: "🎵 TikTok", times: "Tue 7pm, Fri 5pm" },
                  { platform: "💼 LinkedIn", times: "Tue/Wed 8am" },
                ].map((t) => (
                  <div key={t.platform} className="flex justify-between text-xs">
                    <span className="text-[#475569]">{t.platform}</span>
                    <span className="font-semibold text-[#1E293B]">{t.times}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#E8F5EE] rounded-2xl border border-[#A7D7BF] p-4">
              <h3 className="font-bold text-[#065A38] mb-2 flex items-center gap-2"><Sparkles size={13} /> AI Caption Help</h3>
              <p className="text-[11px] text-[#065A38] mb-3">Type your idea and Claude will write the caption for you.</p>
              <input placeholder="e.g. teeth whitening before/after" className="w-full px-3 py-2 bg-white border border-[#A7D7BF] rounded-xl text-xs placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E] mb-2" />
              <button className="w-full py-2 bg-[#0D7A4E] text-white rounded-xl text-xs font-semibold hover:bg-[#065A38] transition-colors">Generate Caption</button>
            </div>
          </div>
        </div>
      )}

      {/* RESEARCH */}
      {tab === "research" && (
        <div className="space-y-5">
          {/* Search bar */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#0D7A4E]" />
              <h3 className="font-bold text-[#1E293B]">Competitor & Sentiment Research</h3>
              <span className="text-[10px] font-bold bg-[#E8F5EE] text-[#0D7A4E] px-2 py-0.5 rounded-full">Powered by Claude AI</span>
            </div>
            <p className="text-xs text-[#64748B] mb-4">Enter a competitor name, hashtag, or keyword. Claude will analyze public social media sentiment and give you strategic insights.</p>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleResearch()}
                  placeholder="e.g. SmilePerfect Dental, #CapeTownDentist, dental Cape Town..."
                  className="w-full pl-9 pr-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm placeholder-[#94A3B8] text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
                />
              </div>
              <button
                onClick={handleResearch}
                disabled={researchLoading || !researchQuery.trim()}
                className="flex items-center gap-2 px-5 py-3 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors disabled:opacity-50"
              >
                {researchLoading ? <><RefreshCw size={14} className="animate-spin" /> Analyzing...</> : <><Sparkles size={14} /> Analyze</>}
              </button>
            </div>
            {/* Quick searches */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs text-[#94A3B8]">Try:</span>
              {["#CapeTownDentist", "SmilePerfect Dental", "teeth whitening Cape Town", "dental Cape Town reviews"].map((q) => (
                <button key={q} onClick={() => setResearchQuery(q)} className="text-xs text-[#0D7A4E] hover:underline font-medium">
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {researchLoading && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
              <RefreshCw size={28} className="text-[#0D7A4E] animate-spin mx-auto mb-3" />
              <div className="font-semibold text-[#1E293B] mb-1">Claude is analyzing social media...</div>
              <div className="text-sm text-[#94A3B8]">Scanning comments, reviews, and posts across platforms</div>
            </div>
          )}

          {researchResult && !researchLoading && (
            <div className="space-y-4">
              {/* Overall sentiment */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-[#1E293B]">Sentiment Analysis: <span className="text-[#0D7A4E]">"{researchResult.query || researchQuery}"</span></h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5">Based on public social media posts, comments, and reviews</p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm ${researchResult.overall === "positive" ? "bg-[#DCFCE7] text-[#166534]" : researchResult.overall === "negative" ? "bg-[#FEE2E2] text-[#DC2626]" : "bg-[#FEF3C7] text-[#92400E]"}`}>
                    {researchResult.overall === "positive" ? <TrendingUp size={15} /> : researchResult.overall === "negative" ? <TrendingDown size={15} /> : <BarChart3 size={15} />}
                    {researchResult.overall.charAt(0).toUpperCase() + researchResult.overall.slice(1)} Sentiment
                  </div>
                </div>

                {/* Sentiment bars */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { label: "Positive", value: researchResult.score.positive, color: "#10B981", icon: ThumbsUp },
                    { label: "Neutral", value: researchResult.score.neutral, color: "#F59E0B", icon: Minus },
                    { label: "Negative", value: researchResult.score.negative, color: "#EF4444", icon: ThumbsDown },
                  ].map((s) => (
                    <div key={s.label} className="p-3 rounded-xl border border-[#E2E8F0]">
                      <div className="flex items-center gap-2 mb-2">
                        <s.icon size={13} color={s.color} />
                        <span className="text-xs font-semibold text-[#475569]">{s.label}</span>
                      </div>
                      <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}%</div>
                      <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${s.value}%`, background: s.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Summary */}
                <div className="p-4 bg-[#E8F5EE] rounded-xl border border-[#A7D7BF]">
                  <div className="flex items-start gap-2">
                    <Sparkles size={13} className="text-[#0D7A4E] mt-0.5 shrink-0" />
                    <p className="text-sm text-[#065A38] leading-relaxed">{researchResult.summary}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Key themes */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
                  <h4 className="font-bold text-[#1E293B] mb-3 text-sm">Key Themes</h4>
                  <div className="space-y-2">
                    {researchResult.themes.map((t) => (
                      <div key={t} className="flex items-center gap-2 text-xs text-[#475569]">
                        <Hash size={11} className="text-[#0D7A4E] shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Opportunities */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
                  <h4 className="font-bold text-[#1E293B] mb-3 text-sm flex items-center gap-2"><TrendingUp size={13} className="text-[#10B981]" /> Opportunities</h4>
                  <div className="space-y-2">
                    {researchResult.opportunities.map((o) => (
                      <div key={o} className="flex items-start gap-2 text-xs text-[#475569]">
                        <CheckCircle size={11} className="text-[#10B981] mt-0.5 shrink-0" />
                        {o}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Threats */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
                  <h4 className="font-bold text-[#1E293B] mb-3 text-sm flex items-center gap-2"><TrendingDown size={13} className="text-[#EF4444]" /> Watch Out For</h4>
                  <div className="space-y-2">
                    {researchResult.threats.map((t) => (
                      <div key={t} className="flex items-start gap-2 text-xs text-[#475569]">
                        <AlertCircle size={11} className="text-[#EF4444] mt-0.5 shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sample posts */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <h4 className="font-bold text-[#1E293B] mb-4 text-sm">Sample Posts Found</h4>
                <div className="space-y-3">
                  {researchResult.posts.map((p, i) => {
                    const sc = sentimentColor(p.sentiment);
                    return (
                      <div key={i} className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                        <span className="text-base shrink-0">{platformIcon(p.platform)}</span>
                        <p className="flex-1 text-sm text-[#475569] italic">"{p.text}"</p>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                            {p.sentiment.replace("_", " ")}
                          </span>
                          <span className="text-[10px] text-[#94A3B8] flex items-center gap-0.5">
                            <Heart size={9} /> {p.engagement}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {!researchResult && !researchLoading && (
            <div className="bg-white rounded-2xl border border-dashed border-[#CBD5E1] p-12 text-center">
              <Sparkles size={32} className="text-[#0D7A4E] mx-auto mb-3 opacity-40" />
              <div className="font-semibold text-[#94A3B8] mb-1">Enter a keyword or competitor name above</div>
              <div className="text-sm text-[#CBD5E1]">Claude AI will scan social media and return sentiment insights, opportunities, and threats</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
