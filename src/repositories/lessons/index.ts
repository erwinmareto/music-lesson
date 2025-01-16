import { aggregate, readItems } from "@directus/sdk";
import directus from "@/lib/directus";

export const getLessons = async (
  page: number,
  filter: Record<string, unknown>,
) => {
  const response = await directus.request(
    readItems("lessons", {
      fields: [
        "id",
        "status",
        "start_datetime",
        "package.name",
        "teacher.first_name",
        "teacher.last_name",
      ],
      limit: 10,
      page: page,
      filter: filter,
    }),
  );

  return response;
};

export const getLessonCount = async (filter?: Record<string, unknown>) => {
  const response = await directus.request(
    aggregate("lessons", {
      aggregate: {
        count: "*",
      },
      query: {
        filter: filter,
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
