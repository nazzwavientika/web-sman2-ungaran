import Image from "next/image";
import Link from "next/link";
import { sekolah } from "@/data/sekolah";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <Image
        src="/images/banner.jpg"
        alt={`Gedung ${sekolah.nama}`}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-80"
      />
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Image
          src="/images/logo-sekolah.png"
          alt={`Logo ${sekolah.nama}`}
          width={96}
          height={96}
          priority
          className="h-24 w-24 object-contain"
        />
        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-bold leading-tight md:text-6xl">
          {sekolah.nama}
        </h1>
        <p className="mt-3 text-2xl font-semibold text-gold md:text-3xl">
          {sekolah.tagline}
        </p>
        <p className="mt-2 text-lg text-white/90">{sekolah.slogan}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="rounded-lg bg-gold px-6 py-3 text-base font-semibold text-navy transition-colors hover:bg-white"
          >
            Kenali Sekolah Kami
          </Link>
          <Link
            href="/berita"
            className="rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white hover:text-navy"
          >
            Baca Berita
          </Link>
        </div>
      </div>
    </section>
  );
}
