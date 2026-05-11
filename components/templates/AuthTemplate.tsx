import React from 'react';

interface AuthTemplateProps {
  children: React.ReactNode;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Mesh Gradient Effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" 
           style={{ 
             backgroundImage: `radial-gradient(at 0% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                               radial-gradient(at 50% 0%, hsla(225,39%,20%,1) 0, transparent 50%), 
                               radial-gradient(at 100% 0%, hsla(225,39%,10%,1) 0, transparent 50%)` 
           }}>
      </div>

      <div className="relative z-10 w-full flex justify-center px-4">
        {children}
      </div>
      
      {/* Footer Info */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-sm text-gray-400 font-medium tracking-tight">
          &copy; 2026 eRath. All rights reserved. Built with precision.
        </p>
      </div>
    </div>
  );
};
