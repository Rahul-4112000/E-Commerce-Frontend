import { cookies } from "next/headers";

export const validateToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { isTokenValid: false, user: null };

  const payloadBase64 = accessToken.split('.')[1];
  const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
  try {
    const payload = JSON.parse(payloadJson);
    const currentTime = Math.floor(new Date() / 1000);

    if (payload && payload.exp < currentTime) {
      return { isTokenValid: false, user: payload }
    }

    return { isTokenValid: true, user: payload }
  }
  catch (error) {
    console.error('Failed to decode token', error);
    return { isTokenValid: false, user: null }
  }
}