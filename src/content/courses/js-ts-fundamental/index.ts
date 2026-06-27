import type { Course } from '@/content/types'
import { jsTsFundamentalMeta } from './meta'
import {
  ch01IntroductionToJavascript,
  ch02VariablesTypesOperators,
  ch03ControlFlow,
  ch04FunctionsScopeClosure,
  ch05ArraysAndObjects,
  ch06AsynchronousJavascript,
  ch07TypescriptTypeSystem,
  ch08ModulesToolingBestPractices,
} from './chapters'

export const jsTsFundamental: Course = {
  ...jsTsFundamentalMeta,
  chapters: [
    ch01IntroductionToJavascript,
    ch02VariablesTypesOperators,
    ch03ControlFlow,
    ch04FunctionsScopeClosure,
    ch05ArraysAndObjects,
    ch06AsynchronousJavascript,
    ch07TypescriptTypeSystem,
    ch08ModulesToolingBestPractices,
  ],
}
