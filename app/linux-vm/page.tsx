import { SiteFooter, SiteHeader } from '@/components/site-shell';

const flow = [
  ['Guest Linux', 'A standard SMP Linux kernel sees two online x86 CPUs and one shared physical-memory space.'],
  ['Cross-machine ChVMM', 'Two worker threads share one VM capability, EPT root, virtual APIC state, and guest-memory view.'],
  ['StarfishOS pod', 'Each vCPU executes VMX locally on its assigned machine while CXL makes guest RAM visible to both.'],
];

export default function LinuxVmPage() {
  return <main>
    <SiteHeader />
    <section className="page-hero vm-page-hero">
      <div className="wrap vm-title"><p className="eyebrow coral"><span /> Experimental · Linux VM</p><h1>One virtual machine.<br /><em>Two physical machines.</em></h1><p>Run an unmodified Linux SMP guest whose vCPUs execute on different StarfishOS machines while sharing one kernel and one CXL-backed memory image.</p></div>
      <div className="vm-orbit-diagram" aria-label="Guest CPU 0 and Guest CPU 1 connected through shared CXL memory"><span className="cpu cpu-a">vCPU 0<small>Machine 0</small></span><span className="vm-core">LINUX<small>ONE VM</small></span><span className="cpu cpu-b">vCPU 1<small>Machine 1</small></span></div>
    </section>

    <section className="wrap vm-promise"><div className="section-kicker">What Linux sees</div><div><h2>A normal two-core x86 machine.</h2><p>Linux discovers one NUMA node and two online CPUs. A process can place pthreads on CPU 0 and CPU 1, share an address space, and use ordinary mutexes and condition variables. No CXL or StarfishOS API enters the guest application.</p></div></section>

    <section className="vm-flow"><div className="wrap"><p className="eyebrow"><span /> Execution path</p>{flow.map(([title,text], index) => <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</div></section>

    <section className="wrap vm-details">
      <div><p className="section-kicker">The key distinction</p><h2>Execution is local.<br />State is shared.</h2></div>
      <div className="detail-cards"><article><span>EXECUTION PLANE</span><h3>Local VMX on each machine</h3><p>vCPU 0 and vCPU 1 enter guest mode using the physical CPU where each worker currently runs. No processor pipeline crosses machines.</p></article><article><span>DATA PLANE</span><h3>One CXL-backed guest RAM</h3><p>Both vCPUs walk the same EPT and access the same backing pages. Linux sees ordinary RAM; CXL remains an implementation detail.</p></article><article><span>CONTROL PLANE</span><h3>Shared virtual hardware state</h3><p>VM, vCPU, x2APIC, interrupt, and mapping state stays visible across the pod so standard Linux SMP boot can bring the remote vCPU online.</p></article></div>
    </section>

    <section className="vm-note"><div className="wrap"><span>TRANSPARENCY BOUNDARY</span><p>The Linux ABI and application programming model are transparent. Performance is not: remote interrupts, shared locks, and CXL accesses can cost more than their single-machine counterparts.</p></div></section>
    <SiteFooter />
  </main>;
}
