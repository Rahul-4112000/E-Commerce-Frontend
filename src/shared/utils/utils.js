

export const buildQuery = (queryParams) => {
  if (!queryParams || typeof queryParams !== 'object') return '';

  const cleanParams = Object.entries(queryParams).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});

  const queryString = new URLSearchParams(cleanParams).toString();
  return queryString ? `?${queryString}` : '';
};