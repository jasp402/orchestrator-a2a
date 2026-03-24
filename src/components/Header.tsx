import React, { useState, useEffect } from 'react';

const words = [
  "A2A_PROTOCOL",
  "MULTI AGENTS",
  "AGENT PROTOCOL",
  "SYSTEM ORCHESTRATION",
  "REALTIME EXECUTION"
];

const Header: React.FC = () => {
  const [text, setText] = useState("A2A_PROTOCOL");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const i = loopNum % words.length;
    const fullText = words[i];

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length - 1));
        }, 40);
      }
    } else {
      if (text === fullText) {
        // Pausa larga de 5 minutos (300,000 milisegundos)
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 300000); 
      } else {
        timer = setTimeout(() => {
          setText(fullText.substring(0, text.length + 1));
        }, 80);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f0d16]/80 backdrop-blur-xl shadow-[0px_24px_48px_-12px_rgba(161,250,255,0.08)]">
      <div className="flex justify-between items-center px-8 h-16 w-full max-w-screen-2xl mx-auto">
        <div className="text-xl font-bold tracking-tighter text-[#a1faff] uppercase font-headline">
          {text}
          <span className="animate-pulse">_</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
          <a className="text-[#a1faff] border-b-2 border-[#a1faff] pb-1" href="#">Home</a>
          <a className="text-[#f5eefc]/60 hover:text-[#f5eefc] transition-colors" href="#">Features</a>
          <a className="text-[#f5eefc]/60 hover:text-[#f5eefc] transition-colors" href="#">Dockets</a>
          <a className="text-[#f5eefc]/60 hover:text-[#f5eefc] transition-colors" href="#">Specialists</a>
        </div>
        <button className="bg-primary-fixed text-on-primary-fixed px-6 py-2 font-headline font-bold uppercase tracking-wider text-sm hover:bg-primary-dim transition-all active:scale-95">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Header;
