import Link from "next/link";
import Hero from "@/components/Hero";
import BeritaCard from "@/components/BeritaCard";
import { daftarBerita } from "@/data/berita";
import { profil, sambutan, sekolah } from "@/data/sekolah";

export default function HomePage() {
  const beritaTerbaru = daftarBerita.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Sambutan + informasi singkat */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-5">
        <div className="md:col-span-3">
          <h2 className="font-serif text-3xl font-bold text-navy">
            {sambutan.judul}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            {sambutan.isi}
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">{profil.ringkas}</p>
          <Link
            href="/about"
            className="mt-6 inline-block rounded-lg border-2 border-navy px-5 py-2.5 font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Selengkapnya tentang sekolah
          </Link>
        </div>

        <aside className="space-y-4 md:col-span-2">
          <div className="rounded-xl border-l-4 border-gold bg-mist p-5">
            <h3 className="text-sm font-semibold text-navy">Alamat</h3>
            <p className="mt-1 text-slate-700">{sekolah.alamat}</p>
          </div>
          <div className="rounded-xl border-l-4 border-gold bg-mist p-5">
            <h3 className="text-sm font-semibold text-navy">Hubungi kami</h3>
            <p className="mt-1 text-slate-700">{sekolah.email}</p>
            <p className="text-slate-700">{sekolah.telepon}</p>
          </div>
          <div className="rounded-xl border-l-4 border-gold bg-mist p-5">
            <h3 className="text-sm font-semibold text-navy">Identitas</h3>
            <p className="mt-1 text-slate-700">
              {sekolah.slogan}, {sekolah.tagline}
            </p>
          </div>
        </aside>
      </section>

      {/* Berita terbaru (minimal 3) */}
      <section className="bg-mist py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl font-bold text-navy">
              Berita Terbaru
            </h2>
            <Link
              href="/berita"
              className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-dark"
            >
              Lihat semua berita
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beritaTerbaru.map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
