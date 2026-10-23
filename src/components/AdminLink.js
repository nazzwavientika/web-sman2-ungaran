import Link from "next/link";

// Pintu masuk kecil ke halaman admin. Kalau belum login, otomatis diarahkan ke form login.
export default function AdminLink() {
  return (
    <Link
      href="/admin"
      className="text-xs text-white/80 underline underline-offset-4 transition-colors hover:text-gold"
    >
      Login Admin
    </Link>
  );
}
