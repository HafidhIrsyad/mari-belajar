import type { Course } from '@/content/types'
import { goIntermediateMeta } from './meta'
import {
  ch01GoroutinesChannels,
  ch02ContextPackage,
  ch03SyncPackage,
  ch04HttpServerRouting,
  ch05MiddlewareLoggingRecovery,
  ch06JsonValidation,
  ch07DatabaseAccess,
  ch08BenchmarkingProfiling,
} from './chapters'

export const goIntermediate: Course = {
  ...goIntermediateMeta,
  chapters: [
    ch01GoroutinesChannels,
    ch02ContextPackage,
    ch03SyncPackage,
    ch04HttpServerRouting,
    ch05MiddlewareLoggingRecovery,
    ch06JsonValidation,
    ch07DatabaseAccess,
    ch08BenchmarkingProfiling,
  ],
}
