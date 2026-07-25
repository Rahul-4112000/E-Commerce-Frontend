export const API_PATHS = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    profile: 'auth/profile',
  },
  verify: 'user/auth/verify',
  invite: 'super-admin/invite',
  admin: {
    register: 'admin/register',
  },
  superAdmin: {
    admin: 'super-admin/admin',
    validateInvite: 'super-admin/validate-invite',
    status: 'super-admin/admin/status',
    search: 'super-admin/admin/search',
  },
} as const;

export const BASE_URL = 'http://localhost:8080/api/v1';
