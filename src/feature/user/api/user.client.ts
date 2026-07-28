import { API_PATHS } from '@/config/api.path';
import { getApi, patchApi } from '@/shared/utils/api-connector';
import { UpdateProfilePayload, ChangePasswordPayload, UserProfileResponse } from '@/feature/auth/types/auth.type';

export const getMe = (): Promise<UserProfileResponse> => getApi(API_PATHS.users.me);

export const updateProfile = (payload: UpdateProfilePayload): Promise<UserProfileResponse> =>
  patchApi(API_PATHS.users.me, payload);

export const changePassword = (payload: ChangePasswordPayload): Promise<{ success: boolean; message: string }> =>
  patchApi(API_PATHS.users.changePassword, payload);
