import { useQuery } from '@tanstack/react-query'
import { userService } from '@/utils/services/user.service'
import { useSession } from 'next-auth/react'

type UseUsersParams = {
  page?: number
  limit?: number
  search?: string
}

export const useUsers = (params?: UseUsersParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getAll(params),
    // keepPreviousData: true,
  })
}

export const useUserInfo = () => {
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => userService.getById(userId!),
    enabled: status === 'authenticated' && !!userId,
  });
};
