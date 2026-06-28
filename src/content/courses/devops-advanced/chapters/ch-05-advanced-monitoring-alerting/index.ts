import type { Chapter } from '@/content/types'
import { ch05AdvancedMonitoringAlertingLesson } from './lesson'
import { ch05AdvancedMonitoringAlertingQuiz } from './quiz'
import { ch05AdvancedMonitoringAlertingReferences } from './references'

export const ch05AdvancedMonitoringAlerting: Chapter = {
  id: "ch-05-advanced-monitoring-alerting",
  slug: "ch-05-advanced-monitoring-alerting",
  order: 5,
  title: "Advanced Monitoring & Alerting",
  summary: "Menguasai Prometheus queries, Grafana dashboards, Alertmanager routing, SLO-based alerting, dan anomaly detection untuk observability production.",
  estimatedMinutes: 50,
  learningObjectives: [
      "Menulis PromQL query untuk metrik dan alerting.",
      "Merancang Grafana dashboard dan alert rules.",
      "Mengkonfigurasi Alertmanager routing dan silencing.",
      "Menerapkan SLO-based alerting dengan burn rate.",
      "Memahami anomaly detection dan AIOps intro."
  ],
  summaryPoints: [
      "Prometheus menyimpan time-series metrics dengan label sebagai dimensi.",
      "Grafana memvisualisasi metrik dan mendefinisikan alert rules.",
      "Alertmanager mengelola routing, grouping, silencing, dan on-call.",
      "SLO-based alerting mengurangi noise dengan fokus pada error budget.",
      "Anomaly detection mendeteksi pola abnormal tanpa threshold statis."
  ],
  references: ch05AdvancedMonitoringAlertingReferences,
  lesson: ch05AdvancedMonitoringAlertingLesson,
  quiz: ch05AdvancedMonitoringAlertingQuiz,
}
