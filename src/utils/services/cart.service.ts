import { protectedAxios, publicAxios } from '@/libs/axios'

export type AddToCartPayload = {
  productId: string
  quantity: number
}

export type UpdateCartPayload = {
  cartItemId: string
  quantity: number
}

export const cartService = {
  /**
   * Get cart (guest or user)
   */
  getCart: async () => {
    const res = await protectedAxios.get('/api/v1/carts')
    return res.data
  },

  /**
   * Add item to cart
   */
  addToCart: async (payload: AddToCartPayload) => {
    const res = await protectedAxios.post('/api/v1/carts', payload)
    return res.data
  },

   /**
   * Add item to cart
   */
  mergeCart: async (payload: {items: AddToCartPayload[]}) => {
    const res = await protectedAxios.post('/api/v1/carts/merge', payload)
    return res.data
  },

  /**
   * Update cart item quantity
   */
  updateCartItem: async (payload: UpdateCartPayload) => {
    const res = await publicAxios.put(
      `/api/v1/cart/items/${payload.cartItemId}`,
      { quantity: payload.quantity }
    )
    return res.data
  },

  /**
   * Remove item from cart
   */
  removeCartItem: async (cartItemId: string) => {
    const res = await protectedAxios.delete(
      `/api/v1/carts/remove/${cartItemId}`
    )
    return res.data
  },

  /**
   * Clear cart
   */
  clearCart: async () => {
    const res = await publicAxios.delete('/api/v1/cart')
    return res.data
  },

  /**
   * Merge guest cart into user cart (called after login)
   */
  mergeGuestCart: async () => {
    const res = await protectedAxios.post('/api/v1/cart/merge')
    return res.data
  },
}
