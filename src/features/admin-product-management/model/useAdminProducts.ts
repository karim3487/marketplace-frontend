import { computed } from 'vue'
import { useAdminProductsQuery } from '../api/queries'
import { useDeleteProductMutation } from '../api/mutations'

export function useAdminProducts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    refetch,
  } = useAdminProductsQuery()

  const { mutateAsync: deleteMutate, isPending: isDeleting } = useDeleteProductMutation()

  const products = computed(() => data.value?.pages.flatMap((page) => page.items) ?? [])

  const loadMore = async () => {
    if (hasNextPage.value && !isFetchingNextPage.value) {
      await fetchNextPage()
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return
    await deleteMutate(id)
  }

  return {
    products,
    loading: isLoading,
    loadingMore: isFetchingNextPage,
    error,
    nextCursor: computed(() => (hasNextPage.value ? 'exists' : null)),
    fetchProducts: refetch,
    loadMore,
    deleteProduct,
    isDeleting,
  }
}
