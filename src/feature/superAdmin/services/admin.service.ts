import { API_PATHS } from "@/config/api.path";
import { AdminData } from "@/feature/auth/types/auth.type";
import { getApi, postApi } from "@/shared/utils/api-connector";


export const AdminService = {
    getAll: (): Promise<AdminData> => getApi(API_PATHS.superAdmin.admin),
    toggleStatus: (id: string, isActive: boolean) => postApi(API_PATHS.superAdmin.status, { id, isActive }),
    search: (query: string): Promise<AdminData> => getApi(`${API_PATHS.superAdmin.search}${query ? `?q=${encodeURIComponent(query)}` : ''} `),
}