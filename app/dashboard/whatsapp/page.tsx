"use client";

import { useState } from "react";
import {
  Send, Users, MessageCircle, CheckCheck, Clock, Plus,
  Filter, Sparkles, BarChart3, RefreshCw, Tag, Phone,
  ShoppingBag, Link2, FileText, Star, TrendingUp, ChevronDown
} from "lucide-react";

const SEGMENTS = [
  { id: "all", label: "All Contacts", count: 284, icon: Users, color: "#0D7A4E" },
  { id: "hot_leads", label: "Hot Leads", count: 34, icon: Star, color: "#EF4444" },
  { id: "no_booking", label: "Enquired, not booked", count: 67, icon: Clock, color: "#F59E0B" },
  { id: "past_customers", label: "Past Customers", count: 112, icon: CheckCheck, color: "#10B981" },
  { id: "lapsed", label: "Lapsed (90+ days)", count: 41, icon: RefreshCw, color: "#8B5CF6" },
  { id: "from_ads", label: "From Ads", count: 89, icon: BarChart3, color: "#1877F2" },
];

const TEMPLATES = [
  {
    id: 1,
    name: "Re-engage lapsed customers",
    preview: "Hi {{name}}, it's been a while! 👋 We miss you at {{business}}. Book your next appointment and get 10% off as a loyalty thank you. Reply YES to book 🗓️",
    category: "Win-back",
    deliveryRate: 98,
    openRate: 87,
    replyRate: 31,
  },
  {
    id: 2,
    name: "Follow up on enquiry",
    preview: "Hi {{name}}, just checking in! Have you had a chance to think about the consultation we chatted about? We have a few slots open this week — would love to get you booked in 😊",
    category: "Follow-up",
    deliveryRate: 99,
    openRate: 91,
    replyRate: 44,
  },
  {
    id: 3,
    name: "Flash sale offer",
    preview: "🎉 FLASH SALE — 24 hours only! 20% off all our packages at {{business}}. This won't last — reply NOW to lock in your spot or click to book: {{link}}",
    category: "Promotion",
    deliveryRate: 97,
    openRate: 83,
    replyRate: 22,
  },
  {
    id: 4,
    name: "Appointment reminder",
    preview: "Hi {{name}}! 👋 Just a quick reminder — your appointment at {{business}} is tomorrow at {{time}}. Reply CONFIRM to keep it or RESCHEDULE if needed.",
    category: "Reminder",
    deliveryRate: 99,
    openRate: 95,
    replyRate: 71,
  },
  {
    id: 5,
    name: "New service announcement",
    preview: "Exciting news! 🎊 We just added {{service}} to our menu at {{business}}. As a valued customer, you get first access. Reply to find out more or book your spot!",
    category: "Announcement",
    deliveryRate: 98,
    openRate: 79,
    replyRate: 18,
  },
];

const BROADCASTS = [
  { id: 1, name: "December Re-engagement", segment: "Lapsed (90+ days)", sent: 41, delivered: 40, opened: 35, replies: 12, revenue: 8400, date: "24 Jun", status: "completed" },
  { id: 2, name: "Winter Wellness Special", segment: "All Contacts", sent: 284, delivered: 279, opened: 242, replies: 67, revenue: 28600, date: "18 Jun", status: "completed" },
  { id: 3, name: "Ad Follow-up Sequence", segment: "From Ads", sent: 89, delivered: 87, opened: 79, replies: 31, revenue: 13200, date: "10 Jun", status: "completed" },
];

