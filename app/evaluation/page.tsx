import { SiteFooter, SiteHeader } from '@/components/site-shell';

const coordination = [
  { label: 'Local schedule', value: 22.80, tone: 'muted' },
  { label: 'Cross-machine schedule', value: 21.95, tone: 'accent' },
  { label: 'Local notification', value: 19.35, tone: 'muted' },
  { label: 'Cross-machine notification', value: 17.93, tone: 'accent' },
];

const scaleApps = [
  { name: 'Matrix Multiply', scale: '3.5× scale-up', baseline: 'Distributed MPI', benefit: 1.7 },
  { name: 'DBx1000', scale: '2.0× scale-up', baseline: 'Tigon · CXL optimized', benefit: 2.0 },
  { name: 'GeminiGraph', scale: '2.0× scale-up', baseline: 'Distributed MPI', benefit: 4.2 },
];

const allocator = [
  { name: 'DRAM', value: 14.63, tone: 'dram' },
  { name: 'CXL Buddy', value: 9.25, tone: 'cxl' },
  { name: 'CXL LLFree', value: 9.25, tone: 'llfree' },
];

const fsCalls = [
  { name: 'Local read', value: 2.8, tone: 'local' },
  { name: 'Remote read', value: 5.5, tone: 'remote' },
  { name: 'Remote · concurrent', value: 24.0, tone: 'concurrent' },
];

const vmCosts = [
  { label: 'Integer compute', host: 346.20, guest: 346.39, ratio: '1.001×' },
  { label: 'Cached memory', host: 81.63, guest: 82.27, ratio: '1.008×' },
  { label: 'Page first-touch', host: 5.06, guest: 6.72, ratio: '1.329×' },
  { label: 'getpid syscall', host: 202.79, guest: 668.72, ratio: '3.298×' },
];

function MetricHeader({ index, category, title, finding }: { index: string; category: string; title: string; finding: string }) {
  return <div className="metric-heading"><div><span>{index}</span><p>{category}</p></div><div><h2>{title}</h2><p>{finding}</p></div></div>;
}

