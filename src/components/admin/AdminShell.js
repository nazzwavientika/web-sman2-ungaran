"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSession, logout, supabaseTersedia } from "@/lib/adminService";

const menuAdmin = [
  { label: "Dashboard", href: "/admin" },
  { label: "Kelola Berita", href: "/admin/berita" },
];

// Kerangka halaman admin + penjaga login.
// Kalau belum login, pengguna dialihkan ke /admin/login.
// Children menerima data user lewat fungsi: <AdminShell>{(user) => ...}</AdminShell>
export default function AdminShell({ judul, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!supabaseTersedia) return;
    let batal = false;
    (async () => {
      try {
        const u = await getSession();
        if (batal) return;
        if (!u) router.replace("/admin/login");
        else setUser(u);
      } catch {
        if (!batal) router.replace("/admin/login");
      }
    })();
    return () => {
      batal = true;
    };
  }, [router]);

  async function keluar() {
    await logout();
    router.replace("/admin/login");
  }

  if (!supabaseTersedia) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20">
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
          <h1 className="font-serif text-xl font-bold">Supabase belum dikonfigurasi</h1>
          <p className="mt-2 text-sm leading-relaxed">
            Isi <b>NEXT_PUBLIC_SUPABASE_URL</b> dan{" "}
            <b>NEXT_PUBLIC_SUPABASE_ANON_KEY</b> di file <b>.env.local</b> (lokal)
            atau di Environment Variables Vercel, lalu jalankan ulang.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <p className="px-4 py-24 text-center text-slate-500">
        Memeriksa sesi login...
      </p>
    );
  }

  return (
    <div className="min-h-[70vh] bg-mist">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-xl bg-navy p-4 text-white">
          <p className="text-sm text-white/70">Masuk sebagai</p>
          <p className="break-all font-semibold">{user.email}</p>

          <nav className="mt-4 flex flex-wrap gap-2 md:flex-col">
            {menuAdmin.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${
                  pathname === item.href ? "bg-white/15 text-gold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Lihat Website
            </Link>
          </nav>

          <button
            type="button"
            onClick={keluar}
            className="mt-4 w-full rounded-md bg-gold px-3 py-2 text-sm font-semibold text-navy transition-colors hover:bg-white"
          >
            Keluar
          </button>
        </aside>

        <section className="min-w-0">
          <h1 className="font-serif text-2xl font-bold text-navy">{judul}</h1>
          <div className="mt-6">
            {typeof children === "function" ? children(user) : children}
          </div>
        </section>
      </div>
    </div>
  );
}
