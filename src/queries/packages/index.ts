import { useQuery } from "@tanstack/react-query";
import { getPackageCount } from "@/repositories/packages";

export const usePackageCount = () => {
  const result = useQuery({
    queryKey: ["packageCount"],
    queryFn: getPackageCount,
  });

  return result;
};
