import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you are looking for has moved or no longer exists.</p>
      <Link href="/properties" className="btn-gold mt-6">Browse properties</Link>
    </div>
  );
}
