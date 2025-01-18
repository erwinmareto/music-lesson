import { useQuery } from '@tanstack/react-query';

import { INSTRUMENT_COUNT_QUERY_KEY, INSTRUMENT_QUERY_KEY } from '@/lib/constants/queryKeys';
import { Filters, getFilters, getFiltersQueryKeys } from '@/lib/filter';
import { getInstrumentCount, getInstruments } from '@/repositories/instruments';

export const useInstrumentCount = (filters?: Filters[]) => {
  const instrumentsCountFilters = filters ? getFilters(filters) : {};

  const filtersQueryKeys = filters ? getFiltersQueryKeys(filters) : [];

  const result = useQuery({
    queryKey: [INSTRUMENT_COUNT_QUERY_KEY, ...filtersQueryKeys],
    queryFn: () => getInstrumentCount(instrumentsCountFilters)
  });

  return result;
};

export const useInstruments = (page: number, filters: Filters[]) => {
  const instrumentsFilters = getFilters(filters);

  const filtersQueryKeys = getFiltersQueryKeys(filters);

  const result = useQuery({
    queryKey: [INSTRUMENT_QUERY_KEY, page, ...filtersQueryKeys],
    queryFn: () => getInstruments(page, instrumentsFilters)
  });

  return result;
};
