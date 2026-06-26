"use client";

import { useState } from "react";
import {
  Plus, Eye, Copy, Trash2, BarChart3, ArrowRight,
  ExternalLink, ChevronDown, ChevronUp, Settings2,
  MousePointerClick, Users, TrendingUp, DollarSign,
  Layers, FileText, ShoppingCart, ThumbsUp, Gift
} from "lucide-react";

type Step = {
  id: string;
  type: string;
  name: string;
  icon: React.ComponentType<{ size: number; color?: string }>;
  visitors: number;
  conversions: number;
  color: string;
};

type Funnel = {
  id: number;
  name: string;
  status: string;
  steps: Step[];
  totalLeads: number;
  revenue: number;
  created: string;
};

const STEP_TYPES = [
  { type: "landing", label: "Landing Page", icon: Layers, color: "#6366F1" },
  { type: "optin", label: "Opt-in Form", icon: FileText, color: "#0D7A4E" },
  { type: "sales", label: "Sales Page", icon: DollarSign, color: "#F59E0B" },
  { type: "checkout", label: "Checkout", icon: ShoppingCart, color: "#EF4444" },
  { type: "upsell", label: "Upsell", icon: TrendingUp, color: "#8B5CF6" },
  { type: "thankyou", label: "Thank You", icon: ThumbsUp, color: "#10B981" },
  { type: "downsell", label: "Downsell", icon: Gift, color: "#F97316" },
];

const FUNNELS: Funnel[] = [
  {
    id: 1, name: "Free Consultation Funnel", status: "active",
    totalLeads: 284, revenue: 48200, created: "12 Jun 2026",
    steps: [
      { id: "s1", type: "landing", name: "Facebook Ad Landing", icon: Layers, visitors: 1420, conversions: 710, color: "#6366F1" },
      { id: "s2", type: "optin", name: "Book Free Consult", icon: FileText, visitors: 710, conversions: 426, color: "#0D7A4E" },
      { id: "s3", type: "sales", name: "Service Packages", icon: DollarSign, visitors: 426, conversions: 284, color: "#F59E0B" },
      { id: "s4", type: "thankyou", name: "Confirmation Page", icon: ThumbsUp, visitors: 284, conversions: 284, color: "#10B981" },
    ],
  },
  {
    id: 2, name: "WhatsApp Lead Magnet", status: "active",
    totalLeads: 156, revenue: 22400, created: "3 Jun 2026",
    steps: [
      { id: "s1", type: "landing", name: "Instagram Ad Page", icon: Layers, visitors: 890, conversions: 445, color: "#6366F1" },
      { id: "s2", type: "optin", name: "Download Free Guide", icon: FileText, visitors: 445, conversions: 312, color: "#0D7A4E" },
      { id: "s3", type: "upsell", name: "Premium Workshop", icon: TrendingUp, visitors: 312, conversions: 156, color: "#8B5CF6" },
      { id: "s4", type: "checkout", name: "Payment Page", icon: ShoppingCart, visitors: 156, conversions: 98, color: "#EF4444" },
      { id: "s5", type: "thankyou", name: "Success Page", icon: ThumbsUp, visitors: 98, conversions: 98, color: "#10B981" },
    ],
  },
  {
    id: 3, name: "Black Friday Sale", status: "draft",
    totalLeads: 0, revenue: 0, created: "25 Jun 2026",
    steps: [
      { id: "s1", type: "landing", name: "Promo Landing Page", icon: Layers, visitors: 0, conversions: 0, color: "#6366F1" },
      { id: "s2", type: "optin", name: "Claim Your Discount", icon: FileText, visitors: 0, conversions: 0, color: "#0D7A4E" },
      { id: "s3", type: "checkout", name: "Checkout", icon: ShoppingCart, visitors: 0, conversions: 0, color: "#EF4444" },
    ],
  },
];

