"use client";

import { useState } from "react";
import { Package, Truck, Clock, CheckCircle, RotateCcw, Plus, Search, Eye, PrinterIcon, AlertCircle } from "lucide-react";

type OrderStatus = "pending" | "packing" | "shipped" | "delivered" | "returned";
type PaymentMethod = "paid" | "cod" | "eft";

type Order = {
  id: string;
  orderNo: string;
  customer: string;
  avatar: string;
  avatarColor: string;
  products: string;
  qty: number;
  total: number;
  payment: PaymentMethod;
  courier: string;
  trackingNo: string;
  status: OrderStatus;
  city: string;
  date: string;
};

const ORDERS: Order[] = [
  { id: "1", orderNo: "#KH-0081", customer: "Lerato Sithole", avatar: "LS", avatarColor: "#EF4444", products: "Silk Press Kit, Edge Control", qty: 2, total: 485, payment: "paid", courier: "The Courier Guy", trackingNo: "TCG82938", status: "shipped", city: "Johannesburg", date: "Today, 9:14am" },
  { id: "2", orderNo: "#KH-0080", customer: "Ayanda Nkosi", avatar: "AN", avatarColor: "#EC4899", products: "Moisturising Shampoo (×3)", qty: 3, total: 299, payment: "cod", courier: "Pargo", trackingNo: "", status: "packing", city: "Durban", date: "Today, 8:02am" },
  { id: "3", orderNo: "#KH-0079", customer: "Riaan van der Berg", avatar: "RV", avatarColor: "#3B82F6", products: "Premium Hair Oil", qty: 1, total: 220, payment: "eft", courier: "Self-Collect", trackingNo: "", status: "pending", city: "Cape Town", date: "Yesterday, 4:55pm" },
  { id: "4", orderNo: "#KH-0078", customer: "Nomsa Khumalo", avatar: "NK", avatarColor: "#F59E0B", products: "Lace Front Wig 22\", Wig Glue", qty: 2, total: 1850, payment: "paid", courier: "Aramex SA", trackingNo: "ARM29018", status: "delivered", city: "Pretoria", date: "25 Jun, 11:30am" },
  { id: "5", orderNo: "#KH-0077", customer: "Fatima Patel", avatar: "FP", avatarColor: "#8B5CF6", products: "Growth Serum, Scalp Spray", qty: 2, total: 560, payment: "paid", courier: "The Courier Guy", trackingNo: "TCG81002", status: "delivered", city: "Cape Town", date: "24 Jun, 2:10pm" },
  { id: "6", orderNo: "#KH-0076", customer: "Sipho Dlamini", avatar: "SD", avatarColor: "#0D7A4E", products: "Curl Defining Cream", qty: 1, total: 185, payment: "cod", courier: "PostNet", trackingNo: "", status: "returned", city: "Sandton", date: "22 Jun, 9:00am" },
  { id: "7", orderNo: "#KH-0075", customer: "Thabo Mokoena", avatar: "TM", avatarColor: "#10B981", products: "Bundle: Wash Day Set", qty: 1, total: 699, payment: "paid", courier: "Pargo", trackingNo: "PRG44201", status: "shipped", city: "Bloemfontein", date: "22 Jun, 7:45am" },
  { id: "8", orderNo: "#KH-0074", customer: "Grace Moyo", avatar: "GM", avatarColor: "#6366F1", products: "Deep Conditioner ×2, Protein Treatment", qty: 3, total: 390, payment: "eft", courier: "The Courier Guy", trackingNo: "", status: "packing", city: "East London", date: "21 Jun, 3:20pm" },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: typeof Package }> = {
  pending:   { label: "Pending",   color: "#F59E0B", bg: "#FFFBEB", icon: Clock },
  packing:   { label: "Packing",   color: "#3B82F6", bg: "#EFF6FF", icon: Package },
  shipped:   { label: "Shipped",   color: "#8B5CF6", bg: "#F5F3FF", icon: Truck },
  delivered: { label: "Delivered", color: "#10B981", bg: "#D1FAE5", icon: CheckCircle },
  returned:  { label: "Returned",  color: "#EF4444", bg: "#FEF2F2", icon: RotateCcw },
};

const PAYMENT_CONFIG: Record<PaymentMethod, { label: string; color: string; bg: string }> = {
  paid: { label: "Paid",  color: "#10B981", bg: "#D1FAE5" },
  cod:  { label: "COD",   color: "#F59E0B", bg: "#FEF3C7" },
  eft:  { label: "EFT",   color: "#3B82F6", bg: "#DBEAFE" },
};

