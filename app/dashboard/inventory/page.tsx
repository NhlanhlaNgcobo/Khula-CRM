"use client";

import { useState } from "react";
import { Package, AlertTriangle, Search, Plus, Upload, Edit2, BarChart2 } from "lucide-react";

type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  lowStockThreshold: number;
  variants: string;
  image: string;
  sales30d: number;
};

const PRODUCTS: Product[] = [
  { id: "1", name: "Silk Press Serum 100ml", sku: "SPS-001", category: "Hair Care", price: 185, costPrice: 62, stock: 34, lowStockThreshold: 10, variants: "None", image: "💆", sales30d: 22 },
  { id: "2", name: "Edge Control 150g", sku: "EC-002", category: "Styling", price: 120, costPrice: 38, stock: 6, lowStockThreshold: 10, variants: "None", image: "✨", sales30d: 18 },
  { id: "3", name: "Lace Front Wig 22\"", sku: "LFW-003", category: "Wigs", price: 1450, costPrice: 620, stock: 0, lowStockThreshold: 3, variants: "Density: 150%, 180%", image: "👸", sales30d: 4 },
  { id: "4", name: "Curl Defining Cream 250ml", sku: "CDC-004", category: "Hair Care", price: 185, costPrice: 58, stock: 19, lowStockThreshold: 8, variants: "None", image: "🌀", sales30d: 31 },
  { id: "5", name: "Deep Conditioner 500ml", sku: "DC-005", category: "Hair Care", price: 165, costPrice: 52, stock: 3, lowStockThreshold: 8, variants: "None", image: "💧", sales30d: 27 },
  { id: "6", name: "Growth Serum 60ml", sku: "GS-006", category: "Treatment", price: 280, costPrice: 95, stock: 0, lowStockThreshold: 5, variants: "None", image: "🌱", sales30d: 14 },
  { id: "7", name: "Wash Day Bundle", sku: "WDB-007", category: "Bundles", price: 699, costPrice: 280, stock: 12, lowStockThreshold: 5, variants: "None", image: "🎁", sales30d: 9 },
  { id: "8", name: "Scalp Spray 200ml", sku: "SS-008", category: "Treatment", price: 245, costPrice: 82, stock: 8, lowStockThreshold: 8, variants: "None", image: "💨", sales30d: 16 },
  { id: "9", name: "Moisturising Shampoo 400ml", sku: "MS-009", category: "Hair Care", price: 95, costPrice: 30, stock: 41, lowStockThreshold: 15, variants: "None", image: "🛁", sales30d: 38 },
  { id: "10", name: "Protein Treatment 250ml", sku: "PT-010", category: "Treatment", price: 195, costPrice: 65, stock: 5, lowStockThreshold: 8, variants: "None", image: "💪", sales30d: 11 },
];

const CATEGORIES = ["All", "Hair Care", "Styling", "Wigs", "Treatment", "Bundles"];

function getStockStatus(product: Product): StockStatus {
  if (product.stock === 0) return "out_of_stock";
  if (product.stock <= product.lowStockThreshold) return "low_stock";
  return "in_stock";
}

