import type { Course } from '@/content/types'
import { frontendIntermediateMeta } from './meta'
import {
  ch01ReactFundamentalsReview,
  ch02HooksLanjutan,
  ch03StateManagement,
  ch04Routing,
  ch05DataFetchingServerState,
  ch06FormsValidationDiReact,
  ch07StylingUILibraries,
  ch08TestingFrontend,
} from './chapters'

export const frontendIntermediate: Course = {
  ...frontendIntermediateMeta,
  chapters: [
    ch01ReactFundamentalsReview,
    ch02HooksLanjutan,
    ch03StateManagement,
    ch04Routing,
    ch05DataFetchingServerState,
    ch06FormsValidationDiReact,
    ch07StylingUILibraries,
    ch08TestingFrontend,
  ],
}
