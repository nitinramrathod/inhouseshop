import { useQuery } from '@tanstack/react-query'
import { userService } from '@/utils/services/user.service'

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
