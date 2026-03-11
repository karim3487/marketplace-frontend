/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { Money } from './Money';
import type { ProductAttributeResponse } from './ProductAttributeResponse';
export type ProductResponse = {
    name: string;
    price: Money;
    stock?: number;
    id: string;
    image_url?: (string | null);
    thumbnail_url?: (string | null);
    created_at: string;
    updated_at: string;
    attributes?: Array<ProductAttributeResponse>;
};

