/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { Money } from './Money';
import type { ProductAttributeCreate } from './ProductAttributeCreate';
export type ProductUpdate = {
    name?: (string | null);
    price?: (Money | null);
    stock?: (number | null);
    attributes?: (Array<ProductAttributeCreate> | null);
};

