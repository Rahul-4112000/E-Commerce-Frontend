import React from 'react';

interface AuthTemplateProps {
  children: React.ReactNode;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fafbff] relative overflow-hidden font-sans">
      {/* Dynamic Animated Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-200/40 blur-[140px] animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-200/40 blur-[140px] animate-blob animation-delay-2000"></div>
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-violet-200/30 blur-[120px] animate-blob animation-delay-4000"></div>
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 w-full flex justify-center px-4">
        {children}
      </div>
      
      {/* Footer Info */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-sm text-gray-400 font-medium tracking-tight">
          &copy; 2026 eRath. Built for excellence.
        </p>
      </div>
    </div>
  );
};
