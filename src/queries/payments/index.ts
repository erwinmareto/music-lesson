import { useQuery } from "@tanstack/react-query";
import { getRevenueSum } from "@/repositories/payments";

export const useRevenueSum = () => {
  const result = useQuery({
    queryKey: ["revenueSum"],
    queryFn: getRevenueSum,
  });

  return result;
};
