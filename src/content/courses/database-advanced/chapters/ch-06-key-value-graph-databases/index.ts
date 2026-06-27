import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06KeyValueGraphDatabases: Chapter = {
  id: "ch-06-key-value-graph-databases",
  slug: "ch-06-key-value-graph-databases",
  order: 6,
  title: "Key-Value & Graph Databases",
  summary: "Mempelajari key-value store seperti Redis dan graph database seperti Neo4j, termasuk data structures, persistence, caching patterns, Redis Cluster, dan dasar Cypher serta graph algorithms.",
  estimatedMinutes: 60,
  learningObjectives: [
    "Memahami use case key-value store dan memilih struktur data Redis yang tepat.",
    "Menerapkan caching patterns seperti cache-aside dan write-through.",
    "Mengelola Redis persistence dan cluster.",
    "Memodelkan data sebagai graph dan menulis query Cypher dasar.",
    "Mengenal graph algorithms dan vector search intro.",
  ],
  summaryPoints: [
    "Key-value store optimal untuk lookup cepat, caching, session, dan leaderboard.",
    "Redis menyediakan struktur data rich: string, hash, list, set, sorted set, stream, bitmap, HyperLogLog.",
    "Redis Cluster menyediakan sharding dan high availability melalui hash slots.",
    "Graph database merepresentasikan relasi sebagai first-class citizen melalui node dan edge.",
    "Cypher adalah query language deklaratif untuk Neo4j berbasis pattern matching.",
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
