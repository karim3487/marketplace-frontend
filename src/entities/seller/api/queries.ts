import { useQuery } from '@tanstack/vue-query'
import { api } from '@/shared/api/api-client'
import { sellerKeys } from './keys'

export const useSellersQuery = () => {
  return useQuery({
    queryKey: sellerKeys.lists(),
    queryFn: () => api.adminSellers.listSellersApiV1AdminSellersGet(),
  })
}

export const useSellerQuery = (id: string) => {
  return useQuery({
    queryKey: sellerKeys.detail(id),
    queryFn: () => api.adminSellers.getSellerApiV1AdminSellersSellerIdGet(id),
    enabled: !!id,
  })
}
