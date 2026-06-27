import type { Chapter } from '@/content/types'
import { ch02Lesson } from './lesson'
import { ch02Quiz } from './quiz'
import { ch02References } from './references'

export const ch02ShardingPartitioning: Chapter = {
  id: "ch-02-sharding-partitioning",
  slug: "ch-02-sharding-partitioning",
  order: 2,
  title: "Sharding & Partitioning",
  summary: "Mempelajari teknik memecah data besar menjadi bagian-bagian lebih kecil melalui partitioning dan sharding, serta strategi pemilihan sharding key, rebalancing, dan penanganan cross-shard query.",
  estimatedMinutes: 60,
  learningObjectives: [
    "Membedakan partitioning dan sharding serta kapan masing-masing digunakan.",
    "Memilih sharding key yang menghindari hot shard.",
    "Memahami range, hash, dan list partitioning.",
    "Menjelaskan tantangan cross-shard join dan rebalancing.",
    "Mengenal Citus, Vitess, dan MongoDB sharded cluster.",
  ],
  summaryPoints: [
    "Partitioning membagi satu table dalam satu node; sharding membagi data ke banyak node.",
    "Sharding key yang buruk menyebabkan hot shard dan ketidakseimbangan beban.",
    "Range partitioning cocok untuk data time-series, hash partitioning untuk distribusi merata.",
    "Cross-shard join dan transaction lebih mahal dan kompleks.",
    "Rebalancing memindahkan data antar shard saat beban atau kapasitas berubah.",
  ],
  references: ch02References,
  lesson: ch02Lesson,
  quiz: ch02Quiz,
}
