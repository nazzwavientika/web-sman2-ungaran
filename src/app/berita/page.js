import PageHeader from "@/components/PageHeader";
import BeritaCard from "@/components/BeritaCard";
import { getDaftarBerita } from "@/lib/beritaService";
import { sekolah } from "@/data/sekolah";

export const metadata = {
  title: "Berita",
  description: `Kabar dan kegiatan terbaru ${sekolah.nama}.`,
};

// Berita dibaca dari Supabase setiap halaman dibuka.
export const dynamic = "force-dynamic";

export default async function BeritaPage() {
  const daftarBerita = await getDaftarBerita();

  return (
    <>
      <PageHeader
        judul="Berita Sekolah"
        deskripsi="Kabar dan kegiatan terbaru dari SMA Negeri 2 Ungaran."
      />
      <section className="mx-auto max-w-6xl px-4 py-14">
        {daftarBerita.length === 0 ? (
          <p className="text-slate-600">Belum ada berita.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {daftarBerita.map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
