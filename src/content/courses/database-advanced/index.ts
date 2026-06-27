import type { Course } from '@/content/types'
import { databaseAdvancedMeta } from './meta'
import {
  ch01Replication,
  ch02ShardingPartitioning,
  ch03CapTheoremDistributedDatabases,
  ch04DistributedTransactions,
  ch05NosqlLanjutanMongodbCassandra,
  ch06KeyValueGraphDatabases,
  ch07DataWarehouseOlap,
  ch08DatabaseSecurityCompliance,
} from './chapters'

export const databaseAdvanced: Course = {
  ...databaseAdvancedMeta,
  chapters: [
    ch01Replication,
    ch02ShardingPartitioning,
    ch03CapTheoremDistributedDatabases,
    ch04DistributedTransactions,
    ch05NosqlLanjutanMongodbCassandra,
    ch06KeyValueGraphDatabases,
    ch07DataWarehouseOlap,
    ch08DatabaseSecurityCompliance,
  ],
}
