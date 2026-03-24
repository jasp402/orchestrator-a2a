import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f0d16] w-full py-12 px-8 border-t border-[#f5eefc]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-screen-2xl mx-auto items-center">
        <div>
          <div className="text-lg font-black text-[#f5eefc] mb-2 font-headline uppercase tracking-tighter">A2A_PROTOCOL</div>
          <p className="font-label text-[0.6875rem] uppercase tracking-widest text-[#f5eefc]/40">© 2024 SYNTHETIC COMMAND CENTER. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="flex flex-wrap gap-6 md:justify-end font-label text-[0.6875rem] uppercase tracking-widest">
          <a className="text-[#f5eefc]/40 hover:text-[#a68cff] transition-colors" href="#">Protocol</a>
          <a className="text-[#f5eefc]/40 hover:text-[#a68cff] transition-colors" href="#">Documentation</a>
          <a className="text-[#f5eefc]/40 hover:text-[#a68cff] transition-colors" href="#">Security</a>
          <a className="text-[#f5eefc]/40 hover:text-[#a68cff] transition-colors" href="#">Terminal</a>
          <a className="text-[#f5eefc]/40 hover:text-[#a68cff] transition-colors" href="#">Status</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
