export interface Filters {
  field: string | string[];
  query: string | null;
}

export const getFilters = (filters: Filters[]) => {
  const processedFilters = filters.reduce(
    (acc: Record<string, unknown>, { field, query }) => {
      if (!query) return acc; // Skip if query is empty

      if (Array.isArray(field)) {
        field.reduce(
          (
            nestedAcc: Record<string, unknown>,
            key,
            index,
          ): Record<string, unknown> => {
            if (index === field.length - 1) {
              nestedAcc[key] = { _istarts_with: query };
            } else {
              nestedAcc[key] = nestedAcc[key] || {};
            }
            return nestedAcc[key] as Record<string, unknown>;
          },
          acc,
        );
      } else {
        acc[field] = { _istarts_with: query };
      }
      return acc;
    },
    {},
  );

  return processedFilters;
};

export const getFiltersQueryKeys = (filters: Filters[]) => {
  const queryKeys = filters
    .filter((filter) => filter.query?.length)
    .map((filter) => filter.query);
  return queryKeys;
};
