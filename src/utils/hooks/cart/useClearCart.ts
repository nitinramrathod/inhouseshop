import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '@/utils/services/cart.service'
import { CART_QUERY_KEY } from './cart.keys'

export const useClearCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY })
    },
  })
}
