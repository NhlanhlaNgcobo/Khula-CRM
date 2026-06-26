"use client";

import { useState } from "react";
import { Search, Send, Sparkles, Paperclip, Smile, MoreHorizontal, Phone, UserPlus, Tag, CheckCheck } from "lucide-react";

const PLATFORMS = [
  { id: "all", label: "All", icon: "🔔", color: "#0D7A4E", count: 9 },
  { id: "whatsapp", label: "WhatsApp", icon: "💬", color: "#25D366", count: 4 },
  { id: "instagram", label: "Instagram", icon: "📸", color: "#E1306C", count: 2 },
  { id: "facebook", label: "Facebook", icon: "👤", color: "#1877F2", count: 1 },
  { id: "tiktok", label: "TikTok", icon: "🎵", color: "#000000", count: 1 },
  { id: "twitter", label: "X (Twitter)", icon: "✖️", color: "#000000", count: 1 },
  { id: "linkedin", label: "LinkedIn", icon: "💼", color: "#0A66C2", count: 0 },
  { id: "email", label: "Email", icon: "✉️", color: "#6366F1", count: 0 },
  { id: "sms", label: "SMS", icon: "📱", color: "#64748B", count: 0 },
];

const CONVERSATIONS = [
  { id: 1, platform: "whatsapp", contact: "Sipho Dlamini", avatar: "SD", color: "#0D7A4E", preview: "Yes I'm interested, when can we meet?", time: "2m", unread: 2, status: "hot_lead" },
  { id: 2, platform: "instagram", contact: "Fatima Patel", avatar: "FP", color: "#E1306C", preview: "Loved your post! How much for the...", time: "5m", unread: 1, status: "new" },
  { id: 3, platform: "facebook", contact: "Riaan van der Berg", avatar: "RV", color: "#1877F2", preview: "Hi, I saw your ad. Do you deliver to Joburg?", time: "12m", unread: 1, status: "new" },
  { id: 4, platform: "whatsapp", contact: "Nomsa Khumalo", avatar: "NK", color: "#25D366", preview: "Thanks! I'll confirm the booking tomorrow", time: "25m", unread: 0, status: "booked" },
  { id: 5, platform: "tiktok", contact: "Thabo_SA22", avatar: "TH", color: "#FE2C55", preview: "commented: where can I buy this?? 🔥", time: "1h", unread: 1, status: "new" },
  { id: 6, platform: "twitter", contact: "@lerato_biz", avatar: "LB", color: "#000000", preview: "DM'd you about your services", time: "1h", unread: 1, status: "new" },
  { id: 7, platform: "whatsapp", contact: "Ayanda Nkosi", avatar: "AN", color: "#25D366", preview: "Invoice received, all good ✅", time: "2h", unread: 0, status: "closed" },
  { id: 8, platform: "instagram", contact: "yusuf.photography", avatar: "YP", color: "#E1306C", preview: "Story reply: 🔥🔥 need this for my studio", time: "3h", unread: 1, status: "new" },
  { id: 9, platform: "whatsapp", contact: "Lerato Sithole", avatar: "LS", color: "#25D366", preview: "Can you send the price list?", time: "4h", unread: 1, status: "interested" },
];

const MESSAGES = [
  { id: 1, dir: "in", body: "Hi! I saw your WhatsApp status about the new package. Can I get more info?", time: "09:12", platform: "whatsapp" },
  { id: 2, dir: "out", body: "Hi Sipho! Absolutely — happy to help. What are you looking for specifically?", time: "09:15", platform: "whatsapp", read: true },
  { id: 3, dir: "in", body: "The monthly maintenance contract. How much?", time: "09:18", platform: "whatsapp" },
  { id: 4, dir: "out", body: "Packages start from R2,500/month — includes unlimited callouts, priority response, and a dedicated technician. Want me to send the full breakdown?", time: "09:20", platform: "whatsapp", read: true },
  { id: 5, dir: "in", body: "Yes please! Also are you available this week for a site visit?", time: "09:22", platform: "whatsapp" },
  { id: 6, dir: "out", body: "Thursday 2pm or Friday 10am — which works? I'll send the full pricing doc now.", time: "09:25", platform: "whatsapp", read: true },
  { id: 7, dir: "in", body: "Yes I'm interested, when can we meet? Thursday works great!", time: "Just now", platform: "whatsapp" },
];

const platformColors: Record<string, { bg: string; text: string; badge: string }> = {
  whatsapp: { bg: "#DCF8C6", text: "#065F46", badge: "#25D366" },
  instagram: { bg: "#FCE7F3", text: "#9D174D", badge: "#E1306C" },
  facebook: { bg: "#DBEAFE", text: "#1E3A8A", badge: "#1877F2" },
  tiktok: { bg: "#F3F4F6", text: "#111827", badge: "#FE2C55" },
  twitter: { bg: "#F1F5F9", text: "#0F172A", badge: "#000000" },
  linkedin: { bg: "#DBEAFE", text: "#1E3A8A", badge: "#0A66C2" },
  email: { bg: "#EDE9FE", text: "#4C1D95", badge: "#6366F1" },
  sms: { bg: "#F1F5F9", text: "#475569", badge: "#64748B" },
};

