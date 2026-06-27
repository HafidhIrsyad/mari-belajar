import type { Course } from '@/content/types'
import { backendIntermediateMeta } from './meta'
import {
  ch01DatabaseIntegration,
  ch02Authentication,
  ch03Authorization,
  ch04LoggingMonitoringObservability,
  ch05AsyncProcessingBackgroundJobs,
  ch06FileUploadStorage,
  ch07ApiSecurity,
  ch08TestingBackend,
} from './chapters'

export const backendIntermediate: Course = {
  ...backendIntermediateMeta,
  chapters: [
    ch01DatabaseIntegration,
    ch02Authentication,
    ch03Authorization,
    ch04LoggingMonitoringObservability,
    ch05AsyncProcessingBackgroundJobs,
    ch06FileUploadStorage,
    ch07ApiSecurity,
    ch08TestingBackend,
  ],
}
