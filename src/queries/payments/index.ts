import { useQuery } from '@tanstack/react-query';

import {
  PAYMENT_COUNT_QUERY_KEY,
  PAYMENT_QUERY_KEY,
  REVENUE_BY_MONTH_QUERY_KEY,
  REVENUE_SUM_QUERY_KEY
} from '@/lib/constants/queryKeys';
import { checkIsFiltersEmpty, Filters, getFilters, getFiltersQueryKeys } from '@/lib/filter';
import { getPaymentCount, getPayments, getRevenueByMonth, getRevenueSum } from '@/repositories/payments';

export const usePaymentCount = (filters?: Filters[]) => {
  const paymentCountFilters = filters ? getFilters(filters) : {};

  const filtersQueryKeys = filters ? getFiltersQueryKeys(filters) : [];

  const result = useQuery({
    queryKey: [PAYMENT_COUNT_QUERY_KEY, ...filtersQueryKeys],
    queryFn: () => getPaymentCount(paymentCountFilters)
  });

  return result;
};

export const useRevenueSum = () => {
  const result = useQuery({
    queryKey: [REVENUE_SUM_QUERY_KEY],
    queryFn: getRevenueSum
  });

  return result;
};

export const useRevenueByMonth = () => {
  const result = useQuery({
    queryKey: [REVENUE_BY_MONTH_QUERY_KEY],
    queryFn: getRevenueByMonth
  });

  return result;
};

export const usePayments = (page: number, filters: Filters[]) => {
  const paymentFilters = getFilters(filters);

  const filtersQueryKeys = getFiltersQueryKeys(filters);

  const isFiltersEmpty = checkIsFiltersEmpty(filters);

  const result = useQuery({
    queryKey: [PAYMENT_QUERY_KEY, page, ...filtersQueryKeys],
    queryFn: () => getPayments(page, paymentFilters, isFiltersEmpty)
  });

  return result;
};
