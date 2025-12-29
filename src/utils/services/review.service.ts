import { protectedAxios } from '@/libs/axios'

/* ============================
   Types
============================ */

export type Review = {
  review_id: string
  product_id: string
  user_id: string
  rating: number
  comment?: string
  created_at: string
  user?: {
    user_id: string
    first_name: string
    last_name: string
  }
}

export type ReviewQueryParams = {
  page?: number
  limit?: number
  rating?: number
  sortBy?: 'latest' | 'highest' | 'lowest'
}

export type CreateReviewPayload = {
  product_id: string
  rating: number
  comment?: string
}

export type UpdateReviewPayload = {
  rating?: number
  comment?: string
}

/* ============================
   Service
============================ */

class ReviewService {
  /* Get reviews for a product */
  async getByProduct(
    productId: string,
    params?: ReviewQueryParams
  ) {
    const res = await protectedAxios.get(
      `/api/v1/products/${productId}/reviews`,
      { params }
    )
    return res.data
  }

  /* Get my reviews */
  async getMyReviews(params?: ReviewQueryParams) {
    const res = await protectedAxios.get('/api/v1/reviews/me', {
      params,
    })
    return res.data
  }

  /* Create review */
  async create(payload: CreateReviewPayload) {
    const res = await protectedAxios.post(
      '/api/v1/reviews',
      payload
    )
    return res.data
  }

  /* Update review */
  async update(reviewId: string, payload: UpdateReviewPayload) {
    const res = await protectedAxios.put(
      `/api/v1/reviews/${reviewId}`,
      payload
    )
    return res.data
  }

  /* Delete review */
  async remove(reviewId: string) {
    const res = await protectedAxios.delete(
      `/api/v1/reviews/${reviewId}`
    )
    return res.data
  }
}

export const reviewService = new ReviewService()
