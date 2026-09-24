"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email atau password salah.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f5f0e6] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white border border-[#ded5c5] p-8 md:p-10">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-[#17130f]">
            Tailor<span className="text-[#d29a3a]">Jogja</span>
          </h1>

          <p className="mt-2 text-sm text-[#746b60]">
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#29231d]">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@email.com"
              className="w-full border border-[#d8d0c3] bg-white px-4 py-3 text-[#17130f] outline-none transition focus:border-[#d29a3a]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#29231d]">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Masukkan password"
              className="w-full border border-[#d8d0c3] bg-white px-4 py-3 text-[#17130f] outline-none transition focus:border-[#d29a3a]"
            />
          </div>

          {error && (
            <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#17130f] px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#d29a3a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Login Admin"}
          </button>
        </form>

        <div className="mt-7 border-t border-[#e6dfd3] pt-5 text-center">
          <a
            href="/"
            className="text-sm text-[#746b60] transition hover:text-[#d29a3a]"
          >
            ← Kembali ke website
          </a>
        </div>
      </div>
    </main>
  );
}