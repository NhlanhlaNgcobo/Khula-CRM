import Link from "next/link";
import { Logo } from "@/components/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
      <div className="flex items-center justify-between px-8 py-5">
        <Link href="/">
          <Logo size="md" />
        </Link>
        <div className="text-sm text-[#64748B]">
          Need help?{" "}
          <a href="mailto:support@khulacr m.co.za" className="text-[#0D7A4E] font-medium hover:underline">
            support@khulacr m.co.za
          </a>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
