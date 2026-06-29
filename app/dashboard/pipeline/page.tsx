"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Clock, ShoppingCart } from "lucide-react";
import { useBusinessType } from "@/lib/business-type-context";

type Stage = { id: string; name: string; color: string; bg: string; count: number; value: number };

const SERVICE_STAGES: Stage[] = [
  { id: "new_lead",   name: "New Lead",      color: "#3B82F6", bg: "#EFF6FF", count: 3, value: 55500 },
  { id: "contacted",  name: "Contacted",     color: "#F59E0B", bg: "#FFFBEB", count: 2, value: 27200 },
  { id: "interested", name: "Interested",    color: "#F97316", bg: "#FFF7ED", count: 3, value: 84000 },
  { id: "booked",     name: "Booked",        color: "#8B5CF6", bg: "#F5F3FF", count: 2, value: 45000 },
  { id: "closed_won", name: "Closed Won",    color: "#10B981", bg: "#D1FAE5", count: 4, value: 72750 },
  { id: "closed_lost",name: "Closed Lost",   color: "#94A3B8", bg: "#F1F5F9", count: 2, value: 15000 },
];

const PRODUCT_STAGES: Stage[] = [
  { id: "new_inquiry",name: "New Inquiry",   color: "#3B82F6", bg: "#EFF6FF", count: 2, value: 3200 },
  { id: "quoted",     name: "Quoted",        color: "#F59E0B", bg: "#FFFBEB", count: 3, value: 8750 },
  { id: "confirmed",  name: "Confirmed",     color: "#8B5CF6", bg: "#F5F3FF", count: 4, value: 12300 },
  { id: "packing",    name: "Packing",       color: "#F97316", bg: "#FFF7ED", count: 2, value: 4400 },
  { id: "shipped",    name: "Shipped",       color: "#0EA5E9", bg: "#E0F2FE", count: 5, value: 9800 },
  { id: "delivered",  name: "Delivered",     color: "#10B981", bg: "#D1FAE5", count: 6, value: 14600 },
];

type Deal = {
  id: string; stage: string; contact: string; avatar: string; avatarColor: string;
  title: string; value: number; daysInStage: number; assignee: string;
};

const SERVICE_DEALS: Deal[] = [
  { id: "1",  stage: "new_lead",    contact: "Sipho Dlamini",    avatar: "SD", avatarColor: "#0D7A4E", title: "IT Support Contract",   value: 8500,  daysInStage: 1,  assignee: "Me" },
  { id: "2",  stage: "new_lead",    contact: "Ayanda Nkosi",     avatar: "AN", avatarColor: "#EC4899", title: "Monthly Retainer",       value: 22000, daysInStage: 0,  assignee: "Me" },
  { id: "3",  stage: "new_lead",    contact: "Grace Moyo",       avatar: "GM", avatarColor: "#6366F1", title: "Web Design",             value: 25000, daysInStage: 2,  assignee: "Karin" },
  { id: "4",  stage: "contacted",   contact: "Riaan van der Berg",avatar: "RV", avatarColor: "#3B82F6", title: "Logistics Software",     value: 15200, daysInStage: 3,  assignee: "Me" },
  { id: "5",  stage: "contacted",   contact: "Johannes Botha",   avatar: "JB", avatarColor: "#6366F1", title: "Annual Service Plan",    value: 12000, daysInStage: 5,  assignee: "Karin" },
  { id: "6",  stage: "interested",  contact: "Fatima Patel",     avatar: "FP", avatarColor: "#8B5CF6", title: "Brand Refresh",          value: 35000, daysInStage: 2,  assignee: "Me" },
  { id: "7",  stage: "interested",  contact: "Lerato Sithole",   avatar: "LS", avatarColor: "#EF4444", title: "Medical Software",       value: 28000, daysInStage: 4,  assignee: "Karin" },
  { id: "8",  stage: "interested",  contact: "David Nkosi",      avatar: "DN", avatarColor: "#0EA5E9", title: "Consulting Package",     value: 21000, daysInStage: 1,  assignee: "Me" },
  { id: "9",  stage: "booked",      contact: "Nomsa Khumalo",    avatar: "NK", avatarColor: "#F59E0B", title: "Spa Treatment Package",  value: 18000, daysInStage: 0,  assignee: "Me" },
  { id: "10", stage: "booked",      contact: "Thandeka Zulu",    avatar: "TZ", avatarColor: "#10B981", title: "Training Sessions",      value: 27000, daysInStage: 1,  assignee: "Karin" },
  { id: "11", stage: "closed_won",  contact: "Thabo Mokoena",    avatar: "TM", avatarColor: "#10B981", title: "Maintenance Contract",   value: 12500, daysInStage: 0,  assignee: "Me" },
  { id: "12", stage: "closed_won",  contact: "Miriam Dube",      avatar: "MD", avatarColor: "#0D7A4E", title: "Catering Deal",          value: 8750,  daysInStage: 0,  assignee: "Me" },
  { id: "13", stage: "closed_won",  contact: "Chris Joubert",    avatar: "CJ", avatarColor: "#3B82F6", title: "Security Install",       value: 31500, daysInStage: 2,  assignee: "Karin" },
  { id: "14", stage: "closed_won",  contact: "Palesa Tau",       avatar: "PT", avatarColor: "#6366F1", title: "HR Consulting",          value: 20000, daysInStage: 1,  assignee: "Me" },
  { id: "15", stage: "closed_lost", contact: "Mark Stevens",     avatar: "MS", avatarColor: "#94A3B8", title: "Insurance Package",      value: 9000,  daysInStage: 30, assignee: "Me" },
  { id: "16", stage: "closed_lost", contact: "Karen White",      avatar: "KW", avatarColor: "#94A3B8", title: "Office Supplies",        value: 6000,  daysInStage: 21, assignee: "Karin" },
];

