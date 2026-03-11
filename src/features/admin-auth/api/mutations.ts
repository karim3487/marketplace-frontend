import { useMutation } from '@tanstack/vue-query'
import { api } from '@/shared/api/api-client'
import type { LoginRequest } from '@/shared/api/generated'

export function useAdminLoginMutation() {
  return useMutation({
    mutationFn: (data: LoginRequest) => api.adminAuth.loginForAccessTokenApiV1AdminAuthLoginPost(data),
  })
}
