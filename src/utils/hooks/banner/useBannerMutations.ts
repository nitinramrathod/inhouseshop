import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bannerService } from '@/utils/services/banner.service'
import type { BannerPayload } from '@/utils/services/banner.service'

type UpdateBannerArgs = {
  bannerId: string
  payload: FormData
}

export const useBannerMutations = () => {
  const queryClient = useQueryClient()

  const createBanner = useMutation({
    mutationFn: bannerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] })
    },
  })

  const updateBanner = useMutation({
    mutationFn: ({ bannerId, payload }: UpdateBannerArgs) =>
      bannerService.update(bannerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] })
      queryClient.invalidateQueries({ queryKey: ['banner'] })
    },
  })

  const deleteBanner = useMutation({
    mutationFn: bannerService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] })
    },
  })

  return {
    createBanner,
    updateBanner,
    deleteBanner,
  }
}
