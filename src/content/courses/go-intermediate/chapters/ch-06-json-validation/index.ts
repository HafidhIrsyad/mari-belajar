import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06JsonValidation: Chapter = {
  id: 'ch-06-json-validation',
  slug: 'ch-06-json-validation',
  order: 6,
  title: 'JSON & Validation',
  summary:
    'Memahami encoding/json, struct tags, custom marshaling, streaming decoder, serta validasi data dengan go-playground/validator.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Menggunakan json.Marshal dan json.Unmarshal dengan struct tags.',
    'Memahami penggunaan omitempty dan pointer untuk optional field.',
    'Mengimplementasikan custom MarshalJSON dan UnmarshalJSON.',
    'Membaca JSON besar secara streaming dengan Decoder.',
    'Melakukan validasi struct dengan tag validator/v10.',
    'Memahami trade-off reflection saat marshaling dan validating.',
  ],
  summaryPoints: [
    'encoding/json adalah package standar untuk serialisasi JSON di Go.',
    'Struct tag json:"name,omitempty" mengontrol nama field dan penghilangan nilai kosong.',
    'Pointer pada field memungkinkan perbedaan nilai nol dan nilai tidak diset.',
    'Custom marshaling diimplementasikan dengan method MarshalJSON/UnmarshalJSON.',
    'Decoder memungkinkan streaming parse untuk JSON besar tanpa memuat seluruh data ke memori.',
    'go-playground/validator menggunakan struct tags untuk validasi data.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
