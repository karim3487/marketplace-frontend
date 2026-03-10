import { ref, onMounted, onUnmounted } from 'vue'
import { api } from '@/shared/api/api-client'
import type {
  ProductListItem,
  PaginatedResponse_ProductListItem_ as PaginatedResponse,
} from '@/shared/api/generated'

export function useInfiniteScroll() {
  const items = ref<ProductListItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const nextCursor = ref<string | null>(null)
  const finished = ref(false)

  const fetchNextPage = async () => {
    if (loading.value || finished.value) return

    loading.value = true
    error.value = null

    try {
      // API expects limit and offset. We use cursor as offset for simplicity in this prototype.
      const response: PaginatedResponse = await api.public.getProductsApiV1PublicProductsGet(
        20,
        nextCursor.value ? parseInt(nextCursor.value) : 0,
      )

      items.value.push(...response.items)
      nextCursor.value = response.next_cursor ?? null

      if (!response.next_cursor) {
        finished.value = true
      }
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load products'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const handleScroll = () => {
    const bottomOfWindow =
      Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) +
        window.innerHeight >=
      document.documentElement.offsetHeight - 500

    if (bottomOfWindow) {
      fetchNextPage()
    }
  }

  onMounted(() => {
    fetchNextPage()
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    items,
    loading,
    error,
    finished,
    fetchNextPage,
  }
}
