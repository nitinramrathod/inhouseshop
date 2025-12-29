import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/utils/services/user.service'

export const useUserMutations = () => {
  const queryClient = useQueryClient()

  /* Register */
  const register = useMutation({
    mutationFn: userService.register,
  })

  /* Update profile */
  const updateProfile = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
  })

  /* Change password */
  const changePassword = useMutation({
    mutationFn: userService.changePassword,
  })

  /* Admin: update user */
  const updateUser = useMutation({
    mutationFn: ({ userId, payload }: any) =>
      userService.updateById(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  /* Admin: delete user */
  const deleteUser = useMutation({
    mutationFn: userService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    register,
    updateProfile,
    changePassword,
    updateUser,
    deleteUser,
  }
}
