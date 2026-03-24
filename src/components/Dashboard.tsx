import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
            <h2 className="font-headline text-4xl font-bold mb-6">Operational Control</h2>
            <p className="text-on-surface-variant mb-8">Maintain total visibility over the A2A stream. Monitor throughput, latency, and agent health in real-time through the synthetic command center.</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                <span className="text-sm font-label uppercase tracking-widest">Latency-Optimized Routing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                <span className="text-sm font-label uppercase tracking-widest">Cross-Model Context Bridging</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                <span className="text-sm font-label uppercase tracking-widest">Automated Conflict Resolution</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 glass-panel p-4 rounded-xl border border-outline-variant/20 shadow-2xl">
            <div className="bg-surface-container-lowest rounded p-6 space-y-6">
              {/* Top Stats Bar */}
              <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/10 pb-6">
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Total Throughput</div>
                  <div className="text-2xl font-headline font-bold text-primary">42.8 GB/s</div>
                </div>
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Active Agents</div>
                  <div className="text-2xl font-headline font-bold">1,204</div>
                </div>
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Uptime</div>
                  <div className="text-2xl font-headline font-bold text-secondary">99.998%</div>
                </div>
              </div>

              {/* Visual Graph Simulation */}
              <div className="h-64 flex items-end justify-between gap-1 px-2">
                <div className="w-full bg-primary/20 h-1/2"></div>
                <div className="w-full bg-primary/20 h-2/3"></div>
                <div className="w-full bg-primary/20 h-1/3"></div>
                <div className="w-full bg-primary h-1/2"></div>
                <div className="w-full bg-primary/20 h-3/4"></div>
                <div className="w-full bg-primary/20 h-1/2"></div>
                <div className="w-full bg-secondary h-5/6 shadow-[0_0_15px_rgba(166,140,255,0.4)]"></div>
                <div className="w-full bg-primary/20 h-1/3"></div>
                <div className="w-full bg-primary/20 h-2/3"></div>
                <div className="w-full bg-primary h-1/2"></div>
              </div>

              {/* Logs Simulation */}
              <div className="font-mono text-[10px] text-on-surface-variant space-y-1">
                <div className="text-primary">[SYNC] Agent_Sarah_Chen initializing sub-routine 'CORE_V4'...</div>
                <div>[TASK] Allocating 4096 tokens to Docket_ID_882...</div>
                <div className="text-secondary">[LINK] Bridge established between Claude_3 and GPT_Omega...</div>
                <div>[INFO] Optimization sweep completed in 12ms.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
