export const API_PATHS = {
  login: "user/login",
  register: "user/register",
  verify: "user/auth/verify",
  invite: "super-admin/invite",
  validateInvite: "super-admin/validate-invite",
  admin: {
    register: "admin/register",
  },
} as const;

export const BASE_URL = "http://localhost:8080/api/v1";
