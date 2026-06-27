import type { Course } from '@/content/types'
import { goFundamentalMeta } from './meta'
import {
  ch01KenalanDenganGo,
  ch02VariabelTipeDataOperator,
  ch03ControlFlow,
  ch04FunctionsAndMethods,
  ch05StructInterfaceEmbedding,
  ch06SliceMapRange,
  ch07ErrorHandlingAndModules,
  ch08TestingAndToolingDasar,
} from './chapters'

export const goFundamental: Course = {
  ...goFundamentalMeta,
  chapters: [
    ch01KenalanDenganGo,
    ch02VariabelTipeDataOperator,
    ch03ControlFlow,
    ch04FunctionsAndMethods,
    ch05StructInterfaceEmbedding,
    ch06SliceMapRange,
    ch07ErrorHandlingAndModules,
    ch08TestingAndToolingDasar,
  ],
}
