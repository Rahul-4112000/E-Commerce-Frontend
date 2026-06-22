import { API_PATHS } from "@/config/api.path";
import { AuthTemplate } from "@/feature/auth/components/AuthTemplate";
import { InviteForm } from "@/feature/auth/components/InviteForm";
import { postApi } from "@/shared/utils/api-connector";
import { redirect } from "next/navigation";
import InvalidInvite from "@/feature/auth/components/InvalidInvite";

type props = {
  searchParams: Promise<{
    inviteToken?: string;
  }>;
};

export default async function InvitePage({ searchParams }: props) {
  const query = await searchParams;

  if (!query.inviteToken) {
    redirect("/login");
  }

  const inviteToken = query.inviteToken;

  let data;
  try {
    data = await postApi(API_PATHS.superAdmin.validateInvite, { inviteToken });
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
