import { useQuery } from "@tanstack/react-query";
import { getRevenueByMonth, getRevenueSum } from "@/repositories/payments";
import {
  REVENUE_BY_MONTH_QUERY_KEY,
  REVENUE_SUM_QUERY_KEY,
} from "@/lib/constants/queryKeys";

export const useRevenueSum = () => {
  const result = useQuery({
    queryKey: [REVENUE_SUM_QUERY_KEY],
    queryFn: getRevenueSum,
  });

  return result;
};

export const useRevenueByMonth = () => {
  const result = useQuery({
    queryKey: [REVENUE_BY_MONTH_QUERY_KEY],
    queryFn: getRevenueByMonth,
  });

  return result;
};
