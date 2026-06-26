"use client";

import { useState } from "react";
import { Zap, Plus, Play, Pause, BarChart2, Clock, CheckCircle2, MessageSquare, Calendar, RefreshCw, Star, Cake, Bell } from "lucide-react";

const activeAutomations = [
  { id: 1, name: "New Lead Welcome", trigger: "New contact added to pipeline", runs: 142, success: 139, lastRun: "2 min ago", active: true, icon: MessageSquare, color: "#0D7A4E" },
  { id: 2, name: "Booking Confirmation", trigger: "Booking status → confirmed", runs: 89, success: 88, lastRun: "8 min ago", active: true, icon: Calendar, color: "#8B5CF6" },
  { id: 3, name: "24-Hour Reminder", trigger: "Booking starts in 24 hours", runs: 201, success: 198, lastRun: "1 hour ago", active: true, icon: Clock, color: "#3B82F6" },
  { id: 4, name: "30-Day Re-Engagement", trigger: "Deal stage → Closed Lost", runs: 34, success: 31, lastRun: "2 days ago", active: true, icon: RefreshCw, color: "#F59E0B" },
];

const templates = [
  { id: "t1", name: "New Lead Welcome", desc: "Auto WhatsApp greeting when a contact enters the pipeline", icon: MessageSquare, color: "#0D7A4E", category: "Sales", activated: true },
  { id: "t2", name: "Booking Confirmation", desc: "Instant WhatsApp + email when an appointment is confirmed", icon: Calendar, color: "#8B5CF6", category: "Bookings", activated: true },
  { id: "t3", name: "24-Hour Reminder", desc: "Reminder message 24 hours before any booking", icon: Clock, color: "#3B82F6", category: "Bookings", activated: true },
  { id: "t4", name: "1-Hour Reminder", desc: "Final reminder with address & Google Maps link", icon: Bell, color: "#6366F1", category: "Bookings", activated: false },
  { id: "t5", name: "No-Show Follow-Up", desc: "WhatsApp message 30 min after a missed appointment", icon: Calendar, color: "#EF4444", category: "Bookings", activated: false },
  { id: "t6", name: "Deal Won Celebration", desc: "Personalised thank-you + team Slack notification", icon: Star, color: "#F59E0B", category: "Sales", activated: false },
  { id: "t7", name: "30-Day Re-Engagement", desc: "Follow up with Closed Lost contacts after 30 days", icon: RefreshCw, color: "#F59E0B", category: "Re-engagement", activated: true },
  { id: "t8", name: "Inactive Lead Nudge", desc: "Check-in message for contacts with no activity in 14 days", icon: Zap, color: "#0EA5E9", category: "Re-engagement", activated: false },
  { id: "t9", name: "Google Review Request", desc: "WhatsApp review link 2 hours after service completion", icon: Star, color: "#EC4899", category: "Reviews", activated: false },
  { id: "t10", name: "New Form Submission Alert", desc: "Instant WhatsApp/Slack alert when a lead form is submitted", icon: Bell, color: "#10B981", category: "Sales", activated: false },
];

export default function AutomationsPage() {
  const [automations, setAutomations] = useState(activeAutomations);
  const [activatedIds, setActivatedIds] = useState<string[]>(["t1", "t2", "t3", "t7"]);

  const toggleActive = (id: number) => {
    setAutomations((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  };

  const activate = (id: string) => {
    setActivatedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          ["Active Workflows", automations.filter(a => a.active).length.toString(), "#0D7A4E"],
          ["Total Runs", "466", "#3B82F6"],
          ["Success Rate", "97.8%", "#10B981"],
          ["Messages Sent", "428", "#8B5CF6"],
        ].map(([label, val, color]) => (
          <div key={label as string} className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
            <div className="text-2xl font-bold" style={{ color: color as string }}>{val}</div>
            <div className="text-sm text-[#64748B]">{label}</div>
          </div>
        ))}
      </div>

      {/* Active automations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#1E293B] text-lg">Active Automations</h3>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">
            <Plus size={14} /> New Workflow
          </button>
        </div>
        <div className="space-y-3">
          {automations.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: a.color + "20" }}>
                <a.icon size={20} style={{ color: a.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-[#1E293B]">{a.name}</span>
                  {a.active && <span className="flex items-center gap-1 text-[10px] font-bold text-[#0D7A4E] bg-[#E8F5EE] px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-[#0D7A4E] animate-pulse"></span>LIVE</span>}
                </div>
                <p className="text-sm text-[#64748B] truncate">{a.trigger}</p>
              </div>
              <div className="flex items-center gap-6 text-center shrink-0">
                <div>
                  <div className="text-lg font-bold text-[#1E293B]">{a.runs}</div>
                  <div className="text-[10px] text-[#94A3B8]">Total Runs</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#10B981]">{Math.round((a.success / a.runs) * 100)}%</div>
                  <div className="text-[10px] text-[#94A3B8]">Success</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-[#64748B]">{a.lastRun}</div>
                  <div className="text-[10px] text-[#94A3B8]">Last run</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors">
                  <BarChart2 size={16} className="text-[#94A3B8]" />
                </button>
                <button onClick={() => toggleActive(a.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${a.active ? "bg-[#E8F5EE] text-[#0D7A4E] hover:bg-[#D1FAE5]" : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"}`}>
                  {a.active ? <><Pause size={13} /> On</> : <><Play size={13} /> Off</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template library */}
      <div>
        <h3 className="font-bold text-[#1E293B] text-lg mb-4">Template Library</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {templates.map((t) => {
            const isActive = activatedIds.includes(t.id);
            return (
              <div key={t.id} className={`bg-white rounded-2xl border-2 p-5 transition-all ${isActive ? "border-[#0D7A4E]" : "border-[#E2E8F0] hover:border-[#A7D7BF]"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: t.color + "20" }}>
                    <t.icon size={18} style={{ color: t.color }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[#F1F5F9] text-[#64748B]">{t.category}</span>
                </div>
                <h4 className="font-semibold text-[#1E293B] mb-1">{t.name}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">{t.desc}</p>
                <button onClick={() => activate(t.id)}
                  className={`w-full py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${isActive ? "bg-[#E8F5EE] text-[#0D7A4E] hover:bg-[#D1FAE5]" : "bg-[#0D7A4E] text-white hover:bg-[#065A38]"}`}>
                  {isActive ? <><CheckCircle2 size={14} /> Activated</> : <><Zap size={14} /> Activate</>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
