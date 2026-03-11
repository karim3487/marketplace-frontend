import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import { api } from '@/shared/api/api-client'
import { productKeys } from './keys'

export const useProductQuery = (id: MaybeRefOrGetter<string | undefined>) => {
  return useQuery({
    queryKey: computed(() => productKeys.detail(toValue(id) || '')),
    queryFn: () => {
      const idValue = toValue(id)
      if (!idValue) throw new Error('Product ID is required')
      return api.adminProducts.readProductApiV1AdminProductsProductIdGet(idValue)
    },
    enabled: computed(() => !!toValue(id)),
  })
}

export const useProductAuditLogsQuery = (id: MaybeRefOrGetter<string | undefined>) => {
  return useQuery({
    queryKey: computed(() => productKeys.audit(toValue(id) || '')),
    queryFn: () => {
      const idValue = toValue(id)
      if (!idValue) throw new Error('Product ID is required')
      return api.adminProducts.getProductAuditLogsApiV1AdminProductsProductIdAuditGet(idValue)
    },
    enabled: computed(() => !!toValue(id)),
  })
}

export const usePublicProductQuery = (
  id: MaybeRefOrGetter<string | undefined>,
  offersSort: MaybeRefOrGetter<'price' | 'delivery_date'> = 'price'
) => {
  return useQuery({
    queryKey: computed(() => [...productKeys.detail(toValue(id) || ''), { offersSort: toValue(offersSort) }]),
    queryFn: () => {
      const idValue = toValue(id)
      if (!idValue) throw new Error('Product ID is required')
      return api.public.getProductDetailsApiV1PublicProductsProductIdGet(idValue, toValue(offersSort))
    },
    enabled: computed(() => !!toValue(id)),
  })
}

export const usePublicInfiniteProductsQuery = (limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: [...productKeys.lists(), 'public'],
    queryFn: ({ pageParam = 0 }) => api.public.getProductsApiV1PublicProductsGet(limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.next_cursor ? parseInt(lastPage.next_cursor) : undefined),
  })
}
