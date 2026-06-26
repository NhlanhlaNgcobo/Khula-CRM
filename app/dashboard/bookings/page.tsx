"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, Check, X, AlertCircle, Calendar, List, Settings } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const bookings = [
  { id: 1, contact: "Sipho Dlamini", service: "Consultation", start: 9, duration: 1, day: 1, color: "#3B82F6", status: "confirmed", price: "R350" },
  { id: 2, contact: "Fatima Patel", service: "Teeth Cleaning", start: 10, duration: 1, day: 1, color: "#8B5CF6", status: "confirmed", price: "R750" },
  { id: 3, contact: "Nomsa Khumalo", service: "Whitening", start: 14, duration: 1.5, day: 2, color: "#0D7A4E", status: "confirmed", price: "R2,200" },
  { id: 4, contact: "Riaan van der Berg", service: "Consultation", start: 9, duration: 1, day: 3, color: "#3B82F6", status: "completed", price: "R350" },
  { id: 5, contact: "Thabo Mokoena", service: "Teeth Cleaning", start: 11, duration: 1, day: 3, color: "#10B981", status: "completed", price: "R750" },
  { id: 6, contact: "Lerato Sithole", service: "Whitening", start: 10, duration: 1.5, day: 4, color: "#EF4444", status: "no_show", price: "R2,200" },
  { id: 7, contact: "Ayanda Nkosi", service: "Consultation", start: 15, duration: 1, day: 4, color: "#EC4899", status: "confirmed", price: "R350" },
  { id: 8, contact: "Johannes Botha", service: "Teeth Cleaning", start: 13, duration: 1, day: 5, color: "#6366F1", status: "confirmed", price: "R750" },
];

const services = [
  { name: "Consultation", duration: "30 min", price: "R350", bookings: 12, color: "#3B82F6" },
  { name: "Teeth Cleaning", duration: "60 min", price: "R750", bookings: 8, color: "#8B5CF6" },
  { name: "Whitening Treatment", duration: "90 min", price: "R2,200", bookings: 5, color: "#0D7A4E" },
];

const statusStyles: Record<string, { bg: string; text: string; label: string; icon: React.ComponentType<{ size: number }> }> = {
  confirmed: { bg: "#EFF6FF", text: "#2563EB", label: "Confirmed", icon: Clock },
  completed: { bg: "#DCFCE7", text: "#16A34A", label: "Completed", icon: Check },
  no_show: { bg: "#FEE2E2", text: "#DC2626", label: "No Show", icon: X },
  cancelled: { bg: "#F1F5F9", text: "#64748B", label: "Cancelled", icon: AlertCircle },
};

