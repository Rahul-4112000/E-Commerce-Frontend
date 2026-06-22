import { API_PATHS } from "@/config/api.path";
import { getApi, postApi } from "@/shared/utils/api-connector";
import { AdminData } from "../components/AdminTable";


export const AdminService = {
    getAll: (): Promise<AdminData> => getApi(API_PATHS.superAdmin.admin),
    toggleStatus: (id: number, isActive: boolean) => postApi(API_PATHS.superAdmin.status, { id, isActive })
}