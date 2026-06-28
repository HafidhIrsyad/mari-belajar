import type { Course } from '@/content/types'
import { devopsAdvancedMeta } from './meta'
import {
  ch01KubernetesControllersOperatorsApiServer,
  ch02ServiceMeshConcept,
  ch03GitopsLanjutan,
  ch04SrePractices,
  ch05AdvancedMonitoringAlerting,
  ch06CloudNativeSecurity,
  ch07PlatformEngineering,
  ch08CapstoneDevopsProject,
} from './chapters'

export const devopsAdvanced: Course = {
  ...devopsAdvancedMeta,
  chapters: [
    ch01KubernetesControllersOperatorsApiServer,
    ch02ServiceMeshConcept,
    ch03GitopsLanjutan,
    ch04SrePractices,
    ch05AdvancedMonitoringAlerting,
    ch06CloudNativeSecurity,
    ch07PlatformEngineering,
    ch08CapstoneDevopsProject,
  ],
}
