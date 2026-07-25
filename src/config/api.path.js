export const API_PATHS = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    me: 'auth/me',
  },
  admins: {
    list: 'admins',
    invitation: 'admins/invitation',
    invitationAccept: 'admins/invitation/accept',
    validateInvite: (token) => `admins/invitation/${token}`,
    update: (id) => `admins/${id}`,
  }
};

export const BASE_URL = 'http://localhost:8080/api';
