import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useQuery } from '@tanstack/vue-query'
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
