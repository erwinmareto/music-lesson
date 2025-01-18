import { aggregate, readItems } from '@directus/sdk';

import directus from '@/lib/directus';

export const getPackageCount = async (filter?: Record<string, unknown>) => {
  const response = await directus.request(
    aggregate('packages', {
      aggregate: {
        count: '*'
      },
      query: {
        filter: filter
      }
    })
  );

  return response[0].count;
};

export const getPackages = async (page: number, filter: Record<string, unknown>, isFilterEmpty: boolean) => {
  const response = await directus.request(
    readItems('packages', {
      fields: [
        'id',
        'name',
        'student.first_name',
        'instrument.name',
        'start_datetime',
        'end_datetime',
        'count(lessons)',
        'duration'
      ],
      limit: 10,
      page: page,
      filter: filter,
      sort: [isFilterEmpty ? '' : '-start_datetime']
    })
  );

  return response;
};
