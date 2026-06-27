import type { Course } from '@/content/types'
import { frontendBasicMeta } from './meta'
import {
  ch01HtmlSemanticStructure,
  ch02CssLayoutFundamentals,
  ch03ResponsiveDesign,
  ch04FormsValidation,
  ch05CssStylingStrategy,
  ch06AccessibilityDasar,
  ch07DomEventsInteractivity,
  ch08FrontendWorkflowTooling,
} from './chapters'

export const frontendBasic: Course = {
  ...frontendBasicMeta,
  chapters: [
    ch01HtmlSemanticStructure,
    ch02CssLayoutFundamentals,
    ch03ResponsiveDesign,
    ch04FormsValidation,
    ch05CssStylingStrategy,
    ch06AccessibilityDasar,
    ch07DomEventsInteractivity,
    ch08FrontendWorkflowTooling,
  ],
}
