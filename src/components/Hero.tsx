import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 hero-gradient">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKkKkNxQSBMHmbyVujwkuBsTq9s3LfLlt1delrZi9fOPejuT59JQOZsrIym5FNSjTCB4oxstt1Zubo95YmZd6WJDK4IJdx_yfdorq-p2EpxC8YTZaAk90agMmMqhTGBwk2t2UypNiXVzPMbPXMZPTUE8BEyU1yWd5fY8NrrYAEOImAhqgqyzzb76Ss0sULh49rVbmS38zfMCNJZQrcYFsOa0vIQuIL5UrgokY1eSRe2EIY5ELGRUUZgPSRyBwsgGX6Jh6V6Bu6')",
            backgroundSize: "cover",
            mixBlendMode: "screen"
          }}
        ></div>
      </div>

      <div className="container mx-auto px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label text-[0.6875rem] uppercase tracking-[0.2em] text-primary">System Status: Operational</span>
        </div>

        <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter mb-8 max-w-5xl mx-auto leading-[1.1]">
          The Future of Synthetic <span className="text-gradient">Intelligence is A2A</span>
        </h1>

        <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Experience the world's first experimental Agent-to-Agent protocol. Orchestrate complex multi-agent workflows with surgical precision and real-time telemetry.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest neon-glow-border transition-all hover:brightness-110">
            Initialize Project
          </button>
          <button className="w-full md:w-auto px-10 py-4 border border-outline/30 text-on-surface font-headline font-bold uppercase tracking-widest hover:bg-surface-container-high transition-all">
            View Documentation
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40">
        <span className="material-symbols-outlined text-primary animate-bounce">keyboard_double_arrow_down</span>
      </div>
    </header>
  );
};

export default Hero;