const PRODUCT_DEALS: Deal[] = [
  { id: "p1", stage: "new_inquiry", contact: "Lerato Sithole",    avatar: "LS", avatarColor: "#EF4444", title: "Lace Front Wig x2",     value: 2900, daysInStage: 0, assignee: "Me" },
  { id: "p2", stage: "new_inquiry", contact: "Thabo Mokoena",     avatar: "TM", avatarColor: "#10B981", title: "Wash Day Bundle x5",    value: 3495, daysInStage: 1, assignee: "Me" },
  { id: "p3", stage: "quoted",      contact: "Fatima Patel",      avatar: "FP", avatarColor: "#8B5CF6", title: "Wholesale: Hair Oils",  value: 4800, daysInStage: 2, assignee: "Me" },
  { id: "p4", stage: "quoted",      contact: "Riaan van der Berg",avatar: "RV", avatarColor: "#3B82F6", title: "Curl Kit Bundle",        value: 1200, daysInStage: 0, assignee: "Karin" },
  { id: "p5", stage: "quoted",      contact: "Grace Moyo",        avatar: "GM", avatarColor: "#6366F1", title: "Silk Press Set x3",     value: 2750, daysInStage: 1, assignee: "Me" },
  { id: "p6", stage: "confirmed",   contact: "Nomsa Khumalo",     avatar: "NK", avatarColor: "#F59E0B", title: "Lace Front 22\" HD",    value: 1450, daysInStage: 0, assignee: "Me" },
  { id: "p7", stage: "confirmed",   contact: "David Nkosi",       avatar: "DN", avatarColor: "#0EA5E9", title: "Monthly Retail Order",  value: 3200, daysInStage: 1, assignee: "Karin" },
  { id: "p8", stage: "confirmed",   contact: "Ayanda Nkosi",      avatar: "AN", avatarColor: "#EC4899", title: "Deep Cond. Bulk x12",   value: 1980, daysInStage: 0, assignee: "Me" },
  { id: "p9", stage: "confirmed",   contact: "Johannes Botha",    avatar: "JB", avatarColor: "#6366F1", title: "Styling Kit",           value: 3670, daysInStage: 2, assignee: "Me" },
  { id: "p10",stage: "packing",     contact: "Ayanda Nkosi",      avatar: "AN", avatarColor: "#EC4899", title: "Moisturising Shampoo",  value: 299,  daysInStage: 0, assignee: "Me" },
  { id: "p11",stage: "packing",     contact: "Grace Moyo",        avatar: "GM", avatarColor: "#6366F1", title: "Protein Treatment x3",  value: 585,  daysInStage: 1, assignee: "Karin" },
  { id: "p12",stage: "shipped",     contact: "Lerato Sithole",    avatar: "LS", avatarColor: "#EF4444", title: "Silk Press Kit",        value: 485,  daysInStage: 1, assignee: "Me" },
  { id: "p13",stage: "shipped",     contact: "Thabo Mokoena",     avatar: "TM", avatarColor: "#10B981", title: "Wash Day Set",          value: 699,  daysInStage: 0, assignee: "Karin" },
  { id: "p14",stage: "shipped",     contact: "Sipho Dlamini",     avatar: "SD", avatarColor: "#0D7A4E", title: "Growth Serum",          value: 280,  daysInStage: 2, assignee: "Me" },
  { id: "p15",stage: "shipped",     contact: "Thandeka Zulu",     avatar: "TZ", avatarColor: "#10B981", title: "Edge Control Bundle",   value: 340,  daysInStage: 1, assignee: "Me" },
  { id: "p16",stage: "shipped",     contact: "Palesa Tau",        avatar: "PT", avatarColor: "#6366F1", title: "Curl Defining Cream",   value: 185,  daysInStage: 0, assignee: "Karin" },
  { id: "p17",stage: "delivered",   contact: "Nomsa Khumalo",     avatar: "NK", avatarColor: "#F59E0B", title: "Lace Front Wig 22\"",   value: 1850, daysInStage: 0, assignee: "Me" },
  { id: "p18",stage: "delivered",   contact: "Fatima Patel",      avatar: "FP", avatarColor: "#8B5CF6", title: "Growth Serum x2",      value: 560,  daysInStage: 1, assignee: "Me" },
  { id: "p19",stage: "delivered",   contact: "Riaan van der Berg",avatar: "RV", avatarColor: "#3B82F6", title: "Premium Hair Oil",      value: 220,  daysInStage: 0, assignee: "Karin" },
  { id: "p20",stage: "delivered",   contact: "Chris Joubert",     avatar: "CJ", avatarColor: "#3B82F6", title: "Wash Day Bundle",       value: 699,  daysInStage: 2, assignee: "Me" },
  { id: "p21",stage: "delivered",   contact: "Miriam Dube",       avatar: "MD", avatarColor: "#0D7A4E", title: "Scalp Spray x3",       value: 735,  daysInStage: 1, assignee: "Me" },
  { id: "p22",stage: "delivered",   contact: "Mark Stevens",      avatar: "MS", avatarColor: "#94A3B8", title: "Moisturising Shampoo",  value: 95,   daysInStage: 0, assignee: "Karin" },
];

