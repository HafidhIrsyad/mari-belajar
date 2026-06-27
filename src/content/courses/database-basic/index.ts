import type { Course } from '@/content/types'
import { databaseBasicMeta } from './meta'
import {
  ch01RelationalModelErDiagram,
  ch02SqlCrudDdl,
  ch03JoinsAggregationsSubqueries,
  ch04Normalisasi,
  ch05BtreesStorageEnginesIndexInternals,
  ch06TransactionsAcid,
  ch07ViewsFunctionsTriggers,
  ch08DatabaseDesignProject,
} from './chapters'

export const databaseBasic: Course = {
  ...databaseBasicMeta,
  chapters: [
    ch01RelationalModelErDiagram,
    ch02SqlCrudDdl,
    ch03JoinsAggregationsSubqueries,
    ch04Normalisasi,
    ch05BtreesStorageEnginesIndexInternals,
    ch06TransactionsAcid,
    ch07ViewsFunctionsTriggers,
    ch08DatabaseDesignProject,
  ],
}
