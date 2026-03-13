import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductList from './ProductList.vue'
import { usePublicInfiniteProductsQuery } from '@/entities/product'
import { createProduct } from '@/shared/lib/test-factories'
import { ref } from 'vue'
import { CurrencyCode } from '@/shared/api/generated'

// Mock the hook
vi.mock('@/entities/product', async () => {
  const actual = await vi.importActual('@/entities/product')
  return {
    ...actual,
    usePublicInfiniteProductsQuery: vi.fn()
  }
})

type InfiniteQueryMock = ReturnType<typeof usePublicInfiniteProductsQuery>

describe('ProductList', () => {
  it('should render products when data is successfully loaded', () => {
    // Given
    const mockProducts = [
      createProduct({
        id: 'P1',
        name: 'Product 1',
        price: { amount: 100, currency: CurrencyCode.RUB },
        thumbnail_url: 'http://example.com/p1.jpg'
      })
    ]
    
    vi.mocked(usePublicInfiniteProductsQuery).mockReturnValue({
      data: ref({
        pages: [{ items: mockProducts }]
      }),
      isLoading: ref(false),
      isFetchingNextPage: ref(false),
      hasNextPage: ref(false),
      fetchNextPage: vi.fn(),
      error: ref(null)
    } as unknown as InfiniteQueryMock)

    // When
    const wrapper = mount(ProductList)
    
    // Then
    expect(wrapper.text()).toContain('Product 1')
    expect(wrapper.text()).toContain('100')
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('http://example.com/p1.jpg')
  })

  it('should render loading state with skeletons during initial load', () => {
    // Given
    vi.mocked(usePublicInfiniteProductsQuery).mockReturnValue({
      data: ref(null),
      isLoading: ref(true),
      isFetchingNextPage: ref(false),
      hasNextPage: ref(false),
      fetchNextPage: vi.fn(),
      error: ref(null)
    } as unknown as InfiniteQueryMock)

    // When
    const wrapper = mount(ProductList)
    
    // Then
    // Check for skeletons (defined by animate-pulse class in template)
    expect(wrapper.findAll('.animate-pulse').length).toBeGreaterThan(0)
  })

  it('should render error message and retry button on fetch failure', () => {
    // Given
    vi.mocked(usePublicInfiniteProductsQuery).mockReturnValue({
      data: ref(null),
      isLoading: ref(false),
      isFetchingNextPage: ref(false),
      hasNextPage: ref(false),
      fetchNextPage: vi.fn(),
      error: ref({ message: 'Ошибка сети' })
    } as unknown as InfiniteQueryMock)

    // When
    const wrapper = mount(ProductList)
    
    // Then
    expect(wrapper.text()).toContain('Ошибка сети')
    expect(wrapper.find('button').text()).toBe('Попробовать еще раз')
  })

  it('should emit "select-product" event with product id when a card is clicked', async () => {
    // Given
    const mockProducts = [
      createProduct({
        id: 'P-TEST',
        name: 'Clickable Product'
      })
    ]
    
    vi.mocked(usePublicInfiniteProductsQuery).mockReturnValue({
      data: ref({
        pages: [{ items: mockProducts }]
      }),
      isLoading: ref(false),
      isFetchingNextPage: ref(false),
      hasNextPage: ref(false),
      fetchNextPage: vi.fn(),
      error: ref(null)
    } as unknown as InfiniteQueryMock)

    // When
    const wrapper = mount(ProductList)
    await wrapper.find('.card').trigger('click')
    
    // Then
    const selectEvents = wrapper.emitted('select-product')
    expect(selectEvents).toBeTruthy()
    expect(selectEvents?.[0]).toEqual(['P-TEST'])
  })
})
