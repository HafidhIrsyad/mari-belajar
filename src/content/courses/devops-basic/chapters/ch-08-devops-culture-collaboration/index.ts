import type { Chapter } from '@/content/types'
import { ch08Lesson } from './lesson'
import { ch08Quiz } from './quiz'
import { ch08References } from './references'

export const ch08DevopsCultureCollaboration: Chapter = {
  id: 'ch-08-devops-culture-collaboration',
  slug: 'ch-08-devops-culture-collaboration',
  order: 8,
  title: 'DevOps Culture & Collaboration',
  summary:
    'Memahami aspek manusia dan organisasi dalam DevOps: framework CALMS, blameless postmortem, SRE, platform engineering, DORA metrics, team topologies, dan value stream mapping.',
  estimatedMinutes: 35,
  learningObjectives: [
    'Menjelaskan framework CALMS (Culture, Automation, Lean, Measurement, Sharing).',
    'Menerapkan praktik blameless postmortem.',
    'Memahami peran SRE dan platform engineering.',
    'Menginterpretasikan DORA metrics.',
    'Mengenali team topologies yang mendukung aliran nilai.',
  ],
  summaryPoints: [
    'DevOps adalah kombinasi kultur, praktik, dan tools yang memperpendek siklus pengembangan.',
    'CALMS menyoroti pentingnya culture, automation, lean, measurement, dan sharing.',
    'Blameless postmortem fokus pada sistem, bukan individu.',
    'SRE dan platform engineering mendukung developer dengan platform self-service.',
    'DORA metrics mengukur velocity dan stability: deployment frequency, lead time, change failure rate, time to restore.',
  ],
  references: ch08References,
  lesson: ch08Lesson,
  quiz: ch08Quiz,
}
