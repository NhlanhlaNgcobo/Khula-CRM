"use client";

import { useState } from "react";
import { Check, ExternalLink, ChevronRight, Bell, Globe, CreditCard, Sliders } from "lucide-react";

const tabs = ["Business Profile", "Integrations", "Notifications", "Billing", "Custom Fields"];

const integrations = [
  { name: "WhatsApp Business", icon: "💬", status: "connected", description: "Sending & receiving messages via Meta API", badge: "1,000 free/mo" },
  { name: "Gmail", icon: "✉️", status: "connected", description: "sipho@capetowndental.co.za", badge: "Connected" },
  { name: "PayFast", icon: "💳", status: "connected", description: "Merchant ID: 12345678", badge: "Live" },
  { name: "Clickatell SMS", icon: "📱", status: "not_connected", description: "Send and receive SMS to South African numbers", badge: "R0.65/SMS" },
  { name: "Slack", icon: "🔔", status: "not_connected", description: "Get deal and booking notifications in Slack", badge: "Free" },
  { name: "Google Calendar", icon: "📅", status: "not_connected", description: "Sync bookings to your Google Calendar", badge: "Free" },
];

const plans = [
  { id: "spark", name: "SPARK", price: "Free", users: 1, contacts: 50, current: false },
  { id: "grow", name: "GROW", price: "R259/mo", users: 3, contacts: 500, current: true },
  { id: "scale", name: "SCALE", price: "R499/mo", users: 10, contacts: 5000, current: false },
];

