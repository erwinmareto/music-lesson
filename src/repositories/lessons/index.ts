import { aggregate } from "@directus/sdk";
import directus from "@/lib/directus";

export const getLessonCount = async () => {
  const response = await directus.request(
    aggregate("lessons", {
      aggregate: {
        count: "*",
      },
    }),
  );

  return response[0].count;
};

export const getLessonByStatusCount = async () => {
  const response = await directus.request(
    aggregate("lessons", {
      aggregate: {
        count: "*",
      },
      groupBy: ["status"],
    }),
  );

  return response;
};
