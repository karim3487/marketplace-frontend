/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { LoginRequest } from '../models/LoginRequest';
import type { Token } from '../models/Token';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AdminAuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Login For Access Token
     * Authenticate an admin user and return a JWT token.
     *
     * Verifies credentials against the database using bcrypt hashing.
     * @param requestBody
     * @returns Token Successful Response
     * @throws ApiError
     */
    public loginForAccessTokenApiV1AdminAuthLoginPost(
        requestBody: LoginRequest,
    ): CancelablePromise<Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/admin/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Incorrect username or password`,
                422: `Validation Error`,
            },
        });
    }
}
