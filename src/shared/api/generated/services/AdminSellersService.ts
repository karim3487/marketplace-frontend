/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { SellerCreate } from '../models/SellerCreate';
import type { SellerResponse } from '../models/SellerResponse';
import type { SellerUpdate } from '../models/SellerUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AdminSellersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List Sellers
     * List all sellers for administrative purposes.
     * @returns SellerResponse Successful Response
     * @throws ApiError
     */
    public listSellersApiV1AdminSellersGet(): CancelablePromise<Array<SellerResponse>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/admin/sellers/',
        });
    }
    /**
     * Create Seller
     * Create a new seller.
     * @param requestBody
     * @returns SellerResponse Successful Response
     * @throws ApiError
     */
    public createSellerApiV1AdminSellersPost(
        requestBody: SellerCreate,
    ): CancelablePromise<SellerResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/admin/sellers/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Seller
     * Get details of a specific seller.
     * @param sellerId
     * @returns SellerResponse Successful Response
     * @throws ApiError
     */
    public getSellerApiV1AdminSellersSellerIdGet(
        sellerId: string,
    ): CancelablePromise<SellerResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/admin/sellers/{seller_id}',
            path: {
                'seller_id': sellerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Seller
     * @param sellerId
     * @param requestBody
     * @returns SellerResponse Successful Response
     * @throws ApiError
     */
    public updateSellerApiV1AdminSellersSellerIdPut(
        sellerId: string,
        requestBody: SellerUpdate,
    ): CancelablePromise<SellerResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/admin/sellers/{seller_id}',
            path: {
                'seller_id': sellerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Seller
     * Delete a specific seller.
     * @param sellerId
     * @returns void
     * @throws ApiError
     */
    public deleteSellerApiV1AdminSellersSellerIdDelete(
        sellerId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/admin/sellers/{seller_id}',
            path: {
                'seller_id': sellerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
