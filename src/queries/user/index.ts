import { aggregate } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';

import { USER_COUNT_QUERY_KEY } from '@/lib/constants/queryKeys';
import directus from '@/lib/directus';

export const useUserCount = () => {
  const result = useQuery({
    queryKey: [USER_COUNT_QUERY_KEY],
    queryFn: async () => {
      const response = await directus.request(
        aggregate('directus_users', {
          aggregate: {
            count: '*'
          },
          groupBy: ['role']
        })
      );
      return response;
    }
  });

  return result;
};
