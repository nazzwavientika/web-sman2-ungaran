"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu, sekolah } from "@/data/sekolah";

export default function Navbar() {
  const pathname = usePathname();
  const [terbuka, setTerbuka] = useState(false);

  // Menu "Berita" tetap aktif saat membuka /berita/[id]
  const aktif = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b-4 border-gold bg-navy text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setTerbuka(false)}
        >
          <Image
            src="/images/logo-sekolah.png"
            alt={`Logo ${sekolah.nama}`}
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          <span className="leading-tight">
            <span className="block font-serif text-lg font-bold">
              {sekolah.nama}
            </span>
            <span className="block text-xs text-gold">{sekolah.tagline}</span>
          </span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-2 md:flex">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-md px-4 py-2 text-base font-medium transition-colors hover:bg-white/10 hover:text-gold ${
                  aktif(item.href)
                    ? "border-b-2 border-gold text-gold"
                    : "border-b-2 border-transparent"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol menu mobile */}
        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={terbuka}
          onClick={() => setTerbuka(!terbuka)}
          className="rounded-md border border-white/40 px-3 py-2 text-sm font-medium hover:bg-white/10 md:hidden"
        >
          {terbuka ? "Tutup" : "Menu"}
        </button>
      </nav>

      {/* Menu mobile */}
      {terbuka && (
        <ul className="border-t border-white/20 bg-navy-soft px-4 py-2 md:hidden">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setTerbuka(false)}
                className={`block rounded-md px-3 py-3 text-base font-medium hover:bg-white/10 ${
                  aktif(item.href) ? "text-gold" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
