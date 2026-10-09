import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl font-bold text-navy">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-4 text-slate-600">
        Alamat yang kamu buka tidak ada atau beritanya sudah dipindahkan.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-navy px-5 py-2.5 font-semibold text-white hover:bg-gold hover:text-navy"
        >
          Ke beranda
        </Link>
        <Link
          href="/berita"
          className="rounded-lg border-2 border-navy px-5 py-2.5 font-semibold text-navy hover:bg-navy hover:text-white"
        >
          Lihat berita
        </Link>
      </div>
    </div>
  );
}
