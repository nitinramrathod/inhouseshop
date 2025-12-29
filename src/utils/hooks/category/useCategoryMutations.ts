import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '@/utils/services/category.service'

export const useCategoryMutations = () => {
  const queryClient = useQueryClient()

  const createCategory = useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const updateCategory = useMutation({
    mutationFn: ({ categoryId, payload }: any) =>
      categoryService.update(categoryId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })

  const deleteCategory = useMutation({
    mutationFn: categoryService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  return {
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
