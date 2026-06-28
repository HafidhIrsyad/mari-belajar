import type { Course } from '@/content/types'
import { devopsIntermediateMeta } from './meta'
import {
  ch01CloudDeployment,
  ch02InfrastructureAsCodeLanjutan,
  ch03KubernetesInternals,
  ch04Gitops,
  ch05ObservabilityStack,
  ch06SecretsManagement,
  ch07Devsecops,
  ch08ReliabilityIncidentResponse,
} from './chapters'

export const devopsIntermediate: Course = {
  ...devopsIntermediateMeta,
  chapters: [
    ch01CloudDeployment,
    ch02InfrastructureAsCodeLanjutan,
    ch03KubernetesInternals,
    ch04Gitops,
    ch05ObservabilityStack,
    ch06SecretsManagement,
    ch07Devsecops,
    ch08ReliabilityIncidentResponse,
  ],
}
