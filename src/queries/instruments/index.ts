import { useQuery } from "@tanstack/react-query";
import { getInstrumentCount } from "@/repositories/instruments";
import { INSTRUMENT_COUNT_QUERY_KEY } from "@/lib/constants/queryKeys";

export const useInstrumentCount = () => {
  const result = useQuery({
    queryKey: [INSTRUMENT_COUNT_QUERY_KEY],
    queryFn: getInstrumentCount,
  });

  return result;
};
