import Link from 'next/link';
import { SiteFooter, SiteHeader } from '@/components/site-shell';

const placements = [
  ['Scheduling', 'local run queues', 'remote ready queues + transfer context'],
  ['IPC + notification', 'fast paths + executing context', 'remote queues + shadow metadata'],
  ['Memory', 'DRAM pools + per-CPU caches', 'allocator metadata + shared pages'],
  ['System services', 'service instance state', 'coordination + recovery metadata'],
  ['Applications', 'heap, stacks + local data', 'migration-boundary state'],
];

export default function DesignPage() {
  return <main>
    <SiteHeader dark />
    <section className="page-hero light-hero design-hero">
      <div className="wrap page-hero-grid"><div><p className="eyebrow coral"><span /> Design</p><h1>A single system image<br />without a single shared kernel.</h1></div><p>StarfishOS separates the execution plane from the coordination plane. The result keeps ordinary operations local while making cross-machine state explicit, compact, and recoverable.</p></div>
    </section>

    <section className="wrap native-architecture">
      <div className="arch-caption"><span>01 / SYSTEM ARCHITECTURE</span><p>Follow one operation from an unmodified application to the hardware that serves it.</p></div>
      <div className="arch-canvas">
        <div className="arch-row app-row"><span className="row-label">PROGRAMMING MODEL</span><div className="arch-node wide"><small>UNMODIFIED APPLICATION</small><strong>POSIX · libc · shared address space</strong></div></div>
        <div className="arch-connector"><span>capability IPC</span></div>
        <div className="arch-row service-row"><span className="row-label">USER SPACE</span><div className="arch-node"><small>PROCESS</small><strong>global identity</strong></div><div className="arch-node"><small>FILESYSTEM</small><strong>one namespace</strong></div><div className="arch-node"><small>DEVICES</small><strong>collaborative I/O</strong></div></div>
        <div className="arch-connector split"><span>local fast path</span><span>cross-machine path</span></div>
        <div className="arch-row kernel-row"><span className="row-label">MICROKERNEL</span><div className="machine-stack"><b>MACHINE 0</b><div><span>scheduler</span><span>IPC</span><span>memory</span></div><small>private kernel state · local DRAM</small></div><div className="coordination-core"><small>SHARED COORDINATION</small><strong>CXL</strong><span>metadata · queues · shared pages</span></div><div className="machine-stack"><b>MACHINE N</b><div><span>scheduler</span><span>IPC</span><span>memory</span></div><small>private kernel state · local DRAM</small></div></div>
        <div className="arch-row hardware-row"><span className="row-label">HARDWARE</span><div className="hardware-block local"><small>LOCAL</small><strong>CPUs + DRAM</strong></div><div className="hardware-link"><i /><span>coherent CXL fabric</span><i /></div><div className="hardware-block local"><small>LOCAL</small><strong>CPUs + DRAM</strong></div></div>
      </div>
    </section>

    <section className="placement-section"><div className="wrap">
      <div className="placement-intro"><p className="eyebrow"><span /> The governing rule</p><h2>Share coordination.<br />Localize execution.</h2><p>The boundary is not “kernel versus application.” Every subsystem is split by access pattern: hot state follows the machine that executes; only state required for visibility or transfer crosses into CXL.</p></div>
      <div className="placement-table"><div className="placement-head"><span>Subsystem</span><strong>PRIVATE DRAM <small>fast + local</small></strong><strong>SHARED CXL <small>visible + recoverable</small></strong></div>{placements.map(([system,local,shared]) => <div className="placement-row" key={system}><span>{system}</span><p>{local}</p><p>{shared}</p></div>)}</div>
    </div></section>

    <section className="wrap operation-story">
      <div className="metric-heading"><div><span>02</span><p>Remote wake-up</p></div><div><h2>Cross the fabric only when the target does.</h2><p>A local notification never touches global coordination. A remote notification publishes a small queue entry in CXL, rings the target machine, and lets that machine resume execution from its own local state.</p></div></div>
      <div className="flow-diagram"><div><small>① PRODUCER</small><strong>local thread</strong><span>Machine 0 DRAM</span></div><i>→</i><div className="shared-step"><small>② COORDINATE</small><strong>shared queue</strong><span>CXL + doorbell</span></div><i>→</i><div><small>③ CONSUMER</small><strong>local scheduler</strong><span>Machine 1 DRAM</span></div></div>
    </section>

    <section className="failure-design"><div className="wrap"><div><p className="eyebrow coral"><span /> Failure boundary</p><h2>A machine crash is a group of process crashes—not a system crash.</h2></div><div className="failure-points"><article><span>01</span><h3>Survivors keep running</h3><p>Private state on healthy machines remains valid and their local fast paths stay available.</p></article><article><span>02</span><h3>Shared state stays inspectable</h3><p>Compact coordination records expose ownership and prevent abandoned locks from becoming invisible.</p></article><article><span>03</span><h3>Services restart selectively</h3><p>Collaborative service instances can rebuild from shared metadata without rebooting the entire pod.</p></article></div></div></section>

    <section className="next-banner"><div className="wrap"><p>Next chapter</p><h2>See the latency, scale-out, recovery, and VM costs.</h2><Link className="button primary" href="/evaluation">View measured results <span>→</span></Link></div></section>
    <SiteFooter />
  </main>;
}
