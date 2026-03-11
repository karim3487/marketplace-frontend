/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { Money } from './Money'
export type ProductListItem = {
  id: string
  name: string
  thumbnail_url: string | null
  price: Money
  stock: number
  nearest_delivery_date?: string | null
}
