import { aggregate } from "@directus/sdk";
import directus from "@/lib/directus";

export const getRevenueSum = async () => {
  const response = await directus.request(
    aggregate("payments", {
      aggregate: {
        sum: "rate",
      },
    }),
  );

  return response;
};
