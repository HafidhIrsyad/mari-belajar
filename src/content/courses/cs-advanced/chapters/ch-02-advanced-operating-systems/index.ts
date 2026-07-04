import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02AdvancedOperatingSystems: Chapter = {
  id: 'ch-02-advanced-operating-systems',
  slug: 'ch-02-advanced-operating-systems',
  order: 2,
  title: 'Advanced Operating Systems',
  summary:
    'Memahami pemisahan kernel dan user space, algoritma scheduling FCFS/Round Robin/CFS, context switch, page replacement LRU/clock, copy-on-write, serta mekanisme inode dan journaling filesystem.',
  estimatedMinutes: 55,
  learningObjectives: [
    'Membedakan mode kernel dan user space serta implikasinya terhadap keamanan dan stabilitas.',
    'Menganalisis algoritma scheduling FCFS, Round Robin, dan CFS pada workload berbeda.',
    'Menjelaskan biaya context switch dan faktor yang memengaruh overhead-nya.',
    'Membandingkan algoritma page replacement LRU dan clock algorithm.',
    'Menguraikan copy-on-write, struktur inode, dan journaling untuk konsistensi filesystem.',
  ],
  summaryPoints: [
    'Kernel berjalan di mode privileged; user space terisolasi sehingga crash aplikasi tidak merusak kernel.',
    'Scheduler menentukan proses mana yang mendapat CPU; FCFS sederhana, Round Robin adil, CFS responsif di Linux.',
    'Context switch menyimpan dan memulihkan state CPU saat berganti proses — overhead non-trivial.',
    'LRU mengganti page yang paling lama tidak diakses; clock algorithm adalah aproksimasi LRU yang efisien.',
    'Copy-on-write menunda duplikasi memori hingga write; journaling filesystem mencatat operasi sebelum commit.',
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
