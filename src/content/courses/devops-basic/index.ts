import type { Course } from '@/content/types'
import { devopsBasicMeta } from './meta'
import {
  ch01GitWorkflow,
  ch02CiCdFundamentals,
  ch03ContainerInternals,
  ch04EnvironmentManagement,
  ch05InfrastructureAsCode,
  ch06MonitoringLogging,
  ch07DeploymentStrategies,
  ch08DevopsCultureCollaboration,
} from './chapters'

export const devopsBasic: Course = {
  ...devopsBasicMeta,
  chapters: [
    ch01GitWorkflow,
    ch02CiCdFundamentals,
    ch03ContainerInternals,
    ch04EnvironmentManagement,
    ch05InfrastructureAsCode,
    ch06MonitoringLogging,
    ch07DeploymentStrategies,
    ch08DevopsCultureCollaboration,
  ],
}
