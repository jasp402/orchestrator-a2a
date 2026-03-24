import React from 'react';

const specialists = [
  { name: "Sarah Chen", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1bkoiGXQmd_NLVMYc4uqkMtVGp-PDquIpi6iUW29zHuptZu_9vLN-S7WZQsaveBT6K0NkDzklUgb4GwzPeYoXVtyDy9_Q4aTyVcT9q6l8fNTpLYLqMu0mojQkqkfZfPbmzY3P_3GnzZmGzHFzzytHWM3liKkCTl93LtsietXXr1SPvWTks2dpXxt9glIgUHkG98gjPyXtbfgTcIVO7xHxz3g0EPNOvuBIuYf5ibirF9gXd4hkiQEubL67GTNuXk6qKxBndjsm", roleShort: "Senior Developer", roleLong: "Senior Implementation Engineer", desc: "Specializing in high-concurrency systems and protocol architectural integrity.", status: "Active_Node", icon: "sensors" },
  { name: "Elena Rodriguez", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkxhwOP8xUE6zlCxTBhI2sxPfU5oVthmGyc1xa4iaLW1dfH-odAS6gGgdMtBMTcWbASBc1wAEqVQxMu4qUu3lT31JLWaTHqfKRx3553SeOFrxwtyzECo3AAqb_no09Aglh912WHP7gN64_dMbCIRYXrOkztHEUoWXNGXQHydz_eh91hzC9g9aXvipqXjDhBpNcraSg0HmN8UiWHnwFthstfFZFLNodtrQVPjhSVrFs109J72ot5fR4p1JH_Kbo7qtItG10cTtY", roleShort: "Code Reviewer", roleLong: "Senior Quality Assurance Lead & Code Reviewer", desc: "Ensuring synthetic output meets the highest standards of safety and efficiency.", status: "Analyzing", icon: "biotech" },
  { name: "Maya Patel", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB27qybbbF0S-WV3EVSUgl1TGWZe9typGk_19_YL0n27kJQg-qV3sTyDxbgVgBGN424QZSOxB3B_C0xDuqLTzJN-opR7jnOchb1xKormELSKy6lfScWRprKliO_5XRCZasCMXSizZ8XBm8yKNbQlXVc-kgqhKYPnwPddUP68PEeGWqcHPmFaMeR1Lzv4NJC6S2jbh_j-jIGXBkgkF_2LZuwsijm7-fZI8eFB4PiJyK4cWk4g9CxjlAp6DWdbUw2-T6214Pkgvwi", roleShort: "Frontend Specialist", roleLong: "Senior Frontend Engineer (Implementation)", desc: "Translating complex synthetic operations into intuitive, world-class interfaces.", status: "Rendering", icon: "palette" },
  { name: "David Kim", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop", roleShort: "Backend Expert", roleLong: "Senior Backend Engineer", desc: "Architecting scalable data flow and robust server-side protocols.", status: "Compiling", icon: "dns" },
  { name: "James Wilson", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop", roleShort: "Software Architect", roleLong: "System Architect + Technical Design Leader", desc: "Designing overarching structural blueprints for highly cohesive multi-agent meshes.", status: "Designing", icon: "architecture" },
  { name: "Michael Brown", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop", roleShort: "Database Expert", roleLong: "Senior Database Administrator & Architect", desc: "Optimizing state persistence, search indices, and distributed cluster integrity.", status: "Indexing", icon: "database" },
  { name: "Thomas Anderson", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop", roleShort: "DevOps Expert", roleLong: "Senior Site Reliability Engineer (SRE)", desc: "Automating deployment pipelines and ensuring 99.999% uptime of synthetic nodes.", status: "Deploying", icon: "cloud_sync" },
  { name: "Sophia Williams", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop", roleShort: "Security Expert", roleLong: "Cybersecurity Specialist & Ethical Hacker", desc: "Securing agent communications and preventing adversarial intrusion vectors.", status: "Monitoring", icon: "security" },
  { name: "Olivia Martinez", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop", roleShort: "QA Lead", roleLong: "Master Test Architect", desc: "Leading comprehensive automated quality protocols across multiple agent dimensions.", status: "Testing", icon: "bug_report" },
  { name: "Robert Taylor", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=500&auto=format&fit=crop", roleShort: "API Designer", roleLong: "Strategic API Designer", desc: "Crafting intuitive and standardized interfaces for synthetic cross-communication.", status: "Routing", icon: "api" },
  { name: "Daniel Lee", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop", roleShort: "Tech Lead", roleLong: "Investigative Product Strategist + Tech Lead", desc: "Steering technical direction and resolving architectural ambiguities.", status: "Leading", icon: "psychology" },
  { name: "Isabella Garcia", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop", roleShort: "Full Stack Developer", roleLong: "User Experience Designer + Full Stack Developer", desc: "Bridging visually striking design with robust end-to-end functionality.", status: "Integrating", icon: "layers" },
  { name: "Chris Evans", img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=500&auto=format&fit=crop", roleShort: "Performance Guru", roleLong: "Technical Performance Expert", desc: "Identifying bottlenecks and tuning algorithms for sub-millisecond execution.", status: "Optimizing", icon: "speed" },
  { name: "Lucas White", img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=500&auto=format&fit=crop", roleShort: "QA Automation Dev", roleLong: "Automated Test Developer", desc: "Writing resilient, self-healing test scripts to validate agent intelligence.", status: "Automating", icon: "smart_toy" }
];

const themes = [
  { text: 'text-primary', hoverBg: 'hover:bg-primary/5' },
  { text: 'text-secondary', hoverBg: 'hover:bg-secondary/5' },
  { text: 'text-tertiary', hoverBg: 'hover:bg-tertiary/5' },
];

const Fleet: React.FC = () => {
  return (
    <section className="py-32 bg-surface-container-lowest">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24">
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-4">The Specialist Fleet</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">Synthetic identities engineered for specialized operational tasks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialists.map((person, index) => {
            const theme = themes[index % themes.length];
            return (
              <div key={index} className={`glass-panel p-8 group ${theme.hoverBg} transition-all duration-500 flex flex-col`}>
                {/* Image Placeholder with Frosted Aluminum Glass Effect */}
                <div className="relative mb-8 aspect-square overflow-hidden bg-surface-container-highest">
                  
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  
                  {/* Subtle Metal / Glass Reflection (no blur) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-0"></div>
                  
                  {/* Bottom Gradient Fade */}
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#0f0d16] to-transparent pointer-events-none"></div>

                  <div className={`absolute bottom-4 left-4 font-label text-[10px] tracking-widest uppercase ${theme.text} z-10`}>
                    {person.roleShort}
                  </div>
                </div>

                <h3 className="font-headline text-2xl font-bold mb-2">{person.name}</h3>
                
                <p className={`font-label text-xs font-bold uppercase tracking-widest mb-6 ${theme.text}`}>
                  {person.roleLong}
                </p>

                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {person.desc}
                </p>
                
                <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-between mt-auto">
                  <span className={`font-label text-[10px] uppercase tracking-widest ${theme.text}`}>
                    {person.status}
                  </span>
                  <span className={`material-symbols-outlined text-sm ${theme.text}`}>
                    {person.icon}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
