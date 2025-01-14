import { useQuery } from "@tanstack/react-query";
import { getRevenueSum } from "@/repositories/payments";
import { REVENUE_SUM_QUERY_KEY } from "@/lib/constants/queryKeys";

export const useRevenueSum = () => {
  const result = useQuery({
    queryKey: [REVENUE_SUM_QUERY_KEY],
    queryFn: getRevenueSum,
  });

  return result;
};
