import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '../atoms/Button';

export const LogoutButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors font-medium cursor-pointer border-0"
      onClick={onClick}
      variant={'secondary'}>
      <LogOut size={18} />
      <span>Logout</span>
    </Button>
  );
};