export default function BookingsPage() {
  const [view, setView] = useState<"calendar" | "list" | "services">("calendar");

  const getBookingsForSlot = (day: number, hour: number) =>
    bookings.filter((b) => b.day === day && b.start === hour);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[["This Week", "23", "#0D7A4E"], ["Completed", "14", "#10B981"], ["Upcoming", "7", "#3B82F6"], ["No-Shows", "2", "#EF4444"]].map(([label, val, color]) => (
          <div key={label as string} className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
            <div className="text-2xl font-bold" style={{ color: color as string }}>{val}</div>
            <div className="text-sm text-[#64748B]">{label}</div>
          </div>
        ))}
      </div>

      {/* View tabs + actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1">
          {([["calendar", Calendar, "Calendar"], ["list", List, "List"], ["services", Settings, "Services"]] as [string, React.ComponentType<{size: number}>, string][]).map(([v, Icon, label]) => (
            <button key={v} onClick={() => setView(v as typeof view)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === v ? "bg-[#0D7A4E] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}>
              <Icon size={14} />{label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors"><ChevronLeft size={16} className="text-[#64748B]" /></button>
          <span className="text-sm font-semibold text-[#1E293B] px-2">24–29 Jun 2025</span>
          <button className="p-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors"><ChevronRight size={16} className="text-[#64748B]" /></button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">
            <Plus size={14} /> New Booking
          </button>
        </div>
      </div>

      {/* Calendar view */}
      {view === "calendar" && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          {/* Day headers */}
          <div className="grid border-b border-[#E2E8F0]" style={{ gridTemplateColumns: "60px repeat(6, 1fr)" }}>
            <div className="border-r border-[#E2E8F0]"></div>
            {DAYS.map((day, i) => (
              <div key={day} className={`px-3 py-3 text-center border-r border-[#E2E8F0] last:border-r-0 ${i === 0 ? "bg-[#E8F5EE]" : ""}`}>
                <div className="text-xs text-[#94A3B8] font-medium">{day}</div>
                <div className={`text-lg font-bold mt-0.5 ${i === 0 ? "text-[#0D7A4E]" : "text-[#1E293B]"}`}>{24 + i}</div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div className="overflow-y-auto max-h-[500px]">
            {HOURS.map((hour) => (
              <div key={hour} className="grid border-b border-[#F1F5F9] last:border-b-0" style={{ gridTemplateColumns: "60px repeat(6, 1fr)", minHeight: "64px" }}>
                <div className="border-r border-[#E2E8F0] px-3 py-2 text-right text-xs text-[#94A3B8] shrink-0">{hour}:00</div>
                {DAYS.map((_, dayIdx) => {
                  const slotBookings = getBookingsForSlot(dayIdx + 1, hour);
                  return (
                    <div key={dayIdx} className={`border-r border-[#F1F5F9] last:border-r-0 p-1 ${dayIdx === 0 ? "bg-[#FAFFF8]" : ""} hover:bg-[#F8FAFC] cursor-pointer transition-colors`}>
                      {slotBookings.map((b) => (
                        <div key={b.id} className="rounded-lg px-2 py-1.5 text-white text-xs mb-1 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: b.color }}>
                          <div className="font-semibold truncate">{b.contact}</div>
                          <div className="opacity-80 truncate">{b.service}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <tr>
                {["Contact", "Service", "Date & Time", "Duration", "Price", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-[#374151]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const s = statusStyles[b.status];
                return (
                  <tr key={b.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: b.color }}>
                          {b.contact.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-medium text-[#1E293B]">{b.contact}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[#64748B]">{b.service}</td>
                    <td className="px-4 py-3.5 text-[#64748B]">Jun {23 + b.day}, {b.start}:00</td>
                    <td className="px-4 py-3.5 text-[#64748B]">{b.duration * 60}min</td>
                    <td className="px-4 py-3.5 font-semibold text-[#1E293B]">{b.price}</td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-fit" style={{ background: s.bg, color: s.text }}>
                        <s.icon size={11} /> {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="text-xs px-2.5 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-lg hover:bg-[#BBF7D0] transition-colors font-medium">Complete</button>
                        <button className="text-xs px-2.5 py-1 bg-[#FEE2E2] text-[#DC2626] rounded-lg hover:bg-[#FECACA] transition-colors font-medium">No-show</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Services view */}
      {view === "services" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.name} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:border-[#0D7A4E] hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: s.color + "20" }}>
                <Calendar size={20} style={{ color: s.color }} />
              </div>
              <h3 className="font-bold text-[#1E293B] mb-1">{s.name}</h3>
              <div className="text-[#64748B] text-sm mb-4 space-y-1">
                <div>Duration: {s.duration}</div>
                <div className="font-semibold text-[#1E293B]">{s.price}</div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <span className="text-xs text-[#94A3B8]">{s.bookings} bookings this month</span>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 bg-[#F1F5F9] text-[#64748B] rounded-lg hover:bg-[#E2E8F0] transition-colors">Edit</button>
                  <button className="text-xs px-3 py-1.5 bg-[#0D7A4E] text-white rounded-lg hover:bg-[#065A38] transition-colors">Share Link</button>
                </div>
              </div>
            </div>
          ))}
          <button className="bg-white rounded-2xl border-2 border-dashed border-[#E2E8F0] p-6 flex flex-col items-center justify-center gap-3 hover:border-[#0D7A4E] hover:text-[#0D7A4E] text-[#94A3B8] transition-colors cursor-pointer">
            <Plus size={24} />
            <span className="text-sm font-semibold">Add New Service</span>
          </button>
        </div>
      )}
    </div>
  );
}
