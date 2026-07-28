export const API_PATHS = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    me: 'auth/me',
  },
  users: {
    me: 'users/me',
    changePassword: 'users/change-password',
  },
  admins: {
    list: 'admins',
    invitations: 'admins/invitations',
    invitationsAccept: 'admins/invitations/accept',
    validateInvite: (token) => `admins/invitations/${token}`,
    update: (id) => `admins/${id}`,
  }
};

export const BASE_URL = 'http://localhost:8080/api';
