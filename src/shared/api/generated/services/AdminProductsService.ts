/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { Body_upload_product_image_api_v1_admin_products__product_id__image_post } from '../models/Body_upload_product_image_api_v1_admin_products__product_id__image_post';
import type { ImageUploadResponse } from '../models/ImageUploadResponse';
import type { PaginatedResponse_ProductResponse_ } from '../models/PaginatedResponse_ProductResponse_';
import type { ProductAuditLogResponse } from '../models/ProductAuditLogResponse';
import type { ProductCreate } from '../models/ProductCreate';
import type { ProductDetailResponse } from '../models/ProductDetailResponse';
import type { ProductResponse } from '../models/ProductResponse';
import type { ProductUpdate } from '../models/ProductUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AdminProductsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List Products
     * Retrieve list of products for administration.
     * @param limit
     * @param offset
     * @returns PaginatedResponse_ProductResponse_ Successful Response
     * @throws ApiError
     */
    public listProductsApiV1AdminProductsGet(
        limit: number = 50,
        offset?: number,
    ): CancelablePromise<PaginatedResponse_ProductResponse_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/admin/products/',
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
     * Create Product
     * @param requestBody
     * @returns ProductResponse Successful Response
     * @throws ApiError
     */
    public createProductApiV1AdminProductsPost(
        requestBody: ProductCreate,
    ): CancelablePromise<ProductResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/admin/products/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Product
     * @param productId
     * @returns ProductDetailResponse Successful Response
     * @throws ApiError
     */
    public readProductApiV1AdminProductsProductIdGet(
        productId: string,
    ): CancelablePromise<ProductDetailResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/admin/products/{product_id}',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Product
     * @param productId
     * @param requestBody
     * @returns ProductResponse Successful Response
     * @throws ApiError
     */
    public updateProductApiV1AdminProductsProductIdPut(
        productId: string,
        requestBody: ProductUpdate,
    ): CancelablePromise<ProductResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/admin/products/{product_id}',
            path: {
                'product_id': productId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Product
     * @param productId
     * @returns void
     * @throws ApiError
     */
    public deleteProductApiV1AdminProductsProductIdDelete(
        productId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/admin/products/{product_id}',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Upload Product Image
     * @param productId
     * @param formData
     * @returns ImageUploadResponse Successful Response
     * @throws ApiError
     */
    public uploadProductImageApiV1AdminProductsProductIdImagePost(
        productId: string,
        formData: Body_upload_product_image_api_v1_admin_products__product_id__image_post,
    ): CancelablePromise<ImageUploadResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/admin/products/{product_id}/image',
            path: {
                'product_id': productId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Product Audit Logs
     * @param productId
     * @returns ProductAuditLogResponse Successful Response
     * @throws ApiError
     */
    public getProductAuditLogsApiV1AdminProductsProductIdAuditGet(
        productId: string,
    ): CancelablePromise<Array<ProductAuditLogResponse>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/admin/products/{product_id}/audit',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
