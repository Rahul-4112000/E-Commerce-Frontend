import { API_PATHS } from "@/config/api.path";
import { PAGE_ROUTES } from "@/shared/utils/constats";
import { serverApiConnector } from "@/shared/utils/serverApiConnector";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getProfileServerApi = cache(async () => {
  return serverApiConnector(API_PATHS.auth.me)
});

export const requiredRoles = (user, allowedRoles) => {
  if (!allowedRoles.includes(user.role)) {
    redirect(PAGE_ROUTES.AUTH.UNAUTHORIZED)
  }
}

