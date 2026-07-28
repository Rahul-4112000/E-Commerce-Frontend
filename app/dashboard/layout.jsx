import { EROLE } from "@/feature/auth/types/auth.type";
import { requiredRoles } from "@/lib/rolesHandler";
import { validateToken } from "@/lib/tokenHandler";
import { PAGE_ROUTES } from "@/shared/utils/constants";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/shared/components/organisms/DashboardLayout";

export default async function AdminLayout({ children }) {
  const { isTokenValid, user } = await validateToken();

  if (!isTokenValid) {
    redirect(PAGE_ROUTES.AUTH.LOGIN);
  }

  requiredRoles(user, [EROLE.SUPER_ADMIN, EROLE.ADMIN]);

  return <DashboardLayout>{children}</DashboardLayout>;
}
