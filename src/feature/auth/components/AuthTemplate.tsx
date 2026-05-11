import React from "react";

interface AuthTemplateProps {
  children: React.ReactNode;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex bg-[#fdfdfd] font-sans">
      {/* Right Side: Auth Form */}
      <div className="w-full flex items-center justify-center p-6 md:p-12 relative">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 p-8">
          <span className="text-2xl font-black italic tracking-tighter text-neutral-800">
            eRATH
          </span>
        </div>

        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </div>
    </div>
  );
};
