import { protectedAxios, publicAxios } from '@/libs/axios'

/**
 * Banner payload (create / update)
 */
export type BannerPayload = {
  title?: string
  image?: string
  subtitle?: string
  product?: string
  type?: string
  discountPercentage?: number
  priority?: number
  redirectUrl?: string
  startAt?: string
  endAt?: string
  position: string
  isActive?: boolean
  startDate?: string
  endDate?: string
}

/**
 * Banner list query params
 */
export type BannerQueryParams = {
  page?: number
  limit?: number
  search?: string
  position?: string
  isActive?: boolean
}

/**
 * Banner service
 */
export const bannerService = {
  /**
   * Get all banners (public)
   */
  async getAll(params?: BannerQueryParams) {
    const res = await publicAxios.get('/api/v1/banners', { params })
    return res.data
  },

  /**
   * Get banner by ID
   */
  async getById(bannerId: string) {
    const res = await publicAxios.get(`/api/v1/banners/${bannerId}`)
    return res.data
  },

  /**
   * Create banner (admin)
   */
  async create(payload: FormData) {
    const res = await protectedAxios.post('/api/v1/banners', payload)
    return res.data
  },

  /**
   * Update banner (admin)
   */
  async update(bannerId: string, payload: FormData) {
    const res = await protectedAxios.put(
      `/api/v1/banners/${bannerId}`,
      payload
    )
    return res.data
  },

  /**
   * Delete banner (admin)
   */
  async remove(bannerId: string) {
    const res = await protectedAxios.delete(
      `/api/v1/banners/${bannerId}`
    )
    return res.data
  },
}
