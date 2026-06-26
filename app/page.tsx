import Link from "next/link";
import { Logo } from "@/components/logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#E2E8F0]">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-[#64748B] hover:text-[#1E293B] font-medium text-sm transition-colors">
            Sign in
          </Link>
          <Link href="/signup" className="bg-[#0D7A4E] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#065A38] transition-colors">
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-white to-[#F1F5F9]">
        <div className="inline-flex items-center gap-2 bg-[#E8F5EE] text-[#0D7A4E] px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <span className="w-2 h-2 rounded-full bg-[#0D7A4E] animate-pulse inline-block"></span>
          GHL Alternative · R149/mo · WhatsApp-First
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1E293B] leading-tight mb-6 max-w-3xl">
          Grow Your Business With <span className="text-[#0D7A4E]">KHULA CRM</span>
        </h1>
        <p className="text-xl text-[#64748B] max-w-2xl mb-10 leading-relaxed">
          WhatsApp-first CRM built for South African SMEs. Automate follow-ups, track leads, book appointments — for less than R5/day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/signup" className="bg-[#0D7A4E] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#065A38] transition-colors">
            Start Free 14-Day Trial
          </Link>
          <Link href="/dashboard" className="bg-white text-[#1E293B] px-8 py-4 rounded-xl font-semibold text-lg border border-[#E2E8F0] hover:border-[#0D7A4E] transition-colors">
            View Live Demo →
          </Link>
        </div>
        <div className="flex items-center gap-8 text-sm text-[#64748B]">
          {[["R149", "per month"], ["3.5M", "SA SMEs"], ["78%", "cheaper than GHL"], ["No", "credit card needed"]].map(([val, lbl], i) => (
            <div key={lbl} className="flex items-center gap-8">
              {i > 0 && <div className="w-px h-10 bg-[#E2E8F0]"></div>}
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1E293B]">{val}</div>
                <div>{lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1E293B] mb-4">Everything SA businesses need</h2>
          <p className="text-center text-[#64748B] mb-14 max-w-xl mx-auto">10 tools in one dashboard. Built for the way South African businesses actually work.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "💬", title: "WhatsApp-First Inbox", desc: "Manage all WhatsApp, email, and SMS conversations in one unified inbox." },
              { icon: "📋", title: "Visual Pipeline", desc: "Drag-and-drop Kanban board tracks every lead from first contact to closed deal." },
              { icon: "📅", title: "Booking System", desc: "Built-in Calendly alternative. Clients book online, you get notified on WhatsApp." },
              { icon: "⚡", title: "Smart Automations", desc: "10 pre-built workflows. Welcome messages, reminders, follow-ups — automatic." },
              { icon: "📊", title: "Revenue Analytics", desc: "See exactly which channels and team members are making you money." },
              { icon: "🎯", title: "Lead Capture Forms", desc: "Drag-and-drop form builder. Share a link, embed on your site, or print a QR code." },
            ].map((f) => (
              <div key={f.title} className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#0D7A4E] hover:shadow-md transition-all">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-[#1E293B] mb-2">{f.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-8 bg-[#F1F5F9]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1E293B] mb-4">Priced for South Africa</h2>
          <p className="text-center text-[#64748B] mb-14">No hidden fees. No annual lock-in. Cancel any time.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "SPARK", price: "Free", sub: "forever", popular: false, features: ["1 user", "50 contacts", "Basic pipeline", "Email only", "1 form"] },
              { name: "GROW", price: "R259", sub: "/month", popular: true, features: ["3 users", "500 contacts", "WhatsApp + Email", "5 automations", "Booking page", "Basic analytics"] },
              { name: "SCALE", price: "R499", sub: "/month", popular: false, features: ["10 users", "5,000 contacts", "WhatsApp + Email + SMS", "Unlimited automations", "Full analytics", "Priority support"] },
            ].map((p) => (
              <div key={p.name} className={`bg-white rounded-2xl p-8 border-2 relative ${p.popular ? "border-[#0D7A4E] shadow-xl" : "border-[#E2E8F0]"}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0D7A4E] text-white px-4 py-1 rounded-full text-xs font-bold">MOST POPULAR</div>}
                <div className={`font-bold text-sm mb-2 ${p.popular ? "text-[#0D7A4E]" : "text-[#64748B]"}`}>{p.name}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#1E293B]">{p.price}</span>
                  <span className="text-[#64748B]">{p.sub}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                      <svg className="w-4 h-4 text-[#0D7A4E] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${p.popular ? "bg-[#0D7A4E] text-white hover:bg-[#065A38]" : "bg-[#F1F5F9] text-[#1E293B] hover:bg-[#E2E8F0]"}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-[#94A3B8] py-10 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" variant="light" />
          <p className="text-sm">© 2025 KHULA CRM. Built for South Africa. Priced for South Africa.</p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
