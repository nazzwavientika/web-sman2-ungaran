import PageHeader from "@/components/PageHeader";
import { kegiatan, profil, sekolah } from "@/data/sekolah";

export const metadata = {
  title: "About",
  description: `Profil, sejarah, visi, dan misi ${sekolah.nama}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        judul="Tentang Sekolah"
        deskripsi={`Mengenal ${sekolah.nama}: ${sekolah.slogan}, ${sekolah.tagline}.`}
      />

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-14">
        <section className="grid gap-6 md:grid-cols-3">
          <h2 className="font-serif text-2xl font-bold text-navy">
            Profil Sekolah
          </h2>
          <p className="text-lg leading-relaxed text-slate-700 md:col-span-2">
            {profil.ringkas}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <h2 className="font-serif text-2xl font-bold text-navy">
            Sejarah Singkat
          </h2>
          <div className="space-y-4 leading-relaxed text-slate-700 md:col-span-2">
            {profil.sejarah.map((paragraf) => (
              <p key={paragraf}>{paragraf}</p>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-xl bg-navy p-8 text-center text-white">
            <h2 className="font-serif text-2xl font-bold text-gold">Visi</h2>
            <p className="mt-4 text-lg leading-relaxed">{profil.visi}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-navy">Misi</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-slate-700">
              {profil.misi.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-navy">
            Kegiatan di Sekolah
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kegiatan.map((item) => (
              <div
                key={item.judul}
                className="rounded-xl border border-slate-200 p-5 transition-colors hover:border-gold hover:bg-mist"
              >
                <h3 className="text-lg font-semibold text-navy">{item.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.isi}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-navy">
              Alamat dan Kontak
            </h2>
            <dl className="mt-4 space-y-3 text-slate-700">
              <div>
                <dt className="text-sm font-semibold text-navy">Alamat</dt>
                <dd>{sekolah.alamat}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-navy">Email</dt>
                <dd>{sekolah.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-navy">Telepon</dt>
                <dd>{sekolah.telepon}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-navy">Website resmi</dt>
                <dd>
                  <a
                    href={sekolah.webResmi}
                    target="_blank"
                    rel="noreferrer"
                    className="text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-dark"
                  >
                    sman2-ungaran.sch.id
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <iframe
            title={`Peta lokasi ${sekolah.nama}`}
            src={sekolah.mapsEmbed}
            loading="lazy"
            className="h-72 w-full rounded-xl border border-slate-200"
          />
        </section>
      </div>
    </>
  );
}