export default function EvaluationPage() {
  return <main>
    <SiteHeader />
    <section className="page-hero eval-hero eval-hero-focused">
      <div className="wrap page-hero-grid">
        <div><p className="eyebrow"><span /> Evaluation</p><h1>From one fast path<br />to the whole CXL pod.</h1></div>
        <p>The evaluation follows the full argument: keep coordination cheap, make allocation and file access practical, scale real applications, and recover stranded CPU capacity across machines.</p>
      </div>
      <div className="wrap finding-strip">
        <div><strong>3.5×</strong><span>transparent app scale-up</span></div>
        <div><strong>4.2×</strong><span>over distributed Gemini</span></div>
        <div><strong>83–93%</strong><span>CPU disaggregation efficiency</span></div>
        <div><strong>17.93 µs</strong><span>cross-machine notify</span></div>
      </div>
    </section>

    <section className="metric-section micro-section wrap">
      <MetricHeader index="01" category="Microbenchmarks" title="The mechanisms behind the system, measured independently." finding="Allocation, filesystem access, and IPC isolate the costs that determine whether a disaggregated OS remains practical: shared-memory throughput, remote service placement, and cross-machine coordination." />
      <div className="micro-grid">
        <article className="chart-card micro-card ipc-card">
          <div className="micro-card-head"><span>01A · IPC</span><strong>17.93–22.80 µs</strong><p>Scheduling + notification</p></div>
          <div className="horizontal-bars">{coordination.map(item => <div className="hbar" key={item.label}><span>{item.label}</span><div><i className={item.tone} style={{ width: `${item.value / 25 * 100}%` }} /></div><strong>{item.value.toFixed(2)}</strong></div>)}</div>
          <p className="chart-note">Mean end-to-end latency · lower is better.</p>
        </article>
        <article className="chart-card micro-card">
          <div className="micro-card-head"><span>01B · ALLOCATION</span><strong>9.25 Mops/s</strong><p>CXL allocator · 8 threads</p></div>
          <div className="allocator-bars">{allocator.map(item => <div key={item.name}><strong>{item.value.toFixed(2)}</strong><i className={item.tone} style={{ height: `${item.value / 16 * 100}%` }} /><span>{item.name}</span></div>)}</div>
          <p className="chart-note">Kernel kmalloc throughput · seven artifact runs.</p>
        </article>
        <article className="chart-card micro-card">
          <div className="micro-card-head"><span>01C · FILESYSTEM</span><strong>5.5 µs</strong><p>Remote 4 KiB read</p></div>
          <div className="fs-bars">{fsCalls.map(item => <div key={item.name}><span>{item.name}</span><div><i className={item.tone} style={{ width: `${item.value / 25 * 100}%` }} /></div><strong>{item.value.toFixed(1)}</strong></div>)}</div>
          <div className="micro-fs-detail"><span>queue ≈ 1.4 µs</span><span>handling ≈ 2.0 µs</span></div>
          <p className="chart-note">Service-call latency · lower is better.</p>
        </article>
      </div>
    </section>

    <section className="metric-section dark-metric"><div className="wrap">
      <MetricHeader index="02" category="Transparent scale-out" title="Three unmodified applications scale—and beat specialized distributed baselines." finding="At eight machines, Matrix Multiply scales 3.5×, while DBx1000 and GeminiGraph each scale 2.0×. Directly shared CXL state outperforms the corresponding distributed or application-specialized design." />
      <div className="chart-card app-scale-chart">
        <div className="chart-title"><span>8-MACHINE PERFORMANCE VS. COMPARISON SYSTEM</span><span>HIGHER IS BETTER · BASELINE = 1.0×</span></div>
        <div className="scale-apps">{scaleApps.map(app => <article key={app.name}>
          <div className="scale-app-head"><div><span>{app.name}</span><small>{app.scale}</small></div><strong>{app.benefit.toFixed(1)}× faster</strong></div>
          <div className="compare-track"><i className="comparison" style={{ width: `${100 / 4.5}%` }}><b>1.0×</b></i><i className="starfish" style={{ width: `${app.benefit / 4.5 * 100}%` }}><b>{app.benefit.toFixed(1)}×</b></i></div>
          <div className="compare-label"><span>{app.baseline}</span><span>StarfishOS Mixed</span></div>
        </article>)}</div>
        <p className="chart-note">Matrix and GeminiGraph compare against their distributed implementations. DBx1000 compares against Tigon, a database redesigned specifically for CXL.</p>
      </div>
    </div></section>

    <section className="metric-section disagg-metric"><div className="wrap">
      <MetricHeader index="03" category="CPU resource disaggregation" title="Stranded CPUs become useful capacity without rewriting the application." finding="Under contention, traditional co-location retains only 17–77% of exclusive performance. StarfishOS moves application threads onto otherwise idle CPUs on another machine and retains 83–93%." />
      <div className="chart-card disagg-bar-chart">
        <div className="chart-title"><span>NORMALIZED APPLICATION PERFORMANCE</span><span>EXCLUSIVE EXECUTION = 100%</span></div>
        <div className="disagg-bars">
          <div className="disagg-y-axis"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
          <div className="disagg-group"><div className="disagg-columns"><i className="traditional" style={{ height: '17%' }}><b>17%</b></i><i className="starfish" style={{ height: '83%' }}><b>83%</b></i></div><strong>Most contended pair</strong></div>
          <div className="disagg-group"><div className="disagg-columns"><i className="traditional" style={{ height: '77%' }}><b>77%</b></i><i className="starfish" style={{ height: '93%' }}><b>93%</b></i></div><strong>Least contended pair</strong></div>
        </div>
        <div className="disagg-legend"><span><i className="traditional" />Traditional co-location</span><span><i className="starfish" />StarfishOS cross-machine</span></div>
        <div className="disagg-diagram"><div><strong>MACHINE A</strong><span className="busy">12 cores · busy</span></div><i>application threads →</i><div><strong>MACHINE B</strong><span className="idle">stranded CPUs recovered</span></div></div>
      </div>
    </div></section>

    <section className="metric-section wrap">
      <MetricHeader index="04" category="Filesystem recovery" title="A surviving machine reopens LevelDB after a service-host failure." finding="The current artifact reaches LevelDB reopen at 2.94 s host-observed end-to-end. Failure detection takes 41.8 ms; persistent-log replay is reported as 10 ms inside the guest." />
      <div className="chart-card recovery-chart"><div className="chart-title"><span>LEVELDB RECOVERY TIMELINE</span><span>ELAPSED AFTER CRASH</span></div><div className="timeline"><div className="timeline-track"><i className="detect" /><i className="fs" /><i className="db" /></div><div className="timeline-label crash"><strong>0</strong><span>machine crash</span></div><div className="timeline-label detected"><strong>41.8 ms</strong><span>failure detected</span></div><div className="timeline-label recovered"><strong>2.71 s</strong><span>filesystem available</span></div><div className="timeline-label reopened"><strong>2.94 s</strong><span>LevelDB reopened</span></div></div><div className="recovery-detail"><div><span>Guest FS restart</span><strong>39 ms</strong></div><div><span>P-log replay</span><strong>10 ms</strong></div><div><span>Guest DB reopen</span><strong>43 ms</strong></div></div></div>
    </section>

    <section className="metric-section vm-metric"><div className="wrap">
      <MetricHeader index="05" category="Linux VM transparency" title="Resident guest compute and cached memory stay within 1% of host time." finding="The recent ChVMM baseline isolates where virtualization costs remain: first-touch costs 1.33× and the syscall-heavy test costs 3.30×." />
      <div className="chart-card vm-cost-chart"><div className="chart-title"><span>GUEST / HOST EXECUTION TIME</span><span>LOWER IS BETTER · 1.0× = HOST</span></div><div className="ratio-plot">{vmCosts.map(item => <div className="ratio-row" key={item.label}><span>{item.label}</span><div><i style={{ width: `${Number.parseFloat(item.ratio) / 3.5 * 100}%` }}><b>{item.ratio}</b></i><em style={{ left: `${1 / 3.5 * 100}%` }} /></div><small>{item.host} → {item.guest} ms</small></div>)}</div></div>
    </div></section>

    <section className="reproduce compact-reproduce"><div className="wrap reproduce-grid"><div><p className="eyebrow coral"><span /> Reproduce</p><h2>Every result keeps its raw path.</h2><p>Runners preserve raw logs, parsed CSV tables, and regenerated figures. Run the complete set or select the relevant experiment numbers.</p></div><pre><code><span>$</span> python3 artifact-evaluation/run_all.py --list{`\n`}<span>$</span> python3 artifact-evaluation/run_all.py \{`\n`}    --run-subset-of-tests 1,3,5,6,7</code></pre></div></section>
    <SiteFooter />
  </main>;
}
