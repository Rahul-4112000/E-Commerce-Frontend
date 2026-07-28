import { API_PATHS } from '@/config/api.path';
import { AuthTemplate } from '@/feature/auth/components/AuthTemplate';
import { InviteForm } from '@/feature/auth/components/InviteForm';
import { getApi } from '@/shared/utils/api-connector';
import { redirect } from 'next/navigation';
import InvalidInvite from '@/feature/auth/components/InvalidInvite';
import { PAGE_ROUTES } from '@/shared/utils/constants';

type Props = {
  params: Promise<{
    inviteToken: string;
  }>;
};

export default async function InvitePage({ params }: Props) {
  const { inviteToken } = await params;

  if (!inviteToken) {
    redirect(PAGE_ROUTES.AUTH.LOGIN);
  }

  let data;
  try {
    data = await getApi(API_PATHS.admins.validateInvite(inviteToken));
  } catch {
    return <InvalidInvite />;
  }

  if (!data?.success) {
    return <InvalidInvite />;
  }

  const { email, expiresAt } = data.data.invitation;

  return (
    <AuthTemplate>
      <InviteForm email={email} expiresAt={expiresAt} inviteToken={inviteToken} />
    </AuthTemplate>
  );
}
