/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Money } from './Money';
import type { ProductAttributeCreate } from './ProductAttributeCreate';
export type ProductCreate = {
    name: string;
    price: Money;
    stock?: number;
    attributes?: Array<ProductAttributeCreate>;
};

