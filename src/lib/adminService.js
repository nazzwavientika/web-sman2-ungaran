// Semua urusan admin ke Supabase: login (Supabase Auth) dan kelola berita (database).
// Hanya dipakai dari komponen client ("use client") di halaman admin.

import { supabase, supabaseTersedia } from "./supabaseClient";

export { supabaseTersedia };

const KOLOM = ["id", "judul", "tanggal", "kategori", "gambar", "ringkasan", "isi", "sumber"];

function pastikanTersedia() {
  if (!supabaseTersedia) {
    throw new Error(
      "Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
}

// Mengubah pesan error Supabase jadi bahasa Indonesia yang mudah dipahami.
export function pesanError(error) {
  const teks = String(error?.message ?? error ?? "");
  if (/invalid login credentials/i.test(teks)) return "Email atau password salah.";
  if (/email not confirmed/i.test(teks))
    return "Email belum dikonfirmasi. Buat akun admin dengan opsi Auto Confirm di Supabase.";
  if (/failed to fetch|networkerror|load failed/i.test(teks))
    return "Tidak dapat terhubung ke Supabase. Periksa URL project dan koneksi internet.";
  if (/duplicate key|23505/i.test(teks))
    return "ID berita sudah dipakai. Ubah judul berita lalu coba lagi.";
  if (/row-level security|42501|permission denied/i.test(teks))
    return "Tidak punya izin. Pastikan sudah login dan aturan RLS sudah dibuat.";
  if (/relation .* does not exist|PGRST205/i.test(teks))
    return "Tabel berita belum ada. Jalankan file supabase-setup.sql di SQL Editor Supabase.";
  return teks || "Terjadi kesalahan.";
}

// ---------- Login (Supabase Auth: email + password) ----------

export async function login(email, password) {
  pastikanTersedia();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) return { ok: false, pesan: pesanError(error) };
  return { ok: true, user: data.user };
}

// Mengembalikan data user yang sedang login, atau null kalau belum login.
export async function getSession() {
  pastikanTersedia();
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}

export async function logout() {
  if (!supabaseTersedia) return;
  await supabase.auth.signOut();
}

export async function gantiPassword(email, lama, baru) {
  pastikanTersedia();
  // Verifikasi dulu password lama dengan login ulang.
  const cek = await supabase.auth.signInWithPassword({ email, password: lama });
  if (cek.error) return { ok: false, pesan: "Password lama salah." };
  const { error } = await supabase.auth.updateUser({ password: baru });
  if (error) return { ok: false, pesan: pesanError(error) };
  return { ok: true };
}

// ---------- Berita (CRUD) ----------

function bersihkan(b) {
  const hasil = {};
  for (const k of KOLOM) if (b[k] !== undefined) hasil[k] = b[k];
  return hasil;
}

export async function ambilBerita() {
  pastikanTersedia();
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .order("tanggal", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function tambahBerita(item) {
  pastikanTersedia();
  const { data, error } = await supabase
    .from("berita")
    .insert(bersihkan(item))
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function ubahBerita(id, item) {
  pastikanTersedia();
  const { id: _abaikan, ...isiUbah } = bersihkan(item);
  const { data, error } = await supabase
    .from("berita")
    .update(isiUbah)
    .eq("id", id)
    .select();
  if (error) throw error;
  // Kalau RLS menolak, Supabase tidak error tapi tidak ada baris yang berubah.
  if (!data || data.length === 0) {
    throw new Error("row-level security: perubahan ditolak atau berita tidak ditemukan");
  }
  return data[0];
}

export async function hapusBerita(id) {
  pastikanTersedia();
  const { data, error } = await supabase
    .from("berita")
    .delete()
    .eq("id", id)
    .select();
  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error("row-level security: penghapusan ditolak atau berita tidak ditemukan");
  }
}

// Menyalin data awal (src/data/berita.js) ke database. Berita dengan id yang sama
// diperbarui, berita lain yang sudah ada tidak dihapus.
export async function imporBerita(seed) {
  pastikanTersedia();
  const { error } = await supabase
    .from("berita")
    .upsert(seed.map(bersihkan), { onConflict: "id" });
  if (error) throw error;
}

// Menghapus SEMUA berita lalu mengisi ulang dengan data awal.
export async function resetBerita(seed) {
  pastikanTersedia();
  const hapus = await supabase.from("berita").delete().neq("id", "__tidak-ada__");
  if (hapus.error) throw hapus.error;
  await imporBerita(seed);
}

export function buatId(judul, daftar) {
  const dasar =
    judul
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "berita";
  let id = dasar;
  let n = 2;
  while (daftar.some((b) => b.id === id)) {
    id = `${dasar}-${n}`;
    n += 1;
  }
  return id;
}
