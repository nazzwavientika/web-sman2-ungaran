"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import BeritaForm from "@/components/admin/BeritaForm";
import { daftarBerita, formatTanggal } from "@/data/berita";
import {
  ambilBerita,
  buatId,
  hapusBerita,
  imporBerita,
  pesanError,
  tambahBerita,
  ubahBerita,
} from "@/lib/adminService";

function Isi() {
  const [berita, setBerita] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [cari, setCari] = useState("");
  // null = form tertutup, {} = tambah baru, {id,...} = edit
  const [form, setForm] = useState(null);
  const [sedangSimpan, setSedangSimpan] = useState(false);
  const [info, setInfo] = useState(null); // { ok, teks }

  async function muat() {
    setMemuat(true);
    try {
      setBerita(await ambilBerita());
    } catch (e) {
      setInfo({ ok: false, teks: pesanError(e) });
    }
    setMemuat(false);
  }

  useEffect(() => {
    muat();
  }, []);

  async function simpanForm(data) {
    setSedangSimpan(true);
    setInfo(null);
    try {
      if (data.id) {
        await ubahBerita(data.id, data);
        setInfo({ ok: true, teks: "Berita berhasil diperbarui." });
      } else {
        const id = buatId(data.judul, berita);
        await tambahBerita({ ...data, id });
        setInfo({ ok: true, teks: "Berita berhasil ditambahkan." });
      }
      setForm(null);
      await muat();
    } catch (e) {
      setInfo({ ok: false, teks: pesanError(e) });
    }
    setSedangSimpan(false);
  }

  async function hapus(item) {
    if (!window.confirm(`Hapus berita "${item.judul}"?`)) return;
    setInfo(null);
    try {
      await hapusBerita(item.id);
      setInfo({ ok: true, teks: "Berita berhasil dihapus." });
      await muat();
    } catch (e) {
      setInfo({ ok: false, teks: pesanError(e) });
    }
  }

  async function impor() {
    setInfo(null);
    try {
      await imporBerita(daftarBerita);
      setInfo({ ok: true, teks: "Data awal berhasil diimpor." });
      await muat();
    } catch (e) {
      setInfo({ ok: false, teks: pesanError(e) });
    }
  }

  const tampil = berita.filter((b) =>
    b.judul.toLowerCase().includes(cari.toLowerCase())
  );

  if (form) {
    return (
      <>
        {info && !info.ok && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {info.teks}
          </p>
        )}
        <BeritaForm
          key={form.id ?? "baru"}
          awal={form}
          sedangSimpan={sedangSimpan}
          onSimpan={simpanForm}
          onBatal={() => setForm(null)}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Cari judul berita..."
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 focus:border-navy focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <button
          type="button"
          onClick={() => {
            setInfo(null);
            setForm({});
          }}
          className="rounded-md bg-navy px-5 py-2 font-semibold text-white transition-colors hover:bg-gold hover:text-navy"
        >
          + Tambah Berita
        </button>
      </div>

      {info && (
        <p
          className={`mt-4 rounded-md px-3 py-2 text-sm ${
            info.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {info.teks}
        </p>
      )}

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-navy text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Judul</th>
              <th className="px-4 py-3 font-semibold">Kategori</th>
              <th className="px-4 py-3 font-semibold">Tanggal</th>
              <th className="px-4 py-3 text-right font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tampil.map((b) => (
              <tr key={b.id} className="hover:bg-mist">
                <td className="px-4 py-3 text-slate-800">{b.judul}</td>
                <td className="px-4 py-3 text-slate-600">{b.kategori}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {formatTanggal(b.tanggal)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setInfo(null);
                      setForm(b);
                    }}
                    className="mr-2 rounded border border-navy px-3 py-1 font-medium text-navy hover:bg-navy hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => hapus(b)}
                    className="rounded border border-red-600 px-3 py-1 font-medium text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {memuat && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  Memuat data...
                </td>
              </tr>
            )}
            {!memuat && tampil.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  {berita.length === 0 ? (
                    <>
                      Belum ada berita di database.{" "}
                      <button
                        type="button"
                        onClick={impor}
                        className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                      >
                        Impor data awal
                      </button>
                    </>
                  ) : (
                    "Tidak ada berita yang cocok."
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function AdminBeritaPage() {
  return (
    <AdminShell judul="Kelola Berita">
      <Isi />
    </AdminShell>
  );
}
