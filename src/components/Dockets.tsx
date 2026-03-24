import React from 'react';

const Dockets: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="max-w-3xl mb-20">
          <h3 className="font-label text-primary tracking-[0.3em] uppercase mb-4 text-sm font-bold">Protocol Architecture</h3>
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8">Synchronized Dockets</h2>
          <p className="text-on-surface-variant text-lg">
            Every operation is encapsulated in a 'Docket'—a high-integrity state container that tracks planning, execution, and validation cycles across the agent swarm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Planning Column */}
          <div className="bg-surface-container p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label text-xs font-bold tracking-widest opacity-50 uppercase">Planning</span>
              <span className="w-2 h-2 rounded-full bg-on-surface-variant"></span>
            </div>
            <div className="glass-panel p-4 space-y-3">
              <div className="h-1 w-full bg-surface-container-highest overflow-hidden">
                <div className="h-full bg-outline-variant w-1/3"></div>
              </div>
              <p className="text-sm font-medium">Schema Initialization</p>
              <div className="flex gap-2">
                <div className="w-5 h-5 rounded-full bg-secondary/20"></div>
              </div>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-surface-container p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label text-xs font-bold tracking-widest text-primary uppercase">In Progress</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            </div>
            <div className="glass-panel p-4 space-y-3 border-primary/20 bg-primary/5">
              <div className="h-1 w-full bg-surface-container-highest overflow-hidden">
                <div className="h-full bg-primary w-2/3"></div>
              </div>
              <p className="text-sm font-medium">Core Protocol Sync</p>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary/40 border border-background"></div>
                <div className="w-6 h-6 rounded-full bg-secondary/40 border border-background"></div>
              </div>
            </div>
          </div>

          {/* Blocked Column */}
          <div className="bg-surface-container p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label text-xs font-bold tracking-widest text-error uppercase">Blocked</span>
              <span className="material-symbols-outlined text-xs text-error">warning</span>
            </div>
            <div className="glass-panel p-4 space-y-3 opacity-60">
              <p className="text-sm font-medium">Legacy API Bridge</p>
              <div className="text-[10px] text-error font-mono">ERR_TIMEOUT_RETRY</div>
            </div>
          </div>

          {/* Completed Column */}
          <div className="bg-surface-container p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label text-xs font-bold tracking-widest text-secondary uppercase">Completed</span>
              <span className="material-symbols-outlined text-xs text-secondary">check_circle</span>
            </div>
            <div className="glass-panel p-4 space-y-3 bg-secondary/5">
              <p className="text-sm font-medium">Auth Handshake</p>
              <span className="inline-block px-2 py-0.5 rounded bg-secondary/20 text-secondary text-[10px] uppercase font-bold">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dockets;
