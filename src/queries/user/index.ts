import { useQuery } from "@tanstack/react-query";

import directus from "@/lib/directus";
import { aggregate } from "@directus/sdk";

export const useUserCount = () => {
  const result = useQuery({
    queryKey: ["userCount"],
    queryFn: async () => {
      const response = await directus.request(
        aggregate("directus_users", {
          aggregate: {
            count: "*",
          },
          groupBy: ["role"],
        }),
      );
      return response;
    },
  });

  return result;
};
