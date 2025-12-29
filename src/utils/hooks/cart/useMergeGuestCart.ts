import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '@/utils/services/cart.service'
import { CART_QUERY_KEY } from './cart.keys'

export const useMergeGuestCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartService.mergeGuestCart,
    onSuccess: () => {
      // Remove guestId from storage
      localStorage.removeItem('guestId')

      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY })
    },
  })
}
