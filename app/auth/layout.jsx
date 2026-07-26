import { EROLE } from '@/feature/auth/types/auth.type';
import { validateToken } from '@/lib/tokenHandler';
import { PAGE_ROUTES } from '@/shared/utils/constants';
import { redirect } from 'next/navigation';


export default async function AuthLayout({ children }) {
  const { isTokenValid, user } = await validateToken();

  if (isTokenValid) {
    if (user.role === EROLE.ADMIN || user.role === EROLE.SUPER_ADMIN) {
      redirect(PAGE_ROUTES.DASHBOARD.HOME)
    } else {
      redirect(PAGE_ROUTES.HOME)
    }
  }

  return (
    <div className='min-h-screen w-full flex bg-[#fdfdfd] font-sans'>
      <div className='w-full flex items-center justify-center p-6 md:p-12 relative'>
        <div className='absolute top-0 left-0 p-8'>
          <span className='text-2xl font-black italic tracking-tighter text-neutral-800'>eRATH</span>
        </div>

        <div className='w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700'>{children}</div>
      </div>
    </div>
  );
}
