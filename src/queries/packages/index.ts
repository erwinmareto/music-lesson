import { useQuery } from "@tanstack/react-query";
import { getPackageCount, getTopInstruments } from "@/repositories/packages";
import {
  PACKAGE_COUNT_QUERY_KEY,
  TOP_INSTRUMENTS_QUERY_KEY,
} from "@/lib/constants/queryKeys";

export const usePackageCount = () => {
  const result = useQuery({
    queryKey: [PACKAGE_COUNT_QUERY_KEY],
    queryFn: getPackageCount,
  });

  return result;
};

export const useTopInstruments = () => {
  const result = useQuery({
    queryKey: [TOP_INSTRUMENTS_QUERY_KEY],
    queryFn: getTopInstruments,
  });

  return result;
};
