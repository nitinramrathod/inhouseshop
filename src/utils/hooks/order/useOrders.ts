import { useQuery } from '@tanstack/react-query'
import { orderService, OrderQueryParams } from '@/utils/services/order.service'

type UseOrdersOptions = {
  mine?: boolean // true = my orders, false = admin all
  params?: OrderQueryParams
}

export const useOrders = ({ mine = true, params }: UseOrdersOptions = {}) => {
  return useQuery({
    queryKey: ['orders', mine, params],
    queryFn: () =>
      mine
        ? orderService.getMyOrders(params)
        : orderService.getAll(params),
    // keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  })
}
