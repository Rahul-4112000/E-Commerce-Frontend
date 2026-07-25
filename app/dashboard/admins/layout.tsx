import { getProfileServerApi, requiredRoles } from '@/feature/auth/api/auth.server';
import { EROLE } from '@/feature/auth/types/auth.type';
import { PAGE_ROUTES } from '@/shared/utils/constats';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function AdminsLayout({ children }: { children: ReactNode }) {
  let data;
  try {
    data = await getProfileServerApi();
    console.log(data?.data?.user, 'data ====');
  } catch (error: any) {
    if (error.status === 401) {
      redirect(PAGE_ROUTES.AUTH.LOGIN);
    }
    throw error; // Let error.tsx handle unexpected errors
  }

  requiredRoles(data?.data?.user, [EROLE.SUPER_ADMIN]);

  return <>{children}</>;
}
