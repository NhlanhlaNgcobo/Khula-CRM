"use client";

import { useState } from "react";
import { Plus, Eye, Share2, QrCode, Copy, MoreHorizontal, FileText, Trash2, Type, Phone, Mail, AlignLeft, ChevronDown, ToggleLeft } from "lucide-react";

const forms = [
  { id: 1, name: "General Enquiry Form", submissions: 47, conversion: "68%", lastSubmission: "2 min ago", pipeline: "New Lead", status: "active" },
  { id: 2, name: "Consultation Booking Request", submissions: 23, conversion: "81%", lastSubmission: "1h ago", pipeline: "Booked", status: "active" },
  { id: 3, name: "Quote Request Form", submissions: 12, conversion: "55%", lastSubmission: "3h ago", pipeline: "Interested", status: "active" },
  { id: 4, name: "Whitening Special Offer", submissions: 5, conversion: "40%", lastSubmission: "2d ago", pipeline: "New Lead", status: "draft" },
];

const fieldTypes = [
  { type: "text", icon: Type, label: "Text Field" },
  { type: "phone", icon: Phone, label: "Phone Number" },
  { type: "email", icon: Mail, label: "Email" },
  { type: "textarea", icon: AlignLeft, label: "Long Text" },
  { type: "dropdown", icon: ChevronDown, label: "Dropdown" },
  { type: "toggle", icon: ToggleLeft, label: "Checkbox" },
];

const builderFields = [
  { id: "f1", type: "text", label: "Full Name", required: true, placeholder: "Your full name" },
  { id: "f2", type: "phone", label: "WhatsApp Number", required: true, placeholder: "+27 82 000 0000" },
  { id: "f3", type: "email", label: "Email Address", required: false, placeholder: "you@email.com" },
  { id: "f4", type: "textarea", label: "What service are you interested in?", required: false, placeholder: "Tell us more..." },
];

