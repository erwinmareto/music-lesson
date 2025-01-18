import { useQuery } from '@tanstack/react-query';

import { USER_COUNT_QUERY_KEY } from '@/lib/constants/queryKeys';
import { getUserCountByRole } from '@/repositories/user';

export const useUserCountByRoles = () => {
  const result = useQuery({
    queryKey: [USER_COUNT_QUERY_KEY],
    queryFn: getUserCountByRole
  });

  return result;
};
