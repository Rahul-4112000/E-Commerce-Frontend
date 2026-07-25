import { API_PATHS } from "@/config/api.path";
import { getApi } from "@/shared/utils/api-connector";
import { serverApiConnector } from "@/shared/utils/serverApiConnector";

export const getProfileServerApi = async () => {
  return serverApiConnector(API_PATHS.auth.profile)
};