const FILTER_TABS: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all",       label: "All Orders" },
  { id: "pending",   label: "Pending" },
  { id: "packing",   label: "Packing" },
  { id: "shipped",   label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "returned",  label: "Returns" },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = ORDERS.filter((o) => {
    const matchesFilter = filter === "all" || o.status === filter;
    const matchesSearch = !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.orderNo.toLowerCase().includes(search.toLowerCase()) || o.products.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { label: "Today's Orders", value: "4", sub: "+2 vs yesterday", color: "#3B82F6", bg: "#EFF6FF", icon: Package },
    { label: "Pending Packing", value: ORDERS.filter(o => o.status === "pending" || o.status === "packing").length.toString(), sub: "Needs action", color: "#F59E0B", bg: "#FFFBEB", icon: Clock },
    { label: "Out for Delivery", value: ORDERS.filter(o => o.status === "shipped").length.toString(), sub: "In transit", color: "#8B5CF6", bg: "#F5F3FF", icon: Truck },
    { label: "Revenue Today", value: "R784", sub: "4 orders", color: "#0D7A4E", bg: "#E8F5EE", icon: CheckCircle },
  ];

  const codPendingCount = ORDERS.filter(o => o.payment === "cod" && o.status !== "delivered" && o.status !== "returned").length;

  return (
    <div className="space-y-5">
      {/* COD alert */}
      {codPendingCount > 0 && (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl px-5 py-3 flex items-center gap-3">
          <AlertCircle size={16} className="text-[#F59E0B] shrink-0" />
          <p className="text-sm text-[#92400E]">
            <span className="font-bold">{codPendingCount} COD orders</span> pending — confirm payment on delivery before marking as Delivered.
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <div className="p-2.5 rounded-xl inline-flex mb-3" style={{ background: s.bg }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div className="text-2xl font-bold text-[#1E293B]">{s.value}</div>
            <div className="text-sm text-[#64748B] mt-0.5">{s.label}</div>
            <div className="text-xs font-medium mt-1" style={{ color: s.color }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter + search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1 overflow-x-auto">
          {FILTER_TABS.map((t) => {
            const count = t.id === "all" ? ORDERS.length : ORDERS.filter(o => o.status === t.id).length;
            return (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${filter === t.id ? "bg-[#0D7A4E] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}
              >
                {t.label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${filter === t.id ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#94A3B8]"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
            />
          </div>
          <button className="flex items-center gap-1.5 bg-[#0D7A4E] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors shrink-0">
            <Plus size={14} /> New Order
          </button>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                {["Order", "Customer", "Products", "Total", "Payment", "Courier", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#94A3B8] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const s = STATUS_CONFIG[order.status];
                const p = PAYMENT_CONFIG[order.payment];
                const StatusIcon = s.icon;
                return (
                  <tr key={order.id} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-[#0D7A4E] text-xs">{order.orderNo}</div>
                      <div className="text-[10px] text-[#94A3B8] mt-0.5">{order.date}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ background: order.avatarColor }}>
                          {order.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-[#1E293B] text-xs whitespace-nowrap">{order.customer}</div>
                          <div className="text-[10px] text-[#94A3B8]">{order.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 max-w-[160px]">
                      <div className="text-xs text-[#1E293B] truncate">{order.products}</div>
                      <div className="text-[10px] text-[#94A3B8]">{order.qty} item{order.qty !== 1 ? "s" : ""}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-[#1E293B] text-sm">R{order.total.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ color: p.color, background: p.bg }}>
                        {p.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-xs text-[#1E293B] whitespace-nowrap">{order.courier}</div>
                      {order.trackingNo ? (
                        <div className="text-[10px] text-[#0D7A4E] font-mono">{order.trackingNo}</div>
                      ) : (
                        <button className="text-[10px] text-[#94A3B8] hover:text-[#0D7A4E] underline">+ Add tracking</button>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ color: s.color, background: s.bg }}>
                        <StatusIcon size={10} />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[#E8F5EE] text-[#94A3B8] hover:text-[#0D7A4E] transition-colors" title="View order">
                          <Eye size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[#E8F5EE] text-[#94A3B8] hover:text-[#0D7A4E] transition-colors" title="Print label">
                          <PrinterIcon size={13} />
                        </button>
                        {(order.status === "pending" || order.status === "packing") && (
                          <button className="text-[10px] font-bold bg-[#0D7A4E] text-white px-2.5 py-1 rounded-lg hover:bg-[#065A38] transition-colors whitespace-nowrap">
                            {order.status === "pending" ? "Start Packing" : "Mark Shipped"}
                          </button>
                        )}
                        {order.status === "shipped" && (
                          <button className="text-[10px] font-bold bg-[#10B981] text-white px-2.5 py-1 rounded-lg hover:bg-[#059669] transition-colors whitespace-nowrap">
                            Delivered ✓
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#94A3B8]">
            <Package size={32} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No orders found</p>
            <p className="text-sm">Try a different filter or search term</p>
          </div>
        )}
      </div>

      {/* SA Courier quick reference */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
        <h3 className="font-semibold text-[#1E293B] mb-4 text-sm">SA Courier Quick Reference</h3>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            { name: "The Courier Guy", url: "courierguy.co.za", time: "Next day", price: "From R85", color: "#EF4444" },
            { name: "Pargo", url: "pargo.co.za", time: "2–3 days", price: "From R60", color: "#8B5CF6" },
            { name: "Aramex SA", url: "aramex.co.za", time: "1–2 days", price: "From R95", color: "#F59E0B" },
            { name: "PostNet", url: "postnet.co.za", time: "3–5 days", price: "From R55", color: "#3B82F6" },
          ].map((c) => (
            <div key={c.name} className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: c.color }}>
                {c.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-semibold text-[#1E293B]">{c.name}</div>
                <div className="text-[10px] text-[#64748B]">{c.time} · {c.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
