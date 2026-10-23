import { createClient } from "@supabase/supabase-js";

// Dua nilai ini dibaca dari file .env.local (lokal) atau Environment Variables (Vercel).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// false kalau kunci belum diisi, supaya halaman bisa menampilkan pesan yang jelas.
export const supabaseTersedia = Boolean(url && key);

// Koneksi untuk halaman admin (dipakai di browser).
// Sesi login disimpan dan diperbarui otomatis oleh Supabase.
export const supabase = supabaseTersedia ? createClient(url, key) : null;
