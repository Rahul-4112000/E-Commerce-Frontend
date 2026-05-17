import React from 'react';
import { LogOut } from 'lucide-react';

export const LogoutButton = () => {
  return (
    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors font-medium cursor-pointer">
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
};
