import { API_PATHS } from "@/config/api.path";
import { user, userProfileResponse } from "@/feature/auth/types/auth.type";
import { getApi } from "@/shared/utils/api-connector";

export const userService = {
    getUserProfile: (): Promise<userProfileResponse> => getApi(API_PATHS.user.profile)
}