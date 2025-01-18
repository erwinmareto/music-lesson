import { aggregate } from '@directus/sdk';

import directus from '@/lib/directus';

export const getUserCountByRole = async () => {
  const response = await directus.request(
    aggregate('directus_users', {
      aggregate: {
        count: '*'
      },
      groupBy: ['role']
    })
  );
  return response;
};
