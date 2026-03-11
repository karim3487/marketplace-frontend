/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { PaginatedResponse_ProductListItem_ } from '../models/PaginatedResponse_ProductListItem_';
import type { ProductDetailResponse } from '../models/ProductDetailResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PublicService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Products
     * Retrieve a paginated list of products for infinite scroll.
     * Computes 'nearest_delivery_date' locally from early relation load.
     * @param limit
     * @param offset
     * @returns PaginatedResponse_ProductListItem_ Successful Response
     * @throws ApiError
     */
    public getProductsApiV1PublicProductsGet(
        limit: number = 10,
        offset?: number,
    ): CancelablePromise<PaginatedResponse_ProductListItem_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/public/products',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Product Details
     * Get detailed product layout, incorporating explicitly sorted embedded offers.
     * @param productId
     * @param offersSort Sort offers criteria
     * @returns ProductDetailResponse Successful Response
     * @throws ApiError
     */
    public getProductDetailsApiV1PublicProductsProductIdGet(
        productId: string,
        offersSort: 'price' | 'delivery_date' = 'price',
    ): CancelablePromise<ProductDetailResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/public/products/{product_id}',
            path: {
                'product_id': productId,
            },
            query: {
                'offers_sort': offersSort,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
