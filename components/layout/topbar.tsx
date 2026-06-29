"use client";

import { Bell, Search, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/contacts": "Contacts",
  "/dashboard/pipeline": "Pipeline",
  "/dashboard/unibox": "Unibox",
  "/dashboard/whatsapp": "WhatsApp",
  "/dashboard/bookings": "Bookings",
  "/dashboard/orders": "Orders",
  "/dashboard/inventory": "Inventory",
  "/dashboard/automations": "Automations",
  "/dashboard/forms": "Forms",
  "/dashboard/funnels": "Funnels",
  "/dashboard/ads": "Ads Manager",
  "/dashboard/social": "Social Hub",
  "/dashboard/website": "Website",
  "/dashboard/website/builder": "AI Website Builder",
  "/dashboard/analytics": "Analytics",
  "/dashboard/team": "Team",
  "/dashboard/settings": "Settings",
};

const pageSubtitles: Record<string, string> = {
  "/dashboard": "Friday, 27 June 2026",
  "/dashboard/contacts": "All your contacts in one place",
  "/dashboard/pipeline": "Drag and drop to move deals",
  "/dashboard/unibox": "9 unread messages across all platforms",
  "/dashboard/whatsapp": "Broadcasts, templates, catalogue & API — SA's #1 channel",
  "/dashboard/bookings": "View and manage appointments",
  "/dashboard/orders": "Track, pack and ship customer orders",
  "/dashboard/inventory": "Products, stock levels and SKU management",
  "/dashboard/automations": "Automated workflows powered by n8n",
  "/dashboard/forms": "Lead capture forms and landing pages",
  "/dashboard/funnels": "Visual sales funnels with conversion tracking",
  "/dashboard/ads": "Meta Ads — Facebook & Instagram campaigns",
  "/dashboard/social": "Multi-platform social media + competitor research",
  "/dashboard/website": "Track traffic, conversions, and sales from your website",
  "/dashboard/website/builder": "Generate a full website with Claude AI in seconds",
  "/dashboard/analytics": "Track what's working",
  "/dashboard/team": "Manage your team and roles",
  "/dashboard/settings": "Configure your account",
};

export function Topbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";
  const subtitle = pageSubtitles[pathname] ?? "";

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 shrink-0">
      <div>
        <h1 className="font-bold text-[#1E293B] text-lg leading-none">{title}</h1>
        {subtitle && <p className="text-[#64748B] text-xs mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search contacts, deals... (Ctrl+K)"
            className="pl-9 pr-4 py-2 bg-[#F1F5F9] border border-transparent rounded-xl text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E] focus:bg-white w-72"
          />
        </div>
        <button className="relative p-2.5 rounded-xl hover:bg-[#F1F5F9] transition-colors">
          <Bell size={18} className="text-[#64748B]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>
        <button className="bg-[#0D7A4E] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors flex items-center gap-1.5">
          <Plus size={15} />
          New
        </button>
      </div>
    </header>
  );
}
