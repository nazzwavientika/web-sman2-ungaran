"use client";

import { useState } from "react";

function hariIni() {
  const d = new Date();
  const bulan = String(d.getMonth() + 1).padStart(2, "0");
  const hari = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${bulan}-${hari}`;
}

const kolom =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:border-navy focus:outline-none focus:ring-2 focus:ring-gold";

export default function BeritaForm({ awal, onSimpan, onBatal, sedangSimpan }) {
  const [judul, setJudul] = useState(awal?.judul ?? "");
  const [tanggal, setTanggal] = useState(awal?.tanggal ?? hariIni());
  const [kategori, setKategori] = useState(awal?.kategori ?? "");
  const [gambar, setGambar] = useState(awal?.gambar ?? "");
  const [ringkasan, setRingkasan] = useState(awal?.ringkasan ?? "");
  const [isi, setIsi] = useState((awal?.isi ?? []).join("\n\n"));
  const [sumber, setSumber] = useState(awal?.sumber ?? "");
  const [error, setError] = useState("");

  function kirim(e) {
    e.preventDefault();
    const paragraf = isi
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

    if (!judul.trim() || !ringkasan.trim() || paragraf.length === 0) {
      setError("Judul, ringkasan, dan isi berita wajib diisi.");
      return;
    }
    if (gambar.trim() && !gambar.trim().startsWith("/")) {
      setError(
        "Lokasi gambar harus diawali tanda / dan berada di folder public, contoh: /images/berita/foto.jpg"
      );
      return;
    }
    setError("");

    onSimpan({
      ...awal,
      judul: judul.trim(),
      tanggal,
      kategori: kategori.trim() || "Umum",
      gambar: gambar.trim(),
      ringkasan: ringkasan.trim(),
      isi: paragraf,
      sumber: sumber.trim(),
    });
  }

  return (
    <form
      onSubmit={kirim}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
    >
      <h2 className="font-serif text-xl font-bold text-navy">
        {awal?.id ? "Edit Berita" : "Tambah Berita"}
      </h2>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <label className="block text-sm font-medium text-navy">
        Judul
        <input
          className={kolom}
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">
          Tanggal
          <input
            type="date"
            className={kolom}
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-navy">
          Kategori
          <input
            className={kolom}
            value={kategori}
            placeholder="Contoh: Kesiswaan"
            onChange={(e) => setKategori(e.target.value)}
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-navy">
        Lokasi gambar di folder public (opsional)
        <input
          className={kolom}
          value={gambar}
          placeholder="Contoh: /images/berita/berita-1.jpg"
          onChange={(e) => setGambar(e.target.value)}
        />
      </label>

      <label className="block text-sm font-medium text-navy">
        Ringkasan
        <textarea
          rows={2}
          className={kolom}
          value={ringkasan}
          onChange={(e) => setRingkasan(e.target.value)}
        />
      </label>

      <label className="block text-sm font-medium text-navy">
        Isi berita (pisahkan paragraf dengan satu baris kosong)
        <textarea
          rows={7}
          className={kolom}
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
        />
      </label>

      <label className="block text-sm font-medium text-navy">
        Link sumber (opsional)
        <input
          className={kolom}
          value={sumber}
          placeholder="https://..."
          onChange={(e) => setSumber(e.target.value)}
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={sedangSimpan}
          className="rounded-md bg-navy px-5 py-2 font-semibold text-white transition-colors hover:bg-gold hover:text-navy disabled:opacity-60"
        >
          {sedangSimpan ? "Menyimpan..." : "Simpan"}
        </button>
        <button
          type="button"
          onClick={onBatal}
          disabled={sedangSimpan}
          className="rounded-md border-2 border-navy px-5 py-2 font-semibold text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-60"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
