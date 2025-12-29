import { protectedAxios, publicAxios } from '@/libs/axios'

export type CategoryPayload = {
  name: string
  slug: string
  isActive?: boolean
}

export type CategoryQueryParams = {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
}

export const categoryService = {
  /**
   * Get all categories (public)
   */
  async getAll(params?: CategoryQueryParams) {
    const res = await publicAxios.get('/api/v1/categories', { params })
    return res.data
  },

  /**
   * Get category by ID
   */
  async getById(categoryId: string) {
    const res = await publicAxios.get(`/api/v1/categories/${categoryId}`)
    return res.data
  },

  /**
   * Create category (admin)
   */
  async create(payload: CategoryPayload) {
    const res = await protectedAxios.post('/api/v1/categories', payload)
    return res.data
  },

  /**
   * Update category (admin)
   */
  async update(categoryId: string, payload: Partial<CategoryPayload>) {
    const res = await protectedAxios.put(
      `/api/v1/categories/${categoryId}`,
      payload
    )
    return res.data
  },

  /**
   * Delete category (admin)
   */
  async remove(categoryId: string) {
    const res = await protectedAxios.delete(
      `/api/v1/categories/${categoryId}`
    )
    return res.data
  },
}
