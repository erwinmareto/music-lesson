import { useQuery } from "@tanstack/react-query";

import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { getLessonByStatusCount, getLessonCount } from "@/repositories/lessons";
import {
  LESSON_COUNT_GROUP_QUERY_KEY,
  LESSON_COUNT_QUERY_KEY,
  LESSON_QUERY_KEY,
} from "@/lib/constants/queryKeys";

export const useLessons = (page: number) => {
  const result = useQuery({
    queryKey: [LESSON_QUERY_KEY, page],
    queryFn: async () => {
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
        }),
      );

      return response;
    },
  });

  return result;
};

export const useLessonCount = () => {
  const result = useQuery({
    queryKey: [LESSON_COUNT_QUERY_KEY],
    queryFn: getLessonCount,
  });

  return result;
};

export const useLessonByStatusCount = () => {
  const result = useQuery({
    queryKey: [LESSON_COUNT_GROUP_QUERY_KEY],
    queryFn: getLessonByStatusCount,
  });

  return result;
};
