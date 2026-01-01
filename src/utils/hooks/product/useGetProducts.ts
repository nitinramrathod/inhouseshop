import { useQuery } from '@tanstack/react-query'
import { productService, ProductSearchParams } from '@/utils/services/product.service'
import { Product } from '@/types/product'

export const useGetProducts = (params?: ProductSearchParams) => {
  return useQuery<Product[], Error>({
    queryKey: ['products', params],
    queryFn: async () => {
      const res = await productService.getAll(params)
      return res.data
    }
  })
}
