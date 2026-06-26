import type { UserProgress } from '@/content/types'

const STORAGE_KEY = 'mari-belajar-progress'

export const storage = {
  get(): UserProgress | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      return JSON.parse(raw) as UserProgress
    } catch (error) {
      console.warn('Failed to read progress from localStorage', error)
      return null
    }
  },

  set(progress: UserProgress): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
      return true
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      ) {
        console.warn('localStorage quota exceeded; progress kept in memory only')
      } else {
        console.warn('Failed to write progress to localStorage', error)
      }
      return false
    }
  },

  remove(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to remove progress from localStorage', error)
    }
  },
}
