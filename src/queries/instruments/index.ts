import { useQuery } from "@tanstack/react-query";
import { getInstrumentCount } from "@/repositories/instruments";

export const useInstrumentCount = () => {
  const result = useQuery({
    queryKey: ["instrumentCount"],
    queryFn: getInstrumentCount,
  });

  return result;
};
