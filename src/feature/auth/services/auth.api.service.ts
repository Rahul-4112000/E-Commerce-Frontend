import { API_PATHS } from "@/config/api.path";
import { postApi } from "@/shared/utils/api-connector";
import { logoutResponse } from "../types/auth.type";

export const authService = {
    logout: (): Promise<logoutResponse> => postApi(API_PATHS.auth.logout),
    register: (data: any): Promise<any> => postApi(API_PATHS.auth.register, data)
}