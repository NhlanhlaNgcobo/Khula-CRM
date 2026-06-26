"use client";

import { useState } from "react";
import { Search, Plus, Upload, Filter, MoreHorizontal, MessageSquare, Mail, Phone, Tag, Star } from "lucide-react";

const contacts = [
  { id: 1, name: "Sipho Dlamini", phone: "+27 82 345 6789", email: "sipho@gmail.com", company: "Dlamini Constructions", tags: ["Hot Lead", "VIP"], source: "WhatsApp", lastActivity: "2m ago", avatar: "SD", color: "#0D7A4E", value: "R25,000" },
  { id: 2, name: "Fatima Patel", phone: "+27 71 234 5678", email: "fatima@patelbiz.co.za", company: "Patel Holdings", tags: ["Booked"], source: "Form", lastActivity: "8m ago", avatar: "FP", color: "#8B5CF6", value: "R8,500" },
  { id: 3, name: "Riaan van der Berg", phone: "+27 83 456 7890", email: "riaan@vdberg.co.za", company: "VDB Logistics", tags: ["Interested"], source: "Referral", lastActivity: "25m ago", avatar: "RV", color: "#3B82F6", value: "R42,000" },
  { id: 4, name: "Nomsa Khumalo", phone: "+27 76 567 8901", email: "nomsa.k@yahoo.com", company: "", tags: ["Cold"], source: "Facebook", lastActivity: "1h ago", avatar: "NK", color: "#F59E0B", value: "" },
  { id: 5, name: "Thabo Mokoena", phone: "+27 64 678 9012", email: "thabo@mokoena.biz", company: "TM Trading", tags: ["Closed Won"], source: "WhatsApp", lastActivity: "2h ago", avatar: "TM", color: "#10B981", value: "R12,500" },
  { id: 6, name: "Lerato Sithole", phone: "+27 79 789 0123", email: "lerato@sithole.co.za", company: "Sithole Medical", tags: ["Hot Lead"], source: "Form", lastActivity: "3h ago", avatar: "LS", color: "#EF4444", value: "R18,000" },
  { id: 7, name: "Johannes Botha", phone: "+27 82 890 1234", email: "jbotha@gmail.com", company: "Botha & Sons", tags: ["Contacted"], source: "LinkedIn", lastActivity: "1d ago", avatar: "JB", color: "#6366F1", value: "R7,200" },
  { id: 8, name: "Ayanda Nkosi", phone: "+27 71 901 2345", email: "ayanda@nkosiconsult.co.za", company: "Nkosi Consulting", tags: ["VIP", "Booked"], source: "WhatsApp", lastActivity: "1d ago", avatar: "AN", color: "#EC4899", value: "R35,000" },
];

