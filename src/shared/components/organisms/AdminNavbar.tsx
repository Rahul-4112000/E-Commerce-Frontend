import React from 'react';
import { User } from 'lucide-react';
import { LogoutButton } from '../molecules/LogoutButton';

interface AdminNavbarProps {
  title?: string;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ title = "Admin" }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
          ER
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          ERTH
        </span>
        <span className="ml-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide uppercase border border-indigo-100">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <User size={16} />
          </div>
          <span>Profile</span>
        </button>
        <div className="w-px h-6 bg-gray-200"></div>
        <LogoutButton />
      </div>
    </nav>
  );
};
