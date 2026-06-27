import type { Course } from '@/content/types'
import { frontendAdvancedMeta } from './meta'
import {
  ch01PerformanceOptimization,
  ch02ServerSideRenderingSsg,
  ch03DesignSystems,
  ch04MicroFrontendsPengantar,
  ch05AdvancedTypeScriptDiFrontend,
  ch06AccessibilityLanjutan,
  ch07AdvancedStateManagementStateMachines,
  ch08FrontendArchitectureToolingLanjutan,
} from './chapters'

export const frontendAdvanced: Course = {
  ...frontendAdvancedMeta,
  chapters: [
    ch01PerformanceOptimization,
    ch02ServerSideRenderingSsg,
    ch03DesignSystems,
    ch04MicroFrontendsPengantar,
    ch05AdvancedTypeScriptDiFrontend,
    ch06AccessibilityLanjutan,
    ch07AdvancedStateManagementStateMachines,
    ch08FrontendArchitectureToolingLanjutan,
  ],
}
