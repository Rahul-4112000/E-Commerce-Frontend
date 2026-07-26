import { BASE_URL } from "@/config/api.path"
import { cookies } from "next/headers"

export const serverApiConnector = async (apiEndPoint) => {
  const cookie = (await cookies()).toString();
  const response = await fetch(`${BASE_URL}/${apiEndPoint}`, {
    headers: {
      Cookie: cookie
    },
    cache: 'no-cache'
  });

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Ignore JSON parse errors if response is plain text/HTML
    }
    const error = new Error(errorMessage);
    error.status = response.status;
    console.error(error)
    throw error;
  }
  const data = await response.json();

  return data;
}