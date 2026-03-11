import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { api } from '@/shared/api/api-client'
import { productKeys } from './keys'

interface UploadParams {
  productId: string
  file: File
}

export const useUploadProductImageMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ productId, file }: UploadParams) => {
      return api.adminProducts.uploadProductImageApiV1AdminProductsProductIdImagePost(
        productId,
        { file } as unknown as { file: string },
      )
    },
    onSuccess: (_, { productId }) => {
      // Invalidate both product detail and audit logs since they change
      queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) })
      queryClient.invalidateQueries({ queryKey: productKeys.audit(productId) })
    },
  })
}
