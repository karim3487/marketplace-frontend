/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { AdminOfferResponse } from '../models/AdminOfferResponse';
import type { OfferCreate } from '../models/OfferCreate';
import type { OfferUpdate } from '../models/OfferUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AdminOffersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create Offer
     * @param requestBody
     * @returns AdminOfferResponse Successful Response
     * @throws ApiError
     */
    public createOfferApiV1AdminOffersPost(
        requestBody: OfferCreate,
    ): CancelablePromise<AdminOfferResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/admin/offers/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Offer
     * @param offerId
     * @returns AdminOfferResponse Successful Response
     * @throws ApiError
     */
    public readOfferApiV1AdminOffersOfferIdGet(
        offerId: string,
    ): CancelablePromise<AdminOfferResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/admin/offers/{offer_id}',
            path: {
                'offer_id': offerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Offer
     * @param offerId
     * @param requestBody
     * @returns AdminOfferResponse Successful Response
     * @throws ApiError
     */
    public updateOfferApiV1AdminOffersOfferIdPut(
        offerId: string,
        requestBody: OfferUpdate,
    ): CancelablePromise<AdminOfferResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/admin/offers/{offer_id}',
            path: {
                'offer_id': offerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Offer
     * @param offerId
     * @returns void
     * @throws ApiError
     */
    public deleteOfferApiV1AdminOffersOfferIdDelete(
        offerId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/admin/offers/{offer_id}',
            path: {
                'offer_id': offerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
