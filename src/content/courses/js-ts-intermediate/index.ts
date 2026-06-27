import type { Course } from '@/content/types'
import { jsTsIntermediateMeta } from './meta'
import {
  ch01DomManipulationEvents,
  ch02FetchApiHttpClient,
  ch03ErrorHandlingDebugging,
  ch04TypescriptUtilityTypesTypeGuards,
  ch05ModulesBundlerTooling,
  ch06TestingJavascriptTypescript,
  ch07FunctionalProgrammingPatterns,
  ch08BrowserRuntimeRenderingInternals,
} from './chapters'

export const jsTsIntermediate: Course = {
  ...jsTsIntermediateMeta,
  chapters: [
    ch01DomManipulationEvents,
    ch02FetchApiHttpClient,
    ch03ErrorHandlingDebugging,
    ch04TypescriptUtilityTypesTypeGuards,
    ch05ModulesBundlerTooling,
    ch06TestingJavascriptTypescript,
    ch07FunctionalProgrammingPatterns,
    ch08BrowserRuntimeRenderingInternals,
  ],
}
