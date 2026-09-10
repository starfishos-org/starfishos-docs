import Link from 'next/link';
import { SiteFooter, SiteHeader } from '@/components/site-shell';

const highlights = [
  {
    number: '01',
    title: 'One system image, many machines',
    text: 'Run unmodified shared-memory applications across CPUs, private DRAM, and a coherent CXL memory pool.',
  },
  {
    number: '02',
    title: 'State, partitioned by design',
    text: 'Keep hot execution state local. Share only the compact coordination state that truly crosses machine boundaries.',
  },
  {
    number: '03',
    title: 'Failure is a local event',
    text: 'A failed machine becomes a group of failed processes—surviving machines and services continue to make progress.',
  },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="wrap hero-content">
          <p className="eyebrow"><span /> Research prototype · SOSP ’26</p>
          <h1>A state-partitioned<br /><em>microkernel</em> for CXL pods.</h1>
          <p className="hero-copy">
            StarfishOS makes a pod of machines feel like one—without turning every operating-system operation into distributed coordination.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/design">Explore the design <span>→</span></Link>
            <a className="button ghost" href="https://github.com/starfishos-org/starfishos">View source <span>↗</span></a>
          </div>
          <p className="authors">Fangnuo Wu · Jingsheng Yan · Mingkai Dong · Wenjun Cai · Jingwei Xu · Tong Xin · Haibo Chen</p>
        </div>
        <div className="hero-status" aria-label="Project summary">
          <div><span>ARCH</span><strong>x86_64</strong></div>
          <div><span>SHARED FABRIC</span><strong>CXL 1.1</strong></div>
          <div><span>TESTBED</span><strong>4 machines · 96 cores</strong></div>
        </div>
      </section>

      <section className="intro wrap">
        <div className="section-kicker">The idea</div>
        <div className="intro-copy">
          <h2>Share what connects the system.<br /><span>Localize everything else.</span></h2>
          <p>Traditional single-system images pay a coordination cost everywhere. StarfishOS uses CXL’s coherent memory as a narrow shared substrate, while each machine retains its own fast execution paths and private state.</p>
        </div>
      </section>

      <section className="architecture wrap">
        <div className="image-frame home-system-figure">
          <div className="frame-label"><span>FIG. 01</span><span>STARFISHOS ARCHITECTURE</span></div>
          <div className="home-figure-canvas" role="img" aria-label="StarfishOS architecture showing an unmodified application over collaborative services, per-machine microkernels and a shared CXL coordination plane">
            <div className="home-app"><small>UNMODIFIED SHARED-MEMORY APPLICATION</small><strong>One POSIX process · threads across the pod</strong></div>
            <div className="home-service-band"><span>GLOBAL PROCESS VIEW</span><span>ONE FILESYSTEM</span><span>COLLABORATIVE DEVICES</span></div>
            <div className="home-machines">
              <article><div className="machine-label"><span>MACHINE 0</span><b>LOCAL EXECUTION</b></div><div className="chip-grid"><i>CPU</i><i>IPC</i><i>SCHED</i><i>MM</i></div><strong>Private DRAM</strong><small>hot kernel state · local queues · caches</small></article>
              <div className="cxl-spine"><span>COHERENT FABRIC</span><strong>CXL</strong><small>shared pages</small><small>coordination metadata</small><small>remote queues</small></div>
              <article><div className="machine-label"><span>MACHINE N</span><b>LOCAL EXECUTION</b></div><div className="chip-grid"><i>CPU</i><i>IPC</i><i>SCHED</i><i>MM</i></div><strong>Private DRAM</strong><small>hot kernel state · local queues · caches</small></article>
            </div>
            <div className="figure-principle"><span>DESIGN PRINCIPLE</span><p><b>Localize execution.</b> Share only the state that coordinates it.</p></div>
          </div>
        </div>
      </section>

      <section className="highlights wrap">
        {highlights.map((item) => (
          <article key={item.number}>
            <span className="highlight-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="vm-teaser">
        <div className="wrap vm-grid">
          <div>
            <p className="eyebrow coral"><span /> New in the lab</p>
            <h2>One Linux VM.<br />vCPUs on different machines.</h2>
          </div>
          <div>
            <p>Guest CPU 0 runs on one ChCore machine. Guest CPU 1 runs on another. They share one Linux kernel, one address space, and CXL-backed guest memory—without changing Linux applications.</p>
            <Link className="text-link" href="/linux-vm">See how cross-machine virtualization works <span>→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
