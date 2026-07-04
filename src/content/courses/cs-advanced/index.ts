import type { Course } from '@/content/types'
import { csAdvancedMeta } from './meta'
import {
  ch01CompilerFormalLanguages,
  ch02AdvancedOperatingSystems,
  ch03DistributedSystemsTheory,
  ch04ComputabilityComplexity,
  ch05FormalSecurityModels,
  ch06AlgorithmicPerformanceAnalysis,
  ch07DistributedScalabilityTheory,
  ch08EthicsFrontierCs,
} from './chapters'

export const csAdvanced: Course = {
  ...csAdvancedMeta,
  chapters: [
    ch01CompilerFormalLanguages,
    ch02AdvancedOperatingSystems,
    ch03DistributedSystemsTheory,
    ch04ComputabilityComplexity,
    ch05FormalSecurityModels,
    ch06AlgorithmicPerformanceAnalysis,
    ch07DistributedScalabilityTheory,
    ch08EthicsFrontierCs,
  ],
}
