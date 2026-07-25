import { API_PATHS } from '@/config/api.path';
import { getApi, postApi } from '@/shared/utils/api-connector';

export const AdminService = {
  getAll: (query) =>
    getApi(`${API_PATHS.superAdmin.admin}${query}`),
  toggleStatus: (id, isActive) => postApi(API_PATHS.superAdmin.status, { id, isActive })
};