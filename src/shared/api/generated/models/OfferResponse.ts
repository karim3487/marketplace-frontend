/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { Money } from './Money'
import type { SellerResponse } from './SellerResponse'
export type OfferResponse = {
  id: string
  seller: SellerResponse
  price: Money
  delivery_date: string
}
