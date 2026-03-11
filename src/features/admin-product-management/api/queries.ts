import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import { api } from '@/shared/api/api-client'

export const adminProductsKeys = {
  all: ['admin-products'] as const,
  lists: () => [...adminProductsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...adminProductsKeys.lists(), params] as const,
  details: () => [...adminProductsKeys.all, 'detail'] as const,
  detail: (id: string) => [...adminProductsKeys.details(), id] as const,
}

export function useAdminProductsQuery(limit = 50) {
  return useInfiniteQuery({
    queryKey: adminProductsKeys.lists(),
    queryFn: ({ pageParam = 0 }) => 
      api.adminProducts.listProductsApiV1AdminProductsGet(limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next_cursor) return undefined
      return parseInt(lastPage.next_cursor)
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      products: data.pages.flatMap(page => page.items)
    })
  })
}

export function useAdminProductDetailQuery(productId: string) {
  return useQuery({
    queryKey: adminProductsKeys.detail(productId),
    queryFn: () => api.adminProducts.readProductApiV1AdminProductsProductIdGet(productId),
    enabled: !!productId
  })
}

export function useSellersQuery() {
  return useQuery({
    queryKey: ['admin', 'sellers'],
    queryFn: () => api.adminSellers.listSellersApiV1AdminSellersGet(),
  })
}
