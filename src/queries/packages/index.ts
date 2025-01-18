import { useQuery } from '@tanstack/react-query';

import { PACKAGE_COUNT_QUERY_KEY, PACKAGE_QUERY_KEY } from '@/lib/constants/queryKeys';
import { checkIsFiltersEmpty, Filters, getFilters, getFiltersQueryKeys } from '@/lib/filter';
import { getPackageCount, getPackages } from '@/repositories/packages';

export const usePackageCount = (filters?: Filters[]) => {
  const packageCountFilters = filters ? getFilters(filters) : {};

  const filtersQueryKeys = filters ? getFiltersQueryKeys(filters) : [];
  const result = useQuery({
    queryKey: [PACKAGE_COUNT_QUERY_KEY, ...filtersQueryKeys],
    queryFn: () => getPackageCount(packageCountFilters)
  });

  return result;
};

export const usePackages = (page: number, filters: Filters[]) => {
  const packageFilters = getFilters(filters);

  const filtersQueryKeys = getFiltersQueryKeys(filters);

  const isFiltersEmpty = checkIsFiltersEmpty(filters);

  const result = useQuery({
    queryKey: [PACKAGE_QUERY_KEY, page, ...filtersQueryKeys],
    queryFn: () => getPackages(page, packageFilters, isFiltersEmpty)
  });

  return result;
};
