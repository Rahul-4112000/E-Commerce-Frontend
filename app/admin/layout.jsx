import { getProfileServerApi } from '@/feature/auth/api/auth.client';
import { EROLE } from '@/feature/auth/types/auth.type';
import { PAGE_ROUTES } from '@/shared/utils/constats';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SuperAdminLayout({ children }) {
  const token = (await cookies()).get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  const { data } = await getProfileServerApi(token);

  if (data.user.role !== EROLE.ADMIN) {
    redirect(PAGE_ROUTES.UNAUTHORIZED);
  }

  return <>{children}</>;
}
