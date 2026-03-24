import React from 'react';

const Fleet: React.FC = () => {
  return (
    <section className="py-32 bg-surface-container-lowest">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24">
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-4">The Specialist Fleet</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">Synthetic identities engineered for specialized operational tasks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sarah Chen */}
          <div className="glass-panel p-8 group hover:bg-primary/5 transition-all duration-500">
            <div className="relative mb-8 aspect-square overflow-hidden bg-surface-container-highest">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                data-alt="Professional portrait of Sarah Chen, a senior developer, in a high-tech studio environment with soft blue accent lighting"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1bkoiGXQmd_NLVMYc4uqkMtVGp-PDquIpi6iUW29zHuptZu_9vLN-S7WZQsaveBT6K0NkDzklUgb4GwzPeYoXVtyDy9_Q4aTyVcT9q6l8fNTpLYLqMu0mojQkqkfZfPbmzY3P_3GnzZmGzHFzzytHWM3liKkCTl93LtsietXXr1SPvWTks2dpXxt9glIgUHkG98gjPyXtbfgTcIVO7xHxz3g0EPNOvuBIuYf5ibirF9gXd4hkiQEubL67GTNuXk6qKxBndjsm"
                alt="Sarah Chen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 font-label text-[10px] tracking-widest uppercase text-primary">Senior Developer</div>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2">Sarah Chen</h3>
            <div className="flex gap-2 mb-6">
              <span className="px-2 py-1 bg-surface-container-highest text-[10px] uppercase font-bold tracking-tighter">TypeScript</span>
              <span className="px-2 py-1 bg-surface-container-highest text-[10px] uppercase font-bold tracking-tighter">Rust</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Specializing in high-concurrency systems and protocol architectural integrity.</p>
            <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-between">
              <span className="font-label text-[10px] uppercase tracking-widest text-primary">Active_Node</span>
              <span className="material-symbols-outlined text-sm text-primary">sensors</span>
            </div>
          </div>

          {/* Elena Rodriguez */}
          <div className="glass-panel p-8 group hover:bg-secondary/5 transition-all duration-500">
            <div className="relative mb-8 aspect-square overflow-hidden bg-surface-container-highest">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                data-alt="Modern headshot of Elena Rodriguez, code reviewer, with dramatic side lighting and a minimalist tech background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkxhwOP8xUE6zlCxTBhI2sxPfU5oVthmGyc1xa4iaLW1dfH-odAS6gGgdMtBMTcWbASBc1wAEqVQxMu4qUu3lT31JLWaTHqfKRx3553SeOFrxwtyzECo3AAqb_no09Aglh912WHP7gN64_dMbCIRYXrOkztHEUoWXNGXQHydz_eh91hzC9g9aXvipqXjDhBpNcraSg0HmN8UiWHnwFthstfFZFLNodtrQVPjhSVrFs109J72ot5fR4p1JH_Kbo7qtItG10cTtY"
                alt="Elena Rodriguez"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 font-label text-[10px] tracking-widest uppercase text-secondary">Code Reviewer</div>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2">Elena Rodriguez</h3>
            <div className="flex gap-2 mb-6">
              <span className="px-2 py-1 bg-surface-container-highest text-[10px] uppercase font-bold tracking-tighter">Security</span>
              <span className="px-2 py-1 bg-surface-container-highest text-[10px] uppercase font-bold tracking-tighter">Audit</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Ensuring synthetic output meets the highest standards of safety and efficiency.</p>
            <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-between">
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary">Analyzing</span>
              <span className="material-symbols-outlined text-sm text-secondary">biotech</span>
            </div>
          </div>

          {/* Maya Patel */}
          <div className="glass-panel p-8 group hover:bg-tertiary/5 transition-all duration-500">
            <div className="relative mb-8 aspect-square overflow-hidden bg-surface-container-highest">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                data-alt="Portrait of Maya Patel, frontend specialist, with subtle neon highlights reflecting on her face in a dark studio"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB27qybbbF0S-WV3EVSUgl1TGWZe9typGk_19_YL0n27kJQg-qV3sTyDxbgVgBGN424QZSOxB3B_C0xDuqLTzJN-opR7jnOchb1xKormELSKy6lfScWRprKliO_5XRCZasCMXSizZ8XBm8yKNbQlXVc-kgqhKYPnwPddUP68PEeGWqcHPmFaMeR1Lzv4NJC6S2jbh_j-jIGXBkgkF_2LZuwsijm7-fZI8eFB4PiJyK4cWk4g9CxjlAp6DWdbUw2-T6214Pkgvwi"
                alt="Maya Patel"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 font-label text-[10px] tracking-widest uppercase text-tertiary">Frontend Specialist</div>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2">Maya Patel</h3>
            <div className="flex gap-2 mb-6">
              <span className="px-2 py-1 bg-surface-container-highest text-[10px] uppercase font-bold tracking-tighter">UI/UX</span>
              <span className="px-2 py-1 bg-surface-container-highest text-[10px] uppercase font-bold tracking-tighter">AIGC</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Translating complex synthetic operations into intuitive, world-class interfaces.</p>
            <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-between">
              <span className="font-label text-[10px] uppercase tracking-widest text-tertiary">Rendering</span>
              <span className="material-symbols-outlined text-sm text-tertiary">palette</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
