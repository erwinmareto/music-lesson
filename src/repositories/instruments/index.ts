import { aggregate, readItems } from '@directus/sdk';

import directus from '@/lib/directus';

export const getInstrumentCount = async (filter?: Record<string, unknown>) => {
  const response = await directus.request(
    aggregate('instruments', {
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

export const getInstruments = async (page: number, filter: Record<string, unknown>) => {
  const response = await directus.request(
    readItems('instruments', {
      fields: ['id', 'name', 'count(students)', 'count(teachers)'],
      limit: 10,
      page: page,
      filter: filter
    })
  );

  return response;
};
