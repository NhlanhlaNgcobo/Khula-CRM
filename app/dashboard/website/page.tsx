"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe, Activity, Settings2, Plug, Copy, CheckCircle, ExternalLink,
  TrendingUp, Users, Eye, MousePointerClick, ShoppingCart, Calendar,
  Smartphone, Monitor, AlertCircle, RefreshCw, Search, ArrowRight,
  Zap, Package, FileText, Sparkles,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ─── Mock data ────────────────────────────────────────────────
const trafficData = [
  { day: "Mon", visitors: 84,  pageviews: 142 },
  { day: "Tue", visitors: 102, pageviews: 189 },
  { day: "Wed", visitors: 91,  pageviews: 163 },
  { day: "Thu", visitors: 128, pageviews: 241 },
  { day: "Fri", visitors: 143, pageviews: 274 },
  { day: "Sat", visitors: 67,  pageviews: 108 },
  { day: "Sun", visitors: 48,  pageviews: 79  },
];

const sourcesData = [
  { source: "Organic Search", pct: 38, color: "#0D7A4E" },
  { source: "Direct",         pct: 26, color: "#3B82F6" },
  { source: "Social Media",   pct: 22, color: "#8B5CF6" },
  { source: "Paid Ads",       pct: 11, color: "#F59E0B" },
  { source: "Referral",       pct: 3,  color: "#10B981" },
];

const topPages = [
  { path: "/",                    title: "Home",           views: 874, bounce: "41%", time: "1m 52s" },
  { path: "/products",            title: "Products",       views: 542, bounce: "33%", time: "2m 14s" },
  { path: "/book",                title: "Book Now",       views: 398, bounce: "18%", time: "3m 05s" },
  { path: "/products/silk-serum", title: "Silk Serum",     views: 241, bounce: "28%", time: "1m 44s" },
  { path: "/contact",             title: "Contact Us",     views: 187, bounce: "62%", time: "0m 48s" },
  { path: "/about",               title: "About",          views: 142, bounce: "55%", time: "1m 10s" },
];

const liveEvents = [
  { time: "Just now",  icon: ShoppingCart, event: "Purchase",       desc: "Nomsa Khumalo bought Silk Press Kit × 2",       value: "R370",  page: "/checkout",    city: "Durban",      device: "mobile" },
  { time: "2m ago",    icon: Calendar,     event: "Booking",        desc: "Unknown visitor booked Hair Treatment",          value: "R450",  page: "/book",        city: "Cape Town",   device: "mobile" },
  { time: "4m ago",    icon: Eye,          event: "Product View",   desc: "Lace Front Wig 22\" viewed 3 times",             value: "",      page: "/products/wig",city: "Johannesburg",device: "desktop" },
  { time: "7m ago",    icon: FileText,     event: "Form Submit",    desc: "Contact form filled — requesting a quote",       value: "",      page: "/contact",     city: "Pretoria",    device: "mobile" },
  { time: "9m ago",    icon: ShoppingCart, event: "Add to Cart",    desc: "Curl Defining Cream added to cart",              value: "R185",  page: "/products",    city: "Sandton",     device: "mobile" },
  { time: "12m ago",   icon: ShoppingCart, event: "Purchase",       desc: "Riaan van der Berg placed order #KH-0082",      value: "R699",  page: "/checkout",    city: "Cape Town",   device: "desktop" },
  { time: "15m ago",   icon: MousePointerClick, event: "Button Click", desc: "WhatsApp CTA clicked on landing page",       value: "",      page: "/",            city: "East London", device: "mobile" },
  { time: "18m ago",   icon: Calendar,     event: "Booking",        desc: "Appointment booked for next Tuesday 10am",      value: "R350",  page: "/book",        city: "Bloemfontein",device: "desktop" },
];

const EVENT_COLORS: Record<string, string> = {
  Purchase:      "#0D7A4E",
  Booking:       "#8B5CF6",
  "Product View":"#3B82F6",
  "Form Submit": "#F59E0B",
  "Add to Cart": "#10B981",
  "Button Click":"#64748B",
};

