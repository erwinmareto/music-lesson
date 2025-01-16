export const combineSearchParams = (
  searchParams: string | URLSearchParams,
  newParams: Record<string, string>,
): URLSearchParams => {
  const params = new URLSearchParams(searchParams);
  Object.keys(newParams).forEach((key) => {
    params.append(key, newParams[key]);
  });
  return params;
};

export const removeSearchParams = (
  searchParams: string | URLSearchParams,
  paramsToRemove: string[],
): URLSearchParams => {
  const params = new URLSearchParams(searchParams);
  paramsToRemove.forEach((key) => {
    params.delete(key);
  });
  return params;
};
