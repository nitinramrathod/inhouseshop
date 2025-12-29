import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '@/utils/services/product.service'

export const useProductMutations = () => {
  const queryClient = useQueryClient()

  const createProduct = useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const updateProduct = useMutation({
    mutationFn: ({ productId, payload }: any) =>
      productService.update(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product'] })
    },
  })

  const deleteProduct = useMutation({
    mutationFn: productService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  return {
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