const INTEGRATIONS = [
  { id: "shopify",     name: "Shopify",      icon: "🛒", status: "available", desc: "Auto-track orders, abandoned carts, and product views from your Shopify store.", cta: "Install App", badge: "Most Popular" },
  { id: "woocommerce", name: "WooCommerce",  icon: "🔌", status: "available", desc: "Connect your WordPress + WooCommerce store via the KHULA plugin.", cta: "Download Plugin", badge: "" },
  { id: "wix",         name: "Wix",          icon: "🌐", status: "available", desc: "Add the tracking script via Wix Velo (Developer Mode) or Marketing Integrations.", cta: "View Guide", badge: "" },
  { id: "squarespace", name: "Squarespace",  icon: "⬛", status: "available", desc: "Inject the KHULA script via Settings → Advanced → Code Injection.", cta: "View Guide", badge: "" },
  { id: "webflow",     name: "Webflow",      icon: "◻️",  status: "available", desc: "Add to Project Settings → Custom Code → Head code section.", cta: "View Guide", badge: "" },
  { id: "wordpress",   name: "WordPress",    icon: "📝", status: "available", desc: "Install the KHULA WordPress plugin or add via header.php or a tag manager.", cta: "Download Plugin", badge: "" },
];

// ─── Component ────────────────────────────────────────────────
type Tab = "overview" | "live" | "setup" | "integrations";

