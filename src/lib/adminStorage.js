// Penyimpanan dashboard admin memakai localStorage (frontend saja, tanpa database).
// Semua fungsi di sini hanya boleh dipanggil dari komponen client ("use client"),
// karena localStorage hanya ada di browser.

const KEY_USERS = "sman2_admin_users";
const KEY_SESSION = "sman2_admin_session";
const KEY_BERITA = "sman2_admin_berita";

function baca(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function tulis(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// Password tidak disimpan polos, tetapi diubah jadi hash SHA-256.
// Catatan: ini hanya untuk latihan. Login di frontend tidak benar-benar aman.
export async function hashPassword(teks) {
  const data = new TextEncoder().encode(teks);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ---------- Akun & login ----------

export async function pastikanAdminAwal() {
  const users = baca(KEY_USERS, null);
  if (users && users.length) return users;
  const awal = [
    {
      username: "admin",
      nama: "Administrator",
      passwordHash: await hashPassword("admin123"),
    },
  ];
  tulis(KEY_USERS, awal);
  return awal;
}

export async function login(username, password) {
  const users = await pastikanAdminAwal();
  const hash = await hashPassword(password);
  const user = users.find(
    (u) => u.username === username.trim() && u.passwordHash === hash
  );
  if (!user) return null;
  tulis(KEY_SESSION, {
    username: user.username,
    nama: user.nama,
    waktu: Date.now(),
  });
  return user;
}

export function getSession() {
  return baca(KEY_SESSION, null);
}

export function logout() {
  try {
    window.localStorage.removeItem(KEY_SESSION);
  } catch {
    // abaikan
  }
}

export async function gantiPassword(username, lama, baru) {
  const users = await pastikanAdminAwal();
  const hashLama = await hashPassword(lama);
  const idx = users.findIndex(
    (u) => u.username === username && u.passwordHash === hashLama
  );
  if (idx === -1) return false;
  users[idx] = { ...users[idx], passwordHash: await hashPassword(baru) };
  return tulis(KEY_USERS, users);
}

// ---------- Data berita (CRUD) ----------

// `seed` = data awal (daftarBerita dari src/data/berita.js).
// Pertama kali dibuka, data awal disalin ke localStorage.
export function ambilBerita(seed) {
  const tersimpan = baca(KEY_BERITA, null);
  if (Array.isArray(tersimpan)) return tersimpan;
  const awal = seed.map((b) => ({ ...b }));
  tulis(KEY_BERITA, awal);
  return awal;
}

export function simpanBerita(list) {
  return tulis(KEY_BERITA, list);
}

export function resetBerita(seed) {
  const awal = seed.map((b) => ({ ...b }));
  tulis(KEY_BERITA, awal);
  return awal;
}

export function buatId(judul, list) {
  const dasar =
    judul
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "berita";
  let id = dasar;
  let n = 2;
  while (list.some((b) => b.id === id)) {
    id = `${dasar}-${n}`;
    n += 1;
  }
  return id;
}
