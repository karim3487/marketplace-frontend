import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { api } from '@/shared/api/api-client'
import { sellerKeys } from '@/entities/seller/api/keys'
import { toast } from 'vue3-hot-toast'
import { handleError } from '@/shared/utils/handleError'
import type { SellerCreate, SellerUpdate } from '@/shared/api/generated'

export const useCreateSeller = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: SellerCreate) => api.adminSellers.createSellerApiV1AdminSellersPost(data),
    onSuccess: () => {
      toast.success('Продавец успешно зарегистрирован')
      queryClient.invalidateQueries({ queryKey: sellerKeys.lists() })
    },
    onError: (e) => handleError(e, 'Не удалось создать продавца'),
  })
}

export const useUpdateSeller = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SellerUpdate }) =>
      api.adminSellers.updateSellerApiV1AdminSellersSellerIdPut(id, data),
    onSuccess: (_, { id }) => {
      toast.success('Данные обновлены')
      queryClient.invalidateQueries({ queryKey: sellerKeys.lists() })
      queryClient.invalidateQueries({ queryKey: sellerKeys.detail(id) })
    },
    onError: (e) => handleError(e, 'Не удалось сохранить'),
  })
}

export const useDeleteSeller = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.adminSellers.deleteSellerApiV1AdminSellersSellerIdDelete(id),
    onSuccess: () => {
      toast.success('Продавец удален')
      queryClient.invalidateQueries({ queryKey: sellerKeys.lists() })
    },
    onError: (e) => handleError(e, 'Ошибка удаления'),
  })
}
