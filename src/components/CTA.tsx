import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-32 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 translate-y-24"></div>
      <div className="container mx-auto px-8 relative z-10">
        <h2 className="font-headline text-5xl md:text-7xl font-bold mb-6">No es solo IA <br /><span className="text-gradient">Conversacional.</span></h2>
        <p className="text-xl text-on-surface-variant mb-12 max-w-3xl mx-auto">AITENETIA es una flota de especialistas que analiza, planifica, ejecuta y valida proyectos reales en un entorno operativo con runtime, trazabilidad y previews verificables.</p>
        <button onClick={() => window.location.href='/login'} className="bg-primary text-on-primary-fixed px-12 py-5 font-headline font-bold uppercase tracking-[0.2em] text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(161,250,255,0.2)]">
          Initialize Protocol
        </button>
      </div>
    </section>
  );
};

export default CTA;
