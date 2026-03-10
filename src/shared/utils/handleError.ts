import { toast } from 'vue3-hot-toast'
import { ApiError } from '@/shared/api/generated'

/**
 * Centralized error handler for the application.
 * Extracts messages from ApiError (FastAPI format) or standard Error objects.
 * Shows a toast message and logs the error to the console.
 */
export const handleError = (e: unknown, defaultMsg = 'Произошла ошибка') => {
  console.error(e)

  if (e instanceof ApiError) {
    // FastAPI often puts the message in body.detail
    const detail = e.body?.detail
    const message = Array.isArray(detail)
      ? detail.map((d) => d.msg || d).join(', ')
      : detail || e.message

    toast.error(message || defaultMsg)
    return
  }

  if (e instanceof Error) {
    toast.error(e.message)
    return
  }

  toast.error(defaultMsg)
}
