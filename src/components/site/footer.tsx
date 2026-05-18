export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-8 text-white md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Anil Bonds. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.instagram.com/anil_bonds/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/anilpappu/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
            LinkedIn
          </a>
          <a href="https://www.behance.net/anilpappu1" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
            Behance
          </a>
          <a href="https://wa.me/917674074148" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
            WhatsApp
          </a>
          <a href="mailto:anilbonds2016@gmail.com" className="transition hover:text-white">
            Mail
          </a>
        </div>
      </div>
    </footer>
  );
}
