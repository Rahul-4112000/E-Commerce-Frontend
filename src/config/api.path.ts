export const API_PATHS = {
  login: "user/login",
  register: "user/register",
  verify: "user/auth/verify",
  invite: "super-admin/invite",
  admin: {
    register: "admin/register",
  },
  superAdmin: {
    admin: 'super-admin/admin',
    validateInvite: "super-admin/validate-invite",
    status: 'super-admin/admin/status'
  }
} as const;

export const BASE_URL = "http://localhost:8080/api/v1";
