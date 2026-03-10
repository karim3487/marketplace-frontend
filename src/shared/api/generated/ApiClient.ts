/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AdminAuthService } from './services/AdminAuthService';
import { AdminOffersService } from './services/AdminOffersService';
import { AdminProductsService } from './services/AdminProductsService';
import { AdminSellersService } from './services/AdminSellersService';
import { HealthService } from './services/HealthService';
import { PublicService } from './services/PublicService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
    public readonly adminAuth: AdminAuthService;
    public readonly adminOffers: AdminOffersService;
    public readonly adminProducts: AdminProductsService;
    public readonly adminSellers: AdminSellersService;
    public readonly health: HealthService;
    public readonly public: PublicService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '0.1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.adminAuth = new AdminAuthService(this.request);
        this.adminOffers = new AdminOffersService(this.request);
        this.adminProducts = new AdminProductsService(this.request);
        this.adminSellers = new AdminSellersService(this.request);
        this.health = new HealthService(this.request);
        this.public = new PublicService(this.request);
    }
}

