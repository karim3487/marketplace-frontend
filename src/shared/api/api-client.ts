import { ApiClient } from './generated/ApiClient'

// Base URL points to the backend API via Vite proxy or absolute URL
export const api = new ApiClient({
  BASE: '',
  TOKEN: async () => localStorage.getItem('admin_token') || '',
})
