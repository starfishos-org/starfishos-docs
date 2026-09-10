import Link from 'next/link';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`site-header ${dark ? 'header-dark' : ''}`}>
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="StarfishOS home">
          <img src={`${basePath}/starfish-mark.png`} alt="" />
          <span>STARFISH<span>OS</span></span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/design">Design</Link>
          <Link href="/evaluation">Evaluation</Link>
          <Link href="/linux-vm">Linux VM</Link>
          <Link href="/docs">Docs</Link>
        </nav>
        <a className="nav-cta" href="https://github.com/starfishos-org/starfishos">GitHub ↗</a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer wrap">
      <div className="brand footer-brand"><img src={`${basePath}/starfish-mark.png`} alt="" /><span>STARFISH<span>OS</span></span></div>
      <p>Research software for composable CXL systems.</p>
      <p>© 2026 StarfishOS</p>
    </footer>
  );
}
