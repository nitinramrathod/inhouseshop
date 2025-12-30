import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService, LoginPayload } from '@/utils/services/auth.service'

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      authService.login(payload),

    onSuccess: (data:any) => {
      queryClient.setQueryData(['auth-user'], data.data)
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },

    onError: (error: any) => {
      console.error('Login failed:', error?.response?.data || error)
    },
  })
}
