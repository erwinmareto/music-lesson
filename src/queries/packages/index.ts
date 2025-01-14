import { useQuery } from "@tanstack/react-query";
import { getPackageCount } from "@/repositories/packages";
import { PACKAGE_COUNT_QUERY_KEY } from "@/lib/constants/queryKeys";

export const usePackageCount = () => {
  const result = useQuery({
    queryKey: [PACKAGE_COUNT_QUERY_KEY],
    queryFn: getPackageCount,
  });

  return result;
};
