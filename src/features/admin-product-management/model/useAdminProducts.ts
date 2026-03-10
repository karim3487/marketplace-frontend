import { ref } from 'vue'
import { api } from '@/shared/api/api-client'
import type { ProductResponse } from '@/shared/api/generated'

export function useAdminProducts() {
  const products = ref<ProductResponse[]>([])
  const loading = ref(false)
  const nextCursor = ref<string | null>(null)
  const error = ref<string | null>(null)

  async function fetchProducts(isNext = false) {
    if (loading.value) return

    loading.value = true
    error.value = null
    try {
      const response = await api.adminProducts.listProductsApiV1AdminProductsGet(
        50,
        isNext ? parseInt(nextCursor.value || '0') : 0,
      )

      if (isNext) {
        products.value = [...products.value, ...response.items]
      } else {
        products.value = response.items
      }

      nextCursor.value = response.next_cursor || null
    } catch (e: unknown) {
      error.value = (e as Error).message || 'Ошибка загрузки товаров'
    } finally {
      loading.value = false
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return

    try {
      await api.adminProducts.deleteProductApiV1AdminProductsProductIdDelete(id)
      products.value = products.value.filter((p) => p.id !== id)
    } catch (e: unknown) {
      alert((e as Error).message || 'Ошибка удаления')
    }
  }

  return {
    products,
    loading,
    nextCursor,
    error,
    fetchProducts,
    deleteProduct,
  }
}
