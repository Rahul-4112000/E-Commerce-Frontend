import { API_PATHS } from '@/config/api.path';
import { AuthTemplate } from '@/feature/auth/components/AuthTemplate';
import { InviteForm } from '@/feature/auth/components/InviteForm';
import { getApi } from '@/shared/utils/api-connector';
import { redirect } from 'next/navigation';
import InvalidInvite from '@/feature/auth/components/InvalidInvite';
import { PAGE_ROUTES } from '@/shared/utils/constats';

type props = {
  searchParams: Promise<{
    inviteToken?: string;
  }>;
};

export default async function InvitePage({ searchParams }: props) {
  const query = await searchParams;

  if (!query.inviteToken) {
    redirect(PAGE_ROUTES.AUTH.LOGIN);
  }

  const inviteToken = query.inviteToken;

  let data;
  try {
    data = await getApi(API_PATHS.admins.validateInvite(inviteToken));
  } catch {
    return <InvalidInvite />;
  }

  if (!data?.success) {
    return <InvalidInvite />;
  }

  return (
    <AuthTemplate>
      <InviteForm />
    </AuthTemplate>
  );
}