export default function PipelinePage() {
  const { businessType } = useBusinessType();

  const showBoth = businessType === "both";
  const [pipelineMode, setPipelineMode] = useState<"services" | "products">("services");

  const mode = businessType === "products" ? "products" : businessType === "services" ? "services" : pipelineMode;
  const STAGES = mode === "products" ? PRODUCT_STAGES : SERVICE_STAGES;
  const INITIAL_DEALS = mode === "products" ? PRODUCT_DEALS : SERVICE_DEALS;

  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [dragging, setDragging] = useState<Deal | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleDragStart = (deal: Deal) => setDragging(deal);
  const handleDragOver = (e: React.DragEvent, stageId: string) => { e.preventDefault(); setDragOver(stageId); };
  const handleDrop = (stageId: string) => {
    if (dragging && dragging.stage !== stageId) {
      setDeals((prev) => prev.map((d) => d.id === dragging.id ? { ...d, stage: stageId, daysInStage: 0 } : d));
    }
    setDragging(null);
    setDragOver(null);
  };

  const getStageDeals = (stageId: string) => deals.filter((d) => d.stage === stageId);
  const wonStageId = mode === "products" ? "delivered" : "closed_won";
  const wonDeals = deals.filter((d) => d.stage === wonStageId);
  const wonValue = wonDeals.reduce((a, d) => a + d.value, 0);

  return (
    <div className="space-y-4">
      {/* Pipeline mode toggle for "both" */}
      {showBoth && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#64748B]">Pipeline view:</span>
          <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1">
            <button
              onClick={() => { setPipelineMode("services"); setDeals(SERVICE_DEALS); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${pipelineMode === "services" ? "bg-[#0D7A4E] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}
            >
              Sales Pipeline
            </button>
            <button
              onClick={() => { setPipelineMode("products"); setDeals(PRODUCT_DEALS); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${pipelineMode === "products" ? "bg-[#0D7A4E] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}
            >
              <ShoppingCart size={14} /> Order Pipeline
            </button>
          </div>
        </div>
      )}

      {/* Pipeline stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
          <div className="text-2xl font-bold text-[#1E293B]">
            R{(STAGES.reduce((a, s) => a + s.value, 0) / 1000).toFixed(0)}K
          </div>
          <div className="text-sm text-[#64748B]">Total Pipeline Value</div>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
          <div className="text-2xl font-bold text-[#10B981]">{wonDeals.length} {mode === "products" ? "delivered" : "deals won"}</div>
          <div className="text-sm text-[#64748B]">R{wonValue.toLocaleString()} this month</div>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
          <div className="text-2xl font-bold text-[#1E293B]">{mode === "products" ? "R485" : "34%"}</div>
          <div className="text-sm text-[#64748B]">{mode === "products" ? "Avg order value" : "Conversion rate"}</div>
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageDeals = getStageDeals(stage.id);
          const totalVal = stageDeals.reduce((a, d) => a + d.value, 0);
          return (
            <div
              key={stage.id}
              className={`flex-shrink-0 w-60 flex flex-col rounded-2xl border-2 transition-all ${dragOver === stage.id ? "border-[#0D7A4E] bg-[#E8F5EE]" : "border-[#E2E8F0] bg-[#F8FAFC]"}`}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDrop={() => handleDrop(stage.id)}
              onDragLeave={() => setDragOver(null)}
            >
              <div className="px-4 py-3 border-b border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }}></div>
                    <span className="font-semibold text-[#1E293B] text-sm">{stage.name}</span>
                  </div>
                  <span className="text-xs font-bold text-[#64748B] bg-[#E2E8F0] px-1.5 py-0.5 rounded-full">{stageDeals.length}</span>
                </div>
                <div className="text-xs text-[#94A3B8]">R{(totalVal / 1000).toFixed(1)}K</div>
              </div>

              <div className="flex-1 p-3 space-y-2.5 min-h-[200px]">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => handleDragStart(deal)}
                    className={`bg-white rounded-xl border border-[#E2E8F0] p-3.5 cursor-grab active:cursor-grabbing hover:border-[#0D7A4E] hover:shadow-md transition-all select-none ${dragging?.id === deal.id ? "opacity-50 scale-95" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="text-sm font-semibold text-[#1E293B] leading-tight">{deal.title}</div>
                      <button className="p-0.5 rounded hover:bg-[#F1F5F9] shrink-0" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={13} className="text-[#CBD5E1]" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ background: deal.avatarColor }}>
                        {deal.avatar}
                      </div>
                      <span className="text-xs text-[#64748B] truncate">{deal.contact}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#1E293B]">R{deal.value.toLocaleString()}</span>
                      <div className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
                        <Clock size={10} />
                        {deal.daysInStage === 0 ? "Today" : `${deal.daysInStage}d`}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full flex items-center gap-1.5 py-2.5 px-3 rounded-xl border-2 border-dashed border-[#E2E8F0] text-[#94A3B8] text-xs hover:border-[#0D7A4E] hover:text-[#0D7A4E] transition-colors">
                  <Plus size={13} /> Add {mode === "products" ? "order" : "deal"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
