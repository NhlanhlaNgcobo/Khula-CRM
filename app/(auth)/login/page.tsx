"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleDemoLogin = async () => {
    setLoadingDemo(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: "demo@khula.co.za",
      password: "KhulaDemo2026!",
    });
    if (error) {
      setError("Demo login failed: " + error.message);
      setLoadingDemo(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleGoogle = async () => {
    setLoadingGoogle(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] w-full max-w-md p-8">
      <h1 className="text-2xl font-bold text-[#1E293B] mb-1">Welcome back</h1>
      <p className="text-[#64748B] text-sm mb-4">Sign in to your KHULA account</p>

      {/* Demo login banner */}
      <div className="mb-6 p-4 bg-[#E8F5EE] border border-[#A7D7BF] rounded-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-[#065A38] mb-0.5">🚀 Demo Account — Builder Mode</p>
            <p className="text-[11px] text-[#0D7A4E]">Cape Town Dental Studio · GROW Plan</p>
            <p className="text-[11px] text-[#64748B] mt-1 font-mono">demo@khula.co.za · KhulaDemo2026!</p>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loadingDemo}
            className="shrink-0 flex items-center gap-1.5 bg-[#0D7A4E] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#065A38] transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {loadingDemo ? <Loader2 size={13} className="animate-spin" /> : null}
            {loadingDemo ? "Loading..." : "Enter Demo →"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl bg-[#FEE2E2] border border-[#FECACA] text-sm text-[#DC2626]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1.5">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.co.za"
            required
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E] focus:border-transparent text-sm"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-[#374151]">Password</label>
            <Link href="#" className="text-xs text-[#0D7A4E] hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 pr-12 rounded-xl border border-[#E2E8F0] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D7A4E] focus:border-transparent text-sm"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0D7A4E] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#065A38] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="relative flex items-center">
          <div className="flex-1 border-t border-[#E2E8F0]"></div>
          <span className="mx-4 text-xs text-[#94A3B8] font-medium">OR</span>
          <div className="flex-1 border-t border-[#E2E8F0]"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loadingGoogle}
          className="w-full border border-[#E2E8F0] text-[#374151] py-3 rounded-xl font-semibold text-sm hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
        >
          {loadingGoogle ? <Loader2 size={15} className="animate-spin" /> : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          Continue with Google
        </button>
      </form>

      <p className="text-center text-sm text-[#64748B] mt-8">
        Don't have an account?{" "}
        <Link href="/signup" className="text-[#0D7A4E] font-semibold hover:underline">
          Start free trial
        </Link>
      </p>
    </div>
  );
}
