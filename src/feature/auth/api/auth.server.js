import { API_PATHS } from "@/config/api.path";
import { getApi } from "@/shared/utils/api-connector";

export const getUserProfile = () => getApi(API_PATHS.auth.profile)
