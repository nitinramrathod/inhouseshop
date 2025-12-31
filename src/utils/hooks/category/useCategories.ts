import { useQuery } from '@tanstack/react-query'
import { categoryService, CategoryQueryParams } from '@/utils/services/category.service'

export const useCategories = (params?: CategoryQueryParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoryService.getAll(params),
    // keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  })
}
