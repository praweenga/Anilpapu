export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">© 2025 Anil Pappu. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="https://www.instagram.com/anil_bonds/" target="_blank" rel="noopener" className="text-neutral-400 hover:text-white text-xs">Instagram</a>
            <a href="https://x.com/anilbonds" target="_blank" rel="noopener" className="text-neutral-400 hover:text-white text-xs">Twitter</a>
            <a href="https://www.linkedin.com/in/anilpappu/" target="_blank" rel="noopener" className="text-neutral-400 hover:text-white text-xs">LinkedIn</a>
            <a href="mailto:anilbonds2016@gmail.com" className="text-neutral-400 hover:text-white text-xs">Mail</a>
            <a href="https://www.behance.net/anilpappu1#" target="_blank" rel="noopener" className="text-neutral-400 hover:text-white text-xs">Behance</a>
            <a href="https://wa.me/917674074148" target="_blank" rel="noopener" className="text-neutral-400 hover:text-white text-xs">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
