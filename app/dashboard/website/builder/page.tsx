"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft, Sparkles, Monitor, Smartphone, Download,
  Plus, Trash2, GripVertical, RefreshCw, ChevronDown, ChevronUp,
  Globe, Phone, MessageCircle, Mail, MapPin, Clock, Star,
  Check, Loader2, Palette, Type, AlignLeft, Eye,
} from "lucide-react";
import { useBusinessType } from "@/lib/business-type-context";

// ─── Types ───────────────────────────────────────────────────────────────────
type SectionType =
  | "hero" | "services" | "about" | "stats"
  | "testimonials" | "booking_cta" | "contact" | "footer";

type Section = {
  id: string;
  type: SectionType;
  content: Record<string, unknown>;
};

type BizInfo = {
  businessName: string;
  industry: string;
  description: string;
  phone: string;
  whatsapp: string;
  city: string;
  style: string;
  primaryColor: string;
};

const STYLE_OPTIONS = [
  { value: "professional", label: "Professional", desc: "Clean & corporate" },
  { value: "friendly",     label: "Friendly",     desc: "Warm & approachable" },
  { value: "modern",       label: "Modern",       desc: "Bold & minimal" },
  { value: "luxury",       label: "Luxury",       desc: "Premium & elegant" },
];

const COLOR_PRESETS = [
  "#0D7A4E", "#1D4ED8", "#7C3AED", "#DC2626",
  "#EA580C", "#0891B2", "#BE185D", "#374151",
];

const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Hero Banner", services: "Services / Products", about: "About Us",
  stats: "Stats Row", testimonials: "Testimonials", booking_cta: "Booking CTA",
  contact: "Contact Info", footer: "Footer",
};

const ADDABLE_SECTIONS: { type: SectionType; label: string; desc: string }[] = [
  { type: "hero",         label: "Hero Banner",         desc: "Big headline + CTA" },
  { type: "services",     label: "Services / Products", desc: "Cards grid" },
  { type: "about",        label: "About Us",            desc: "Story + highlights" },
  { type: "stats",        label: "Stats Row",           desc: "Numbers that impress" },
  { type: "testimonials", label: "Testimonials",        desc: "Client reviews" },
  { type: "booking_cta",  label: "Booking CTA",         desc: "Drive conversions" },
  { type: "contact",      label: "Contact Info",        desc: "Details + hours" },
  { type: "footer",       label: "Footer",              desc: "Links + tagline" },
];