export default function WebsitePage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [copied, setCopied] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("https://capetowndental.co.za");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(true);
  const [connectedIntegration, setConnectedIntegration] = useState<string | null>("shopify");

  const ORG_ID = "org_ct_dental_2026";

  const trackingScript = `<!-- KHULA CRM Tracker — paste in <head> of every page -->
<script src="https://app.khulacrm.co.za/tracker.js" async></script>
<script>
  ktrack('init', '${ORG_ID}');
  ktrack('pageview');
</script>`;

  const bookingEventCode = `// After a booking is confirmed on your site:
ktrack('track', 'booking', {
  service: 'Hair Cut',
  value: 150,
  currency: 'ZAR',
  date: '2026-07-15'
});`;

  const purchaseEventCode = `// After a customer completes checkout:
ktrack('track', 'purchase', {
  orderId: '#1234',
  value: 485,
  currency: 'ZAR',
  items: ['Silk Press Kit', 'Edge Control']
});`;

  const productViewCode = `// When a product page loads:
ktrack('track', 'product_view', {
  name: 'Lace Front Wig 22"',
  price: 1450,
  currency: 'ZAR',
  category: 'Wigs'
});`;

  const cartCode = `// When an item is added to cart:
ktrack('track', 'add_to_cart', {
  name: 'Curl Defining Cream',
  price: 185,
  currency: 'ZAR'
});`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); setVerified(true); }, 2200);
  };

  const TABS: { id: Tab; label: string; icon: typeof Globe }[] = [
    { id: "overview",     label: "Overview",     icon: TrendingUp },
    { id: "live",         label: "Live Feed",    icon: Activity },
    { id: "setup",        label: "Setup",        icon: Settings2 },
    { id: "integrations", label: "Integrations", icon: Plug },
  ];

  return (
    <div className="space-y-5">
      {/* Connected website bar */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] px-5 py-3 flex items-center gap-4">
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${verified ? "bg-[#10B981] animate-pulse" : "bg-[#EF4444]"}`} />
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-[#1E293B] text-sm">{websiteUrl}</span>
          <span className={`ml-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${verified ? "bg-[#D1FAE5] text-[#065A38]" : "bg-[#FEE2E2] text-[#991B1B]"}`}>
            {verified ? "Tracker Active" : "Not Detected"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span>247 visitors today</span>
          <span>·</span>
          <span>12 active now</span>
        </div>
        <button onClick={() => setTab("setup")} className="flex items-center gap-1.5 text-xs font-semibold text-[#0D7A4E] hover:underline shrink-0">
          Manage <ExternalLink size={11} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === id ? "bg-[#0D7A4E] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}
          >
            <Icon size={14} />
            {label}
            {id === "live" && <span className="bg-[#EF4444] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">12</span>}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ─────────────────────────────────────────── */}
      {tab === "overview" && (
        <div className="space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: "Visitors Today",    value: "247",   sub: "+18% vs yesterday", color: "#3B82F6", bg: "#EFF6FF", icon: Users },
              { label: "Page Views",        value: "412",   sub: "1.67 pages / session", color: "#0D7A4E", bg: "#E8F5EE", icon: Eye },
              { label: "Conversions",       value: "31",    sub: "12.5% conv. rate",  color: "#8B5CF6", bg: "#F5F3FF", icon: MousePointerClick },
              { label: "Revenue via Site",  value: "R8,450",sub: "+R1,200 vs yesterday", color: "#10B981", bg: "#D1FAE5", icon: ShoppingCart },
            ].map((k) => (
              <div key={k.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
                <div className="p-2.5 rounded-xl inline-flex mb-3" style={{ background: k.bg }}>
                  <k.icon size={18} style={{ color: k.color }} />
                </div>
                <div className="text-2xl font-bold text-[#1E293B]">{k.value}</div>
                <div className="text-sm text-[#64748B] mt-0.5">{k.label}</div>
                <div className="text-xs font-medium mt-1" style={{ color: k.color }}>{k.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* Traffic chart */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1E293B]">Traffic This Week</h3>
                <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#0D7A4E] inline-block rounded"></span>Visitors</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#3B82F6] inline-block rounded border-dashed border-b border-[#3B82F6]"></span>Page Views</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="visitors"  stroke="#0D7A4E" strokeWidth={2.5} dot={{ fill: "#0D7A4E", r: 3 }} name="Visitors" />
                  <Line type="monotone" dataKey="pageviews" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Page Views" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Traffic sources */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="font-semibold text-[#1E293B] mb-4">Traffic Sources</h3>
              <div className="space-y-3">
                {sourcesData.map((s) => (
                  <div key={s.source}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#374151]">{s.source}</span>
                      <span className="text-xs font-bold text-[#1E293B]">{s.pct}%</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                      <div className="h-2 rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top pages */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h3 className="font-semibold text-[#1E293B] mb-4">Top Pages</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    {["Page", "Views", "Bounce Rate", "Avg Time"].map((h) => (
                      <th key={h} className="pb-2.5 text-left text-xs font-semibold text-[#94A3B8]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topPages.map((p) => (
                    <tr key={p.path} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-2.5">
                        <div className="font-semibold text-[#1E293B] text-xs">{p.title}</div>
                        <div className="text-[10px] text-[#94A3B8] font-mono">{p.path}</div>
                      </td>
                      <td className="py-2.5 text-sm font-semibold text-[#1E293B]">{p.views.toLocaleString()}</td>
                      <td className="py-2.5">
                        <span className={`text-xs font-bold ${parseInt(p.bounce) > 50 ? "text-[#EF4444]" : parseInt(p.bounce) > 30 ? "text-[#F59E0B]" : "text-[#10B981]"}`}>
                          {p.bounce}
                        </span>
                      </td>
                      <td className="py-2.5 text-xs text-[#64748B]">{p.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Device + recent conversions */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="font-semibold text-[#1E293B] mb-4">Device Breakdown</h3>
              <div className="space-y-4">
                {[
                  { label: "Mobile", icon: Smartphone, pct: 68, color: "#0D7A4E" },
                  { label: "Desktop", icon: Monitor, pct: 27, color: "#3B82F6" },
                  { label: "Tablet", icon: Monitor, pct: 5, color: "#94A3B8" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-3">
                    <d.icon size={15} style={{ color: d.color }} className="shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium text-[#374151]">{d.label}</span>
                        <span className="text-xs font-bold text-[#1E293B]">{d.pct}%</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${d.pct}%`, background: d.color }} />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#F1F5F9] text-xs text-[#64748B]">
                  📱 <strong className="text-[#0D7A4E]">68% mobile</strong> — make sure your website is mobile-first.
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="font-semibold text-[#1E293B] mb-4">Recent Conversions</h3>
              <div className="space-y-3">
                {liveEvents.filter(e => ["Purchase", "Booking"].includes(e.event)).slice(0, 4).map((e, i) => {
                  const Icon = e.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: EVENT_COLORS[e.event] + "20" }}>
                        <Icon size={13} style={{ color: EVENT_COLORS[e.event] }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#1E293B] leading-tight">{e.desc}</p>
                        <p className="text-[10px] text-[#94A3B8] mt-0.5">{e.city} · {e.time}</p>
                      </div>
                      {e.value && <span className="text-xs font-bold text-[#0D7A4E] shrink-0">{e.value}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── LIVE FEED ─────────────────────────────────────────── */}
      {tab === "live" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
              <span className="text-sm font-semibold text-[#1E293B]">Live — 12 visitors on your site right now</span>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0D7A4E] transition-colors">
              <RefreshCw size={12} /> Auto-refresh
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  {["Time", "Event", "Description", "Value", "Page", "Location", "Device"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#94A3B8] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {liveEvents.map((e, i) => {
                  const Icon = e.icon;
                  const color = EVENT_COLORS[e.event] || "#64748B";
                  return (
                    <tr key={i} className={`border-b border-[#F1F5F9] last:border-0 hover:bg-[#F8FAFC] transition-colors ${i === 0 ? "bg-[#F0FDF4]" : ""}`}>
                      <td className="px-4 py-3 text-[10px] text-[#94A3B8] whitespace-nowrap font-mono">{e.time}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap"
                          style={{ color, background: color + "15" }}>
                          <Icon size={10} />
                          {e.event}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#1E293B] max-w-[220px]">{e.desc}</td>
                      <td className="px-4 py-3">
                        {e.value ? <span className="text-xs font-bold text-[#0D7A4E]">{e.value}</span> : <span className="text-[#CBD5E1]">—</span>}
                      </td>
                      <td className="px-4 py-3 text-[10px] text-[#64748B] font-mono">{e.page}</td>
                      <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{e.city}</td>
                      <td className="px-4 py-3">
                        {e.device === "mobile"
                          ? <Smartphone size={13} className="text-[#0D7A4E]" />
                          : <Monitor size={13} className="text-[#3B82F6]" />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Active pages heatmap */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h3 className="font-semibold text-[#1E293B] mb-4">Where Visitors Are Right Now</h3>
            <div className="space-y-2.5">
              {[
                { page: "/products",            label: "Products",   active: 4 },
                { page: "/book",                label: "Book Now",   active: 3 },
                { page: "/",                    label: "Home",       active: 3 },
                { page: "/products/silk-serum", label: "Silk Serum", active: 2 },
              ].map((p) => (
                <div key={p.page} className="flex items-center gap-3">
                  <div className="text-xs font-mono text-[#64748B] w-44 truncate">{p.page}</div>
                  <div className="flex-1 bg-[#E2E8F0] rounded-full h-2">
                    <div className="bg-[#0D7A4E] h-2 rounded-full" style={{ width: `${(p.active / 12) * 100}%` }} />
                  </div>
                  <span className="text-xs font-bold text-[#1E293B] w-16 text-right">{p.active} visitors</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SETUP ─────────────────────────────────────────────── */}
      {tab === "setup" && (
        <div className="space-y-5 max-w-3xl">

          {/* AI Builder CTA */}
          <div className="bg-gradient-to-r from-[#0D7A4E] to-[#0FA863] rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white">Don&apos;t have a website yet?</p>
                <p className="text-white/80 text-sm">Use the AI Builder to generate a full website in 30 seconds — powered by Claude.</p>
              </div>
            </div>
            <Link
              href="/dashboard/website/builder"
              className="shrink-0 flex items-center gap-2 bg-white font-bold text-[#0D7A4E] text-sm px-5 py-2.5 rounded-xl hover:bg-[#F0FDF4] transition-colors"
            >
              <Sparkles size={14} />
              Build My Website
            </Link>
          </div>

          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#0D7A4E] text-white text-xs font-bold flex items-center justify-center shrink-0">1</div>
              <h3 className="font-bold text-[#1E293B]">Add Your Website URL</h3>
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Globe size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourbusiness.co.za"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
                />
              </div>
              <button
                onClick={handleVerify}
                disabled={verifying}
                className="flex items-center gap-2 bg-[#0D7A4E] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors disabled:opacity-70 shrink-0"
              >
                {verifying ? <RefreshCw size={14} className="animate-spin" /> : <Search size={14} />}
                {verifying ? "Checking..." : "Verify"}
              </button>
            </div>
            {verified && (
              <div className="mt-3 flex items-center gap-2 text-sm text-[#0D7A4E] font-medium">
                <CheckCircle size={14} /> Tracker detected and active on {websiteUrl}
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#0D7A4E] text-white text-xs font-bold flex items-center justify-center shrink-0">2</div>
              <h3 className="font-bold text-[#1E293B]">Paste Tracking Script into Your Website</h3>
            </div>
            <p className="text-sm text-[#64748B] mb-4 ml-10">Add this snippet inside the <code className="bg-[#F1F5F9] px-1.5 py-0.5 rounded text-[#0D7A4E] text-xs">&lt;head&gt;</code> tag of every page. On Shopify/WordPress — use the plugin instead (see Integrations tab).</p>
            <div className="relative">
              <pre className="bg-[#0F172A] text-[#E2E8F0] text-xs font-mono p-5 rounded-xl overflow-x-auto leading-relaxed whitespace-pre-wrap">{trackingScript}</pre>
              <button
                onClick={() => handleCopy(trackingScript)}
                className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? <><CheckCircle size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
              </button>
            </div>
            <p className="text-xs text-[#94A3B8] mt-2">Your Org ID: <code className="text-[#0D7A4E] font-mono">{ORG_ID}</code></p>
          </div>

          {/* Step 3 — Event tracking */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#0D7A4E] text-white text-xs font-bold flex items-center justify-center shrink-0">3</div>
              <h3 className="font-bold text-[#1E293B]">Track Specific Events (Optional but Recommended)</h3>
            </div>
            <p className="text-sm text-[#64748B] mb-4 ml-10">Add these snippets at the relevant points in your website code to track high-value actions.</p>
            <div className="space-y-4 ml-10">
              {[
                { label: "Booking Confirmed", icon: Calendar, code: bookingEventCode, color: "#8B5CF6" },
                { label: "Product Purchased", icon: ShoppingCart, code: purchaseEventCode, color: "#0D7A4E" },
                { label: "Product Viewed",    icon: Eye, code: productViewCode, color: "#3B82F6" },
                { label: "Added to Cart",     icon: Package, code: cartCode, color: "#10B981" },
              ].map((e) => (
                <div key={e.label}>
                  <div className="flex items-center gap-2 mb-2">
                    <e.icon size={14} style={{ color: e.color }} />
                    <span className="text-xs font-bold text-[#374151]">{e.label}</span>
                  </div>
                  <pre className="bg-[#0F172A] text-[#A7D7BF] text-[11px] font-mono p-4 rounded-xl overflow-x-auto leading-relaxed whitespace-pre-wrap">{e.code}</pre>
                </div>
              ))}
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#0D7A4E] text-white text-xs font-bold flex items-center justify-center shrink-0">4</div>
              <h3 className="font-bold text-[#1E293B]">Configure What to Track</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 ml-10">
              {[
                { label: "Page Views",          desc: "Every page load",              on: true },
                { label: "Button Clicks",       desc: "CTA and WhatsApp clicks",      on: true },
                { label: "Form Submissions",    desc: "Contact and quote forms",       on: true },
                { label: "Scroll Depth",        desc: "How far visitors scroll",       on: false },
                { label: "Product Views",       desc: "Product page visits",           on: true },
                { label: "Add to Cart",         desc: "Cart addition events",          on: true },
                { label: "Purchases",           desc: "Completed checkout events",     on: true },
                { label: "Booking Events",      desc: "Appointment bookings",          on: true },
              ].map((item) => (
                <label key={item.label} className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] cursor-pointer hover:border-[#0D7A4E] transition-colors">
                  <input type="checkbox" defaultChecked={item.on} className="mt-0.5 accent-[#0D7A4E]" />
                  <div>
                    <p className="text-xs font-semibold text-[#1E293B]">{item.label}</p>
                    <p className="text-[10px] text-[#94A3B8]">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── INTEGRATIONS ──────────────────────────────────────── */}
      {tab === "integrations" && (
        <div className="space-y-5">
          <div className="bg-[#E8F5EE] border border-[#A7D7BF] rounded-2xl px-5 py-3">
            <p className="text-sm text-[#065A38]">
              <strong>Platform integrations</strong> auto-track orders, abandoned carts, product views, and bookings without writing any code.
              Choose your platform below.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {INTEGRATIONS.map((int) => {
              const isConnected = connectedIntegration === int.id;
              return (
                <div key={int.id} className={`bg-white rounded-2xl border-2 p-5 transition-all ${isConnected ? "border-[#0D7A4E]" : "border-[#E2E8F0] hover:border-[#A7D7BF]"}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-2xl shrink-0">
                      {int.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[#1E293B]">{int.name}</span>
                        {int.badge && (
                          <span className="text-[9px] font-bold bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full">{int.badge}</span>
                        )}
                        {isConnected && (
                          <span className="text-[9px] font-bold bg-[#D1FAE5] text-[#065A38] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle size={8} /> Connected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#64748B] mb-3">{int.desc}</p>
                      <div className="flex items-center gap-2">
                        {isConnected ? (
                          <>
                            <button className="text-xs font-semibold bg-[#F1F5F9] text-[#64748B] px-3 py-1.5 rounded-lg hover:bg-[#E2E8F0] transition-colors">Configure</button>
                            <button
                              onClick={() => setConnectedIntegration(null)}
                              className="text-xs font-semibold text-[#EF4444] px-3 py-1.5 rounded-lg hover:bg-[#FEE2E2] transition-colors"
                            >
                              Disconnect
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setConnectedIntegration(int.id)}
                            className="flex items-center gap-1.5 text-xs font-bold bg-[#0D7A4E] text-white px-4 py-2 rounded-xl hover:bg-[#065A38] transition-colors"
                          >
                            <Zap size={12} /> {int.cta}
                          </button>
                        )}
                        <button className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#0D7A4E] transition-colors">
                          Docs <ArrowRight size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* What gets tracked automatically */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h3 className="font-semibold text-[#1E293B] mb-4">What Gets Tracked Automatically per Integration</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    {["", "Shopify", "WooCommerce", "Wix", "Squarespace", "Manual Script"].map((h) => (
                      <th key={h} className="pb-3 px-3 text-left font-semibold text-[#94A3B8]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Page Views",       "✅", "✅", "✅", "✅", "✅"],
                    ["Product Views",    "✅", "✅", "✅", "✅", "🔧"],
                    ["Add to Cart",      "✅", "✅", "⬜", "⬜", "🔧"],
                    ["Purchases",        "✅", "✅", "⬜", "⬜", "🔧"],
                    ["Abandoned Cart",   "✅", "✅", "⬜", "⬜", "⬜"],
                    ["Bookings",         "⬜", "⬜", "⬜", "⬜", "🔧"],
                    ["Form Submissions", "🔧", "🔧", "✅", "✅", "🔧"],
                    ["Button Clicks",    "✅", "✅", "✅", "✅", "✅"],
                  ].map(([label, ...cols]) => (
                    <tr key={label} className="border-b border-[#F1F5F9] last:border-0">
                      <td className="py-2.5 px-3 font-medium text-[#374151]">{label}</td>
                      {cols.map((v, i) => <td key={i} className="py-2.5 px-3 text-center">{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[10px] text-[#94A3B8] mt-3">✅ Automatic &nbsp;·&nbsp; 🔧 Requires code snippet &nbsp;·&nbsp; ⬜ Not available</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
