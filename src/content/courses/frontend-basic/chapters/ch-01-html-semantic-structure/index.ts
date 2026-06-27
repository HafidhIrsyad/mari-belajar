import type { Chapter } from '@/content/types'
import { ch01Lesson } from './lesson'
import { ch01Quiz } from './quiz'
import { ch01References } from './references'

export const ch01HtmlSemanticStructure: Chapter = {
  id: 'ch-01-html-semantic-structure',
  slug: 'ch-01-html-semantic-structure',
  order: 1,
  title: 'HTML Semantic & Structure',
  summary:
    'Memahami elemen HTML semantik, hierarki heading, struktur dokumen, serta implikasinya terhadap SEO, accessibility tree, dan document outline.',
  estimatedMinutes: 20,
  learningObjectives: [
    'Menyusun struktur dokumen HTML yang valid dengan doctype, html, head, dan body.',
    'Memilih tag semantik yang tepat: header, nav, main, article, section, footer, aside.',
    'Menjaga hierarki heading agar outline dokumen tetap bermakna bagi screen reader dan mesin pencari.',
    'Menggunakan meta tags Open Graph, picture, figure, time, dan address secara tepat.',
    'Menjelaskan hubungan antara DOM, accessibility tree, dan landmark regions.',
  ],
  summaryPoints: [
    'Tag semantik memberikan makna struktural pada halaman, bukan hanya presentasi.',
    'Hierarki heading harus logis: satu h1 per halaman, tidak melompati level.',
    'Landmark regions membantu teknologi assistif menavigasi halaman.',
    'Accessibility tree dibangun dari elemen semantik dan atribut ARIA yang relevan.',
    'Document outline algorithm memengaruhi SEO dan cara screen reader membaca halaman.',
  ],
  references: ch01References,
  lesson: ch01Lesson,
  quiz: ch01Quiz,
}
