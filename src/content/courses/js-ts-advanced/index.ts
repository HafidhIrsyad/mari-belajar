import type { Course } from '@/content/types'
import { jsTsAdvancedMeta } from './meta'
import {
  ch01AdvancedTypeSystem,
  ch02DesignPatternsJsTs,
  ch03MetaprogrammingReflection,
  ch04EventLoopSchedulerV8RuntimeInternals,
  ch05CompilerInternalsBuildTools,
  ch06MemoryModelGarbageCollectionJs,
  ch07ConcurrencyParallelismJsTs,
  ch08RuntimeSecuritySupplyChainHardening,
} from './chapters'

export const jsTsAdvanced: Course = {
  ...jsTsAdvancedMeta,
  chapters: [
    ch01AdvancedTypeSystem,
    ch02DesignPatternsJsTs,
    ch03MetaprogrammingReflection,
    ch04EventLoopSchedulerV8RuntimeInternals,
    ch05CompilerInternalsBuildTools,
    ch06MemoryModelGarbageCollectionJs,
    ch07ConcurrencyParallelismJsTs,
    ch08RuntimeSecuritySupplyChainHardening,
  ],
}
