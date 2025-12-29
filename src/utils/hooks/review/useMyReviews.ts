import { useQuery } from '@tanstack/react-query'
import { reviewService, ReviewQueryParams } from '@/utils/services/review.service'

export const useMyReviews = (params?: ReviewQueryParams) => {
  return useQuery({
    queryKey: ['my-reviews', params],
    queryFn: () => reviewService.getMyReviews(params),
    staleTime: 1000 * 60 * 5,
  })
}
