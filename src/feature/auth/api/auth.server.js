import { API_PATHS } from "@/config/api.path";
import { serverApiConnector } from "@/shared/utils/serverApiConnector";
import { cache } from "react";

export const getProfileServerApi = cache(async () => {
  return serverApiConnector(API_PATHS.auth.me)
});



