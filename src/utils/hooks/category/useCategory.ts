import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/utils/services/category.service'

export const useCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoryService.getById(categoryId),
    enabled: !!categoryId,
  })
}
