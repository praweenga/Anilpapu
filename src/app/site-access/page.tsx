import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SITE_ACCESS_COOKIE = "site_access_session";
const DEFAULT_SITE_ACCESS_PASSWORD = "AnilBonds-2026-V7q9!";

interface SiteAccessPageProps {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
}

export default async function SiteAccessPage({ searchParams }: SiteAccessPageProps) {
  const params = await searchParams;
  const next = sanitizeNext(params.next ?? "/");
  const password = process.env.SITE_ACCESS_PASSWORD ?? DEFAULT_SITE_ACCESS_PASSWORD;
  const session = (await cookies()).get(SITE_ACCESS_COOKIE)?.value;

  if (session === password) {
    redirect(next);
  }

  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-black px-5 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_36%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_34%)]" />
      <section className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/78 p-6 shadow-[0_34px_130px_rgba(0,0,0,0.72)] backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-white/42">Private portfolio</p>
        <h1 className="mt-4 text-4xl font-semibold leading-none md:text-5xl">Enter password</h1>
        <p className="mt-4 text-sm leading-6 text-white/58">
          This site is currently in private access mode. Use the shared credentials to continue.
        </p>

        {params.error && (
          <div className="mt-6 rounded-lg border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            Invalid password.
          </div>
        )}

        <form action="/api/site-access/login" method="post" className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <label className="block">
            <span className="text-xs uppercase tracking-[0.22em] text-white/40">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              className="mt-3 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-white/35"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-black transition hover:bg-white/82"
          >
            Enter site
          </button>
        </form>
      </section>
    </main>
  );
}

function sanitizeNext(next: string) {
  if (!next.startsWith("/") || next.startsWith("//")) return "/";
  if (next.startsWith("/site-access")) return "/";
  return next;
}
