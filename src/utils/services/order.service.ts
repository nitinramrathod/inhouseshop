import { protectedAxios, publicAxios } from '@/libs/axios'

/* ------------------------------------
 Types
------------------------------------ */

export type OrderItemPayload = {
  productId: string
  quantity: number
}

export type CreateOrderPayload = {
  items: OrderItemPayload[]
  addressId?: string            // logged-in user
  guestAddress?: {
    fullName: string
    phone: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    country?: string
    pincode: string
  }
  paymentMethod: 'COD' | 'ONLINE'
  guestId?: string              // guest checkout
}

export type OrderQueryParams = {
  page?: number
  limit?: number
  status?: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
}

/* ------------------------------------
 Order Service
------------------------------------ */

export const orderService = {
  /**
   * Create order
   * - Works for guest & logged-in users
   */
  async create(payload: CreateOrderPayload) {
    const axiosInstance = payload.guestId ? publicAxios : protectedAxios
    const res = await axiosInstance.post('/api/v1/orders', payload)
    return res.data
  },

  /**
   * Get logged-in user's orders
   */
  async getMyOrders(params?: OrderQueryParams) {
    const res = await protectedAxios.get('/api/v1/orders/my', { params })
    return res.data
  },

  /**
   * Get order by ID (user / admin)
   */
  async getById(orderId: string) {
    const res = await protectedAxios.get(`/api/v1/orders/${orderId}`)
    return res.data
  },

  /**
   * Admin: get all orders
   */
  async getAll(params?: OrderQueryParams) {
    const res = await protectedAxios.get('/api/v1/orders', { params })
    return res.data
  },

  /**
   * Admin: update order status
   */
  async updateStatus(orderId: string, status: OrderQueryParams['status']) {
    const res = await protectedAxios.put(
      `/api/v1/orders/${orderId}/status`,
      { status }
    )
    return res.data
  },

  /**
   * Cancel order (user)
   */
  async cancel(orderId: string) {
    const res = await protectedAxios.put(
      `/api/v1/orders/${orderId}/cancel`
    )
    return res.data
  },
  
  async remove(orderId: string) {
    const res = await protectedAxios.delete(
      `/api/v1/orders/${orderId}`
    )
    return res.data
  },
}
