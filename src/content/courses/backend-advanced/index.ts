import type { Course } from '@/content/types'
import { backendAdvancedMeta } from './meta'
import {
  ch01DistributedSystemsBasics,
  ch02CachingStrategies,
  ch03MessageQueuesEventDrivenArchitecture,
  ch04RateLimitingThrottling,
  ch05ScalabilityReliability,
  ch06ApiGatewayServiceMesh,
  ch07DatabaseAtScale,
  ch08SecurityLanjutanCompliance,
} from './chapters'

export const backendAdvanced: Course = {
  ...backendAdvancedMeta,
  chapters: [
    ch01DistributedSystemsBasics,
    ch02CachingStrategies,
    ch03MessageQueuesEventDrivenArchitecture,
    ch04RateLimitingThrottling,
    ch05ScalabilityReliability,
    ch06ApiGatewayServiceMesh,
    ch07DatabaseAtScale,
    ch08SecurityLanjutanCompliance,
  ],
}
