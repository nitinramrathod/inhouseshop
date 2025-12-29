import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/utils/services/user.service'

export const useUserAddress = () => {
  const queryClient = useQueryClient()

  const addAddress = useMutation({
    mutationFn: userService.addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
  })

  const updateAddress = useMutation({
    mutationFn: ({ addressId, payload }: any) =>
      userService.updateAddress(addressId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
  })

  const removeAddress = useMutation({
    mutationFn: userService.removeAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
  })

  return {
    addAddress,
    updateAddress,
    removeAddress,
  }
}
