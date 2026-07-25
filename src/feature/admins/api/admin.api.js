import { API_PATHS } from "@/config/api.path";
import { getApi, postApi } from "@/shared/utils/api-connector";

export const getAdminList = (query) => getApi(`${API_PATHS.admins.list}${query}`);
export const toggleStatus = (id, isActive) => postApi(API_PATHS.admins.update(id), { isActive });

