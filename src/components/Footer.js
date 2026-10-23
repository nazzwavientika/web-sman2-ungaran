import Link from "next/link";
import { menu, sekolah } from "@/data/sekolah";
import AdminLink from "@/components/AdminLink";

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-xl font-bold">{sekolah.nama}</h2>
          <p className="mt-1 text-gold">
            {sekolah.slogan} - {sekolah.tagline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            {sekolah.alamat}
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold">Halaman</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {menu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-gold hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold">Kontak</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>{sekolah.email}</li>
            <li>{sekolah.telepon}</li>
            <li>
              <a
                href={sekolah.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold hover:underline"
              >
                Instagram
              </a>
              {" | "}
              <a
                href={sekolah.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold hover:underline"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-sm text-white/70">
        &copy; 2026 {sekolah.nama}. Dibuat sebagai tugas Pemweb.
        <span className="mx-2">|</span>
          <AdminLink />
      </div>
    </footer>
  );
}
