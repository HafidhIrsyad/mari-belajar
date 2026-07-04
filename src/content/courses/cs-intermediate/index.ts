import type { Course } from '@/content/types'
import { csIntermediateMeta } from './meta'
import {
  ch01AdvancedAlgorithms,
  ch02AdvancedDataStructures,
  ch03GraphAlgorithms,
  ch04ConcurrencyParallelismTheory,
  ch05ComputerArchitecture,
  ch06NetworkProtocolsTheory,
  ch07DiscreteMathLogic,
  ch08CryptographyFundamentals,
} from './chapters'

export const csIntermediate: Course = {
  ...csIntermediateMeta,
  chapters: [
    ch01AdvancedAlgorithms,
    ch02AdvancedDataStructures,
    ch03GraphAlgorithms,
    ch04ConcurrencyParallelismTheory,
    ch05ComputerArchitecture,
    ch06NetworkProtocolsTheory,
    ch07DiscreteMathLogic,
    ch08CryptographyFundamentals,
  ],
}
