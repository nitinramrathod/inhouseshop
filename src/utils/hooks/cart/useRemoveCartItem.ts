import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '@/utils/services/cart.service'
import { CART_QUERY_KEY } from './cart.keys'

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartService.removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY })
    },
  })
}
