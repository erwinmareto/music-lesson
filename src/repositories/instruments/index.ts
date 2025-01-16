import directus from "@/lib/directus";
import { aggregate } from "@directus/sdk";

export const getInstrumentCount = async () => {
  const response = await directus.request(
    aggregate("instruments", {
      aggregate: {
        count: "*",
      },
    }),
  );

  return response[0].count;
};
