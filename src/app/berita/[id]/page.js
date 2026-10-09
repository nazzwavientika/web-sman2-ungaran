import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeritaCard from "@/components/BeritaCard";
import { daftarBerita, formatTanggal, getBeritaById } from "@/data/berita";

// Membuat halaman /berita/[id] untuk setiap berita saat build
export function generateStaticParams() {
  return daftarBerita.map((berita) => ({ id: berita.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const berita = getBeritaById(id);
  return { title: berita ? berita.judul : "Berita tidak ditemukan" };
}

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  const berita = getBeritaById(id);

  if (!berita) {
    notFound();
  }

  const lainnya = daftarBerita.filter((b) => b.id !== berita.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/berita"
        className="inline-block text-sm font-semibold text-navy hover:text-gold-dark hover:underline"
      >
        &larr; Kembali ke daftar berita
      </Link>

      <article className="mx-auto mt-6 max-w-3xl">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="rounded bg-mist px-2 py-0.5 font-medium text-navy">
            {berita.kategori}
          </span>
          <time dateTime={berita.tanggal}>{formatTanggal(berita.tanggal)}</time>
        </div>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-navy md:text-4xl">
          {berita.judul}
        </h1>

        <Image
          src={berita.gambar}
          alt={berita.judul}
          width={1200}
          height={750}
          priority
          className="mt-6 aspect-[16/10] w-full rounded-xl object-cover"
        />

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-700">
          {berita.isi.map((paragraf) => (
            <p key={paragraf}>{paragraf}</p>
          ))}
        </div>

        <a
          href={berita.sumber}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-md border-2 border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          Baca artikel lengkap di website resmi
        </a>
      </article>

      <section className="mt-16">
        <h2 className="font-serif text-2xl font-bold text-navy">
          Berita lainnya
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lainnya.map((b) => (
            <BeritaCard key={b.id} berita={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