// ─── Section Preview Renderers ────────────────────────────────────────────────
function PreviewSection({
  section, primary, selected, onClick,
}: {
  section: Section; primary: string; selected: boolean; onClick: () => void;
}) {
  const c = section.content as Record<string, unknown>;

  // Use inline styles for selected ring — dynamic Tailwind arbitrary values don't work at runtime
  const wrapStyle: React.CSSProperties = selected
    ? { outline: `2px solid ${primary}`, outlineOffset: "0px", position: "relative" }
    : { position: "relative" };
  const wrapClass = "cursor-pointer transition-all hover:opacity-95";

  switch (section.type) {
    case "hero":
      return (
        <div className={wrapClass} style={wrapStyle} onClick={onClick}>
          <div className="py-14 px-8 text-center" style={{ background: `linear-gradient(135deg, ${primary}ee, ${primary}99)` }}>
            <h1 className="text-3xl font-black text-white mb-3 leading-tight">{String(c.headline || "")}</h1>
            <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">{String(c.subheadline || "")}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button className="bg-white text-sm font-bold px-5 py-2.5 rounded-full" style={{ color: primary }}>{String(c.cta1 || "Get Started")}</button>
              <button className="border-2 border-white text-white text-sm font-bold px-5 py-2.5 rounded-full">{String(c.cta2 || "Learn More")}</button>
            </div>
          </div>
          {selected && <SelectedBadge primary={primary} />}
        </div>
      );

    case "services": {
      const items = (c.items as { name: string; description: string; price: string; icon: string }[]) || [];
      return (
        <div className={wrapClass} style={wrapStyle} onClick={onClick}>
          <div className="py-12 px-8 bg-white">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-[#1E293B] mb-1">{String(c.title || "Our Services")}</h2>
              <p className="text-[#64748B] text-sm">{String(c.subtitle || "")}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {items.slice(0, 3).map((item, i) => (
                <div key={i} className="rounded-2xl border border-[#E2E8F0] p-4 text-center">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="font-bold text-[#1E293B] text-sm mt-2">{item.name}</p>
                  <p className="text-[#64748B] text-xs mt-1 line-clamp-2">{item.description}</p>
                  <p className="font-bold text-sm mt-2" style={{ color: primary }}>{item.price}</p>
                </div>
              ))}
            </div>
          </div>
          {selected && <SelectedBadge primary={primary} />}
        </div>
      );
    }

    case "about": {
      const highlights = (c.highlights as string[]) || [];
      return (
        <div className={wrapClass} style={wrapStyle} onClick={onClick}>
          <div className="py-12 px-8 bg-[#F8FAFC]">
            <div className="grid grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-black text-[#1E293B] mb-3">{String(c.title || "About Us")}</h2>
                <p className="text-[#64748B] text-sm leading-relaxed">{String(c.body || "")}</p>
              </div>
              <div className="space-y-3">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: primary }}>
                      <Check size={10} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-[#1E293B]">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {selected && <SelectedBadge primary={primary} />}
        </div>
      );
    }

    case "stats": {
      const items = (c.items as { number: string; label: string }[]) || [];
      return (
        <div className={wrapClass} style={wrapStyle} onClick={onClick}>
          <div className="py-10 px-8" style={{ backgroundColor: primary }}>
            <div className="grid grid-cols-4 gap-4 text-center">
              {items.slice(0, 4).map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-black text-white">{s.number}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          {selected && <SelectedBadge primary={primary} />}
        </div>
      );
    }

    case "testimonials": {
      const items = (c.items as { name: string; text: string; rating: number; location: string }[]) || [];
      return (
        <div className={wrapClass} style={wrapStyle} onClick={onClick}>
          <div className="py-12 px-8 bg-white">
            <h2 className="text-2xl font-black text-[#1E293B] text-center mb-8">{String(c.title || "Testimonials")}</h2>
            <div className="grid grid-cols-3 gap-4">
              {items.slice(0, 3).map((t, i) => (
                <div key={i} className="rounded-2xl border border-[#E2E8F0] p-4">
                  <div className="flex mb-2">
                    {Array.from({ length: t.rating || 5 }).map((_, j) => (
                      <Star key={j} size={11} style={{ fill: primary, color: primary }} />
                    ))}
                  </div>
                  <p className="text-[#475569] text-xs leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                  <p className="font-bold text-[#1E293B] text-xs">{t.name}</p>
                  <p className="text-[#94A3B8] text-[10px]">{t.location}</p>
                </div>
              ))}
            </div>
          </div>
          {selected && <SelectedBadge primary={primary} />}
        </div>
      );
    }

    case "booking_cta":
      return (
        <div className={wrapClass} style={wrapStyle} onClick={onClick}>
          <div className="py-14 px-8 text-center bg-[#0F172A]">
            <h2 className="text-2xl font-black text-white mb-2">{String(c.title || "Ready to Get Started?")}</h2>
            <p className="text-[#94A3B8] text-sm mb-6">{String(c.subtitle || "")}</p>
            <button className="text-white font-bold px-8 py-3 rounded-full text-sm" style={{ backgroundColor: primary }}>
              {String(c.cta || "Book Now")}
            </button>
          </div>
          {selected && <SelectedBadge primary={primary} />}
        </div>
      );

    case "contact": {
      const rows = [
        { Icon: Phone,          val: c.phone },
        { Icon: MessageCircle,  val: c.whatsapp },
        { Icon: Mail,           val: c.email },
        { Icon: MapPin,         val: c.address },
        { Icon: Clock,          val: c.hours },
      ].filter(x => x.val);
      return (
        <div className={wrapClass} style={wrapStyle} onClick={onClick}>
          <div className="py-12 px-8 bg-[#F8FAFC]">
            <h2 className="text-2xl font-black text-[#1E293B] text-center mb-8">{String(c.title || "Contact Us")}</h2>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {rows.map(({ Icon, val }, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon size={14} style={{ color: primary }} className="shrink-0" />
                  <span className="text-[#475569] text-xs">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
          {selected && <SelectedBadge primary={primary} />}
        </div>
      );
    }

    case "footer":
      return (
        <div className={wrapClass} style={wrapStyle} onClick={onClick}>
          <div className="py-8 px-8 bg-[#0F172A] text-center">
            <p className="font-black text-white text-lg">{String(c.businessName || "")}</p>
            <p className="text-[#94A3B8] text-xs mt-1">{String(c.tagline || "")}</p>
            <p className="text-[#475569] text-[10px] mt-4">© 2026 · Powered by KHULA CRM</p>
          </div>
          {selected && <SelectedBadge primary={primary} />}
        </div>
      );

    default:
      return null;
  }
}

function SelectedBadge({ primary }: { primary: string }) {
  return (
    <div
      className="absolute top-2 right-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: primary }}
    >
      Editing
    </div>
  );
}

// ─── Section Content Editor ───────────────────────────────────────────────────
function SectionEditor({
  section, bizInfo, primaryColor, onUpdate, onRegenerate, regenerating,
}: {
  section: Section;
  bizInfo: BizInfo;
  primaryColor: string;
  onUpdate: (content: Record<string, unknown>) => void;
  onRegenerate: (instruction: string) => void;
  regenerating: boolean;
}) {
  const [instruction, setInstruction] = useState("");
  const c = section.content;

  function Field({ label, fieldKey, multiline = false }: { label: string; fieldKey: string; multiline?: boolean }) {
    const val = String((c as Record<string, unknown>)[fieldKey] || "");
    return (
      <div>
        <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">{label}</label>
        {multiline ? (
          <textarea
            className="w-full text-xs border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#0D7A4E] resize-none"
            rows={3}
            value={val}
            onChange={e => onUpdate({ ...c, [fieldKey]: e.target.value })}
          />
        ) : (
          <input
            className="w-full text-xs border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#0D7A4E]"
            value={val}
            onChange={e => onUpdate({ ...c, [fieldKey]: e.target.value })}
          />
        )}
      </div>
    );
  }

  function ItemsEditor({ itemKey, itemFields }: { itemKey: string; itemFields: string[] }) {
    const items = ((c as Record<string, unknown>)[itemKey] as Record<string, string>[]) || [];
    return (
      <div>
        <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block mb-2">Items</label>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="bg-[#F8FAFC] rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-[#94A3B8]">#{idx + 1}</span>
                <button
                  onClick={() => onUpdate({ ...c, [itemKey]: items.filter((_, i) => i !== idx) })}
                  className="text-[#EF4444] hover:bg-[#FEF2F2] p-1 rounded"
                >
                  <Trash2 size={10} />
                </button>
              </div>
              {itemFields.map(f => (
                <div key={f}>
                  <label className="text-[9px] text-[#94A3B8] capitalize block mb-0.5">{f}</label>
                  <input
                    className="w-full text-xs border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#0D7A4E] bg-white"
                    value={String(item[f] || "")}
                    onChange={e => {
                      const next = items.map((it, i) => i === idx ? { ...it, [f]: e.target.value } : it);
                      onUpdate({ ...c, [itemKey]: next });
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={() => {
              const blank = Object.fromEntries(itemFields.map(f => [f, ""]));
              onUpdate({ ...c, [itemKey]: [...items, blank] });
            }}
            className="w-full text-xs border border-dashed border-[#CBD5E1] rounded-xl py-2 text-[#64748B] hover:border-[#0D7A4E] hover:text-[#0D7A4E] transition-colors"
          >
            + Add Item
          </button>
        </div>
      </div>
    );
  }

  function HighlightsEditor() {
    const highlights = (c.highlights as string[]) || [];
    return (
      <div>
        <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Highlights</label>
        {highlights.map((h, i) => (
          <input
            key={i}
            className="w-full text-xs border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#0D7A4E] mb-1"
            value={h}
            onChange={e => {
              const next = [...highlights];
              next[i] = e.target.value;
              onUpdate({ ...c, highlights: next });
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: primaryColor }}>
          <Type size={12} />
        </div>
        <div>
          <p className="text-xs font-bold text-[#1E293B]">{SECTION_LABELS[section.type]}</p>
          <p className="text-[10px] text-[#94A3B8]">Click fields to edit</p>
        </div>
      </div>

      <div className="space-y-3">
        {section.type === "hero" && <>
          <Field label="Headline" fieldKey="headline" />
          <Field label="Subheadline" fieldKey="subheadline" multiline />
          <Field label="Primary Button" fieldKey="cta1" />
          <Field label="Secondary Button" fieldKey="cta2" />
        </>}
        {section.type === "services" && <>
          <Field label="Section Title" fieldKey="title" />
          <Field label="Subtitle" fieldKey="subtitle" />
          <ItemsEditor itemKey="items" itemFields={["icon", "name", "description", "price"]} />
        </>}
        {section.type === "about" && <>
          <Field label="Title" fieldKey="title" />
          <Field label="Body Text" fieldKey="body" multiline />
          <HighlightsEditor />
        </>}
        {section.type === "stats" && <ItemsEditor itemKey="items" itemFields={["number", "label"]} />}
        {section.type === "testimonials" && <>
          <Field label="Section Title" fieldKey="title" />
          <ItemsEditor itemKey="items" itemFields={["name", "text", "location"]} />
        </>}
        {section.type === "booking_cta" && <>
          <Field label="Headline" fieldKey="title" />
          <Field label="Subtext" fieldKey="subtitle" multiline />
          <Field label="Button Text" fieldKey="cta" />
        </>}
        {section.type === "contact" && <>
          <Field label="Title" fieldKey="title" />
          <Field label="Phone" fieldKey="phone" />
          <Field label="WhatsApp" fieldKey="whatsapp" />
          <Field label="Email" fieldKey="email" />
          <Field label="Address" fieldKey="address" />
          <Field label="Business Hours" fieldKey="hours" />
        </>}
        {section.type === "footer" && <>
          <Field label="Business Name" fieldKey="businessName" />
          <Field label="Tagline" fieldKey="tagline" />
        </>}
      </div>

      <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
        <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">AI Instruction</label>
        <input
          className="w-full text-xs border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#0D7A4E]"
          placeholder={`e.g. "Make it more playful"`}
          value={instruction}
          onChange={e => setInstruction(e.target.value)}
        />
        <button
          onClick={() => { onRegenerate(instruction); setInstruction(""); }}
          disabled={regenerating}
          className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2 rounded-xl transition-colors disabled:opacity-50"
          style={{ backgroundColor: primaryColor, color: "white" }}
        >
          {regenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
          {regenerating ? "Regenerating…" : "Regenerate with AI"}
        </button>
      </div>
    </div>
  );
}

// ─── HTML export helpers ──────────────────────────────────────────────────────
function sectionToHTML(sec: Section, p: string): string {
  const c = sec.content as Record<string, unknown>;
  switch (sec.type) {
    case "hero":
      return `<section style="background:linear-gradient(135deg,${p}ee,${p}99);padding:80px 40px;text-align:center">
  <h1 style="color:#fff;font-size:2.5rem;font-weight:900;margin:0 0 16px">${c.headline}</h1>
  <p style="color:rgba(255,255,255,0.8);font-size:1.1rem;margin:0 0 32px;max-width:600px;margin-left:auto;margin-right:auto">${c.subheadline}</p>
  <a href="#contact" style="background:#fff;color:${p};font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none;margin-right:12px">${c.cta1}</a>
  <a href="#contact" style="border:2px solid #fff;color:#fff;font-weight:700;padding:12px 28px;border-radius:999px;text-decoration:none">${c.cta2}</a>
</section>`;
    case "services": {
      const items = (c.items as { name: string; description: string; price: string; icon: string }[]) || [];
      return `<section style="padding:80px 40px;background:#fff" id="services">
  <div style="text-align:center;margin-bottom:48px">
    <h2 style="font-size:2rem;font-weight:900;color:#1E293B;margin:0 0 8px">${c.title}</h2>
    <p style="color:#64748B;font-size:1rem;margin:0">${c.subtitle}</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px;max-width:900px;margin:0 auto">
    ${items.map(it => `<div style="border:1px solid #E2E8F0;border-radius:16px;padding:24px;text-align:center">
      <div style="font-size:2rem;margin-bottom:12px">${it.icon}</div>
      <h3 style="font-size:1rem;font-weight:700;color:#1E293B;margin:0 0 8px">${it.name}</h3>
      <p style="font-size:0.85rem;color:#64748B;margin:0 0 12px">${it.description}</p>
      <p style="font-size:0.9rem;font-weight:700;color:${p};margin:0">${it.price}</p>
    </div>`).join("")}
  </div>
</section>`;
    }
    case "about": {
      const highlights = (c.highlights as string[]) || [];
      return `<section style="padding:80px 40px;background:#F8FAFC" id="about">
  <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center">
    <div>
      <h2 style="font-size:2rem;font-weight:900;color:#1E293B;margin:0 0 16px">${c.title}</h2>
      <p style="color:#64748B;line-height:1.7;margin:0">${c.body}</p>
    </div>
    <div>
      ${highlights.map(h => `<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <div style="width:20px;height:20px;border-radius:50%;background:${p};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="color:#fff;font-size:11px;font-weight:700">✓</span>
        </div>
        <span style="font-weight:600;color:#1E293B">${h}</span>
      </div>`).join("")}
    </div>
  </div>
</section>`;
    }
    case "stats": {
      const items = (c.items as { number: string; label: string }[]) || [];
      return `<section style="padding:60px 40px;background:${p}">
  <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(${items.length},1fr);gap:24px;text-align:center">
    ${items.map(s => `<div>
      <p style="font-size:2.5rem;font-weight:900;color:#fff;margin:0">${s.number}</p>
      <p style="color:rgba(255,255,255,0.7);font-size:0.85rem;margin:8px 0 0">${s.label}</p>
    </div>`).join("")}
  </div>
</section>`;
    }
    case "testimonials": {
      const items = (c.items as { name: string; text: string; rating: number; location: string }[]) || [];
      return `<section style="padding:80px 40px;background:#fff" id="testimonials">
  <h2 style="font-size:2rem;font-weight:900;color:#1E293B;text-align:center;margin:0 0 48px">${c.title}</h2>
  <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">
    ${items.map(t => `<div style="border:1px solid #E2E8F0;border-radius:16px;padding:24px">
      <div style="color:${p};font-size:1rem;margin-bottom:8px">${"★".repeat(t.rating || 5)}</div>
      <p style="color:#475569;font-size:0.9rem;line-height:1.6;margin:0 0 16px">"${t.text}"</p>
      <p style="font-weight:700;color:#1E293B;font-size:0.85rem;margin:0">${t.name}</p>
      <p style="color:#94A3B8;font-size:0.8rem;margin:4px 0 0">${t.location}</p>
    </div>`).join("")}
  </div>
</section>`;
    }
    case "booking_cta":
      return `<section style="padding:80px 40px;background:#0F172A;text-align:center" id="book">
  <h2 style="font-size:2rem;font-weight:900;color:#fff;margin:0 0 12px">${c.title}</h2>
  <p style="color:#94A3B8;font-size:1rem;margin:0 0 32px">${c.subtitle}</p>
  <a href="#contact" style="background:${p};color:#fff;font-weight:700;padding:16px 36px;border-radius:999px;text-decoration:none;display:inline-block">${c.cta}</a>
</section>`;
    case "contact":
      return `<section style="padding:80px 40px;background:#F8FAFC" id="contact">
  <h2 style="font-size:2rem;font-weight:900;color:#1E293B;text-align:center;margin:0 0 48px">${c.title}</h2>
  <div style="max-width:500px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:16px">
    ${c.phone ? `<div><strong style="color:#1E293B">📞 Phone</strong><br><span style="color:#475569">${c.phone}</span></div>` : ""}
    ${c.whatsapp ? `<div><strong style="color:#1E293B">💬 WhatsApp</strong><br><a href="https://wa.me/${String(c.whatsapp).replace(/\D/g,"")}" style="color:${p}">${c.whatsapp}</a></div>` : ""}
    ${c.email ? `<div><strong style="color:#1E293B">✉️ Email</strong><br><a href="mailto:${c.email}" style="color:${p}">${c.email}</a></div>` : ""}
    ${c.address ? `<div><strong style="color:#1E293B">📍 Address</strong><br><span style="color:#475569">${c.address}</span></div>` : ""}
    ${c.hours ? `<div style="grid-column:1/-1"><strong style="color:#1E293B">🕐 Hours</strong><br><span style="color:#475569">${c.hours}</span></div>` : ""}
  </div>
</section>`;
    case "footer":
      return `<footer style="background:#0f172a;padding:48px 40px;text-align:center">
  <p style="color:#fff;font-size:1.3rem;font-weight:900;margin:0">${c.businessName}</p>
  <p style="color:#94a3b8;font-size:0.9rem;margin:8px 0 24px">${c.tagline}</p>
  <p style="color:#475569;font-size:0.8rem;margin:0">© 2026 ${c.businessName} · Powered by KHULA CRM</p>
</footer>`;
    default:
      return "";
  }
}

// ─── Main Builder Page ────────────────────────────────────────────────────────
export default function WebsiteBuilderPage() {
  const { businessType } = useBusinessType();

  const [step, setStep] = useState<"start" | "generating" | "editing">("start");
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [published, setPublished] = useState(false);

  const [bizInfo, setBizInfo] = useState<BizInfo>({
    businessName: "Cape Town Dental Studio",
    industry: "Health & Beauty",
    description: "Professional dental practice offering cleaning, whitening, and implants",
    phone: "+27 21 555 1234",
    whatsapp: "+27 82 123 4567",
    city: "Cape Town",
    style: "professional",
    primaryColor: "#0D7A4E",
  });

  const selectedSection = sections.find(s => s.id === selectedId) ?? null;

  async function handleGenerate() {
    setStep("generating");
    try {
      const res = await fetch("/api/ai/build-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bizInfo, businessType }),
      });
      const data = await res.json();
      if (data.sections) {
        setSections(data.sections);
        setSelectedId(data.sections[0]?.id ?? null);
        setStep("editing");
      } else {
        alert(`Generation failed: ${data.error || "Unknown error"}`);
        setStep("start");
      }
    } catch (err) {
      alert(`Network error: ${String(err)}`);
      setStep("start");
    }
  }

  const handleRegenerate = useCallback(async (sectionId: string, instruction: string) => {
    const sec = sections.find(s => s.id === sectionId);
    if (!sec) return;
    setRegeneratingId(sectionId);
    try {
      const res = await fetch("/api/ai/build-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionType: sec.type,
          businessName: bizInfo.businessName,
          industry: bizInfo.industry,
          instruction,
          currentContent: sec.content,
        }),
      });
      const data = await res.json();
      if (data.content) {
        setSections(prev => prev.map(s => s.id === sectionId ? { ...s, content: data.content } : s));
      }
    } catch {
      alert("Regeneration failed.");
    } finally {
      setRegeneratingId(null);
    }
  }, [sections, bizInfo]);

  const handleUpdateContent = useCallback((sectionId: string, content: Record<string, unknown>) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, content } : s));
  }, []);

  function moveSection(id: string, dir: -1 | 1) {
    setSections(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if (idx < 0) return prev;
      const next = [...prev];
      const swapIdx = idx + dir;
      if (swapIdx < 0 || swapIdx >= next.length) return prev;
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return next;
    });
  }

  function deleteSection(id: string) {
    setSections(prev => prev.filter(s => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function addSection(type: SectionType) {
    const id = `${type}_${Date.now()}`;
    const blank: Section = { id, type, content: getBlankContent(type) };
    setSections(prev => [...prev, blank]);
    setSelectedId(id);
    setShowAddPanel(false);
  }

  function getBlankContent(type: SectionType): Record<string, unknown> {
    switch (type) {
      case "hero":         return { headline: "Your Headline Here", subheadline: "A compelling description of your business", cta1: "Get Started", cta2: "Learn More" };
      case "services":     return { title: "Our Services", subtitle: "What we offer", items: [{ icon: "⭐", name: "Service", description: "Description", price: "From RXXX" }] };
      case "about":        return { title: "About Us", body: "Tell your story here.", highlights: ["Experience", "Quality", "Trust"] };
      case "stats":        return { items: [{ number: "100+", label: "Clients" }, { number: "5★", label: "Rating" }] };
      case "testimonials": return { title: "What Clients Say", items: [{ name: "Client Name", text: "Review text here.", rating: 5, location: "City" }] };
      case "booking_cta":  return { title: "Ready to Book?", subtitle: "No commitment required.", cta: "Book Now" };
      case "contact":      return { title: "Get In Touch", phone: bizInfo.phone, whatsapp: bizInfo.whatsapp, email: "", address: bizInfo.city, hours: "Mon–Fri 8am–5pm" };
      case "footer":       return { businessName: bizInfo.businessName, tagline: "Building success, one client at a time." };
    }
  }

  function exportHTML() {
    const p = bizInfo.primaryColor;
    const sectionHTMLs = sections.map(sec => sectionToHTML(sec, p));
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${bizInfo.businessName}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
@media(max-width:768px){
  section[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}
  div[style*="grid-template-columns:repeat"]{grid-template-columns:1fr!important}
}
</style>
</head>
<body>
${sectionHTMLs.join("\n")}
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bizInfo.businessName.replace(/\s+/g, "-").toLowerCase()}-website.html`;
    a.click();
    URL.revokeObjectURL(url);
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  }

  // ─── Start Screen ─────────────────────────────────────────────────────────
  if (step === "start") {
    return (
      <div className="min-h-full bg-[#F1F5F9] flex flex-col">
        <div className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard/website" className="flex items-center gap-2 text-[#64748B] hover:text-[#0D7A4E] text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> Website
          </Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-sm font-bold text-[#1E293B]">AI Website Builder</span>
          <span className="text-[10px] font-bold bg-[#4ADE80] text-[#065A38] px-2 py-0.5 rounded-full">BETA</span>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-lg w-full max-w-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#0D7A4E]/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} className="text-[#0D7A4E]" />
              </div>
              <h1 className="text-2xl font-black text-[#1E293B] mb-2">AI Website Builder</h1>
              <p className="text-[#64748B] text-sm">Describe your business and Claude will generate a complete website in seconds.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#374151] block mb-1.5">Business Name *</label>
                  <input
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
                    value={bizInfo.businessName}
                    onChange={e => setBizInfo(p => ({ ...p, businessName: e.target.value }))}
                    placeholder="e.g. Cape Town Dental Studio"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#374151] block mb-1.5">Industry *</label>
                  <input
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
                    value={bizInfo.industry}
                    onChange={e => setBizInfo(p => ({ ...p, industry: e.target.value }))}
                    placeholder="e.g. Health & Beauty, Legal, Retail"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#374151] block mb-1.5">What do you do? <span className="text-[#94A3B8] font-normal">(optional but improves output)</span></label>
                <textarea
                  className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E] resize-none"
                  rows={2}
                  value={bizInfo.description}
                  onChange={e => setBizInfo(p => ({ ...p, description: e.target.value }))}
                  placeholder="e.g. We offer teeth cleaning, whitening and implants in Cape Town CBD..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#374151] block mb-1.5">City</label>
                  <input
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
                    value={bizInfo.city}
                    onChange={e => setBizInfo(p => ({ ...p, city: e.target.value }))}
                    placeholder="Cape Town"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#374151] block mb-1.5">Phone</label>
                  <input
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
                    value={bizInfo.phone}
                    onChange={e => setBizInfo(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+27 82 000 0000"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#374151] block mb-1.5">WhatsApp</label>
                  <input
                    className="w-full border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]"
                    value={bizInfo.whatsapp}
                    onChange={e => setBizInfo(p => ({ ...p, whatsapp: e.target.value }))}
                    placeholder="+27 82 000 0000"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#374151] block mb-2">Website Style</label>
                <div className="grid grid-cols-4 gap-2">
                  {STYLE_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setBizInfo(p => ({ ...p, style: opt.value }))}
                      className={`rounded-xl border p-3 text-left transition-all ${bizInfo.style === opt.value ? "border-[#0D7A4E] bg-[#F0FDF4]" : "border-[#E2E8F0] hover:border-[#94A3B8]"}`}
                    >
                      <p className="text-xs font-bold text-[#1E293B]">{opt.label}</p>
                      <p className="text-[10px] text-[#64748B]">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#374151] block mb-2 flex items-center gap-1.5">
                  <Palette size={12} /> Brand Colour
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {COLOR_PRESETS.map(col => (
                    <button
                      key={col}
                      onClick={() => setBizInfo(p => ({ ...p, primaryColor: col }))}
                      className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                      style={{ backgroundColor: col, borderColor: bizInfo.primaryColor === col ? "#1E293B" : "transparent" }}
                    />
                  ))}
                  <input
                    type="color"
                    value={bizInfo.primaryColor}
                    onChange={e => setBizInfo(p => ({ ...p, primaryColor: e.target.value }))}
                    className="w-8 h-8 rounded-full border border-[#E2E8F0] cursor-pointer"
                    title="Custom colour"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!bizInfo.businessName || !bizInfo.industry}
                className="w-full flex items-center justify-center gap-2 bg-[#0D7A4E] hover:bg-[#065A38] disabled:opacity-40 text-white font-bold py-3.5 rounded-2xl text-sm transition-colors mt-2"
              >
                <Sparkles size={16} />
                Generate My Website with AI
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Generating Screen ────────────────────────────────────────────────────
  if (step === "generating") {
    return (
      <div className="min-h-full bg-[#F1F5F9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-[#0D7A4E]/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Sparkles size={36} className="text-[#0D7A4E]" />
          </div>
          <h2 className="text-xl font-black text-[#1E293B] mb-2">Building your website…</h2>
          <p className="text-[#64748B] text-sm mb-6">Claude is writing copy and structuring your pages.</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {["Crafting headlines", "Writing copy", "Building sections", "Polishing content"].map((label, i) => (
              <span key={i} className="text-xs text-[#94A3B8] bg-white border border-[#E2E8F0] rounded-full px-3 py-1 animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Editor Screen ────────────────────────────────────────────────────────
  return (
    <div className="h-full flex flex-col" style={{ overflow: "hidden" }}>
      {/* Top bar */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/website" className="flex items-center gap-1.5 text-[#64748B] hover:text-[#0D7A4E] text-xs font-medium transition-colors">
            <ArrowLeft size={14} /> Back
          </Link>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <Globe size={14} className="text-[#0D7A4E]" />
          <span className="text-xs font-bold text-[#1E293B]">{bizInfo.businessName}</span>
          <span className="text-[10px] text-[#94A3B8]">· {sections.length} sections</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-[#E2E8F0] overflow-hidden">
            <button onClick={() => setPreviewMode("desktop")} className={`p-2 transition-colors ${previewMode === "desktop" ? "bg-[#F1F5F9]" : "hover:bg-[#F8FAFC]"}`}>
              <Monitor size={14} className={previewMode === "desktop" ? "text-[#0D7A4E]" : "text-[#94A3B8]"} />
            </button>
            <button onClick={() => setPreviewMode("mobile")} className={`p-2 transition-colors ${previewMode === "mobile" ? "bg-[#F1F5F9]" : "hover:bg-[#F8FAFC]"}`}>
              <Smartphone size={14} className={previewMode === "mobile" ? "text-[#0D7A4E]" : "text-[#94A3B8]"} />
            </button>
          </div>
          <button
            onClick={() => { setStep("start"); setSections([]); setSelectedId(null); }}
            className="text-xs text-[#64748B] border border-[#E2E8F0] px-3 py-1.5 rounded-lg hover:bg-[#F1F5F9] flex items-center gap-1.5"
          >
            <RefreshCw size={11} /> Restart
          </button>
          <button
            onClick={exportHTML}
            className="text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors text-white"
            style={{ backgroundColor: published ? "#10B981" : bizInfo.primaryColor }}
          >
            {published ? <Check size={12} /> : <Download size={12} />}
            {published ? "Downloaded!" : "Export HTML"}
          </button>
        </div>
      </div>

      {/* Three-panel layout */}
      <div className="flex-1 flex" style={{ overflow: "hidden", minHeight: 0 }}>

        {/* Left panel — section list. No overflow-hidden on outer so Add Section popup isn't clipped */}
        <div className="w-52 shrink-0 bg-white border-r border-[#E2E8F0] flex flex-col" style={{ minHeight: 0 }}>
          <div className="px-3 py-3 border-b border-[#E2E8F0] shrink-0">
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Sections</p>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1" style={{ minHeight: 0 }}>
            {showAddPanel && (
              <div className="mb-2 bg-[#F0FDF4] rounded-xl border border-[#0D7A4E]/20 p-2 space-y-0.5">
                <p className="text-[10px] font-bold text-[#0D7A4E] px-1 pb-1">Choose a section:</p>
                {ADDABLE_SECTIONS.map(s => (
                  <button
                    key={s.type}
                    onClick={() => addSection(s.type)}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white text-xs transition-colors"
                  >
                    <span className="font-medium text-[#1E293B]">{s.label}</span>
                    <span className="text-[#94A3B8] ml-1">· {s.desc}</span>
                  </button>
                ))}
              </div>
            )}
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                onClick={() => setSelectedId(sec.id)}
                className={`group flex items-center gap-2 px-2 py-2 rounded-xl cursor-pointer transition-all ${selectedId === sec.id ? "bg-[#F0FDF4] border border-[#0D7A4E]/20" : "hover:bg-[#F8FAFC] border border-transparent"}`}
              >
                <GripVertical size={11} className="text-[#CBD5E1] shrink-0" />
                <span className="flex-1 text-xs font-medium text-[#374151] truncate">{SECTION_LABELS[sec.type]}</span>
                <div className="hidden group-hover:flex items-center gap-0.5">
                  <button onClick={e => { e.stopPropagation(); moveSection(sec.id, -1); }} disabled={idx === 0} className="p-0.5 rounded hover:bg-[#E2E8F0] disabled:opacity-30"><ChevronUp size={10} /></button>
                  <button onClick={e => { e.stopPropagation(); moveSection(sec.id, 1); }} disabled={idx === sections.length - 1} className="p-0.5 rounded hover:bg-[#E2E8F0] disabled:opacity-30"><ChevronDown size={10} /></button>
                  <button onClick={e => { e.stopPropagation(); deleteSection(sec.id); }} className="p-0.5 rounded hover:bg-[#FEE2E2] text-[#EF4444]"><Trash2 size={10} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-[#E2E8F0] shrink-0">
            <button
              onClick={() => setShowAddPanel(v => !v)}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-white py-2 rounded-xl transition-colors"
              style={{ backgroundColor: bizInfo.primaryColor }}
            >
              <Plus size={12} /> {showAddPanel ? "Cancel" : "Add Section"}
            </button>
          </div>
        </div>

        {/* Centre panel — preview */}
        <div className="flex-1 bg-[#E2E8F0] overflow-y-auto flex justify-center p-4">
          <div
            className="bg-white shadow-xl"
            style={{
              width: previewMode === "mobile" ? "375px" : "100%",
              maxWidth: previewMode === "desktop" ? "900px" : "375px",
              borderRadius: previewMode === "mobile" ? "24px" : "12px",
              overflow: "hidden",
              alignSelf: "flex-start",
            }}
          >
            {/* Browser chrome bar */}
            <div className="bg-[#1E293B] px-4 py-2 flex items-center gap-2 shrink-0">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              </div>
              <div className="flex-1 bg-[#374151] rounded-md px-3 py-1 text-center">
                <span className="text-[10px] text-[#9CA3AF]">www.{bizInfo.businessName.toLowerCase().replace(/\s+/g, "")}.co.za</span>
              </div>
              <Eye size={12} className="text-[#6B7280]" />
            </div>
            {/* Website sections */}
            <div>
              {sections.map(sec => (
                <PreviewSection
                  key={sec.id}
                  section={sec}
                  primary={bizInfo.primaryColor}
                  selected={selectedId === sec.id}
                  onClick={() => setSelectedId(sec.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — editor */}
        <div className="w-72 shrink-0 bg-white border-l border-[#E2E8F0] flex flex-col" style={{ minHeight: 0 }}>
          {selectedSection ? (
            <>
              <div className="px-4 py-3 border-b border-[#E2E8F0] shrink-0">
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Edit Section</p>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <SectionEditor
                  section={selectedSection}
                  bizInfo={bizInfo}
                  primaryColor={bizInfo.primaryColor}
                  onUpdate={content => handleUpdateContent(selectedSection.id, content)}
                  onRegenerate={instruction => handleRegenerate(selectedSection.id, instruction)}
                  regenerating={regeneratingId === selectedSection.id}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <div>
                <AlignLeft size={28} className="text-[#CBD5E1] mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#94A3B8]">Click any section</p>
                <p className="text-xs text-[#CBD5E1]">to edit its content</p>
              </div>
            </div>
          )}

          {/* Colour quick-change */}
          <div className="px-4 py-3 border-t border-[#E2E8F0] shrink-0">
            <label className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider block mb-2 flex items-center gap-1">
              <Palette size={10} /> Brand Colour
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {COLOR_PRESETS.map(col => (
                <button
                  key={col}
                  onClick={() => setBizInfo(p => ({ ...p, primaryColor: col }))}
                  className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                  style={{ backgroundColor: col, borderColor: bizInfo.primaryColor === col ? "#1E293B" : "transparent" }}
                />
              ))}
              <input type="color" value={bizInfo.primaryColor} onChange={e => setBizInfo(p => ({ ...p, primaryColor: e.target.value }))} className="w-6 h-6 rounded-full border border-[#E2E8F0] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