function ConvRate({ from, to }: { from: number; to: number }) {
  const rate = from === 0 ? 0 : Math.round((to / from) * 100);
  const color = rate >= 60 ? "#10B981" : rate >= 40 ? "#F59E0B" : "#EF4444";
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1 my-1">
        <div className="w-12 h-px bg-[#E2E8F0]"></div>
        <div className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${color}20`, color }}>
          {rate}%
        </div>
        <div className="w-12 h-px bg-[#E2E8F0]"></div>
      </div>
      <ArrowRight size={13} className="text-[#CBD5E1]" />
    </div>
  );
}

export default function FunnelsPage() {
  const [view, setView] = useState<"list" | "builder">("list");
  const [selected, setSelected] = useState<Funnel>(FUNNELS[0]);
  const [expandedFunnel, setExpandedFunnel] = useState<number | null>(1);

  const totalStats = {
    funnels: FUNNELS.length,
    leads: FUNNELS.reduce((a, f) => a + f.totalLeads, 0),
    revenue: FUNNELS.reduce((a, f) => a + f.revenue, 0),
    avgConv: 34,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${view === "list" ? "bg-[#0D7A4E] text-white" : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"}`}
          >
            All Funnels
          </button>
          <button
            onClick={() => setView("builder")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${view === "builder" ? "bg-[#0D7A4E] text-white" : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"}`}
          >
            Funnel Builder
          </button>
        </div>
        <button className="flex items-center gap-2 bg-[#0D7A4E] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">
          <Plus size={15} /> New Funnel
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Funnels", value: totalStats.funnels, icon: Layers, color: "#6366F1" },
          { label: "Total Leads", value: totalStats.leads.toLocaleString(), icon: Users, color: "#0D7A4E" },
          { label: "Revenue Generated", value: `R${totalStats.revenue.toLocaleString()}`, icon: DollarSign, color: "#F59E0B" },
          { label: "Avg. Conv. Rate", value: `${totalStats.avgConv}%`, icon: TrendingUp, color: "#EF4444" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#64748B] font-medium">{s.label}</span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <s.icon size={15} color={s.color} />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#1E293B]">{s.value}</div>
          </div>
        ))}
      </div>

      {view === "list" ? (
        <div className="space-y-4">
          {FUNNELS.map((funnel) => (
            <div key={funnel.id} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
              {/* Funnel header row */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setExpandedFunnel(expandedFunnel === funnel.id ? null : funnel.id)}
                    className="p-1 rounded-lg hover:bg-[#F1F5F9] transition-colors"
                  >
                    {expandedFunnel === funnel.id ? <ChevronUp size={16} className="text-[#64748B]" /> : <ChevronDown size={16} className="text-[#64748B]" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#1E293B] text-sm">{funnel.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${funnel.status === "active" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                        {funnel.status === "active" ? "LIVE" : "DRAFT"}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{funnel.steps.length} steps · Created {funnel.created}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 mr-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#1E293B]">{funnel.totalLeads}</div>
                    <div className="text-[10px] text-[#94A3B8]">leads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#1E293B]">R{funnel.revenue.toLocaleString()}</div>
                    <div className="text-[10px] text-[#94A3B8]">revenue</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors" title="Analytics"><BarChart3 size={14} className="text-[#64748B]" /></button>
                  <button className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors" title="Preview"><Eye size={14} className="text-[#64748B]" /></button>
                  <button className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors" title="Clone"><Copy size={14} className="text-[#64748B]" /></button>
                  <button className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors" title="Delete"><Trash2 size={14} className="text-[#EF4444]" /></button>
                  <button
                    onClick={() => { setSelected(funnel); setView("builder"); }}
                    className="ml-1 flex items-center gap-1.5 px-3 py-2 bg-[#E8F5EE] text-[#0D7A4E] rounded-xl text-xs font-semibold hover:bg-[#D1FAE5] transition-colors"
                  >
                    <Settings2 size={12} /> Edit
                  </button>
                </div>
              </div>

              {/* Expanded: visual step flow */}
              {expandedFunnel === funnel.id && (
                <div className="border-t border-[#F1F5F9] px-6 py-5 bg-[#FAFBFC]">
                  <div className="flex items-center gap-0 overflow-x-auto pb-2">
                    {funnel.steps.map((step, idx) => (
                      <div key={step.id} className="flex items-center shrink-0">
                        <div className="flex flex-col items-center w-36">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 border-2 border-white shadow-sm" style={{ background: `${step.color}18`, borderColor: `${step.color}30` }}>
                            <step.icon size={20} color={step.color} />
                          </div>
                          <div className="text-[11px] font-bold text-[#1E293B] text-center leading-tight mb-1">{step.name}</div>
                          <div className="text-[10px] text-[#94A3B8]">{step.visitors.toLocaleString()} visitors</div>
                          <div className="text-[10px] font-semibold" style={{ color: step.color }}>{step.conversions.toLocaleString()} converted</div>
                        </div>
                        {idx < funnel.steps.length - 1 && (
                          <ConvRate from={step.visitors} to={funnel.steps[idx + 1].visitors} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Builder view */
        <div className="flex gap-4 h-[calc(100vh-20rem)]">
          {/* Left: step palette */}
          <div className="w-52 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4 overflow-y-auto">
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Step Types</h3>
            <div className="space-y-2">
              {STEP_TYPES.map((s) => (
                <button
                  key={s.type}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F8FAFC] border border-[#E2E8F0] text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.color}18` }}>
                    <s.icon size={15} color={s.color} />
                  </div>
                  <span className="text-xs font-semibold text-[#1E293B] group-hover:text-[#0D7A4E]">{s.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#E8F5EE] rounded-xl">
              <p className="text-[10px] font-semibold text-[#0D7A4E]">Drag steps onto the canvas to build your funnel</p>
            </div>
          </div>

          {/* Center: canvas */}
          <div className="flex-1 bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1E293B] text-sm">{selected.name}</span>
                <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#DCFCE7] text-[#166534]">LIVE</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-2 bg-[#F1F5F9] text-[#475569] rounded-xl text-xs font-semibold hover:bg-[#E2E8F0] transition-colors">
                  <Eye size={12} /> Preview
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-[#F1F5F9] text-[#475569] rounded-xl text-xs font-semibold hover:bg-[#E2E8F0] transition-colors">
                  <ExternalLink size={12} /> Share Link
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0D7A4E] text-white rounded-xl text-xs font-semibold hover:bg-[#065A38] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Step canvas */}
            <div className="flex-1 overflow-x-auto p-8 flex items-center">
              <div className="flex items-center gap-0 mx-auto">
                {selected.steps.map((step, idx) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center w-44 group cursor-pointer">
                      <div className="w-full rounded-2xl border-2 border-[#E2E8F0] bg-white p-4 hover:border-[#0D7A4E] hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${step.color}18` }}>
                            <step.icon size={18} color={step.color} />
                          </div>
                          <span className="text-[9px] text-[#94A3B8] font-bold">STEP {idx + 1}</span>
                        </div>
                        <div className="text-xs font-bold text-[#1E293B] mb-1">{step.name}</div>
                        <div className="text-[10px] text-[#94A3B8]">{step.visitors.toLocaleString()} visitors</div>
                        <div className="mt-2 w-full bg-[#F1F5F9] rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${step.visitors === 0 ? 0 : Math.round((step.conversions / step.visitors) * 100)}%`, background: step.color }}
                          ></div>
                        </div>
                        <div className="text-[10px] font-bold mt-1" style={{ color: step.color }}>
                          {step.visitors === 0 ? "0" : Math.round((step.conversions / step.visitors) * 100)}% conv.
                        </div>
                      </div>
                      <div className="mt-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[10px] px-2 py-1 bg-[#F1F5F9] text-[#475569] rounded-lg hover:bg-[#E2E8F0]">Edit</button>
                        <button className="text-[10px] px-2 py-1 bg-[#FEE2E2] text-[#DC2626] rounded-lg hover:bg-[#FECACA]">Remove</button>
                      </div>
                    </div>
                    {idx < selected.steps.length - 1 && (
                      <div className="flex flex-col items-center px-2">
                        <ArrowRight size={20} className="text-[#CBD5E1]" />
                      </div>
                    )}
                  </div>
                ))}
                {/* Add step button */}
                <div className="flex items-center px-3">
                  <button className="w-10 h-10 rounded-full border-2 border-dashed border-[#CBD5E1] flex items-center justify-center hover:border-[#0D7A4E] hover:bg-[#E8F5EE] transition-colors group">
                    <Plus size={16} className="text-[#CBD5E1] group-hover:text-[#0D7A4E]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: stats panel */}
          <div className="w-52 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4 overflow-y-auto">
            <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Funnel Stats</h3>
            <div className="space-y-4">
              {[
                { label: "Total Visitors", value: selected.steps[0]?.visitors.toLocaleString() ?? "0", icon: Users, color: "#6366F1" },
                { label: "Converted Leads", value: selected.totalLeads.toLocaleString(), icon: MousePointerClick, color: "#0D7A4E" },
                { label: "Revenue", value: `R${selected.revenue.toLocaleString()}`, icon: DollarSign, color: "#F59E0B" },
                { label: "Avg. CPL", value: selected.totalLeads > 0 ? `R${Math.round(selected.revenue / selected.totalLeads)}` : "—", icon: TrendingUp, color: "#EF4444" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.color}18` }}>
                    <s.icon size={13} color={s.color} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1E293B]">{s.value}</div>
                    <div className="text-[10px] text-[#94A3B8]">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Traffic Sources</h3>
              {[
                { label: "Facebook Ads", pct: 52, color: "#1877F2" },
                { label: "Instagram Ads", pct: 28, color: "#E1306C" },
                { label: "Organic", pct: 12, color: "#10B981" },
                { label: "WhatsApp", pct: 8, color: "#25D366" },
              ].map((s) => (
                <div key={s.label} className="mb-2.5">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-[#475569]">{s.label}</span>
                    <span className="font-bold text-[#1E293B]">{s.pct}%</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${s.pct}%`, background: s.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
