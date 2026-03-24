import React from 'react';

const Orchestration: React.FC = () => {
  return (
    <section className="py-24 bg-surface-container-low border-y border-outline-variant/10">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
              Unified Model <br /><span className="text-secondary">Orchestration</span>
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl">
              A2A Protocol abstracts the complexity of LLM fragmentation. Seamlessly bridge Gemini, Claude, and GPT-4 through a single command interface optimized for autonomous collaboration.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-3 gap-8 items-center justify-items-center opacity-70">
            {/* Gemini Placeholder */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-20 h-20 rounded-xl bg-surface-container-highest flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-4xl text-primary" data-weight="fill">auto_awesome</span>
              </div>
              <span className="font-label text-xs tracking-widest">GEMINI_1.5</span>
            </div>

            {/* GPT-4 Placeholder */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-20 h-20 rounded-xl bg-surface-container-highest flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                <span className="material-symbols-outlined text-4xl text-secondary" data-weight="fill">hub</span>
              </div>
              <span className="font-label text-xs tracking-widest">GPT_OMEGA</span>
            </div>

            {/* Claude Placeholder */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-20 h-20 rounded-xl bg-surface-container-highest flex items-center justify-center group-hover:bg-tertiary/10 transition-colors">
                <span className="material-symbols-outlined text-4xl text-tertiary" data-weight="fill">neurology</span>
              </div>
              <span className="font-label text-xs tracking-widest">CLAUDE_3</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orchestration;
