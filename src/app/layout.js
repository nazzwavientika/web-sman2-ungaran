import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sekolah } from "@/data/sekolah";

export const metadata = {
  title: {
    default: `${sekolah.nama} - ${sekolah.tagline}`,
    template: `%s | ${sekolah.nama}`,
  },
  description: `Website profil ${sekolah.nama}, ${sekolah.slogan}.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col">
        {/* Navbar & Footer ditulis sekali di sini, tampil di semua halaman */}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
