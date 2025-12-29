import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/utils/services/order.service'

export const useOrder = (orderId?: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getById(orderId as string),
    enabled: !!orderId,
  })
}
