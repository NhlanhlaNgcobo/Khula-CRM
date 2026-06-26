import { TrendingUp, Users, Calendar, Target, CheckCircle, Circle, ArrowRight, Zap } from "lucide-react";

const stats = [
  { label: "Today's Leads", value: "7", change: "+3 vs yesterday", icon: Users, color: "#3B82F6", bg: "#EFF6FF" },
  { label: "Pipeline Value", value: "R284,500", change: "12 open deals", icon: TrendingUp, color: "#0D7A4E", bg: "#E8F5EE" },
  { label: "Bookings This Week", value: "23", change: "4 today", icon: Calendar, color: "#8B5CF6", bg: "#F5F3FF" },
  { label: "Conversion Rate", value: "34%", change: "+2% this month", icon: Target, color: "#F59E0B", bg: "#FFFBEB" },
];

const onboardingSteps = [
  { label: "Business profile complete", done: true },
  { label: "Contacts imported (at least 1)", done: true },
  { label: "WhatsApp connected", done: false },
  { label: "First automation activated", done: false },
  { label: "Booking page published", done: true },
  { label: "First team member invited", done: false },
  { label: "First deal added to pipeline", done: true },
];

const recentActivity = [
  { avatar: "SD", name: "Sipho Dlamini", action: "moved Fatima Patel to Interested", time: "2m ago", color: "#0D7A4E" },
  { avatar: "NK", name: "Nomsa Khumalo", action: "booked Teeth Cleaning for tomorrow", time: "8m ago", color: "#8B5CF6" },
  { avatar: "RV", name: "Riaan van der Berg", action: "replied on WhatsApp", time: "12m ago", color: "#3B82F6" },
  { avatar: "FP", name: "Fatima Patel", action: "submitted contact form", time: "25m ago", color: "#F59E0B" },
  { avatar: "SD", name: "System", action: "sent birthday message to 2 contacts", time: "1h ago", color: "#64748B" },
  { avatar: "TM", name: "Thabo Mokoena", action: "deal closed won — R12,500", time: "2h ago", color: "#10B981" },
];

const automationStatus = [
  { name: "New Lead Welcome", lastRun: "2m ago", status: "active", runs: 142 },
  { name: "Booking Confirmation", lastRun: "8m ago", status: "active", runs: 89 },
  { name: "24-Hour Reminder", lastRun: "1h ago", status: "active", runs: 201 },
  { name: "30-Day Re-Engagement", lastRun: "2d ago", status: "active", runs: 34 },
  { name: "Review Request", lastRun: "Never", status: "inactive", runs: 0 },
];

const tasks = [
  { contact: "Lerato Sithole", task: "Follow up on proposal", due: "Today, 2pm", urgent: true },
  { contact: "Johannes Botha", task: "Send pricing sheet", due: "Today, 4pm", urgent: false },
  { contact: "Ayanda Nkosi", task: "Confirm appointment", due: "Today, 5pm", urgent: true },
];

const completedSteps = onboardingSteps.filter((s) => s.done).length;
const progress = Math.round((completedSteps / onboardingSteps.length) * 100);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Onboarding progress */}
      {progress < 100 && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-[#1E293B] text-sm">Setup Progress</h3>
              <p className="text-[#64748B] text-xs">{completedSteps} of {onboardingSteps.length} steps complete</p>
            </div>
            <span className="text-[#0D7A4E] text-sm font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-[#E2E8F0] rounded-full h-2 mb-4">
            <div className="bg-[#0D7A4E] h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex flex-wrap gap-3">
            {onboardingSteps.map((step) => (
              <div key={step.label} className={`flex items-center gap-1.5 text-xs ${step.done ? "text-[#0D7A4E]" : "text-[#94A3B8]"}`}>
                {step.done ? <CheckCircle size={13} /> : <Circle size={13} />}
                {step.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl" style={{ background: s.bg }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <ArrowRight size={14} className="text-[#CBD5E1]" />
            </div>
            <div className="text-2xl font-bold text-[#1E293B]">{s.value}</div>
            <div className="text-sm text-[#64748B] mt-0.5">{s.label}</div>
            <div className="text-xs text-[#0D7A4E] font-medium mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Tasks due today */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1E293B]">Tasks Due Today</h3>
            <span className="bg-[#EF4444] text-white text-xs font-bold px-2 py-0.5 rounded-full">{tasks.length}</span>
          </div>
          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t.contact} className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0D7A4E] transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${t.urgent ? "bg-[#EF4444]" : "bg-[#F59E0B]"}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#1E293B] text-sm">{t.contact}</div>
                  <div className="text-[#64748B] text-xs">{t.task}</div>
                  <div className="text-[#0D7A4E] text-xs font-medium mt-1">{t.due}</div>
                </div>
                <button className="text-xs bg-[#0D7A4E] text-white px-2.5 py-1 rounded-lg hover:bg-[#065A38] transition-colors shrink-0">Done</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h3 className="font-semibold text-[#1E293B] mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: a.color }}>
                  {a.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-[#1E293B]">{a.name}</span>
                  <span className="text-sm text-[#64748B]"> {a.action}</span>
                </div>
                <span className="text-[10px] text-[#94A3B8] shrink-0 mt-0.5">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Automation status */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1E293B]">Automations</h3>
            <Zap size={15} className="text-[#0D7A4E]" />
          </div>
          <div className="space-y-3">
            {automationStatus.map((a) => (
              <div key={a.name} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${a.status === "active" ? "bg-[#10B981]" : "bg-[#CBD5E1]"}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#1E293B] truncate">{a.name}</div>
                  <div className="text-xs text-[#94A3B8]">{a.runs} runs · last {a.lastRun}</div>
                </div>
                <button className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${a.status === "active" ? "bg-[#E8F5EE] text-[#0D7A4E]" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                  {a.status === "active" ? "On" : "Off"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue this month */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1E293B]">Revenue This Month</h3>
          <span className="text-[#64748B] text-sm">June 2025</span>
        </div>
        <div className="flex items-end gap-6">
          <div>
            <div className="text-3xl font-bold text-[#1E293B]">R48,250</div>
            <div className="text-sm text-[#0D7A4E] font-medium">+22% vs last month</div>
          </div>
          <div className="flex-1">
            <div className="flex items-end gap-2 h-16">
              {[60, 40, 80, 55, 90, 70, 100, 65, 85, 75, 95, 110].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md transition-all hover:opacity-80" style={{ height: `${h}%`, background: i === 11 ? "#0D7A4E" : "#E8F5EE" }}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-[#94A3B8] text-right">Target: R60,000</div>
      </div>
    </div>
  );
}