export default function FormsPage() {
  const [view, setView] = useState<"list" | "builder">("list");
  const [fields, setFields] = useState(builderFields);
  const [selectedField, setSelectedField] = useState<typeof builderFields[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl p-1">
          <button onClick={() => setView("list")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "list" ? "bg-[#0D7A4E] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}>All Forms</button>
          <button onClick={() => setView("builder")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "builder" ? "bg-[#0D7A4E] text-white" : "text-[#64748B] hover:bg-[#F1F5F9]"}`}>Form Builder</button>
        </div>
        <button onClick={() => setView("builder")} className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">
          <Plus size={14} /> New Form
        </button>
      </div>

      {view === "list" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[["Total Forms", "4", "#0D7A4E"], ["Total Submissions", "87", "#3B82F6"], ["This Week", "18", "#8B5CF6"], ["Avg. Conversion", "61%", "#10B981"]].map(([label, val, color]) => (
              <div key={label as string} className="bg-white rounded-xl border border-[#E2E8F0] px-5 py-4">
                <div className="text-2xl font-bold" style={{ color: color as string }}>{val}</div>
                <div className="text-sm text-[#64748B]">{label}</div>
              </div>
            ))}
          </div>

          {/* Forms list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forms.map((f) => (
              <div key={f.id} className={`bg-white rounded-2xl border-2 p-5 hover:shadow-md transition-all ${f.status === "active" ? "border-[#E2E8F0] hover:border-[#0D7A4E]" : "border-dashed border-[#E2E8F0]"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] flex items-center justify-center">
                      <FileText size={18} className="text-[#0D7A4E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E293B]">{f.name}</h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${f.status === "active" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F1F5F9] text-[#94A3B8]"}`}>
                        {f.status}
                      </span>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors">
                    <MoreHorizontal size={15} className="text-[#94A3B8]" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[["Submissions", f.submissions], ["Conversion", f.conversion], ["Pipeline", f.pipeline]].map(([k, v]) => (
                    <div key={k as string} className="bg-[#F8FAFC] rounded-lg px-3 py-2">
                      <div className="text-xs text-[#94A3B8]">{k}</div>
                      <div className="font-semibold text-[#1E293B] text-sm">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                  <span className="text-xs text-[#94A3B8]">Last: {f.lastSubmission}</span>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors" title="Preview"><Eye size={14} className="text-[#64748B]" /></button>
                    <button onClick={copyLink} className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors" title="Copy link">
                      {copied ? <Copy size={14} className="text-[#0D7A4E]" /> : <Share2 size={14} className="text-[#64748B]" />}
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors" title="QR Code"><QrCode size={14} className="text-[#64748B]" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-[#FEE2E2] transition-colors" title="Delete"><Trash2 size={14} className="text-[#EF4444]" /></button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => setView("builder")} className="bg-white rounded-2xl border-2 border-dashed border-[#E2E8F0] p-5 flex flex-col items-center justify-center gap-3 hover:border-[#0D7A4E] hover:text-[#0D7A4E] text-[#94A3B8] transition-colors cursor-pointer min-h-[180px]">
              <Plus size={24} />
              <span className="text-sm font-semibold">Create New Form</span>
            </button>
          </div>
        </>
      )}

      {view === "builder" && (
        <div className="flex gap-5 min-h-[600px]">
          {/* Field picker */}
          <div className="w-48 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4">
            <h4 className="font-semibold text-[#1E293B] text-sm mb-3">Add Fields</h4>
            <div className="space-y-2">
              {fieldTypes.map((f) => (
                <button key={f.type} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#64748B] hover:border-[#0D7A4E] hover:text-[#0D7A4E] hover:bg-[#E8F5EE] transition-all">
                  <f.icon size={14} />
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <input className="font-bold text-[#1E293B] text-xl border-none outline-none focus:bg-[#F1F5F9] rounded px-1" defaultValue="General Enquiry Form" />
                <p className="text-xs text-[#94A3B8] mt-0.5">Cape Town Dental Studio · public link active</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] rounded-xl text-sm text-[#64748B] hover:bg-[#F1F5F9] transition-colors"><Eye size={13} /> Preview</button>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors"><Share2 size={13} /> Publish</button>
              </div>
            </div>
            <div className="max-w-md space-y-4">
              {fields.map((f) => (
                <div key={f.id} onClick={() => setSelectedField(f)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedField?.id === f.id ? "border-[#0D7A4E] bg-[#E8F5EE]" : "border-[#E2E8F0] hover:border-[#A7D7BF]"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-[#1E293B]">
                      {f.label}
                      {f.required && <span className="text-[#EF4444] ml-1">*</span>}
                    </label>
                  </div>
                  {f.type === "textarea" ? (
                    <textarea rows={3} placeholder={f.placeholder} className="w-full px-3 py-2 bg-white rounded-lg border border-[#E2E8F0] text-sm text-[#94A3B8] resize-none" readOnly />
                  ) : (
                    <input type="text" placeholder={f.placeholder} className="w-full px-3 py-2 bg-white rounded-lg border border-[#E2E8F0] text-sm text-[#94A3B8]" readOnly />
                  )}
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-[#E2E8F0] rounded-xl text-[#94A3B8] text-sm hover:border-[#0D7A4E] hover:text-[#0D7A4E] transition-colors flex items-center justify-center gap-2">
                <Plus size={14} /> Drop a field here
              </button>
              <button className="w-full py-3 bg-[#0D7A4E] text-white rounded-xl text-sm font-semibold hover:bg-[#065A38] transition-colors">Submit Enquiry</button>
            </div>
          </div>

          {/* Field settings */}
          <div className="w-56 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4">
            <h4 className="font-semibold text-[#1E293B] text-sm mb-4">Form Settings</h4>
            {selectedField ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[#374151] block mb-1">Label</label>
                  <input defaultValue={selectedField.label} className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#374151] block mb-1">Placeholder</label>
                  <input defaultValue={selectedField.placeholder} className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-[#374151]">Required</label>
                  <button className={`w-9 h-5 rounded-full transition-colors ${selectedField.required ? "bg-[#0D7A4E]" : "bg-[#E2E8F0]"}`}>
                    <span className={`block w-3.5 h-3.5 rounded-full bg-white shadow transition-transform mx-0.5 ${selectedField.required ? "translate-x-3.5" : "translate-x-0"}`}></span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-[#94A3B8] text-xs py-8">Select a field to edit settings</div>
            )}
            <div className="mt-6 pt-4 border-t border-[#E2E8F0] space-y-3">
              <h5 className="text-xs font-semibold text-[#374151]">Pipeline</h5>
              <select className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]">
                <option>New Lead</option>
                <option>Contacted</option>
                <option>Interested</option>
              </select>
              <h5 className="text-xs font-semibold text-[#374151] mt-3">Automation</h5>
              <select className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E]">
                <option>New Lead Welcome</option>
                <option>None</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
