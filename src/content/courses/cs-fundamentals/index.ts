import type { Course } from '@/content/types'
import { csFundamentalsMeta } from './meta'
import {
  ch01HowComputersWork,
  ch02NumberSystemsAndBits,
  ch03AlgorithmsAndComplexity,
  ch04FundamentalDataStructures,
  ch05OsAndProcessManagement,
  ch06NetworkingAndInternetProtocols,
  ch07DatabasesAndSqlBasics,
  ch08SecurityFundamentals,
} from './chapters'

export const csFundamentals: Course = {
  ...csFundamentalsMeta,
  chapters: [
    ch01HowComputersWork,
    ch02NumberSystemsAndBits,
    ch03AlgorithmsAndComplexity,
    ch04FundamentalDataStructures,
    ch05OsAndProcessManagement,
    ch06NetworkingAndInternetProtocols,
    ch07DatabasesAndSqlBasics,
    ch08SecurityFundamentals,
  ],
}
