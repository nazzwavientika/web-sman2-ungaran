export default function PageHeader({ judul, deskripsi }) {
  return (
    <section className="border-b-4 border-gold bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">{judul}</h1>
        {deskripsi && (
          <p className="mt-3 max-w-2xl text-lg text-white/85">{deskripsi}</p>
        )}
      </div>
    </section>
  );
}
