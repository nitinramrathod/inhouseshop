import { protectedAxios, publicAxios } from '@/libs/axios'

/* ------------------------------------
 Types
------------------------------------ */

export type UserAddress = {
  fullName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  country?: string
  pincode: string
  type?: 'HOME' | 'WORK'
  isDefault?: boolean
}

export type UpdateUserPayload = {
  firstName?: string
  lastName?: string
  email?: string
}

export type CreateUserPayload = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirm_password?: string
}

export type ChangePasswordPayload = {
  currentPassword: string
  newPassword: string
}

/* ------------------------------------
 User Service
------------------------------------ */

export const userService = {
  /**
   * Register user (public)
   */
  async register(payload: CreateUserPayload) {
    const res = await publicAxios.post('/api/v1/users/register', payload)
    return res.data
  },

  /**
   * Get logged-in user profile
   */
  async getProfile() {
    const res = await protectedAxios.get('/api/v1/users/me')
    return res.data
  },

  /**
   * Update logged-in user profile
   */
  async updateProfile(payload: UpdateUserPayload) {
    const res = await protectedAxios.put('/api/v1/users/me', payload)
    return res.data
  },

  /**
   * Change password
   */
  async changePassword(payload: ChangePasswordPayload) {
    const res = await protectedAxios.put('/api/v1/users/change-password', payload)
    return res.data
  },

  /**
   * Get all users (admin)
   */
  async getAll(params?: { page?: number; limit?: number; search?: string }) {
    const res = await protectedAxios.get('/api/v1/users', { params })
    return res
  },

  /**
   * Get user by ID (admin)
   */
  async getById(userId: string) {
    const res = await protectedAxios.get(`/api/v1/users/${userId}`)
    return res.data
  },

  /**
   * Update user by ID (admin)
   */
  async updateById(userId: string, payload: UpdateUserPayload) {
    const res = await protectedAxios.put(`/api/v1/users/${userId}`, payload)
    return res.data
  },

  /**
   * Delete user (admin)
   */
  async remove(userId: string) {
    const res = await protectedAxios.delete(`/api/v1/users/${userId}`)
    return res.data
  },

  /**
   * Add address
   */
  async addAddress(payload: UserAddress) {
    const res = await protectedAxios.post('/api/v1/users/addresses', payload)
    return res.data
  },

  /**
   * Update address
   */
  async updateAddress(addressId: string, payload: Partial<UserAddress>) {
    const res = await protectedAxios.put(
      `/api/v1/users/addresses/${addressId}`,
      payload
    )
    return res.data
  },

  /**
   * Delete address
   */
  async removeAddress(addressId: string) {
    const res = await protectedAxios.delete(
      `/api/v1/users/addresses/${addressId}`
    )
    return res.data
  },
}
