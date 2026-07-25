import { getProfileServerApi, requiredRoles } from "@/feature/auth/api/auth.server";
import { EROLE } from "@/feature/auth/types/auth.type";
import { PAGE_ROUTES } from "@/shared/utils/constats";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}) {
  let data;
  try {
    data = await getProfileServerApi();
  } catch (error) {
    if (error.status === 401) {
      redirect(PAGE_ROUTES.AUTH.LOGIN);
    }
    throw error;
  }

  requiredRoles(data?.data?.user, [EROLE.SUPER_ADMIN, EROLE.ADMIN]);

  return <>{children}</>;
}