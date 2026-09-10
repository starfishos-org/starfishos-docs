import { SiteFooter, SiteHeader } from '@/components/site-shell';

const guides = [
  ['01', 'Design overview', 'Execution model, state placement, prototype platform, and failure boundaries.'],
  ['02', 'Kernel-space modules', 'Cross-machine IPC, scheduling, notification, memory, and recovery.'],
  ['03', 'Collaborative services', 'Global process and file views built from cooperating user-space services.'],
  ['04', 'Cross-machine applications', 'Thread migration, application state placement, and workload patterns.'],
  ['05', 'Implementation map', 'A direct path from paper mechanisms to source directories and functions.'],
  ['06', 'Cross-machine Linux VM', 'The VM, EPT, virtual APIC, SMP boot, networking, and current limits.'],
];

export default function DocsPage() {
  return <main>
    <SiteHeader dark />
    <section className="page-hero docs-hero"><div className="wrap page-hero-grid"><div><p className="eyebrow coral"><span /> Documentation</p><h1>Read the system<br />from idea to code.</h1></div><p>The guide follows the paper’s structure, then maps every mechanism to the implementation that realizes it.</p></div></section>
    <section className="wrap docs-layout">
      <aside><p>START HERE</p><a href="#quickstart">Quick start</a><a href="#guide">Design guide</a><a href="#artifact">Artifact</a><a href="https://github.com/starfishos-org/starfishos">Source ↗</a></aside>
      <div>
        <section id="quickstart" className="docs-section"><p className="section-kicker">Quick start</p><h2>Boot a four-machine pod.</h2><p>StarfishOS targets x86_64 and uses QEMU/KVM with ivshmem for development. The default artifact flow prepares shared backing memory, builds the system, and boots four guests.</p><pre><code><span>$</span> git submodule update --init --recursive{`\n`}<span>$</span> make prepare{`\n`}<span>$</span> make build{`\n`}<span>$</span> make r4</code></pre></section>
        <section id="guide" className="docs-section"><p className="section-kicker">Design guide</p><h2>Six chapters through the stack.</h2><div className="guide-list">{guides.map(([n,title,text]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><b>→</b></article>)}</div></section>
        <section id="artifact" className="docs-section"><p className="section-kicker">Artifact</p><h2>Reproducibility is part of the design.</h2><p>Experiment runners preserve raw logs, parsed tables, and regenerated figures in timestamped output directories. Run all validated experiments or select only the numbered results you need.</p><pre><code><span>$</span> python3 artifact-evaluation/run_all.py --list{`\n`}<span>$</span> python3 artifact-evaluation/run_all.py --run-subset-of-tests 1,4,7</code></pre></section>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
