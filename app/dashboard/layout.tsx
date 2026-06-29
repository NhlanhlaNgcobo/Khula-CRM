import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { BusinessTypeProvider } from "@/lib/business-type-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BusinessTypeProvider>
      <div className="flex h-screen overflow-hidden bg-[#F1F5F9]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </BusinessTypeProvider>
  );
}
