"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { daftarBerita, formatTanggal } from "@/data/berita";
import {
  ambilBerita,
  gantiPassword,
  imporBerita,
  pesanError,
  resetBerita,
  supabaseTersedia,
} from "@/lib/adminService";

function KartuStatistik({ label, nilai }) {
  return (
    <div className="rounded-xl border-l-4 border-gold bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-serif text-3xl font-bold text-navy">{nilai}</p>
    </div>
  );
}

function Isi({ user }) {
  const [berita, setBerita] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [errorData, setErrorData] = useState("");
  const [lama, setLama] = useState("");
  const [baru, setBaru] = useState("");
  const [pesan, setPesan] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  const [infoData, setInfoData] = useState(null);

  async function muat() {
    setMemuat(true);
    setErrorData("");
    try {
      setBerita(await ambilBerita());
    } catch (e) {
      setErrorData(pesanError(e));
    }
    setMemuat(false);
  }

  useEffect(() => {
    muat();
  }, []);

  const perKategori = berita.reduce((hasil, b) => {
    hasil[b.kategori] = (hasil[b.kategori] || 0) + 1;
    return hasil;
  }, {});
  const maksimum = Math.max(1, ...Object.values(perKategori));
  const terbaru = berita.slice(0, 5);

  async function ubahPassword(e) {
    e.preventDefault();
    setPesan(null);
    if (baru.length < 6) {
      setPesan({ ok: false, teks: "Password baru minimal 6 karakter." });
      return;
    }
    setSibuk(true);
    try {
      const hasil = await gantiPassword(user.email, lama, baru);
      if (hasil.ok) {
        setPesan({ ok: true, teks: "Password berhasil diganti." });
        setLama("");
        setBaru("");
      } else {
        setPesan({ ok: false, teks: hasil.pesan });
      }
    } catch (err) {
      setPesan({ ok: false, teks: pesanError(err) });
    }
    setSibuk(false);
  }

  async function jalankan(aksi, sukses) {
    setSibuk(true);
    setInfoData(null);
    try {
      await aksi();
      await muat();
      setInfoData({ ok: true, teks: sukses });
    } catch (e) {
      setInfoData({ ok: false, teks: pesanError(e) });
    }
    setSibuk(false);
  }

  function impor() {
    jalankan(
      () => imporBerita(daftarBerita),
      "Data awal berhasil diimpor ke Supabase."
    );
  }

  function reset() {
    if (window.confirm("Hapus SEMUA berita di database lalu isi ulang dengan data awal?")) {
      jalankan(() => resetBerita(daftarBerita), "Data berhasil dikembalikan ke data awal.");
    }
  }

  return (
    <>
      {errorData && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorData}
        </p>
      )}

      {!memuat && !errorData && berita.length === 0 && (
        <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Database masih kosong. Klik <b>Impor data awal</b> di bagian bawah untuk
          mengisi berita awal.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <KartuStatistik label="Total berita" nilai={memuat ? "..." : berita.length} />
        <KartuStatistik
          label="Jumlah kategori"
          nilai={memuat ? "..." : Object.keys(perKategori).length}
        />
        <KartuStatistik
          label="Berita terbaru"
          nilai={terbaru[0] ? formatTanggal(terbaru[0].tanggal) : "-"}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-navy">
            Berita per kategori
          </h2>
          <ul className="mt-4 space-y-3">
            {Object.entries(perKategori).map(([nama, jumlah]) => (
              <li key={nama}>
                <div className="flex justify-between text-sm text-slate-700">
                  <span>{nama}</span>
                  <span className="font-semibold">{jumlah}</span>
                </div>
                <div className="mt-1 h-2 rounded bg-mist">
                  <div
                    className="h-2 rounded bg-gold"
                    style={{ width: `${(jumlah / maksimum) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-navy">
              Berita terbaru
            </h2>
            <Link
              href="/admin/berita"
              className="text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-dark"
            >
              Kelola
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-slate-100">
            {terbaru.map((b) => (
              <li key={b.id} className="py-2">
                <p className="text-sm font-medium text-slate-800">{b.judul}</p>
                <p className="text-xs text-slate-500">
                  {formatTanggal(b.tanggal)} &middot; {b.kategori}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={ubahPassword}
          className="space-y-3 rounded-xl border border-slate-200 bg-white p-6"
        >
          <h2 className="font-serif text-xl font-bold text-navy">
            Ganti password
          </h2>
          {pesan && (
            <p
              className={`rounded-md px-3 py-2 text-sm ${
                pesan.ok
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {pesan.teks}
            </p>
          )}
          <input
            type="password"
            placeholder="Password lama"
            value={lama}
            onChange={(e) => setLama(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-navy focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="password"
            placeholder="Password baru (min. 6 karakter)"
            value={baru}
            onChange={(e) => setBaru(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-navy focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="submit"
            disabled={sibuk}
            className="rounded-md bg-navy px-5 py-2 font-semibold text-white transition-colors hover:bg-gold hover:text-navy disabled:opacity-60"
          >
            Simpan password
          </button>
        </form>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-serif text-xl font-bold text-navy">Data awal</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Data berita sekarang tersimpan di database Supabase. Impor menyalin 8
            berita awal dari file <b>berita.js</b> tanpa menghapus berita lain.
            Reset menghapus semua berita lalu mengisi ulang dengan data awal.
          </p>
          {infoData && (
            <p
              className={`mt-3 rounded-md px-3 py-2 text-sm ${
                infoData.ok
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {infoData.teks}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={impor}
              disabled={sibuk}
              className="rounded-md bg-navy px-5 py-2 font-semibold text-white transition-colors hover:bg-gold hover:text-navy disabled:opacity-60"
            >
              Impor data awal
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={sibuk}
              className="rounded-md border-2 border-red-600 px-5 py-2 font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white disabled:opacity-60"
            >
              Reset semua
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminShell judul="Dashboard Admin">
      {(user) => <Isi user={user} />}
    </AdminShell>
  );
}