export default function WhatsAppPage() {
  const [tab, setTab] = useState<"broadcast" | "templates" | "history" | "catalogue">("broadcast");
  const [selectedSegment, setSelectedSegment] = useState("hot_leads");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("");

  const segment = SEGMENTS.find((s) => s.id === selectedSegment);
  const template = TEMPLATES.find((t) => t.id === selectedTemplate);

  const handleGenerateMessage = async () => {
    setGenerating(true);
    setTimeout(() => {
      setMessageText(`Hi {{name}}! 👋 We noticed you enquired about our services recently but haven't booked yet. We'd love to help you out — we have a few open slots this week and would hate for you to miss out. Reply YES to book or send us any questions. Looking forward to seeing you at Cape Town Dental Studio! 😊`);
      setGenerating(false);
    }, 1800);
  };

  return (
    <div className="space-y-5">
      {/* Header stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total WhatsApp Contacts", value: "284", icon: Phone, color: "#25D366" },
          { label: "Avg. Open Rate", value: "87%", icon: BarChart3, color: "#0D7A4E", sub: "vs 21% email avg" },
          { label: "Avg. Reply Rate", value: "37%", icon: MessageCircle, color: "#F59E0B" },
          { label: "Revenue from Broadcasts", value: "R50.2K", icon: TrendingUp, color: "#8B5CF6", sub: "This month" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <s.icon size={15} color={s.color} />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#1E293B]">{s.value}</div>
            <div className="text-[10px] text-[#94A3B8] mt-0.5">{s.label}</div>
            {s.sub && <div className="text-[10px] text-[#10B981] font-semibold">{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#E2E8F0]">
        {(["broadcast", "templates", "history", "catalogue"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold capitalize transition-colors border-b-2 ${tab === t ? "border-[#25D366] text-[#065A38]" : "border-transparent text-[#64748B] hover:text-[#1E293B]"}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* BROADCAST */}
      {tab === "broadcast" && (
        <div className="grid grid-cols-3 gap-5">
          {/* Left: setup */}
          <div className="col-span-2 space-y-4">
            {/* Segment picker */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={14} className="text-[#0D7A4E]" />
                <h3 className="font-bold text-[#1E293B] text-sm">Who are you sending to?</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SEGMENTS.map((seg) => (
                  <button
                    key={seg.id}
                    onClick={() => setSelectedSegment(seg.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all ${selectedSegment === seg.id ? "border-[#25D366] bg-[#F0FDF4]" : "border-[#E2E8F0] hover:border-[#CBD5E1]"}`}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${seg.color}18` }}>
                      <seg.icon size={13} color={seg.color} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1E293B]">{seg.count}</div>
                      <div className="text-[10px] text-[#94A3B8] leading-tight">{seg.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle size={14} className="text-[#0D7A4E]" />
                  <h3 className="font-bold text-[#1E293B] text-sm">Your Message</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSelectedTemplate(null); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F5F9] text-[#475569] rounded-xl text-xs font-semibold hover:bg-[#E2E8F0] transition-colors"
                  >
                    <FileText size={11} /> Use Template
                  </button>
                  <button
                    onClick={handleGenerateMessage}
                    disabled={generating}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D7A4E] text-white rounded-xl text-xs font-semibold hover:bg-[#065A38] transition-colors disabled:opacity-60"
                  >
                    {generating ? <><RefreshCw size={11} className="animate-spin" /> Writing...</> : <><Sparkles size={11} /> AI Write</>}
                  </button>
                </div>
              </div>

              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message... Use {{name}} for first name, {{business}} for your business name, {{link}} for your booking link"
                rows={5}
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#1E293B] placeholder-[#94A3B8] resize-none focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              />

              {/* Variable helper */}
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="text-[11px] text-[#94A3B8]">Insert:</span>
                {["{{name}}", "{{business}}", "{{link}}", "{{time}}", "{{service}}"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMessageText((prev) => prev + v)}
                    className="text-[11px] text-[#0D7A4E] bg-[#E8F5EE] px-2 py-0.5 rounded-lg font-mono hover:bg-[#D1FAE5] transition-colors"
                  >
                    {v}
                  </button>
                ))}
              </div>

              {/* Attachment */}
              <div className="flex gap-2 mt-3">
                {[
                  { icon: "🖼️", label: "Image" },
                  { icon: "🎥", label: "Video" },
                  { icon: "📎", label: "Document" },
                  { icon: "🔗", label: "Link" },
                  { icon: "💳", label: "Payment Link" },
                ].map((a) => (
                  <button key={a.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#475569] hover:bg-[#F1F5F9] transition-colors">
                    {a.icon} {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-[#0D7A4E]" />
                <h3 className="font-bold text-[#1E293B] text-sm">When to send?</h3>
                <span className="text-[10px] text-[#94A3B8] ml-auto">Best times: Tue–Thu 9am–11am, 6pm–8pm</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setScheduleTime("now")}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${scheduleTime === "now" ? "border-[#25D366] bg-[#F0FDF4] text-[#065A38]" : "border-[#E2E8F0] text-[#64748B]"}`}
                >
                  Send Now
                </button>
                <div className="flex-1 relative">
                  <input
                    type="datetime-local"
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border-2 border-[#E2E8F0] text-sm text-[#475569] focus:outline-none focus:border-[#25D366]"
                  />
                </div>
              </div>
            </div>

            {/* Send button */}
            <button className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-3">
              <Send size={18} />
              Send to {segment?.count} contacts via WhatsApp
            </button>
          </div>

          {/* Right: preview + stats */}
          <div className="space-y-4">
            {/* Preview */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
              <h4 className="font-bold text-[#1E293B] text-xs mb-3">Message Preview</h4>
              <div className="bg-[#ECE5DD] rounded-2xl p-3 min-h-[120px]">
                <div className="bg-white rounded-xl p-3 max-w-[85%] shadow-sm">
                  <p className="text-xs text-[#1E293B] leading-relaxed">
                    {messageText
                      ? messageText.replace("{{name}}", "Sipho").replace("{{business}}", "Cape Town Dental").replace("{{time}}", "10:00 AM").replace("{{link}}", "khulacrm.co.za/book")
                      : <span className="text-[#94A3B8]">Your message will appear here...</span>
                    }
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1.5">
                    <span className="text-[9px] text-[#94A3B8]">09:41</span>
                    <CheckCheck size={11} className="text-[#34B7F1]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Predicted performance */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4">
              <h4 className="font-bold text-[#1E293B] text-xs mb-3">Predicted Performance</h4>
              <div className="space-y-3">
                {[
                  { label: "Will receive", value: `~${Math.round((segment?.count ?? 0) * 0.97)}`, sub: "97% delivery rate" },
                  { label: "Will open", value: `~${Math.round((segment?.count ?? 0) * 0.87)}`, sub: "87% open rate" },
                  { label: "Will reply", value: `~${Math.round((segment?.count ?? 0) * 0.37)}`, sub: "37% reply rate" },
                  { label: "Est. revenue", value: `R${((segment?.count ?? 0) * 0.37 * 0.25 * 420).toLocaleString()}`, sub: "at 25% booking rate", green: true },
                ].map((p) => (
                  <div key={p.label} className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-[#475569]">{p.label}</div>
                      <div className="text-[10px] text-[#94A3B8]">{p.sub}</div>
                    </div>
                    <div className={`text-sm font-bold ${p.green ? "text-[#0D7A4E]" : "text-[#1E293B]"}`}>{p.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 72hr window note */}
            <div className="bg-[#F0FDF4] rounded-2xl border border-[#86EFAC] p-4">
              <div className="flex items-start gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-xs font-bold text-[#065A38]">72-hour Free Window</p>
                  <p className="text-[11px] text-[#16A34A] mt-0.5">When a contact messages you first (via CTWA ad), you have 72 hours to send unlimited free follow-up messages. After that, use approved templates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEMPLATES */}
      {tab === "templates" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#64748B]">{TEMPLATES.length} approved templates ready to use</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">
              <Plus size={14} /> New Template
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {TEMPLATES.map((t) => (
              <div key={t.id} className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all hover:shadow-sm ${selectedTemplate === t.id ? "border-[#25D366]" : "border-[#E2E8F0]"}`} onClick={() => setSelectedTemplate(t.id)}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5EE] text-[#0D7A4E]">{t.category}</span>
                  {selectedTemplate === t.id && <CheckCheck size={14} className="text-[#25D366]" />}
                </div>
                <h4 className="font-bold text-[#1E293B] text-sm mb-2">{t.name}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4 line-clamp-3">{t.preview}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#F8FAFC] rounded-lg p-2">
                    <div className="text-xs font-bold text-[#1E293B]">{t.deliveryRate}%</div>
                    <div className="text-[9px] text-[#94A3B8]">Delivery</div>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-lg p-2">
                    <div className="text-xs font-bold text-[#0D7A4E]">{t.openRate}%</div>
                    <div className="text-[9px] text-[#94A3B8]">Open rate</div>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-lg p-2">
                    <div className="text-xs font-bold text-[#25D366]">{t.replyRate}%</div>
                    <div className="text-[9px] text-[#94A3B8]">Reply rate</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HISTORY */}
      {tab === "history" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F1F5F9] bg-[#FAFBFC]">
                  {["Campaign", "Segment", "Sent", "Delivered", "Opened", "Replies", "Revenue", "Date"].map((h) => (
                    <th key={h} className={`px-4 py-3 text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider ${h === "Campaign" ? "text-left" : "text-right"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BROADCASTS.map((b) => (
                  <tr key={b.id} className="border-b border-[#F8FAFC] hover:bg-[#FAFBFC]">
                    <td className="px-4 py-3 text-xs font-semibold text-[#1E293B]">{b.name}</td>
                    <td className="px-4 py-3 text-right text-xs text-[#64748B]">{b.segment}</td>
                    <td className="px-4 py-3 text-right text-xs text-[#64748B]">{b.sent}</td>
                    <td className="px-4 py-3 text-right text-xs text-[#64748B]">{b.delivered}</td>
                    <td className="px-4 py-3 text-right text-xs font-semibold text-[#0D7A4E]">{b.opened}</td>
                    <td className="px-4 py-3 text-right text-xs font-semibold text-[#25D366]">{b.replies}</td>
                    <td className="px-4 py-3 text-right text-xs font-bold text-[#1E293B]">R{b.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-[10px] text-[#94A3B8]">{b.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CATALOGUE */}
      {tab === "catalogue" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#1E293B]">WhatsApp Product Catalogue</h3>
              <p className="text-sm text-[#64748B]">Share your services and prices directly in WhatsApp chats</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">
              <Plus size={14} /> Add Service
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "Free Consultation", price: "R0", desc: "30-min new patient consultation. No obligation.", bookings: 89 },
              { name: "Teeth Whitening", price: "R1,800", desc: "In-chair professional whitening. Results in 1 hour.", bookings: 54 },
              { name: "General Cleaning", price: "R650", desc: "Full scale and polish with hygienist.", bookings: 112 },
              { name: "Family Package", price: "R2,200", desc: "2 adults + 2 kids cleaning and checkup.", bookings: 34 },
              { name: "Emergency Visit", price: "R450", desc: "Same-day pain relief appointment.", bookings: 28 },
              { name: "Monthly Plan", price: "R299/mo", desc: "Unlimited cleanings + priority booking + 20% off treatments.", bookings: 19 },
            ].map((s) => (
              <div key={s.name} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 hover:shadow-sm transition-shadow">
                <div className="bg-[#F1F5F9] rounded-xl h-24 flex items-center justify-center mb-3">
                  <ShoppingBag size={24} className="text-[#CBD5E1]" />
                </div>
                <h4 className="font-bold text-[#1E293B] text-sm">{s.name}</h4>
                <p className="text-lg font-bold text-[#0D7A4E] my-1">{s.price}</p>
                <p className="text-[11px] text-[#64748B] mb-3">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#94A3B8]">{s.bookings} bookings</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9]"><Link2 size={12} className="text-[#64748B]" /></button>
                    <button className="px-2.5 py-1.5 bg-[#25D366] text-white rounded-lg text-[10px] font-bold hover:opacity-90">Share</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
