import { useQuery } from '@tanstack/react-query'
import { cartService } from '@/utils/services/cart.service'
import { CART_QUERY_KEY } from './cart.keys'

export const useCartQuery = () => {
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: cartService.getCart,
    staleTime: 1000 * 30, // 30 sec
  })
}
