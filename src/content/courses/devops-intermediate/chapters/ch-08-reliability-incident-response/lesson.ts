import type { Lesson } from '@/content/types'

export const ch08ReliabilityIncidentResponseLesson: Lesson = {
  id: "lesson-ch-08-reliability-incident-response",
  estimatedMinutes: 45,
  sections: [
    {
      id: "sec-08-basic-oncall",
      type: 'markdown',
      level: "basic",
      title: "On-Call, Severity, dan Communication Plan",
      content: "## On-Call\n\nOn-call adalah tanggung jawab tim untuk merespons insiden di luar jam kerja. Sistem on-call yang baik memiliki rotasi yang adil, compensation yang jelas, dan escalation path jika engineer pertama tidak dapat merespons.\n\n## Incident Severity\n\nSeverity mengklasifikasikan dampak insiden:\n\n- **SEV 1 (Critical)**: layanan down besar-besaran, dampak bisnis besar, memerlukan respons segera.\n- **SEV 2 (High)**: degradasi signifikan, fitur penting tidak berfungsi.\n- **SEV 3 (Medium)**: masalah kecil yang tidak memengaruhi banyak pengguna.\n- **SEV 4 (Low)**: pertanyaan, bug minor, atau masalah yang dapat ditangani di jam kerja.\n\n## Communication Plan\n\nKomunikasi saat insiden harus jelas dan teratur:\n\n- **Incident commander**: memimpin respons dan koordinasi.\n- **Communications lead**: mengupdate stakeholder dan pengguna.\n- **Status page**: halaman publik yang menunjukkan status layanan.\n- **Internal chat channel**: tempat diskusi real-time tim respons.",
    },
    {
      id: "sec-08-js-example",
      type: 'code-example',
      codeExample: {
        id: "code-08-js",
        filename: "severity-classifier.js",
        language: "javascript",
        title: "JavaScript: Klasifikasi Severity Insiden",
        code: "function classifyIncident(impact) {\n  if (impact.serviceDown && impact.affectedUsers > 0.5) return 'SEV-1'\n  if (impact.degraded && impact.affectedUsers > 0.1) return 'SEV-2'\n  if (impact.workaroundAvailable) return 'SEV-3'\n  return 'SEV-4'\n}\n\nconst incidents = [\n  { serviceDown: true, affectedUsers: 0.8, degraded: true, workaroundAvailable: false },\n  { serviceDown: false, affectedUsers: 0.05, degraded: true, workaroundAvailable: true },\n  { serviceDown: false, affectedUsers: 0, degraded: false, workaroundAvailable: true },\n]\n\nfor (const incident of incidents) {\n  console.log('Severity:', classifyIncident(incident))\n}",
        explanation: "Klasifikasi severity membantu tim menentukan prioritas dan respons time yang tepat berdasarkan dampak insiden.",
      },
    },
    {
      id: "sec-08-intermediate-runbooks",
      type: 'markdown',
      level: "intermediate",
      title: "Runbooks, Postmortem, dan Error Budgets",
      content: "## Runbooks\n\nRunbook adalah dokumentasi langkah demi langkah untuk menangani insiden tertentu. Runbook yang baik mencakup gejala, penyebab umum, perintah diagnostik, langkah mitigasi, dan kontak escalation. Runbook harus diuji dan diupdate secara berkala.\n\n## Blameless Postmortem\n\nPostmortem adalah analisis setelah insiden terselesaikan. Prinsip blameless berarti fokus pada sistem dan proses, bukan menyalahkan individu. Struktur umum:\n\n- Summary\n- Timeline\n- Impact\n- Root cause\n- Contributing factors\n- Action items dengan owner dan due date\n- Lessons learned\n\n## Error Budget\n\nError budget adalah toleransi kegagalan yang dapat dikonsumsi tim dalam satu periode. Dihitung dari SLO:\n\n`error budget = 100% - SLO target`\n\nJika SLO 99.9%, error budget adalah 0.1%. Tim dapat menggunakan error budget untuk menyeimbangkan reliability dengan kecepatan rilis. Jika budget habis, tim mengurangi risiko dan fokus pada stabilitas.\n\n## SLO, SLI, SLA\n\n- **SLI (Service Level Indicator)**: metrik kuantitatif seperti availability atau latency.\n- **SLO (Service Level Objective)**: target SLI, misalnya latency p99 < 200ms.\n- **SLA (Service Level Agreement)**: komitmen kepada pengguna dengan konsekuensi jika dilanggar.",
    },
    {
      id: "sec-08-ts-example",
      type: 'code-example',
      codeExample: {
        id: "code-08-ts",
        filename: "postmortem.ts",
        language: "typescript",
        title: "TypeScript: Template Blameless Postmortem",
        code: "interface TimelineEvent {\n  time: string\n  description: string\n  actor: string\n}\n\ninterface ActionItem {\n  owner: string\n  description: string\n  dueDate: string\n}\n\ninterface Postmortem {\n  id: string\n  title: string\n  severity: 'SEV-1' | 'SEV-2' | 'SEV-3' | 'SEV-4'\n  summary: string\n  timeline: TimelineEvent[]\n  rootCause: string\n  impact: string\n  actionItems: ActionItem[]\n  blameless: true\n}\n\nconst postmortem: Postmortem = {\n  id: 'INC-2026-042',\n  title: 'Checkout service latency spike',\n  severity: 'SEV-2',\n  summary: 'Latensi p99 checkout naik akibat query tanpa index setelah migration.',\n  timeline: [\n    { time: '08:00', description: 'Alert latensi aktif', actor: 'monitoring' },\n    { time: '08:15', description: 'Index ditambahkan', actor: 'dba' },\n    { time: '08:30', description: 'Metrik normal', actor: 'sre' },\n  ],\n  rootCause: 'Migration baru menambah query tanpa index.',\n  impact: 'Pengguna mengalami keterlambatan checkout selama 25 menit.',\n  actionItems: [\n    { owner: 'backend', description: 'Tambahkan migration lint untuk query plan', dueDate: '2026-07-10' },\n  ],\n  blameless: true,\n}\n\nconsole.log(JSON.stringify(postmortem, null, 2))",
        explanation: "Template ini memastikan postmortem mencakup timeline, root cause, impact, dan action items yang dapat ditindaklanjuti, tanpa menyalahkan individu.",
      },
    },
    {
      id: "sec-08-advanced-chaos",
      type: 'markdown',
      level: "advanced",
      title: "Chaos Engineering, Game Days, dan Resilience Patterns",
      content: "## Chaos Engineering\n\nChaos engineering adalah disiplin eksperimental untuk membangun kepercayaan pada kemampuan sistem menahan kondisi turbulent. Prinsipnya:\n\n1. Definisikan steady state.\n2. Bentuk hipotesis tentang bagaimana sistem merespons gangguan.\n3. Injeksikan gangguan terkontrol.\n4. Amati perbedaan steady state.\n5. Perbaiki dan ulangi.\n\n## Game Days\n\nGame day adalah latihan terjadwal di mana tim mensimulasikan insiden untuk menguji runbook, komunikasi, dan tooling. Game days membantu tim merespons lebih baik saat insiden nyata terjadi.\n\n## Resilience Patterns\n\n- **Circuit breaker**: mencegah cascading failure dengan membuka sirkuit saat dependency gagal.\n- **Bulkhead**: mengisolasi failure domain sehingga satu bagian yang gagal tidak memengaruhi seluruh sistem.\n- **Retry dengan backoff**: mengulang operasi yang gagal dengan jeda yang meningkat.\n- **Timeout**: membatasi waktu tunggu untuk mencegah resource exhaustion.\n- **Rate limiting**: membatasi beban ke sistem atau downstream.\n- **Graceful degradation**: tetap menyediakan fungsionalitas terbatas saat bagian sistem gagal.\n\n## Capacity Planning\n\nCapacity planning memastikan sistem memiliki resource yang cukup untuk menangani pertumbuhan beban. Metode:\n\n- **Trend analysis**: memproyeksikan pertumbuhan dari data historis.\n- **Load testing**: menguji batas sistem dengan beban sintetis.\n- **Headroom**: menjaga resource cadangan untuk lonjakan tak terduga.\n\n## Error Budget Policy\n\nKebijakan error budget menjelaskan apa yang terjadi saat budget tersisa atau habis. Contoh: jika budget habis, semua deploy non-kritis dihentikan sampai SLO pulih.",
    },
    {
      id: "sec-08-advanced-example",
      type: 'code-example',
      codeExample: {
        id: "code-08-advanced",
        filename: "runbook-checkout-latency.md",
        language: "text",
        title: "Runbook: Latency Spike pada Checkout Service",
        code: "# Runbook: Checkout Service Latency Spike\n\n**Severity:** SEV-2\n**On-call:** SRE + Backend\n**Dashboard:** https://grafana.example.com/d/checkout-latency\n\n## Symptoms\n- Alert: `checkout_p99_latency > 2s` aktif\n- Error rate checkout naik\n- Queue depth payment gateway meningkat\n\n## Diagnosis Steps\n1. Periksa dashboard latensi p50/p95/p99 — isolasi endpoint mana yang lambat\n2. Cek deployment terakhir: `kubectl rollout history deploy/checkout -n prod`\n3. Periksa query database: slow query log, connection pool usage\n4. Verifikasi dependency: payment gateway, inventory service health\n\n## Mitigation\n| Langkah | Perintah / Tindakan |\n|---------|---------------------|\n| Rollback deploy | `kubectl rollout undo deploy/checkout -n prod` |\n| Scale up | `kubectl scale deploy/checkout --replicas=6 -n prod` |\n| Enable circuit breaker | Toggle feature flag `checkout.circuit_breaker=true` |\n\n## Escalation\n- SEV-1 jika downtime > 30 menit atau revenue impact > threshold\n- Panggil incident commander via PagerDuty\n\n## Post-Incident\n- Buat blameless postmortem dalam 48 jam\n- Update runbook jika langkah baru ditemukan",
        explanation: "Runbook terstruktur memandu on-call engineer melalui diagnosis, mitigasi, dan eskalasi saat insiden. Dokumentasi ini mengurangi MTTR dan memastikan respons konsisten antar shift.",
      },
    },
    {
      id: "sec-08-summary",
      type: 'callout',
      calloutType: "info",
      content: "**Kesimpulan:** Reliability dan incident response memerlukan persiapan: runbook, on-call, postmortem blameless, error budgets, chaos engineering, dan capacity planning. SRE memadukan praktik software engineering dengan operasi untuk mencapai reliability yang berkelanjutan.",
    },
  ],
}
