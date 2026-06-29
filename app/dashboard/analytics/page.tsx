"use client";

import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useBusinessType } from "@/lib/business-type-context";

const revenueData = [
  { week: "W1", won: 8500, pipeline: 45000 },
  { week: "W2", won: 12000, pipeline: 52000 },
  { week: "W3", won: 15750, pipeline: 48000 },
  { week: "W4", won: 12000, pipeline: 61000 },
];

const bookingData = [
  { day: "Mon", completed: 4, no_show: 1, cancelled: 0 },
  { day: "Tue", completed: 6, no_show: 0, cancelled: 1 },
  { day: "Wed", completed: 5, no_show: 2, cancelled: 0 },
  { day: "Thu", completed: 7, no_show: 1, cancelled: 0 },
  { day: "Fri", completed: 3, no_show: 0, cancelled: 1 },
  { day: "Sat", completed: 2, no_show: 0, cancelled: 0 },
];

const pipelineFunnel = [
  { stage: "New Lead", count: 42, color: "#3B82F6" },
  { stage: "Contacted", count: 31, color: "#F59E0B" },
  { stage: "Interested", count: 22, color: "#F97316" },
  { stage: "Booked", count: 16, color: "#8B5CF6" },
  { stage: "Closed Won", count: 14, color: "#10B981" },
];

const sourceData = [
  { source: "WhatsApp", leads: 28, conversion: "64%", revenue: "R32,500", trend: "up" },
  { source: "Form / Website", leads: 18, conversion: "72%", revenue: "R21,000", trend: "up" },
  { source: "Referral", leads: 12, conversion: "83%", revenue: "R18,750", trend: "up" },
  { source: "Facebook", leads: 22, conversion: "32%", revenue: "R8,200", trend: "down" },
  { source: "Instagram", leads: 9, conversion: "44%", revenue: "R6,100", trend: "down" },
  { source: "Walk-in", leads: 5, conversion: "80%", revenue: "R5,400", trend: "up" },
];

const teamData = [
  { name: "Sipho Dlamini", role: "Owner", deals: 8, bookings: 12, revenue: "R42,500", conversion: "67%" },
  { name: "Karin Potgieter", role: "Sales Rep", deals: 4, bookings: 9, revenue: "R18,250", conversion: "50%" },
  { name: "Zinhle Mthembu", role: "Admin", deals: 2, bookings: 14, revenue: "R8,500", conversion: "40%" },
];

const automationPerf = [
  { name: "New Lead Welcome", runs: 142, conversions: 38, rate: "27%" },
  { name: "24-Hour Reminder", runs: 201, conversions: 178, rate: "89%" },
  { name: "Booking Confirmation", runs: 89, conversions: 87, rate: "98%" },
  { name: "30-Day Re-Engagement", runs: 34, conversions: 9, rate: "26%" },
];

const orderData = [
  { week: "W1", orders: 18, revenue: 8200 },
  { week: "W2", orders: 24, revenue: 11400 },
  { week: "W3", orders: 31, revenue: 14900 },
  { week: "W4", orders: 28, revenue: 13100 },
];

const productFunnel = [
  { stage: "Visited Store",    count: 820, color: "#3B82F6" },
  { stage: "Viewed Product",   count: 410, color: "#F59E0B" },
  { stage: "Added to Cart",    count: 180, color: "#F97316" },
  { stage: "Started Checkout", count: 94,  color: "#8B5CF6" },
  { stage: "Completed Order",  count: 72,  color: "#10B981" },
];

const topProducts = [
  { name: "Moisturising Shampoo 400ml", units: 38, revenue: "R3,610",  trend: "up"   },
  { name: "Curl Defining Cream 250ml",  units: 31, revenue: "R5,735",  trend: "up"   },
  { name: "Deep Conditioner 500ml",     units: 27, revenue: "R4,455",  trend: "up"   },
  { name: "Growth Serum 60ml",          units: 14, revenue: "R3,920",  trend: "down" },
  { name: "Scalp Spray 200ml",          units: 11, revenue: "R2,695",  trend: "up"   },
];

