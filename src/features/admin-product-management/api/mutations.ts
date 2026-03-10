import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { api } from '@/shared/api/api-client'
import { productKeys } from '@/entities/product/api/keys'
import { toast } from 'vue3-hot-toast'
import { handleError } from '@/shared/utils/handleError'
import type { ProductCreate, ProductUpdate } from '@/shared/api/generated'

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
