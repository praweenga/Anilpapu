import Link from "next/link";

interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
}

export default async function StudioLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = params.next?.startsWith("/") ? params.next : "/studio/uploads";

  return (
    <main className="grid min-h-screen place-items-center bg-black px-5 text-white">
      <section className="w-full max-w-md rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.65)] md:p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-white/38">Studio access</p>
        <h1 className="mt-4 text-4xl font-semibold leading-none">Portfolio Admin</h1>
        <p className="mt-4 text-sm leading-6 text-white/55">
          Sign in to upload Mux videos and update the hero, showreel, or motion gallery content store.
        </p>

        {params.error && (
          <div className="mt-6 rounded-lg border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            Invalid admin password.
          </div>
        )}

        <form action="/api/admin/login" method="post" className="mt-8 space-y-5">
          <input type="hidden" name="next" value={next} />
          <label className="block">
            <span className="text-xs uppercase tracking-[0.22em] text-white/40">Admin password</span>
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
            Enter studio
          </button>
        </form>

        <Link href="/" className="mt-6 inline-block text-sm text-white/45 transition hover:text-white">
          Back to public site
        </Link>
      </section>
    </main>
  );
}
