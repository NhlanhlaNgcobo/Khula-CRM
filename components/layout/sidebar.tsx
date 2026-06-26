"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Kanban, Inbox, Calendar,
  Zap, FileText, BarChart3, UserCheck, Settings, LogOut,
  ChevronRight, Filter, Megaphone, Globe, Sparkles, MessageCircle
} from "lucide-react";
import { Logo } from "@/components/logo";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
  exact?: boolean;
  badge?: number;
  isNew?: boolean;
};

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Core",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", exact: true },
      { href: "/dashboard/contacts", icon: Users, label: "Contacts" },
      { href: "/dashboard/pipeline", icon: Kanban, label: "Pipeline" },
    ],
  },
  {
    label: "Conversations",
    items: [
      { href: "/dashboard/unibox", icon: Inbox, label: "Unibox", badge: 9, isNew: true },
      { href: "/dashboard/whatsapp", icon: MessageCircle, label: "WhatsApp", isNew: true },
    ],
  },
  {
    label: "Convert",
    items: [
      { href: "/dashboard/funnels", icon: Filter, label: "Funnels", isNew: true },
      { href: "/dashboard/bookings", icon: Calendar, label: "Bookings" },
      { href: "/dashboard/forms", icon: FileText, label: "Forms" },
      { href: "/dashboard/automations", icon: Zap, label: "Automations" },
    ],
  },
  {
    label: "Grow",
    items: [
      { href: "/dashboard/ads", icon: Megaphone, label: "Ads", isNew: true },
      { href: "/dashboard/social", icon: Globe, label: "Social Hub", isNew: true },
      { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    label: "Manage",
    items: [
      { href: "/dashboard/team", icon: UserCheck, label: "Team" },
      { href: "/dashboard/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-60 shrink-0 bg-[#0D7A4E] flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#0FA863]/40">
        <Logo size="sm" variant="light" />
        <div className="mt-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></div>
          <span className="text-[10px] text-[#A7D7BF] font-medium truncate">Cape Town Dental Studio</span>
        </div>
      </div>

      {/* Plan badge */}
      <div className="px-5 py-2.5 border-b border-[#0FA863]/40">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-[#0FA863]/30 text-[#A7D7BF] px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
          GROW Plan
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#0FA863]/70 px-3 mb-1.5">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map(({ href, icon: Icon, label, badge, exact, isNew }) => {
                const active = isActive(href, exact);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                      active ? "bg-white/15 text-white" : "text-[#A7D7BF] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={16} className={active ? "text-white" : "text-[#A7D7BF] group-hover:text-white"} />
                    <span className="flex-1 truncate">{label}</span>
                    {isNew && !badge && (
                      <span className="text-[9px] font-bold bg-[#4ADE80] text-[#065A38] px-1.5 py-0.5 rounded-full shrink-0">NEW</span>
                    )}
                    {badge && (
                      <span className="bg-[#EF4444] text-white text-[9px] font-bold min-w-[17px] h-[17px] flex items-center justify-center rounded-full px-1 shrink-0">
                        {badge}
                      </span>
                    )}
                    {active && !badge && !isNew && <ChevronRight size={11} className="text-white/60 shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* AI badge */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-[#0FA863]/20 rounded-xl px-3 py-2.5">
          <Sparkles size={13} className="text-[#4ADE80]" />
          <div>
            <p className="text-[10px] font-bold text-white">Claude AI Active</p>
            <p className="text-[9px] text-[#A7D7BF]">Sonnet 4.6 · Smart replies on</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-3 pb-4 border-t border-[#0FA863]/40 pt-3">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 cursor-pointer group transition-colors">
          <div className="w-7 h-7 rounded-full bg-[#0FA863]/40 flex items-center justify-center text-white font-bold text-[10px] shrink-0">SD</div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">Sipho Dlamini</div>
            <div className="text-[#A7D7BF] text-[10px] truncate">Owner</div>
          </div>
          <LogOut size={13} className="text-[#A7D7BF] group-hover:text-white shrink-0" />
        </div>
      </div>
    </aside>
  );
}