const STATUS_CONFIG: Record<StockStatus, { label: string; color: string; bg: string }> = {
  in_stock:     { label: "In Stock",     color: "#10B981", bg: "#D1FAE5" },
  low_stock:    { label: "Low Stock",    color: "#F59E0B", bg: "#FEF3C7" },
  out_of_stock: { label: "Out of Stock", color: "#EF4444", bg: "#FEE2E2" },
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState<StockStatus | "all">("all");

  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || p.category === category;
    const matchesStock = stockFilter === "all" || getStockStatus(p) === stockFilter;
    return matchesSearch && matchesCat && matchesStock;
  });

  const totalValue = PRODUCTS.reduce((a, p) => a + p.stock * p.costPrice, 0);
  const lowStockCount = PRODUCTS.filter((p) => getStockStatus(p) === "low_stock").length;
  const outOfStockCount = PRODUCTS.filter((p) => getStockStatus(p) === "out_of_stock").length;

  const stats = [
    { label: "Total Products", value: PRODUCTS.length.toString(), sub: "Active SKUs", color: "#3B82F6", bg: "#EFF6FF" },
    { label: "Low Stock", value: lowStockCount.toString(), sub: "Below threshold", color: "#F59E0B", bg: "#FFFBEB" },
    { label: "Out of Stock", value: outOfStockCount.toString(), sub: "Reorder needed", color: "#EF4444", bg: "#FEF2F2" },
    { label: "Inventory Value", value: `R${(totalValue / 1000).toFixed(1)}K`, sub: "At cost price", color: "#0D7A4E", bg: "#E8F5EE" },
  ];

  return (
    <div className="space-y-5">
      {/* Low stock alert banner */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl px-5 py-3 flex items-center gap-3">
          <AlertTriangle size={16} className="text-[#F59E0B] shrink-0" />
          <p className="text-sm text-[#92400E]">
            {outOfStockCount > 0 && <><span className="font-bold">{outOfStockCount} products out of stock</span> — reorder now.</>}
            {outOfStockCount > 0 && lowStockCount > 0 && " · "}
            {lowStockCount > 0 && <><span className="font-bold">{lowStockCount} products running low</span> — reorder soon.</>}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <div className="text-2xl font-bold text-[#1E293B]">{s.value}</div>
            <div className="text-sm text-[#64748B] mt-0.5">{s.label}</div>
            <div className="text-xs font-medium mt-1" style={{ color: s.color }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters + actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category filter */}
          <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${category === c ? "bg-[#0D7A4E] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Stock status filter */}
          <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] rounded-xl p-1">
            {(["all", "in_stock", "low_stock", "out_of_stock"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStockFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${stockFilter === s ? "bg-[#0D7A4E] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}
              >
                {s === "all" ? "All Stock" : STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or SKU..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
            />
          </div>
          <button className="flex items-center gap-1.5 border border-[#E2E8F0] bg-white text-[#64748B] px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#F8FAFC] transition-colors shrink-0">
            <Upload size={14} /> Import
          </button>
          <button className="flex items-center gap-1.5 bg-[#0D7A4E] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors shrink-0">
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                {["Product", "SKU", "Category", "Variants", "Price", "Cost", "Margin", "Stock", "30d Sales", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#94A3B8] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const status = getStockStatus(product);
                const s = STATUS_CONFIG[status];
                const margin = Math.round(((product.price - product.costPrice) / product.price) * 100);
                return (
                  <tr key={product.id} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-lg shrink-0">{product.image}</div>
                        <div className="font-semibold text-[#1E293B] text-xs max-w-[140px] leading-tight">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[11px] text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded">{product.sku}</span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#64748B] whitespace-nowrap">{product.category}</td>
                    <td className="px-4 py-3.5 text-xs text-[#64748B] max-w-[100px] truncate">{product.variants}</td>
                    <td className="px-4 py-3.5 font-semibold text-[#1E293B] text-xs whitespace-nowrap">R{product.price}</td>
                    <td className="px-4 py-3.5 text-xs text-[#64748B] whitespace-nowrap">R{product.costPrice}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-bold ${margin >= 50 ? "text-[#10B981]" : margin >= 30 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>
                        {margin}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className={`text-sm font-bold ${status === "out_of_stock" ? "text-[#EF4444]" : status === "low_stock" ? "text-[#F59E0B]" : "text-[#1E293B]"}`}>
                        {product.stock}
                      </div>
                      {status !== "out_of_stock" && (
                        <div className="text-[10px] text-[#94A3B8]">min {product.lowStockThreshold}</div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <BarChart2 size={11} className="text-[#0D7A4E]" />
                        <span className="text-xs font-semibold text-[#1E293B]">{product.sales30d}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap" style={{ color: s.color, background: s.bg }}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[#E8F5EE] text-[#94A3B8] hover:text-[#0D7A4E] transition-colors">
                          <Edit2 size={13} />
                        </button>
                        {status !== "in_stock" && (
                          <button className="text-[10px] font-bold bg-[#FEF3C7] text-[#92400E] px-2.5 py-1 rounded-lg hover:bg-[#FDE68A] transition-colors whitespace-nowrap">
                            Reorder
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
            <p className="font-medium">No products found</p>
            <p className="text-sm">Try a different filter or search</p>
          </div>
        )}
      </div>

      {/* Best sellers + margin insight */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h3 className="font-semibold text-[#1E293B] mb-4 text-sm">Best Sellers (Last 30 Days)</h3>
          <div className="space-y-3">
            {[...PRODUCTS].sort((a, b) => b.sales30d - a.sales30d).slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#94A3B8] w-4">{i + 1}</span>
                <span className="text-lg">{p.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#1E293B] truncate">{p.name}</div>
                  <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 mt-1">
                    <div className="bg-[#0D7A4E] h-1.5 rounded-full" style={{ width: `${(p.sales30d / PRODUCTS[0].sales30d) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1E293B] shrink-0">{p.sales30d} sold</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h3 className="font-semibold text-[#1E293B] mb-4 text-sm">Margin Health</h3>
          <div className="space-y-3">
            {[...PRODUCTS].sort((a, b) => {
              const mA = ((a.price - a.costPrice) / a.price) * 100;
              const mB = ((b.price - b.costPrice) / b.price) * 100;
              return mB - mA;
            }).slice(0, 5).map((p) => {
              const margin = Math.round(((p.price - p.costPrice) / p.price) * 100);
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-lg">{p.image}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#1E293B] truncate">{p.name}</div>
                    <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 mt-1">
                      <div className={`h-1.5 rounded-full ${margin >= 60 ? "bg-[#10B981]" : margin >= 40 ? "bg-[#F59E0B]" : "bg-[#EF4444]"}`} style={{ width: `${margin}%` }} />
                    </div>
                  </div>
                  <span className={`text-xs font-bold shrink-0 ${margin >= 60 ? "text-[#10B981]" : margin >= 40 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>{margin}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
