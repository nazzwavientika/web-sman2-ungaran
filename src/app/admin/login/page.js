"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, login, supabaseTersedia } from "@/lib/adminService";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [proses, setProses] = useState(false);

  useEffect(() => {
    // Sudah login? langsung ke dashboard.
    if (!supabaseTersedia) return;
    getSession()
      .then((u) => {
        if (u) router.replace("/admin");
      })
      .catch(() => {});
  }, [router]);

  async function kirim(e) {
    e.preventDefault();
    setProses(true);
    setError("");
    try {
      const hasil = await login(email, password);
      if (!hasil.ok) setError(hasil.pesan);
      else router.push("/admin");
    } catch (err) {
      setError(err.message);
    }
    setProses(false);
  }

  return (
    <div className="bg-mist px-4 py-16">
      <form
        onSubmit={kirim}
        className="mx-auto max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <h1 className="font-serif text-2xl font-bold text-navy">Login Admin</h1>
        <p className="text-sm text-slate-600">
          Masuk dengan email dan password akun admin untuk mengelola website sekolah.
        </p>

        {!supabaseTersedia && (
          <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan
            NEXT_PUBLIC_SUPABASE_ANON_KEY terlebih dahulu.
          </p>
        )}

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <label className="block text-sm font-medium text-navy">
          Email
          <input
            type="email"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-navy focus:outline-none focus:ring-2 focus:ring-gold"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block text-sm font-medium text-navy">
          Password
          <input
            type="password"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-navy focus:outline-none focus:ring-2 focus:ring-gold"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          disabled={proses || !supabaseTersedia}
          className="w-full rounded-md bg-navy px-4 py-2.5 font-semibold text-white transition-colors hover:bg-gold hover:text-navy disabled:opacity-60"
        >
          {proses ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
