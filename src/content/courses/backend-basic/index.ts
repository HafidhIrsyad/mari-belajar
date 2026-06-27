import type { Course } from '@/content/types'
import { backendBasicMeta } from './meta'
import {
  ch01HttpFundamentals,
  ch02RestApiDesign,
  ch03RoutingControllers,
  ch04RequestValidation,
  ch05ResponseErrorHandling,
  ch06MiddlewareCrossCutting,
  ch07DocumentationTestingApi,
  ch08DeploymentEnvironmentBasics,
} from './chapters'

export const backendBasic: Course = {
  ...backendBasicMeta,
  chapters: [
    ch01HttpFundamentals,
    ch02RestApiDesign,
    ch03RoutingControllers,
    ch04RequestValidation,
    ch05ResponseErrorHandling,
    ch06MiddlewareCrossCutting,
    ch07DocumentationTestingApi,
    ch08DeploymentEnvironmentBasics,
  ],
}
