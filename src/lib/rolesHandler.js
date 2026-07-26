import { PAGE_ROUTES } from "@/shared/utils/constants"
import { redirect } from "next/dist/server/api-utils"

export const requiredRoles = (user, allowedRoles) => {
  if (!allowedRoles.includes(user.role)) {
    redirect(PAGE_ROUTES.AUTH.UNAUTHORIZED)
  }
}