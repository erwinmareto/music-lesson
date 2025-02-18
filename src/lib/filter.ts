export interface Filters {
  field: string | string[];
  query: string | null;
  dataType: 'search' | 'number' | 'date';
}

export const getFilters = (filters: Filters[]) => {
  const processedFilters = filters.reduce((acc: Record<string, unknown>, { field, query, dataType }) => {
    if (!query) return acc; // Skip if query is empty

    let condition;
    switch (dataType) {
      case 'search':
        condition = { _icontains: query };
        break;
      case 'number':
      case 'date':
        condition = { _gte: query };
        break;
      default:
        condition = { _icontains: query };
    }

    if (Array.isArray(field)) {
      field.reduce((nestedAcc: Record<string, unknown>, key, index): Record<string, unknown> => {
        if (index === field.length - 1) {
          nestedAcc[key] = condition;
        } else {
          nestedAcc[key] = nestedAcc[key] || {};
        }
        return nestedAcc[key] as Record<string, unknown>;
      }, acc);
    } else {
      acc[field] = condition;
    }
    return acc;
  }, {});

  return processedFilters;
};

export const getFiltersQueryKeys = (filters: Filters[]) => {
  const queryKeys = filters.filter((filter) => filter.query?.length).map((filter) => filter.query);
  return queryKeys;
};

export const checkIsFiltersEmpty = (filters: Filters[]) => {
  return filters.every((filter) => !filter.query?.length);
};
