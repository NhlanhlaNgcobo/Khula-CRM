"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ fullName: "", businessName: "", email: "", password: "" });
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          business_name: form.businessName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Create organisation via API
      const res = await fetch("/api/organisations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.businessName,
          owner_id: data.user.id,
          owner_email: form.email,
          owner_name: form.fullName,
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to set up your account.");
        setLoading(false);
      }
    }
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] w-full max-w-md p-8">
      <div className="inline-flex items-center gap-2 bg-[#E8F5EE] text-[#0D7A4E] px-3 py-1.5 rounded-full text-xs font-bold mb-5">
        14-day free trial · No credit card required
      </div>
      <h1 className="text-2xl font-bold text-[#1E293B] mb-1">Create your account</h1>
      <p className="text-[#64748B] text-sm mb-7">Get KHULA CRM set up in under 2 minutes.</p>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl bg-[#FEE2E2] border border-[#FECACA] text-sm text-[#DC2626]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#374151] mb-1.5">Full name</label>
            <input type="text" value={form.fullName} onChange={set("fullName")} placeholder="Sipho Dlamini" required
              className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E] text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#374151] mb-1.5">Business name</label>
            <input type="text" value={form.businessName} onChange={set("businessName")} placeholder="My Business" required
              className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E] text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#374151] mb-1.5">Email address</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="you@business.co.za" required
            className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E] text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#374151] mb-1.5">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} value={form.password} onChange={set("password")} placeholder="Min. 8 characters" required minLength={8}
              className="w-full px-3 py-2.5 pr-10 rounded-xl border border-[#E2E8F0] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E] text-sm" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]">
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-[#0D7A4E] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#065A38] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
          {loading ? <><Loader2 size={15} className="animate-spin" /> Creating account...</> : "Create Free Account"}
        </button>
      </form>

      <div className="mt-6 space-y-2">
        {["No credit card required", "Free 14-day trial on GROW plan", "Cancel any time"].map((t) => (
          <div key={t} className="flex items-center gap-2 text-xs text-[#64748B]">
            <CheckCircle2 size={14} className="text-[#0D7A4E]" />
            {t}
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-[#64748B] mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-[#0D7A4E] font-semibold hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
