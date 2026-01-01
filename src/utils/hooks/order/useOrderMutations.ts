import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/utils/services/order.service'

export const useOrderMutations = () => {
  const queryClient = useQueryClient()

  /* Create order (guest + user) */
  const createOrder = useMutation({
    mutationFn: orderService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  /* Cancel order */
  const cancelOrder = useMutation({
    mutationFn: orderService.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
  
  /* Cancel order */
  const deleteOrder = useMutation({
    mutationFn: orderService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  /* Admin: update status */
  const updateOrderStatus = useMutation({
    mutationFn: ({ orderId, status }: any) =>
      orderService.updateStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['order'] })
    },
  })

  return {
    createOrder,
    cancelOrder,
    deleteOrder,
    updateOrderStatus,
  }
}
