import { protectedAxios } from '@/libs/axios'

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

export type ProductSearchParams = {
  limit?: number
  page?: number
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export type CreateProductPayload = {
  name: string
  description?: string
  price: number
  discountPrice?: number
  category: string
  stock: number
  images?: string[]
}

export type UpdateProductPayload = Partial<CreateProductPayload>

export type ProductResponse = {
  success: boolean
  data: any // later: Product
}

export type ProductListResponse = {
  success: boolean
  data: any[]
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

/* ---------------------------------- */
/* Service */
/* ---------------------------------- */

export const productService = {
  /* ---------- GET ALL PRODUCTS ---------- */
  async getAll(
    params?: ProductSearchParams
  ): Promise<ProductListResponse> {
    const res = await protectedAxios.get('/api/v1/products', {
      params
    })
    return res.data
  },

  /* ---------- GET PRODUCT BY ID ---------- */
  async getById(productId: string): Promise<ProductResponse> {
    const res = await protectedAxios.get(
      `/api/v1/products/${productId}`
    )
    return res.data
  },

  /* ---------- CREATE PRODUCT ---------- */
  async create(
    payload: CreateProductPayload
  ): Promise<ProductResponse> {
    const res = await protectedAxios.post(
      '/api/v1/products',
      payload
    )
    return res.data
  },

  /* ---------- UPDATE PRODUCT ---------- */
  async update(
    productId: string,
    payload: UpdateProductPayload
  ): Promise<ProductResponse> {
    const res = await protectedAxios.put(
      `/api/v1/products/${productId}`,
      payload
    )
    return res.data
  },

  /* ---------- DELETE PRODUCT ---------- */
  async remove(productId: string): Promise<ProductResponse> {
    const res = await protectedAxios.delete(
      `/api/v1/products/${productId}`
    )
    return res.data
  }
}