const statusBadge: Record<string, { label: string; bg: string; text: string }> = {
  hot_lead: { label: "Hot Lead", bg: "#FEE2E2", text: "#DC2626" },
  new: { label: "New", bg: "#DBEAFE", text: "#1D4ED8" },
  booked: { label: "Booked", bg: "#DCFCE7", text: "#166534" },
  interested: { label: "Interested", bg: "#FEF3C7", text: "#92400E" },
  closed: { label: "Closed", bg: "#F1F5F9", text: "#475569" },
};

export default function UniboxPage() {
  const [activePlatform, setActivePlatform] = useState("all");
  const [activeConv, setActiveConv] = useState(CONVERSATIONS[0]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const filtered = CONVERSATIONS.filter((c) => {
    const matchPlatform = activePlatform === "all" || c.platform === activePlatform;
    const matchSearch = c.contact.toLowerCase().includes(search.toLowerCase()) || c.preview.toLowerCase().includes(search.toLowerCase());
    return matchPlatform && matchSearch;
  });

  const pc = platformColors[activeConv.platform] ?? platformColors.whatsapp;

  const handleSuggest = async () => {
    setSuggestLoading(true);
    setSuggestion("");
    try {
      const res = await fetch("/api/ai/suggest-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: MESSAGES.map((m) => ({ direction: m.dir === "in" ? "inbound" : "outbound", body: m.body })),
          contactName: activeConv.contact,
          businessName: "Cape Town Dental Studio",
          channel: activeConv.platform,
        }),
      });
      const data = await res.json();
      setSuggestion(data.suggestion || "");
      setMessage(data.suggestion || "");
    } catch {
      setSuggestion("Could not generate suggestion.");
    } finally {
      setSuggestLoading(false);
    }
  };

  return (
    <div className="flex gap-0 h-[calc(100vh-8.5rem)] bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">

      {/* Platform filter sidebar */}
      <div className="w-48 shrink-0 border-r border-[#E2E8F0] flex flex-col bg-[#F8FAFC]">
        <div className="px-3 pt-4 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2 px-1">Channels</p>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activePlatform === p.id ? "bg-[#0D7A4E] text-white" : "text-[#475569] hover:bg-white hover:shadow-sm"
              }`}
            >
              <span className="text-base leading-none">{p.icon}</span>
              <span className="flex-1 truncate">{p.label}</span>
              {p.count > 0 && (
                <span className={`text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 shrink-0 ${
                  activePlatform === p.id ? "bg-white/20 text-white" : "bg-[#EF4444] text-white"
                }`}>{p.count}</span>
              )}
            </button>
          ))}
        </div>
        {/* Connect platforms CTA */}
        <div className="p-3 border-t border-[#E2E8F0]">
          <button className="w-full py-2.5 px-3 bg-[#E8F5EE] text-[#0D7A4E] rounded-xl text-xs font-semibold hover:bg-[#D1FAE5] transition-colors">
            + Connect Platform
          </button>
        </div>
      </div>

      {/* Conversation list */}
      <div className="w-72 shrink-0 border-r border-[#E2E8F0] flex flex-col">
        <div className="p-3 border-b border-[#E2E8F0]">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-8 pr-3 py-2 bg-[#F1F5F9] rounded-xl text-xs text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((c) => {
            const plt = PLATFORMS.find((p) => p.id === c.platform);
            return (
              <button
                key={c.id}
                onClick={() => setActiveConv(c)}
                className={`w-full flex items-start gap-3 px-3 py-3 border-b border-[#F8FAFC] text-left transition-colors ${
                  activeConv.id === c.id ? "bg-[#E8F5EE]" : "hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: c.color }}>
                    {c.avatar}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 text-xs leading-none">{plt?.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-[#1E293B] text-xs truncate">{c.contact}</span>
                    <span className="text-[9px] text-[#94A3B8] shrink-0">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-[#64748B] truncate">{c.preview}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: statusBadge[c.status]?.bg, color: statusBadge[c.status]?.text }}>
                      {statusBadge[c.status]?.label}
                    </span>
                  </div>
                </div>
                {c.unread > 0 && (
                  <span className="bg-[#0D7A4E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">{c.unread}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat thread */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: activeConv.color }}>
              {activeConv.avatar}
            </div>
            <div>
              <div className="font-semibold text-[#1E293B] text-sm">{activeConv.contact}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
                <span>{PLATFORMS.find((p) => p.id === activeConv.platform)?.icon}</span>
                <span>via {PLATFORMS.find((p) => p.id === activeConv.platform)?.label}</span>
                <span className="w-1 h-1 rounded-full bg-[#10B981] animate-pulse"></span>
                <span className="text-[#10B981]">online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors" title="Add to contacts"><UserPlus size={15} className="text-[#64748B]" /></button>
            <button className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors" title="Tag contact"><Tag size={15} className="text-[#64748B]" /></button>
            <button className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors" title="Call"><Phone size={15} className="text-[#64748B]" /></button>
            <button className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors"><MoreHorizontal size={15} className="text-[#64748B]" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
          {MESSAGES.map((m) => (
            <div key={m.id} className={`flex ${m.dir === "out" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[68%] rounded-2xl px-4 py-2.5 text-sm ${
                m.dir === "out"
                  ? "bg-[#0D7A4E] text-white rounded-br-sm"
                  : "bg-white text-[#1E293B] border border-[#E2E8F0] rounded-bl-sm"
              }`}>
                <p className="leading-relaxed">{m.body}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 ${m.dir === "out" ? "text-[#A7D7BF]" : "text-[#94A3B8]"}`}>
                  <span className="text-[10px]">{m.time}</span>
                  {m.dir === "out" && <CheckCheck size={11} className={m.read ? "text-[#4ADE80]" : "text-[#A7D7BF]"} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="p-3 border-t border-[#E2E8F0] bg-white">
          {suggestion && (
            <div className="mb-2 px-3 py-2 bg-[#E8F5EE] rounded-xl border border-[#A7D7BF] text-xs text-[#065A38] flex items-start gap-2">
              <Sparkles size={12} className="text-[#0D7A4E] mt-0.5 shrink-0" />
              <span>AI suggestion: <em>{suggestion}</em></span>
            </div>
          )}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl overflow-hidden">
            {/* Platform indicator */}
            <div className="flex items-center gap-2 px-3 pt-2.5 pb-1">
              <span className="text-xs">{PLATFORMS.find((p) => p.id === activeConv.platform)?.icon}</span>
              <span className="text-xs text-[#94A3B8]">Replying via {PLATFORMS.find((p) => p.id === activeConv.platform)?.label}</span>
              <button className="ml-auto text-[10px] text-[#0D7A4E] font-semibold hover:underline">Switch channel</button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              rows={2}
              className="w-full px-3 pb-2 bg-transparent text-sm text-[#1E293B] placeholder-[#94A3B8] resize-none focus:outline-none"
            />
            <div className="flex items-center justify-between px-3 pb-2.5">
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-[#E2E8F0] transition-colors"><Paperclip size={14} className="text-[#94A3B8]" /></button>
                <button className="p-1.5 rounded-lg hover:bg-[#E2E8F0] transition-colors"><Smile size={14} className="text-[#94A3B8]" /></button>
                <button
                  onClick={handleSuggest}
                  disabled={suggestLoading}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-[#E8F5EE] text-[#0D7A4E] rounded-lg text-xs font-semibold hover:bg-[#D1FAE5] transition-colors disabled:opacity-60"
                >
                  <Sparkles size={11} />
                  {suggestLoading ? "Thinking..." : "AI Reply"}
                </button>
              </div>
              <button
                onClick={() => setMessage("")}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0D7A4E] text-white rounded-xl text-xs font-semibold hover:bg-[#065A38] transition-colors"
              >
                <Send size={13} /> Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact panel */}
      <div className="w-56 shrink-0 border-l border-[#E2E8F0] flex flex-col bg-[#F8FAFC] overflow-y-auto">
        <div className="p-4 border-b border-[#E2E8F0] text-center">
          <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-white font-bold mb-2" style={{ background: activeConv.color }}>
            {activeConv.avatar}
          </div>
          <h4 className="font-bold text-[#1E293B] text-sm">{activeConv.contact}</h4>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: statusBadge[activeConv.status]?.bg, color: statusBadge[activeConv.status]?.text }}>
            {statusBadge[activeConv.status]?.label}
          </span>
        </div>
        <div className="p-4 space-y-1 border-b border-[#E2E8F0]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2">Platforms</p>
          {PLATFORMS.filter((p) => p.id !== "all" && p.count > 0).map((p) => (
            <div key={p.id} className="flex items-center gap-2 text-xs text-[#475569]">
              <span>{p.icon}</span>
              <span className="flex-1">{p.label}</span>
              {p.id === activeConv.platform && <span className="text-[#0D7A4E] text-[10px] font-bold">Active</span>}
            </div>
          ))}
        </div>
        <div className="p-4 space-y-2">
          <button className="w-full py-2 bg-[#0D7A4E] text-white rounded-xl text-xs font-semibold hover:bg-[#065A38] transition-colors">+ Add to Pipeline</button>
          <button className="w-full py-2 bg-white border border-[#E2E8F0] text-[#1E293B] rounded-xl text-xs font-semibold hover:bg-[#F1F5F9] transition-colors">View Full Profile</button>
          <button className="w-full py-2 bg-white border border-[#E2E8F0] text-[#1E293B] rounded-xl text-xs font-semibold hover:bg-[#F1F5F9] transition-colors">Book Appointment</button>
        </div>
      </div>
    </div>
  );
}
