import { useQuery } from '@tanstack/react-query'
import { bannerService } from '@/utils/services/banner.service'
import type { BannerQueryParams } from '@/utils/services/banner.service'

/**
 * Get all banners
 */
export const useBanners = (params?: BannerQueryParams) => {
  return useQuery({
    queryKey: ['banners', params],
    queryFn: () => bannerService.getAll(params),
  })
}

/**
 * Get banner by ID
 */
export const useBannerById = (bannerId?: string) => {
  return useQuery({
    queryKey: ['banner', bannerId],
    queryFn: () => bannerService.getById(bannerId as string),
    enabled: !!bannerId, // prevents call when id is undefined
  })
}