const repeatData = [
  { month: "Feb", new: 28, returning: 12 },
  { month: "Mar", new: 32, returning: 18 },
  { month: "Apr", new: 25, returning: 24 },
  { month: "May", new: 29, returning: 31 },
  { month: "Jun", new: 22, returning: 38 },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState("30");
  const { businessType } = useBusinessType();
  const isProducts = businessType === "products";
  const showBoth = businessType === "both";

  return (
    <div className="space-y-5">
      {/* Date range */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1">
          {[["7", "7 days"], ["30", "30 days"], ["90", "90 days"]].map(([v, l]) => (
            <button key={v} onClick={() => setRange(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${range === v ? "bg-[#0D7A4E] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}>{l}</button>
          ))}
        </div>
        <button className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors">Export Report</button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {(isProducts ? [
          { label: "Total Revenue",     value: "R47,600", sub: "+18% vs last month",  icon: TrendingUp,   color: "#0D7A4E", bg: "#E8F5EE" },
          { label: "Orders This Month", value: "101",     sub: "+24 vs last month",   icon: TrendingUp,   color: "#3B82F6", bg: "#EFF6FF" },
          { label: "Avg Order Value",   value: "R471",    sub: "+R38 vs last month",  icon: TrendingUp,   color: "#8B5CF6", bg: "#F5F3FF" },
          { label: "Repeat Buyers",     value: "62%",     sub: "+8% vs last month",   icon: TrendingUp,   color: "#10B981", bg: "#D1FAE5" },
        ] : [
          { label: "Total Revenue",      value: "R48,250", sub: "+22% vs last month", icon: TrendingUp,   color: "#0D7A4E", bg: "#E8F5EE" },
          { label: "Leads Generated",    value: "94",      sub: "+15 vs last month",  icon: TrendingUp,   color: "#3B82F6", bg: "#EFF6FF" },
          { label: "Avg Deal Value",     value: "R5,194",  sub: "+R420 vs last month",icon: TrendingUp,   color: "#8B5CF6", bg: "#F5F3FF" },
          { label: "Churn (Closed Lost)",value: "6",       sub: "-2 vs last month",   icon: TrendingDown, color: "#10B981", bg: "#D1FAE5" },
        ]).map((k) => (
          <div key={k.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl" style={{ background: k.bg }}>
                <k.icon size={18} style={{ color: k.color }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#1E293B]">{k.value}</div>
            <div className="text-sm text-[#64748B] mt-0.5">{k.label}</div>
            <div className="text-xs font-medium mt-1" style={{ color: k.color }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Revenue chart */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h3 className="font-semibold text-[#1E293B] mb-4">{isProducts ? "Orders & Revenue Over Time" : "Revenue Over Time"}</h3>
          <ResponsiveContainer width="100%" height={200}>
            {isProducts ? (
              <BarChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R${(v/1000).toFixed(0)}K`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar yAxisId="left"  dataKey="revenue" fill="#0D7A4E" name="Revenue" radius={[4,4,0,0]} />
                <Bar yAxisId="right" dataKey="orders"  fill="#3B82F6" name="Orders"  radius={[4,4,0,0]} opacity={0.7} />
              </BarChart>
            ) : (
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R${(v/1000).toFixed(0)}K`} />
                <Tooltip formatter={(v) => [`R${Number(v).toLocaleString()}`, ""]} />
                <Line type="monotone" dataKey="won" stroke="#0D7A4E" strokeWidth={2.5} dot={{ fill: "#0D7A4E", r: 4 }} name="Closed Won" />
                <Line type="monotone" dataKey="pipeline" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Pipeline" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Pipeline or Product funnel */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h3 className="font-semibold text-[#1E293B] mb-4">{isProducts ? "eCommerce Funnel" : "Pipeline Funnel"}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={isProducts ? productFunnel : pipelineFunnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="stage" type="category" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {(isProducts ? productFunnel : pipelineFunnel).map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings or Orders chart */}
        {isProducts ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h3 className="font-semibold text-[#1E293B] mb-4">New vs Returning Buyers</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={repeatData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="new"       fill="#3B82F6" stackId="a" name="New Buyers"       radius={[0,0,0,0]} />
                <Bar dataKey="returning" fill="#0D7A4E" stackId="a" name="Repeat Buyers"    radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h3 className="font-semibold text-[#1E293B] mb-4">Bookings This Week</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="completed" fill="#0D7A4E" stackId="a" name="Completed" radius={[0,0,0,0]} />
                <Bar dataKey="no_show" fill="#EF4444" stackId="a" name="No-Show" />
                <Bar dataKey="cancelled" fill="#CBD5E1" stackId="a" name="Cancelled" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Lead source or Top Products */}
        {isProducts ? (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h3 className="font-semibold text-[#1E293B] mb-4">Top Products (30 days)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  {["Product", "Units", "Revenue", ""].map((h) => (
                    <th key={h} className="pb-2 text-left text-xs font-semibold text-[#94A3B8]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.name} className="border-b border-[#F1F5F9] last:border-0">
                    <td className="py-2.5 font-medium text-[#1E293B] text-xs max-w-[160px] truncate">{p.name}</td>
                    <td className="py-2.5 text-[#64748B] text-xs">{p.units}</td>
                    <td className="py-2.5 font-semibold text-[#1E293B] text-xs">{p.revenue}</td>
                    <td className="py-2.5">
                      {p.trend === "up" ? <TrendingUp size={12} className="text-[#10B981]" /> : <TrendingDown size={12} className="text-[#EF4444]" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h3 className="font-semibold text-[#1E293B] mb-4">Lead Source Performance</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  {["Source", "Leads", "Conv.", "Revenue"].map((h) => (
                    <th key={h} className="pb-2 text-left text-xs font-semibold text-[#94A3B8]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sourceData.map((s) => (
                  <tr key={s.source} className="border-b border-[#F1F5F9] last:border-0">
                    <td className="py-2.5 font-medium text-[#1E293B] flex items-center gap-2">
                      {s.trend === "up" ? <TrendingUp size={12} className="text-[#10B981]" /> : <TrendingDown size={12} className="text-[#EF4444]" />}
                      {s.source}
                    </td>
                    <td className="py-2.5 text-[#64748B]">{s.leads}</td>
                    <td className="py-2.5 text-[#64748B]">{s.conversion}</td>
                    <td className="py-2.5 font-semibold text-[#1E293B]">{s.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Team performance */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h3 className="font-semibold text-[#1E293B] mb-4">Team Performance</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                {["Member", isProducts ? "Orders" : "Deals", isProducts ? "Fulfilled" : "Bookings", "Revenue", "Conv."].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold text-[#94A3B8]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teamData.map((t) => (
                <tr key={t.name} className="border-b border-[#F1F5F9] last:border-0">
                  <td className="py-2.5">
                    <div className="font-medium text-[#1E293B]">{t.name}</div>
                    <div className="text-[10px] text-[#94A3B8]">{t.role}</div>
                  </td>
                  <td className="py-2.5 text-[#64748B]">{t.deals}</td>
                  <td className="py-2.5 text-[#64748B]">{t.bookings}</td>
                  <td className="py-2.5 font-semibold text-[#1E293B]">{t.revenue}</td>
                  <td className="py-2.5 text-[#0D7A4E] font-semibold">{t.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Automation performance */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h3 className="font-semibold text-[#1E293B] mb-4">Automation Performance</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                {["Workflow", "Runs", "Conv.", "Rate"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold text-[#94A3B8]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {automationPerf.map((a) => (
                <tr key={a.name} className="border-b border-[#F1F5F9] last:border-0">
                  <td className="py-2.5 font-medium text-[#1E293B] max-w-[140px] truncate">{a.name}</td>
                  <td className="py-2.5 text-[#64748B]">{a.runs}</td>
                  <td className="py-2.5 text-[#64748B]">{a.conversions}</td>
                  <td className="py-2.5">
                    <span className={`font-bold text-sm ${parseInt(a.rate) >= 80 ? "text-[#10B981]" : parseInt(a.rate) >= 50 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>{a.rate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
