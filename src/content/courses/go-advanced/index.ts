import type { Course } from '@/content/types'
import { goAdvancedMeta } from './meta'
import {
  ch01ConcurrencyPatterns,
  ch02Generics,
  ch03Reflection,
  ch04BuildTags,
  ch05Http2Tls,
  ch06MemoryGc,
  ch07CliSystem,
  ch08Deployment,
} from './chapters'

export const goAdvanced: Course = {
  ...goAdvancedMeta,
  chapters: [
    ch01ConcurrencyPatterns,
    ch02Generics,
    ch03Reflection,
    ch04BuildTags,
    ch05Http2Tls,
    ch06MemoryGc,
    ch07CliSystem,
    ch08Deployment,
  ],
}
