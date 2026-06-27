import type { Course } from '@/content/types'
import { databaseIntermediateMeta } from './meta'
import { ch01QueryOptimization } from './chapters'
import { ch02ExplainExecutionPlans } from './chapters'
import { ch03IndexingLanjutan } from './chapters'
import { ch04ConnectionPoolingResourceManagement } from './chapters'
import { ch05SchemaMigrations } from './chapters'
import { ch06OrmVsRawSqlVsQueryBuilder } from './chapters'
import { ch07NosqlOverview } from './chapters'
import { ch08BackupRecoveryMonitoring } from './chapters'

export const databaseIntermediate: Course = {
  ...databaseIntermediateMeta,
  chapters: [
    ch01QueryOptimization,
    ch02ExplainExecutionPlans,
    ch03IndexingLanjutan,
    ch04ConnectionPoolingResourceManagement,
    ch05SchemaMigrations,
    ch06OrmVsRawSqlVsQueryBuilder,
    ch07NosqlOverview,
    ch08BackupRecoveryMonitoring,
  ],
}
