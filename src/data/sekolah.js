// Data profil sekolah (sumber: website resmi https://www.sman2-ungaran.sch.id/)
// Catatan: frontend saja, jadi data disimpan sebagai file JavaScript biasa.

export const sekolah = {
  nama: "SMA Negeri 2 Ungaran",
  namaPendek: "SMADA Ungaran",
  tagline: "Sekolah Penggerak",
  slogan: "Ikhlas Bakti Bina Bangsa Berbudi Bawa Laksana",
  alamat: "Jl. Diponegoro No. 277, Ungaran, Kabupaten Semarang, Jawa Tengah",
  email: "sma2ung@gmail.com",
  telepon: "0813-5955-977",
  instagram: "https://www.instagram.com/smanegeri2ungaran/",
  youtube: "https://www.youtube.com/@SMANEGERI2UNGARAN",
  webResmi: "https://www.sman2-ungaran.sch.id/",
  mapsEmbed:
    "https://www.google.com/maps?q=SMA+Negeri+2+Ungaran&output=embed",
};

export const sambutan = {
  judul: "Selamat datang di SMA Negeri 2 Ungaran",
  isi: "Inilah kami SMA Negeri 2 Ungaran, sekolah yang memiliki visi untuk mewujudkan warga sekolah yang bertaqwa, berbudaya, berprestasi, terampil dan berwawasan lingkungan",
};

export const profil = {
  ringkas:
    "SMA Negeri 2 Ungaran, adalah satu-satu sekolah di dalam lingkup Cabang Dinas Wilayah I yang berstatus sebagai Sekolah Penggerak.",
  // TODO: ganti dengan sejarah resmi (tahun berdiri, kepala sekolah pertama, dst.)
  sejarah: [
    "SMA Negeri 2 Ungaran tumbuh bersama perkembangan pendidikan menengah di Kabupaten Semarang dan dikenal warga sekolah dengan sebutan SMADA.",
    "Dari tahun ke tahun, sekolah terus memperkuat pembelajaran, kegiatan kesiswaan, dan kerja sama dengan berbagai pihak, mulai dari kegiatan kepramukaan, pendidikan demokrasi lewat Pemilos, hingga pelatihan teknologi seperti kecerdasan buatan.",
  ],
  // TODO: samakan dengan halaman Visi dan Misi resmi sekolah
  visi: "MEWUJUDKAN WARGA SEKOLAH YANG BERIMAN DAN BERTAQWA, BERBUDAYA, BERPRESTASI, BERINOVASI DAN BERWAWASAN LINGKUNGAN",
  misi: [
    "Meningkatkan penghayatan dan pengamalan terhadap ajaran agama dan kepercayaan yang dianutnya",
    "Meningkatkan toleransi dan kerukunan antar umat beragama.",
    "Meningkatkan dan melestarikan budaya yang menjadi sumber kearifan dalam bertindak setiap warga sekolah",
    "Menanamkan rasa bangga terhadap budaya lokal.",
    "Membantu siswa untuk mengenali potensi dirinya guna menumbuhkan semangat berprestasi dalam menghadapi persaingan global",
    "Menumbuhkan semangat kreativitas dalam pengembangan Riset dan Tehnologi",
    "Meningkatkan pelestarian lingkungan hidup dalam upaya terciptanya sekolah yang bersih, indah dan sehat.",
    "Menginspirasi perubahan positif dalam upaya menciptakan sekolah damai yang kondusif dan menyenangkan.",
  ],
};

export const kegiatan = [
  {
    judul: "PEMILOS",
    isi: "Pemilihan Ketua dan Wakil Ketua OSIS jadi sarana belajar demokrasi dan menjaga integritas.",
  },
  {
    judul: "Kepramukaan",
    isi: "Kemah penerimaan tamu ambalan membentuk karakter dan kemandirian peserta didik kelas X.",
  },
  {
    judul: "Literasi dan Numerasi",
    isi: "Sosialisasi dan simulasi TKA serta program literasi numerasi untuk murid kelas XII.",
  },
  {
    judul: "Kokurikuler",
    isi: "Proyek kokurikuler bertema kewirausahaan, misalnya kreasi makanan khas daerah di kelas XI.",
  },
  {
    judul: "Pelatihan Teknologi",
    isi: "Pelatihan kecerdasan buatan (AI) bagi siswa kelas X bersama Polres Semarang.",
  },
  {
    judul: "Kegiatan Keagamaan",
    isi: "Peringatan hari besar keagamaan, seperti Maulid Nabi Muhammad SAW lewat Smada Bersholawat.",
  },
];

export const menu = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Berita", href: "/berita" },
];
