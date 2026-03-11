import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { api } from '@/shared/api/api-client'
import { productKeys } from '@/entities/product/api/keys'
import { toast } from 'vue3-hot-toast'
import { handleError } from '@/shared/utils/handleError'
import type { 
  ProductCreate, 
  ProductUpdate, 
  OfferCreate,
  Body_upload_product_image_api_v1_admin_products__product_id__image_post 
} from '@/shared/api/generated'
import { adminProductsKeys } from './queries'
export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ProductCreate) =>
      api.adminProducts.createProductApiV1AdminProductsPost(data),
    onSuccess: () => {
      toast.success('Товар успешно создан')
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    },
    onError: (e) => handleError(e, 'Не удалось создать товар'),
  })
}

export const useCreateOfferMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: OfferCreate) =>
      api.adminOffers.createOfferApiV1AdminOffersPost(data),
    onSuccess: (_, data) => {
      toast.success('Предложение добавлено')
      queryClient.invalidateQueries({ queryKey: adminProductsKeys.detail(data.product_id) })
    },
    onError: (e) => handleError(e, 'Не удалось добавить предложение'),
  })
}

export const useDeleteOfferMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ productId, offerId }: { productId: string; offerId: string }) =>
      api.adminOffers.deleteOfferApiV1AdminOffersOfferIdDelete(offerId),
    onSuccess: (_, { productId }) => {
      toast.success('Предложение удалено')
      queryClient.invalidateQueries({ queryKey: adminProductsKeys.detail(productId) })
    },
    onError: (e) => handleError(e, 'Не удалось удалить предложение'),
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductUpdate }) =>
      api.adminProducts.updateProductApiV1AdminProductsProductIdPut(id, data),
    onSuccess: (_, { id }) => {
      toast.success('Товар успешно обновлен')
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: productKeys.audit(id) })
    },
    onError: (e) => handleError(e, 'Не удалось сохранить'),
  })
}

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      api.adminProducts.deleteProductApiV1AdminProductsProductIdDelete(id),
    onSuccess: () => {
      toast.success('Товар удален')
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    },
    onError: (e) => handleError(e, 'Не удалось удалить товар'),
  })
}

export const useUploadProductImageMutation = () => {
  return useMutation({
    mutationFn: ({ id, image }: { id: string; image: Body_upload_product_image_api_v1_admin_products__product_id__image_post }) =>
      api.adminProducts.uploadProductImageApiV1AdminProductsProductIdImagePost(id, image),
    onSuccess: () => {
      toast.success('Изображение загружено')
    },
    onError: (e) => handleError(e, 'Не удалось загрузить изображение'),
  })
}
