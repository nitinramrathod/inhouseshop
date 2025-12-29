import { useQuery } from '@tanstack/react-query'
import { userService } from '@/utils/services/user.service'

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: userService.getProfile,
    staleTime: 1000 * 60 * 5, // 5 min cache
  })
}
