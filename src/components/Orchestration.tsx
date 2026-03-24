import React from 'react';

const providers = [
  { name: 'OPENAI', logo: '/logos/openai.png' },
  { name: 'GEMINI', logo: '/logos/gemini.png' },
  { name: 'GROQ', logo: 'https://logo.clearbit.com/groq.com' },
  { name: 'OPENROUTER', logo: 'https://logo.clearbit.com/openrouter.ai' },
  { name: 'MISTRAL', logo: 'https://logo.clearbit.com/mistral.ai' },
  { name: 'GROK / XAI', logo: '/logos/grok.png' },
  { name: 'GLM', logo: 'https://logo.clearbit.com/zhipuai.cn' },
  { name: 'KIMI', logo: '/logos/kimi.png' },
  { name: 'ANTHROPIC', logo: 'https://logo.clearbit.com/anthropic.com' },
  { name: 'CEREBRAS', logo: 'https://logo.clearbit.com/cerebras.net' }
];

const Orchestration: React.FC = () => {
  return (
    <section className="py-24 bg-surface-container-low border-y border-outline-variant/10">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
              Unified Model <br /><span className="text-secondary">Orchestration</span>
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-xl">
              AITENETIA usa una arquitectura Round Robin multimodelo. Eso significa que puede alternar automáticamente entre varios proveedores de IA activos, distribuyendo cada solicitud entre OpenAI, Gemini, Groq, OpenRouter, Mistral, Grok, GLM, Kimi, Anthropic-GLM y Cerebras. El resultado es una operación más flexible, resiliente y adaptable al tipo de tarea.
            </p>
          </div>

          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 items-center justify-items-center opacity-90">
              {providers.map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group w-full">
                  <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center group-hover:bg-primary/10 transition-colors p-3 overflow-hidden border border-outline-variant/5">
                    <img 
                       src={p.logo} 
                       alt={`${p.name} logo`} 
                       className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 invert dark:invert-0" 
                       onError={(e) => { 
                         e.currentTarget.style.display = 'none'; 
                         if(e.currentTarget.nextElementSibling) {
                            e.currentTarget.nextElementSibling.classList.remove('hidden');
                         }
                       }} 
                    />
                    <span className="hidden font-headline text-xl font-bold text-on-surface opacity-70 group-hover:text-primary transition-colors">
                      {p.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-label text-[9px] tracking-widest text-on-surface-variant group-hover:text-on-surface transition-colors whitespace-nowrap">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orchestration;
