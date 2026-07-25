import { BASE_URL } from "@/config/api.path"
import { cookies } from "next/headers"

export const serverApiConnector = async (apiEndPoint) => {
  const cookie = (await cookies()).toString();
  const response = await fetch(`${BASE_URL}/${apiEndPoint}`, {
    headers: {
      Cookie: cookie
    },
    cache: 'no-cache'
  })


  if (!response.ok) {
    throw new Error(response.error);
  }
  const data = await response.json();

  return data;
}