import { BASE_URL } from '@/config/api.path';

export const apiConnectors = async (request: RequestInfo | URL) => {
  try {
    const response = await fetch(request);

    console.log(response, 'response -----');

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || response.statusText || 'something went wrong');
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getApi = async (apiEndPoint: string) => {
  const request = new Request(`${BASE_URL}/${apiEndPoint}`, {
    credentials: 'include',
  });
  return await apiConnectors(request);
};

export const postApi = async (apiEndPoint: string, body?: any) => {
  const isFormData = body instanceof FormData;
  const headers: HeadersInit = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const request = new Request(`${BASE_URL}/${apiEndPoint}`, {
    method: 'POST',
    headers,
    body: isFormData ? body : JSON.stringify(body),
    credentials: 'include',
  });

  return await apiConnectors(request);
};

export const deleteApi = async (apiEndPoint: string) => {
  const request = new Request(`${BASE_URL}/${apiEndPoint}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return await apiConnectors(request);
};

export const patchApi = async (apiEndPoint: string, body: any) => {
  const isFormData = body instanceof FormData;
  const headers: HeadersInit = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const request = new Request(`${BASE_URL}/${apiEndPoint}`, {
    method: 'PATCH',
    headers,
    body: isFormData ? body : JSON.stringify(body),
    credentials: 'include',
  });

  console.log(request, 'request');

  return await apiConnectors(request);
};
