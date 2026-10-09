# Website Profil SMA Negeri 2 Ungaran

Tugas Next.js: Next.js (App Router) + JavaScript + Tailwind CSS, frontend saja.

## Menjalankan
```bash
npm install
npm run dev      # buka http://localhost:3000
npm run build    # cek sebelum deploy
```

## Struktur
```
src/
  app/
    layout.js            # kerangka: Navbar + {children} + Footer
    page.js              # Home  (/)
    about/page.js        # About (/about)
    berita/page.js       # Daftar berita (/berita)
    berita/[id]/page.js  # Detail berita (dynamic route)
    not-found.js
  components/            # Navbar, Footer, Hero, BeritaCard, PageHeader
  data/
    sekolah.js           # profil, visi/misi, kontak, menu
    berita.js            # 8 berita (id = slug)
public/images/           # logo, banner, gambar berita
```

## Yang WAJIB diganti sebelum dikumpulkan
1. `public/images/logo-sekolah.png` -> logo asli sekolah.
2. `public/images/banner.svg` -> foto gedung/banner asli.
3. `public/images/berita/berita-1..8.svg` -> foto berita asli, lalu ubah
   path `gambar` di `src/data/berita.js` kalau ekstensinya berubah (mis. `.jpg`).
4. `src/data/sekolah.js`: cek `alamat`, `profil.sejarah`, `profil.visi`,
   `profil.misi` (ditandai TODO) dan samakan dengan halaman resmi sekolah.

## Deploy ke Vercel
1. Upload project ke GitHub (jangan sertakan `node_modules` dan `.next`).
2. vercel.com -> Add New Project -> pilih repo -> Deploy.
3. Salin URL `*.vercel.app` untuk dikumpulkan.
