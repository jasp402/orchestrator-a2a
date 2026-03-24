import React from 'react';

const ArchitectureDiagram: React.FC = () => {
  return (
    <section className="py-24 bg-surface-container relative border-y border-outline-variant/10 overflow-hidden">
      <div className="container mx-auto px-8">
        
        {/* Header Section */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <span className="font-label text-sm tracking-[0.2em] text-secondary uppercase mb-4 block">
            Ecosystem Overview
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-6">
            A2A Orchestration Architecture
          </h2>
          <p className="text-on-surface-variant text-lg">
            Witness the power of the AITENETIA Hub, where human intent meets autonomous execution through a sophisticated multi-agent network.
          </p>
        </div>
        
        {/* Main Content: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          
          {/* Left: SVG Diagram Container */}
          <div className="lg:col-span-2 glass-panel p-4 rounded-xl border border-outline-variant/20 shadow-2xl relative group overflow-hidden">
            <svg className="text-muted w-full h-auto drop-shadow-lg scale-100 group-hover:scale-[1.01] transition-transform duration-700" width="100%" height="100%" viewBox="0 0 1400 900">
              <g stroke="currentColor" fill="none" strokeWidth="3" strokeDasharray="100 100" pathLength="100">
                <path strokeDasharray="100 100" pathLength="100" d="M 700 160 L 700 350" stroke="rgba(255,255,255,0.6)"></path>
                <path strokeDasharray="100 100" pathLength="100" d="M 600 380 Q 500 320 240 270" stroke="rgba(255,255,255,0.4)"></path>
                <path strokeDasharray="100 100" pathLength="100" d="M 650 370 Q 580 320 460 270" stroke="rgba(255,255,255,0.4)"></path>
                <path strokeDasharray="100 100" pathLength="100" d="M 750 370 Q 820 320 940 270" stroke="rgba(255,255,255,0.4)"></path>
                <path strokeDasharray="100 100" pathLength="100" d="M 800 380 Q 900 320 1160 270" stroke="rgba(255,255,255,0.4)"></path>
                <path strokeDasharray="100 100" pathLength="100" d="M 330 235 Q 590 220 850 235" stroke="rgba(255,255,255,0.3)"></path>
                <path strokeDasharray="100 100" pathLength="100" d="M 620 450 Q 550 500 350 570" stroke="rgba(255,255,255,0.4)"></path>
                <path strokeDasharray="100 100" pathLength="100" d="M 700 450 Q 700 520 700 680" stroke="rgba(34,197,94,0.6)"></path>
              </g>
              <g mask="url(#aria-mask-1)"><circle className="aria-workflow aria-line-1" cx="0" cy="0" r="12" fill="url(#aria-blue-grad)" style={{ opacity: 1 }}></circle></g>
              <g mask="url(#aria-mask-2)"><circle className="aria-workflow aria-line-2" cx="0" cy="0" r="10" fill="url(#aria-yellow-grad)" style={{ opacity: 1 }}></circle></g>
              <g mask="url(#aria-mask-3)"><circle className="aria-workflow aria-line-3" cx="0" cy="0" r="10" fill="url(#aria-pinkish-grad)" style={{ opacity: 1 }}></circle></g>
              <g mask="url(#aria-mask-4)"><circle className="aria-workflow aria-line-4" cx="0" cy="0" r="10" fill="url(#aria-white-grad)" style={{ opacity: 1 }}></circle></g>
              <g mask="url(#aria-mask-5)"><circle className="aria-workflow aria-line-5" cx="0" cy="0" r="10" fill="url(#aria-green-grad)" style={{ opacity: 1 }}></circle></g>
              <g mask="url(#aria-mask-6)"><circle className="aria-workflow aria-line-6" cx="0" cy="0" r="8" fill="url(#aria-orange-grad)" style={{ opacity: 1 }}></circle></g>
              <g mask="url(#aria-mask-7)"><circle className="aria-workflow aria-line-7" cx="0" cy="0" r="10" fill="url(#aria-cyan-grad)" style={{ opacity: 1 }}></circle></g>
              <g mask="url(#aria-mask-8)"><circle className="aria-workflow aria-line-8" cx="0" cy="0" r="12" fill="url(#aria-rose-grad)" style={{ opacity: 1 }}></circle></g>
              <g>
                <rect x="600" y="80" width="200" height="80" rx="15" fill="url(#aria-agent-gradient)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"></rect>
                <text x="700" y="115" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">👤 Human Developer</text>
                <text x="700" y="135" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">You stay in control</text>
              </g>
              <g className="animate-pulse" style={{ animationDelay: '0.2s' }}>
                <rect x="550" y="350" width="300" height="100" rx="20" fill="url(#aria-orchestrator-gradient)" stroke="rgba(255,255,255,0.6)" strokeWidth="3"></rect>
                <text x="700" y="385" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">AITENETIA Hub</text>
                <text x="700" y="405" textAnchor="middle" fill="white" fontSize="14">Agent Orchestration Layer</text>
                <text x="700" y="425" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="12">🔥 Core Differentiator</text>
              </g>
              <g className="animate-pulse" style={{ animationDelay: '0.4s' }}>
                <rect x="150" y="200" width="180" height="70" rx="12" fill="url(#aria-agent-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"></rect>
                <text x="240" y="225" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">🐙 Senior Developer</text>
                <text x="240" y="245" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">Architecture &amp; Planning</text>
              </g>
              <g className="animate-pulse" style={{ animationDelay: '0.6s' }}>
                <rect x="370" y="200" width="180" height="70" rx="12" fill="url(#aria-agent-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"></rect>
                <text x="460" y="225" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">🐠 Frontend Expert</text>
                <text x="460" y="245" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">React/UI/UX</text>
              </g>
              <g className="animate-pulse" style={{ animationDelay: '0.8s' }}>
                <rect x="850" y="200" width="180" height="70" rx="12" fill="url(#aria-agent-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"></rect>
                <text x="940" y="225" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">🦈 Backend Expert</text>
                <text x="940" y="245" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">API/Database</text>
              </g>
              <g className="animate-pulse" style={{ animationDelay: '1s' }}>
                <rect x="1070" y="200" width="180" height="70" rx="12" fill="url(#aria-agent-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"></rect>
                <text x="1160" y="225" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">🐟 DevOps Expert</text>
                <text x="1160" y="245" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">CI/CD/Deploy</text>
              </g>
              <g className="animate-pulse" style={{ animationDelay: '1.2s' }}>
                <rect x="260" y="550" width="180" height="70" rx="12" fill="url(#aria-agent-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="2"></rect>
                <text x="350" y="575" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">🐡 Security Expert</text>
                <text x="350" y="595" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">Audit &amp; Protection</text>
              </g>
              <g style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
                <rect x="500" y="680" width="400" height="120" rx="20" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.4)" strokeWidth="2"></rect>
                <text x="700" y="710" textAnchor="middle" fill="rgba(34,197,94,1)" fontSize="18" fontWeight="bold">🚀 Your Complete Application</text>
                <text x="520" y="735" fill="rgba(255,255,255,0.9)" fontSize="12">✅ Frontend (React/Vue/Angular)</text>
                <text x="520" y="755" fill="rgba(255,255,255,0.9)" fontSize="12">✅ Backend API &amp; Database</text>
                <text x="520" y="775" fill="rgba(255,255,255,0.9)" fontSize="12">✅ Authentication &amp; Security</text>
                <text x="720" y="735" fill="rgba(255,255,255,0.9)" fontSize="12">✅ Deployed &amp; Live</text>
                <text x="720" y="755" fill="rgba(255,255,255,0.9)" fontSize="12">✅ CI/CD Pipeline</text>
                <text x="720" y="775" fill="rgba(255,255,255,0.9)" fontSize="12">✅ Production Ready</text>
              </g>
              <defs>
                <mask id="aria-mask-1"><path d="M 700 160 L 700 350" strokeWidth="3" stroke="white"></path></mask>
                <mask id="aria-mask-2"><path d="M 600 380 Q 500 320 240 270" strokeWidth="3" stroke="white"></path></mask>
                <mask id="aria-mask-3"><path d="M 650 370 Q 580 320 460 270" strokeWidth="3" stroke="white"></path></mask>
                <mask id="aria-mask-4"><path d="M 750 370 Q 820 320 940 270" strokeWidth="3" stroke="white"></path></mask>
                <mask id="aria-mask-5"><path d="M 800 380 Q 900 320 1160 270" strokeWidth="3" stroke="white"></path></mask>
                <mask id="aria-mask-6"><path d="M 330 235 Q 590 220 850 235" strokeWidth="3" stroke="white"></path></mask>
                <mask id="aria-mask-7"><path d="M 620 450 Q 550 500 350 570" strokeWidth="3" stroke="white"></path></mask>
                <mask id="aria-mask-8"><path d="M 700 450 Q 700 520 700 680" strokeWidth="3" stroke="white"></path></mask>
                <radialGradient id="aria-blue-grad" fx="1"><stop offset="0%" stopColor="#00E8ED"></stop><stop offset="50%" stopColor="#08F"></stop><stop offset="100%" stopColor="transparent"></stop></radialGradient>
                <radialGradient id="aria-yellow-grad" fx="1"><stop offset="0%" stopColor="#FFD800"></stop><stop offset="50%" stopColor="#FFD800"></stop><stop offset="100%" stopColor="transparent"></stop></radialGradient>
                <radialGradient id="aria-pinkish-grad" fx="1"><stop offset="0%" stopColor="#830CD1"></stop><stop offset="50%" stopColor="#FF008B"></stop><stop offset="100%" stopColor="transparent"></stop></radialGradient>
                <radialGradient id="aria-white-grad" fx="1"><stop offset="0%" stopColor="white"></stop><stop offset="100%" stopColor="transparent"></stop></radialGradient>
                <radialGradient id="aria-green-grad" fx="1"><stop offset="0%" stopColor="#22c55e"></stop><stop offset="100%" stopColor="transparent"></stop></radialGradient>
                <radialGradient id="aria-orange-grad" fx="1"><stop offset="0%" stopColor="#f97316"></stop><stop offset="100%" stopColor="transparent"></stop></radialGradient>
                <radialGradient id="aria-cyan-grad" fx="1"><stop offset="0%" stopColor="#06b6d4"></stop><stop offset="100%" stopColor="transparent"></stop></radialGradient>
                <radialGradient id="aria-rose-grad" fx="1"><stop offset="0%" stopColor="#f43f5e"></stop><stop offset="100%" stopColor="transparent"></stop></radialGradient>
                <linearGradient id="aria-agent-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="rgba(255,255,255,0.15)"></stop><stop offset="100%" stopColor="rgba(255,255,255,0.05)"></stop></linearGradient>
                <linearGradient id="aria-orchestrator-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="rgba(255,255,255,0.2)"></stop><stop offset="100%" stopColor="rgba(255,255,255,0.1)"></stop></linearGradient>
              </defs>
            </svg>
          </div>

          {/* Right: Feature Legend Steps */}
          <div className="flex flex-col gap-10 lg:col-span-1">
            
            {/* Step 1 */}
            <div className="flex gap-6 group">
              <div className="relative pt-1 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#00E8ED] shadow-[0_0_15px_rgba(0,232,237,0.6)] group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(0,232,237,0.8)] transition-all"></div>
                <div className="w-[1px] h-full bg-outline-variant/30 mt-4 hidden lg:block mask-image-linear-t"></div>
              </div>
              <div className="flex-1 pb-4 border-b border-outline-variant/10 lg:border-none lg:pb-0">
                <h3 className="font-headline text-xl font-bold text-[#00E8ED] mb-2 tracking-wide">1. Human Control</h3>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  The Human Developer stays at the top of the hierarchy, defining high-level objectives and maintaining ultimate governance over the swarm.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 group">
              <div className="relative pt-1 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#818CF8] shadow-[0_0_15px_rgba(129,140,248,0.6)] group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(129,140,248,0.8)] transition-all"></div>
                <div className="w-[1px] h-full bg-outline-variant/30 mt-4 hidden lg:block mask-image-linear-t"></div>
              </div>
              <div className="flex-1 pb-4 border-b border-outline-variant/10 lg:border-none lg:pb-0">
                <h3 className="font-headline text-xl font-bold text-[#818CF8] mb-2 tracking-wide">2. Specialized Agent Layer</h3>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  Intents are decomposed into tasks for specialized experts: Senior Architects, Frontend Specialists, Backend Masters, DevOps SREs, and Security Auditors.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 group">
              <div className="relative pt-1 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#F472B6] shadow-[0_0_15px_rgba(244,114,182,0.6)] group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(244,114,182,0.8)] transition-all"></div>
                <div className="w-[1px] h-full bg-outline-variant/30 mt-4 hidden lg:block mask-image-linear-t"></div>
              </div>
              <div className="flex-1 pb-4 border-b border-outline-variant/10 lg:border-none lg:pb-0">
                <h3 className="font-headline text-xl font-bold text-[#F472B6] mb-2 tracking-wide">3. AITENETIA Hub</h3>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  The core orchestration layer synchronizes these agents, resolving conflicts and managing state via high-integrity protocol tunnels.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 group">
              <div className="relative pt-1 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#2DD4BF] shadow-[0_0_15px_rgba(45,212,191,0.6)] group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(45,212,191,0.8)] transition-all"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-headline text-xl font-bold text-[#2DD4BF] mb-2 tracking-wide">4. Production-Ready Output</h3>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  The cycle concludes with a complete, production-ready application featuring verified code, automated CI/CD, and hardened security.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDiagram;
