import { aggregate } from "@directus/sdk";
import directus from "@/lib/directus";

export const getPackageCount = async () => {
  const response = await directus.request(
    aggregate("packages", {
      aggregate: {
        count: "*",
      },
    }),
  );

  return response;
};
