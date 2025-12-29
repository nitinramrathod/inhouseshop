import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  reviewService,
  CreateReviewPayload,
  UpdateReviewPayload,
} from '@/utils/services/review.service'

export const useReviewMutation = () => {
  const queryClient = useQueryClient()

  /* Create */
  const createReview = useMutation({
    mutationFn: (payload: CreateReviewPayload) =>
      reviewService.create(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.product_id],
      })
      queryClient.invalidateQueries({
        queryKey: ['my-reviews'],
      })
    },
  })

  /* Update */
  const updateReview = useMutation({
    mutationFn: ({
      reviewId,
      payload,
    }: {
      reviewId: string
      payload: UpdateReviewPayload
    }) => reviewService.update(reviewId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      queryClient.invalidateQueries({ queryKey: ['my-reviews'] })
    },
  })

  /* Delete */
  const deleteReview = useMutation({
    mutationFn: (reviewId: string) =>
      reviewService.remove(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      queryClient.invalidateQueries({ queryKey: ['my-reviews'] })
    },
  })

  return {
    createReview,
    updateReview,
    deleteReview,
  }
}