const invoices = [
  { date: "1 Jun 2025", amount: "R259.00", plan: "GROW", status: "paid" },
  { date: "1 May 2025", amount: "R259.00", plan: "GROW", status: "paid" },
  { date: "1 Apr 2025", amount: "R259.00", plan: "GROW", status: "paid" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Business Profile");
  const [form, setForm] = useState({
    businessName: "Cape Town Dental Studio",
    phone: "+27 21 555 1234",
    whatsapp: "+27 82 123 4567",
    email: "hello@capetowndental.co.za",
    city: "Cape Town",
    industry: "Health & Beauty",
    timezone: "Africa/Johannesburg",
  });
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex gap-6">
      {/* Sidebar tabs */}
      <div className="w-52 shrink-0">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-2">
          {tabs.map((t) => {
            const icons: Record<string, typeof Bell> = { "Integrations": Globe, "Notifications": Bell, "Billing": CreditCard, "Custom Fields": Sliders };
            const Icon = icons[t];
            return (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${activeTab === t ? "bg-[#E8F5EE] text-[#0D7A4E]" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}>
                {Icon && <Icon size={15} />}
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {activeTab === "Business Profile" && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-[#1E293B] text-lg">Business Profile</h3>
              <button onClick={save} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${saved ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#0D7A4E] text-white hover:bg-[#065A38]"}`}>
                {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
              </button>
            </div>
            {/* Logo upload */}
            <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <div className="w-16 h-16 rounded-xl bg-[#0D7A4E] flex items-center justify-center text-white font-bold text-xl">CT</div>
              <div>
                <p className="font-medium text-[#1E293B] text-sm">Business Logo</p>
                <p className="text-[#64748B] text-xs mb-2">PNG, JPG. Max 2MB.</p>
                <button className="text-xs px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[#64748B] hover:bg-[#E2E8F0] transition-colors">Upload Logo</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Business Name", "businessName"],
                ["Phone Number", "phone"],
                ["WhatsApp Number", "whatsapp"],
                ["Email Address", "email"],
                ["City", "city"],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{label}</label>
                  <input value={form[key as keyof typeof form]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">Industry</label>
                <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]">
                  {["Health & Beauty", "Property", "Professional Services", "Automotive", "Education", "Retail", "Food & Beverage", "Construction"].map((i) => <option key={i}>{i}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">Your Subdomain</label>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <span className="font-semibold text-[#0D7A4E]">capetowndental</span>
                <span className="text-[#64748B]">.khulacr m.co.za</span>
                <button className="ml-auto"><ExternalLink size={14} className="text-[#94A3B8]" /></button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Integrations" && (
          <div className="space-y-4">
            {integrations.map((int) => (
              <div key={int.name} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-2xl shrink-0">{int.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-[#1E293B]">{int.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${int.status === "connected" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F1F5F9] text-[#94A3B8]"}`}>
                      {int.badge}
                    </span>
                  </div>
                  <p className="text-sm text-[#64748B]">{int.description}</p>
                </div>
                <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${int.status === "connected" ? "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]" : "bg-[#0D7A4E] text-white hover:bg-[#065A38]"}`}>
                  {int.status === "connected" ? "Configure" : <><ChevronRight size={13} /> Connect</>}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Billing" && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <h3 className="font-bold text-[#1E293B] text-lg mb-4">Current Plan</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {plans.map((p) => (
                  <div key={p.id} className={`rounded-2xl border-2 p-4 cursor-pointer transition-all ${p.current ? "border-[#0D7A4E] bg-[#E8F5EE]" : "border-[#E2E8F0] hover:border-[#A7D7BF]"}`}>
                    {p.current && <div className="text-[10px] font-bold text-[#0D7A4E] mb-1">CURRENT PLAN</div>}
                    <div className="font-bold text-[#1E293B] mb-0.5">{p.name}</div>
                    <div className="text-lg font-bold text-[#0D7A4E]">{p.price}</div>
                    <div className="text-xs text-[#64748B] mt-2">{p.users} users · {p.contacts.toLocaleString()} contacts</div>
                    {!p.current && (
                      <button className="mt-3 w-full py-2 bg-[#0D7A4E] text-white rounded-xl text-xs font-semibold hover:bg-[#065A38] transition-colors">
                        {plans.findIndex((x) => x.id === p.id) > plans.findIndex((x) => x.current) ? "Upgrade" : "Downgrade"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4 text-sm text-[#64748B]">
                Next billing date: <span className="font-semibold text-[#1E293B]">1 July 2025</span> · Amount: <span className="font-semibold text-[#0D7A4E]">R259.00</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <h3 className="font-bold text-[#1E293B] mb-4">Invoice History</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    {["Date", "Amount", "Plan", "Status", ""].map((h) => (
                      <th key={h} className="pb-3 text-left text-xs font-semibold text-[#94A3B8]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.date} className="border-b border-[#F1F5F9] last:border-0">
                      <td className="py-3 text-[#1E293B]">{inv.date}</td>
                      <td className="py-3 font-semibold text-[#1E293B]">{inv.amount}</td>
                      <td className="py-3 text-[#64748B]">{inv.plan}</td>
                      <td className="py-3"><span className="text-xs bg-[#DCFCE7] text-[#16A34A] px-2 py-0.5 rounded-full font-bold">Paid</span></td>
                      <td className="py-3"><button className="text-xs text-[#0D7A4E] hover:underline">Download PDF</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4">
            <h3 className="font-bold text-[#1E293B] text-lg mb-2">Notification Preferences</h3>
            {[
              { label: "New lead added", desc: "Get notified when a new contact enters the pipeline", whatsapp: true, email: true },
              { label: "New booking", desc: "Alert when a client books an appointment", whatsapp: true, email: false },
              { label: "Booking reminder", desc: "30 minutes before each appointment", whatsapp: true, email: false },
              { label: "Deal won", desc: "Celebrate when a deal moves to Closed Won", whatsapp: true, email: true },
              { label: "No-show alert", desc: "Notify when a client misses their appointment", whatsapp: true, email: false },
              { label: "Weekly summary", desc: "Weekly performance report every Monday morning", whatsapp: false, email: true },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-3 border-b border-[#F1F5F9] last:border-0">
                <div>
                  <p className="font-medium text-[#1E293B] text-sm">{n.label}</p>
                  <p className="text-xs text-[#94A3B8]">{n.desc}</p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 text-xs text-[#64748B]">
                    <input type="checkbox" defaultChecked={n.whatsapp} className="rounded" /> WhatsApp
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-[#64748B]">
                    <input type="checkbox" defaultChecked={n.email} className="rounded" /> Email
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Custom Fields" && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#1E293B] text-lg">Custom Contact Fields</h3>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">+ Add Field</button>
            </div>
            {[
              { name: "Medical Aid Number", type: "Text", required: false },
              { name: "Preferred Dentist", type: "Dropdown", required: false },
              { name: "Patient Since", type: "Date", required: false },
            ].map((f) => (
              <div key={f.name} className="flex items-center justify-between py-3 border-b border-[#F1F5F9] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] flex items-center justify-center text-[#0D7A4E] font-bold text-xs">T</div>
                  <div>
                    <p className="font-medium text-[#1E293B] text-sm">{f.name}</p>
                    <p className="text-xs text-[#94A3B8]">{f.type} field</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[#64748B] hover:bg-[#F1F5F9] transition-colors">Edit</button>
                  <button className="text-xs px-3 py-1.5 border border-[#FEE2E2] text-[#EF4444] rounded-lg hover:bg-[#FEE2E2] transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
