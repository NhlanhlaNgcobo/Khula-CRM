"use client";

import { useState } from "react";
import { Plus, Mail, MoreHorizontal, Shield, UserCheck, Eye, Crown } from "lucide-react";

const members = [
  { id: 1, name: "Sipho Dlamini", email: "sipho@capetowndental.co.za", role: "owner", avatar: "SD", color: "#0D7A4E", joinedDate: "Jan 2025", lastActive: "Now", deals: 8, bookings: 12 },
  { id: 2, name: "Karin Potgieter", email: "karin@capetowndental.co.za", role: "admin", avatar: "KP", color: "#8B5CF6", joinedDate: "Feb 2025", lastActive: "5min ago", deals: 4, bookings: 9 },
  { id: 3, name: "Zinhle Mthembu", email: "zinhle@capetowndental.co.za", role: "sales_rep", avatar: "ZM", color: "#3B82F6", joinedDate: "Mar 2025", lastActive: "1h ago", deals: 2, bookings: 14 },
];

const roleConfig: Record<string, { label: string; color: string; bg: string; icon: React.ComponentType<{ size: number; color?: string }> }> = {
  owner: { label: "Owner", color: "#D97706", bg: "#FEF3C7", icon: Crown },
  admin: { label: "Admin", color: "#7C3AED", bg: "#EDE9FE", icon: Shield },
  sales_rep: { label: "Sales Rep", color: "#2563EB", bg: "#DBEAFE", icon: UserCheck },
  viewer: { label: "Viewer", color: "#64748B", bg: "#F1F5F9", icon: Eye },
};

const rolePermissions = {
  owner: ["All features", "Billing & subscription", "Invite & remove team", "All data access"],
  admin: ["All features", "Invite team members", "All data access", "No billing access"],
  sales_rep: ["Contacts, deals, inbox", "Bookings", "Own data only", "No team management"],
  viewer: ["Read-only access", "No edits or deletions", "No team management", "No billing"],
};

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("sales_rep");
  const [sent, setSent] = useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setShowInvite(false); setInviteEmail(""); }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#64748B] text-sm">3 of 3 seats used on GROW plan</p>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3].map((i) => <div key={i} className="w-8 h-1.5 rounded-full bg-[#0D7A4E]"></div>)}
          </div>
        </div>
        <button onClick={() => setShowInvite(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">
          <Plus size={14} /> Invite Member
        </button>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowInvite(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-[#1E293B] text-lg mb-5">Invite Team Member</h3>
            {sent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-3">
                  <Mail size={24} className="text-[#0D7A4E]" />
                </div>
                <p className="font-semibold text-[#1E293B]">Invite sent!</p>
                <p className="text-[#64748B] text-sm mt-1">{inviteEmail}</p>
              </div>
            ) : (
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Email address</label>
                  <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@business.co.za" required
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Role</label>
                  <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]">
                    <option value="admin">Admin</option>
                    <option value="sales_rep">Sales Rep</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-3">
                  <p className="text-xs font-semibold text-[#374151] mb-1.5">This role can:</p>
                  {rolePermissions[inviteRole as keyof typeof rolePermissions]?.map((p) => (
                    <p key={p} className="text-xs text-[#64748B] flex items-center gap-1.5"><span className="text-[#0D7A4E]">✓</span>{p}</p>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowInvite(false)} className="flex-1 py-3 bg-[#F1F5F9] text-[#64748B] rounded-xl text-sm font-semibold hover:bg-[#E2E8F0] transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">Send Invite</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Members table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <h3 className="font-semibold text-[#1E293B]">Team Members</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E2E8F0]">
              {["Member", "Role", "Joined", "Last Active", "Deals", "Bookings", ""].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#94A3B8]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => {
              const rc = roleConfig[m.role];
              return (
                <tr key={m.id} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: m.color }}>{m.avatar}</div>
                      <div>
                        <div className="font-semibold text-[#1E293B]">{m.name}</div>
                        <div className="text-xs text-[#94A3B8]">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-fit" style={{ background: rc.bg, color: rc.color }}>
                      <rc.icon size={11} />{rc.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#64748B] text-xs">{m.joinedDate}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${m.lastActive === "Now" ? "bg-[#10B981]" : "bg-[#CBD5E1]"}`}></div>
                      <span className="text-xs text-[#64748B]">{m.lastActive}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#1E293B]">{m.deals}</td>
                  <td className="px-5 py-4 font-semibold text-[#1E293B]">{m.bookings}</td>
                  <td className="px-5 py-4">
                    {m.role !== "owner" && (
                      <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"><MoreHorizontal size={15} className="text-[#94A3B8]" /></button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Roles guide */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
        <h3 className="font-semibold text-[#1E293B] mb-4">Role Permissions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(roleConfig).map(([key, rc]) => (
            <div key={key} className="rounded-xl p-4 border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg" style={{ background: rc.bg }}>
                  <rc.icon size={14} color={rc.color} />
                </div>
                <span className="font-semibold text-[#1E293B] text-sm">{rc.label}</span>
              </div>
              <ul className="space-y-1.5">
                {rolePermissions[key as keyof typeof rolePermissions].map((p) => (
                  <li key={p} className="text-xs text-[#64748B] flex items-start gap-1.5">
                    <span className="text-[#0D7A4E] mt-0.5">✓</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
