import { useQuery } from "@tanstack/react-query";

import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

export const useLessons = (page: number) => {
  const result = useQuery({
    queryKey: ["lessons", page],
    queryFn: async () => {
      const response = await directus.request(
        readItems("lessons", {
          fields: ["*"],
          limit: 10,
          page: page,
        }),
      );

      return response;
    },
  });

  return result;
};
