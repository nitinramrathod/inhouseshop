import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/utils/services/auth.service'

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),

    onSuccess: () => {
      /**
       * Clear all cached data on logout
       * This prevents data leakage between users
       */
      queryClient.clear()
    },

    onError: (error: any) => {
      console.error('Logout failed:', error?.response?.data || error)
    },
  })
}
