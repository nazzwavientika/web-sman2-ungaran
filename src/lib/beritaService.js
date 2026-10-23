// Membaca berita untuk halaman PUBLIK (Home, Berita, Detail) dari Supabase.
// Dipanggil dari server component, jadi tidak ada kunci rahasia yang dikirim ke browser.
//
// Kalau Supabase belum diisi kuncinya atau sedang error, otomatis memakai data
// bawaan di src/data/berita.js, sehingga website tidak pernah kosong atau rusak.

import { createClient } from "@supabase/supabase-js";
import { daftarBerita as dataBawaan } from "@/data/berita";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Gambar cadangan (disematkan langsung) kalau berita belum punya gambar.
const GAMBAR_KOSONG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">' +
      '<rect width="800" height="500" fill="#12304a"/>' +
      '<circle cx="400" cy="230" r="70" fill="#e3a92b"/>' +
      '<rect x="250" y="340" width="300" height="14" rx="7" fill="#ffffff" opacity="0.5"/>' +
      "</svg>"
  );

function klien() {
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Menyamakan bentuk data dari database dengan bentuk yang dipakai komponen.
function rapikan(row) {
  const gambarAman =
    typeof row.gambar === "string" && row.gambar.startsWith("/")
      ? row.gambar
      : GAMBAR_KOSONG;
  return {
    id: row.id,
    judul: row.judul,
    tanggal: row.tanggal,
    kategori: row.kategori || "Umum",
    gambar: gambarAman,
    ringkasan: row.ringkasan || "",
    isi: Array.isArray(row.isi) ? row.isi : [],
    sumber: row.sumber || "",
  };
}

export async function getDaftarBerita() {
  const sb = klien();
  if (!sb) return dataBawaan;
  try {
    const { data, error } = await sb
      .from("berita")
      .select("*")
      .order("tanggal", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(rapikan);
  } catch (e) {
    console.error("Gagal membaca berita dari Supabase:", e?.message ?? e);
    return dataBawaan;
  }
}

export async function getBeritaById(id) {
  const sb = klien();
  if (!sb) return dataBawaan.find((b) => b.id === id);
  try {
    const { data, error } = await sb
      .from("berita")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? rapikan(data) : undefined;
  } catch (e) {
    console.error("Gagal membaca detail berita dari Supabase:", e?.message ?? e);
    return dataBawaan.find((b) => b.id === id);
  }
}
