import LoginForm from "@/components/admin/LoginForm";
import Logo from "@/components/Logo";

export const metadata = { title: "Admin login" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="grid min-h-screen place-items-center bg-navy-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center"><Logo name="Autostack AI" tagline="Admin panel" light /></div>
        <div className="card p-6">
          <h1 className="font-sans text-xl font-semibold">Sign in</h1>
          <p className="mb-5 mt-1 text-sm text-slate-500">Manage listings, projects, guides and inquiries.</p>
          <LoginForm next={next?.startsWith("/admin") ? next : "/admin"} />
        </div>
      </div>
    </div>
  );
}
