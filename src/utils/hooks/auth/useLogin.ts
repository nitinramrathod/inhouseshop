import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService, LoginPayload } from '@/utils/services/auth.service'

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      authService.login(payload),

    onSuccess: (data) => {
      // Store user in cache
      queryClient.setQueryData(['auth-user'], data.data)
    },

    onError: (error: any) => {
      console.error('Login failed:', error?.response?.data || error)
    },
  })
}
