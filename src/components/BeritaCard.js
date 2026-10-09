import Image from "next/image";
import Link from "next/link";
import { formatTanggal } from "@/data/berita";

export default function BeritaCard({ berita }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
      <Image
        src={berita.gambar}
        alt={berita.judul}
        width={800}
        height={500}
        className="aspect-[16/10] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="rounded bg-mist px-2 py-0.5 font-medium text-navy">
            {berita.kategori}
          </span>
          <time dateTime={berita.tanggal}>{formatTanggal(berita.tanggal)}</time>
        </div>
        <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-navy">
          {berita.judul}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {berita.ringkasan}
        </p>
        <Link
          href={`/berita/${berita.id}`}
          className="mt-4 inline-block self-start rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-navy"
        >
          Baca Selengkapnya
        </Link>
      </div>
    </article>
  );
}
