import { useQuery } from "@tanstack/react-query";

import {
  getLessonByStatusCount,
  getLessonCount,
  getLessons,
} from "@/repositories/lessons";
import {
  LESSON_COUNT_GROUP_QUERY_KEY,
  LESSON_COUNT_QUERY_KEY,
  LESSON_QUERY_KEY,
} from "@/lib/constants/queryKeys";
import { Filters, getFilters, getFiltersQueryKeys } from "@/lib/filter";

export const useLessons = (page: number, filters: Filters[]) => {
  const lessonFilters = getFilters(filters);

  const filtersQueryKeys = getFiltersQueryKeys(filters);

  const result = useQuery({
    queryKey: [LESSON_QUERY_KEY, page, ...filtersQueryKeys],
    queryFn: () => getLessons(page, lessonFilters),
  });

  return result;
};

export const useLessonCount = (filters?: Filters[]) => {
  const lessonCountFilters = filters ? getFilters(filters) : {};

  const filtersQueryKeys = filters ? getFiltersQueryKeys(filters) : [];

  const result = useQuery({
    queryKey: [LESSON_COUNT_QUERY_KEY, ...filtersQueryKeys],
    queryFn: () => getLessonCount(lessonCountFilters),
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
