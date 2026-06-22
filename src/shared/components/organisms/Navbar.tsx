'use client'
import React, { useState } from 'react';
import { User } from 'lucide-react';
import { LogoutButton } from '../molecules/LogoutButton';
import { useApi } from '@/shared/hooks/use.api';
import { userService } from '@/shared/services/user.service';
import { authService } from '@/feature/auth/services/auth.api.service';
import { showToast } from '@/shared/utils/toast.util';
import { useRouter } from 'next/navigation';
import { PAGE_ROUTES } from '@/shared/utils/constats';
import { Modal } from '../Modal';


export const Navbar = () => {
  const [isConfirmationModalOpen, setConfirmationModel] = useState(false);
  const router = useRouter();
  const [isLogginOut, setLogOut] = useState(false);
  const { data } = useApi(userService.getUserProfile, { immediate: true });



  const handleLogout = async () => {
    try {
      setLogOut(true)
      const logoutResponse = await authService.logout();
      if (logoutResponse.success) {
        router.push(PAGE_ROUTES.LOGIN);
      }
    }
    catch (error) {
      showToast.error('something went wrong');
    }
    finally {
      setLogOut(false)
      setConfirmationModel(false)
    }
  }


  const toggleConfirmationModel = () => {
    setConfirmationModel((prevState) => !prevState);
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
          ER
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          ERTH
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <User size={16} />
          </div>
          <span>{data ? data.user.name : "User"}</span>
        </button>
        <div className="w-px h-6 bg-gray-200"></div>
        <LogoutButton onClick={toggleConfirmationModel} />
      </div>

      {isConfirmationModalOpen && (
        <Modal
          title="Confirm Logout"
          onClose={toggleConfirmationModel}
          onConfirm={() => data && handleLogout()}
          confirmLabel="Logout"
          isLoading={isLogginOut}
        >
          Are you sure you want to log out? You will need to sign in again to access your account.
        </Modal>
      )}
    </nav>
  );
};
