import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService, LoginPayload } from '@/utils/services/auth.service'
import { formatApiError } from '@/utils/formater/formatApiError'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const queryClient = useQueryClient()

  const router = useRouter();

  return useMutation({

    mutationFn: async (payload:LoginPayload) => {
      try {
        return await authService.login(payload);
      } catch (err) {
        throw formatApiError(err);
      }
    },

    onSuccess: (data:any) => {
      queryClient.setQueryData(['auth-user'], data.data)
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push('/admin');
    },

    onError: (error: any) => {
      console.error('Login failed:', error?.response?.data || error)
    },
  })
}