const tagColors: Record<string, string> = {
  "Hot Lead": "bg-[#FEE2E2] text-[#DC2626]",
  "VIP": "bg-[#FEF3C7] text-[#D97706]",
  "Booked": "bg-[#DCFCE7] text-[#16A34A]",
  "Interested": "bg-[#DBEAFE] text-[#2563EB]",
  "Contacted": "bg-[#E0E7FF] text-[#4338CA]",
  "Cold": "bg-[#F1F5F9] text-[#64748B]",
  "Closed Won": "bg-[#D1FAE5] text-[#065F46]",
  "Inactive": "bg-[#F1F5F9] text-[#94A3B8]",
};

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null);

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const toggle = (id: number) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  return (
    <div className="flex gap-6 h-full">
      {/* Main table */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search contacts..."
                className="pl-9 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E] w-64"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
              <Filter size={14} /> Filter
            </button>
          </div>
          <div className="flex items-center gap-2">
            {selected.length > 0 && (
              <span className="text-sm text-[#64748B]">{selected.length} selected</span>
            )}
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
              <Upload size={14} /> Import CSV
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">
              <Plus size={14} /> Add Contact
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[["Total", contacts.length, "#64748B"], ["Hot Leads", 3, "#EF4444"], ["Booked", 2, "#0D7A4E"], ["VIP", 2, "#F59E0B"]].map(([label, count, color]) => (
            <div key={label as string} className="bg-white rounded-xl border border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-[#64748B]">{label}</span>
              <span className="font-bold" style={{ color: color as string }}>{count}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="w-10 px-4 py-3 text-left"><input type="checkbox" className="rounded" /></th>
                <th className="px-4 py-3 text-left font-semibold text-[#374151]">Contact</th>
                <th className="px-4 py-3 text-left font-semibold text-[#374151] hidden md:table-cell">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-[#374151] hidden lg:table-cell">Tags</th>
                <th className="px-4 py-3 text-left font-semibold text-[#374151] hidden xl:table-cell">Source</th>
                <th className="px-4 py-3 text-left font-semibold text-[#374151] hidden xl:table-cell">Value</th>
                <th className="px-4 py-3 text-left font-semibold text-[#374151]">Last Active</th>
                <th className="w-10 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedContact(c)}
                  className={`border-b border-[#F1F5F9] hover:bg-[#F8FAFC] cursor-pointer transition-colors ${selected.includes(c.id) ? "bg-[#E8F5EE]" : ""}`}
                >
                  <td className="px-4 py-3.5" onClick={(e) => { e.stopPropagation(); toggle(c.id); }}>
                    <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggle(c.id)} className="rounded" />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: c.color }}>
                        {c.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-[#1E293B]">{c.name}</div>
                        <div className="text-[#94A3B8] text-xs">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#64748B] hidden md:table-cell">{c.phone}</td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map((t) => (
                        <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[t] ?? "bg-[#F1F5F9] text-[#64748B]"}`}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#64748B] hidden xl:table-cell">{c.source}</td>
                  <td className="px-4 py-3.5 font-semibold text-[#1E293B] hidden xl:table-cell">{c.value || "—"}</td>
                  <td className="px-4 py-3.5 text-[#94A3B8] text-xs">{c.lastActivity}</td>
                  <td className="px-4 py-3.5">
                    <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"><MoreHorizontal size={15} className="text-[#94A3B8]" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-[#E2E8F0] flex items-center justify-between">
            <span className="text-xs text-[#94A3B8]">Showing {filtered.length} of {contacts.length} contacts</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-7 h-7 rounded-lg text-xs font-medium ${p === 1 ? "bg-[#0D7A4E] text-white" : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side panel */}
      {selectedContact && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] overflow-y-auto flex flex-col">
          <div className="p-5 border-b border-[#E2E8F0]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold" style={{ background: selectedContact.color }}>
                {selectedContact.avatar}
              </div>
              <button onClick={() => setSelectedContact(null)} className="text-[#94A3B8] hover:text-[#64748B] p-1">✕</button>
            </div>
            <h3 className="font-bold text-[#1E293B] text-lg">{selectedContact.name}</h3>
            {selectedContact.company && <p className="text-[#64748B] text-sm">{selectedContact.company}</p>}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {selectedContact.tags.map((t) => (
                <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[t] ?? "bg-[#F1F5F9] text-[#64748B]"}`}>{t}</span>
              ))}
            </div>
          </div>
          <div className="p-5 space-y-3">
            {[
              { icon: Phone, label: selectedContact.phone },
              { icon: Mail, label: selectedContact.email },
              { icon: Tag, label: `Source: ${selectedContact.source}` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm text-[#64748B]">
                <Icon size={15} className="text-[#94A3B8]" />
                {label}
              </div>
            ))}
            {selectedContact.value && (
              <div className="flex items-center gap-2.5 text-sm">
                <Star size={15} className="text-[#F59E0B]" />
                <span className="font-semibold text-[#1E293B]">{selectedContact.value} deal value</span>
              </div>
            )}
          </div>
          <div className="px-5 pb-5 flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">
              <MessageSquare size={14} /> WhatsApp
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#F1F5F9] text-[#1E293B] rounded-xl text-sm font-semibold hover:bg-[#E2E8F0] transition-colors">
              <Mail size={14} /> Email
            </button>
          </div>
          {/* Activity timeline */}
          <div className="px-5 pb-5 border-t border-[#E2E8F0] pt-4">
            <h4 className="font-semibold text-[#1E293B] text-sm mb-3">Activity Timeline</h4>
            {[
              { type: "whatsapp", text: "Replied to welcome message", time: "2m ago" },
              { type: "deal", text: "Added to pipeline — Interested", time: "1h ago" },
              { type: "form", text: "Submitted contact form", time: "2h ago" },
            ].map((a, i) => (
              <div key={i} className="flex gap-3 mb-3 last:mb-0">
                <div className="w-6 h-6 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#0D7A4E]"></div>
                </div>
                <div>
                  <p className="text-sm text-[#1E293B]">{a.text}</p>
                  <p className="text-xs text-[#94A3B8]">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
