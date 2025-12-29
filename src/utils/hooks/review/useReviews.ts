import { useQuery } from '@tanstack/react-query'
import { reviewService, ReviewQueryParams } from '@/utils/services/review.service'

export const useReviews = (
  productId: string,
  params?: ReviewQueryParams
) => {
  return useQuery({
    queryKey: ['reviews', productId, params],
    queryFn: () => reviewService.getByProduct(productId, params),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
