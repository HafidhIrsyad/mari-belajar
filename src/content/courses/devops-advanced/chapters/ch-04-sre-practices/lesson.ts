import type { Lesson } from '@/content/types'

export const ch04SrePracticesLesson: Lesson = {
  id: 'lesson-ch-04-sre-practices',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-04-basic',
      type: 'markdown',
      level: 'basic',
      title: 'SLI, SLO, SLA, dan Error Budget',
      content: '## Definisi\n- **SLI (Service Level Indicator)**: metrik seperti availability, latency, throughput.\n- **SLO (Service Level Objective)**: target SLI, misalnya availability 99.9%.\n- **SLA (Service Level Agreement)**: komitmen ke pelanggan dengan konsekuensi jika tidak terpenuhi.\n\n## Error Budget\nJika SLO availability 99.9% per bulan, error budget Anda adalah 0.1% dari total request. Budget ini memungkinkan tim melakukan release dan eksperimen tanpa langsung melanggar SLO.',
    },
    {
      id: 'sec-04-js',
      type: 'code-example',
      codeExample: {
        id: 'code-04-js',
        filename: 'error-budget.js',
        language: 'javascript',
        title: 'JavaScript: Kalkulator Error Budget',
        code: 'function calculateErrorBudget(sloPercent, totalRequests) {\n  const errorBudget = (1 - sloPercent / 100) * totalRequests\n  const used = 12\n  return { total: errorBudget, remaining: errorBudget - used, used }\n}\n\nconst budget = calculateErrorBudget(99.9, 1_000_000)\nconsole.log(`Total budget: ${budget.total.toFixed(0)} errors`)\nconsole.log(`Remaining: ${budget.remaining.toFixed(0)}`)',
        explanation: 'Kalkulasi error budget dari SLO dan jumlah request.',
      },
    },
    {
      id: 'sec-04-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Toil Reduction, Monitoring for SLOs, dan Error Budget Policy',
      content: '## Toil Reduction\nToil adalah pekerjaan manual yang berulang dan tidak memerlukan kreativitas. Contoh: reset password manual, deploy via klik UI, membersihkan log. SRE mengurangi toil melalui otomasi, self-service, dan tooling.\n\n## Monitoring for SLOs\nDashboard SLO harus menunjukkan burn rate dan remaining budget. Alert sebaiknya berbasis SLO, bukan hanya threshold sederhana.\n\n## Error Budget Policy\nKebijakan yang menjelaskan:\n- Siapa yang bertanggung jawab.\n- Apa yang terjadi saat budget terbakar cepat.\n- Proses eskalasi.',
    },
    {
      id: 'sec-04-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-04-ts',
        filename: 'burn-rate.ts',
        language: 'typescript',
        title: 'TypeScript: Burn Rate Alert',
        code: 'type BurnRateAlert = {\n  severity: \'page\' | \'ticket\'\n  multiplier: number\n  window: string\n}\n\nconst alerts: BurnRateAlert[] = [\n  { severity: \'page\', multiplier: 14.4, window: \'1h\' },\n  { severity: \'page\', multiplier: 6, window: \'6h\' },\n  { severity: \'ticket\', multiplier: 2, window: \'3d\' },\n]\n\nfunction burnRate(budgetUsed: number, elapsedHours: number, periodHours: number): number {\n  return (budgetUsed / elapsedHours) * periodHours\n}\n\nconsole.log(burnRate(0.02, 1, 720))',
        explanation: 'Burn rate mengukur seberapa cepat error budget terpakai relatif terhadap periode SLO.',
      },
    },
    {
      id: 'sec-04-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Error Budget Policy, Capacity Planning, dan Reliability Roadmap',
      content: '## Error Budget Policy Lanjutan\nKebijakan dapat memasukkan multi-tier SLO, graceful degradation, dan freeze release saat budget habis. Tujuannya bukan menghindari kegagalan, melainkan mengelola risiko kegagalan secara eksplisit.\n\n## Capacity Planning\nProyeksikan pertumbuhan traffic, resource usage, dan bottleneck. Gunakan load test dan historical data. Capacity planning terkait dengan reliability: kekurangan kapasitas menyebabkan SLO violation.\n\n## Reliability Roadmap\nPrioritaskan pekerjaan berdasarkan risiko kegagalan, frekuensi toil, ketergantungan antar sistem, dan hasil postmortem.',
    },
    {
      id: 'sec-04-advanced-example',
      type: 'code-example',
      codeExample: {
        id: 'code-04-advanced',
        filename: 'slo-error-budget.yaml',
        language: 'yaml',
        title: 'Konfigurasi SLO dan Error Budget Policy',
        code: `# slo-config.yaml — definisi SLO dan kebijakan error budget

service: checkout-api
slo:
  target: 99.9
  window: 30d
  indicators:
    - name: availability
      good_events: http_requests_total{status!~"5.."}
      total_events: http_requests_total
    - name: latency
      good_events: http_request_duration_seconds_bucket{le="0.5"}
      total_events: http_request_duration_seconds_count

error_budget:
  # 99.9% SLO = 0.1% error budget = ~43 menit downtime/bulan
  total_minutes: 43
  burn_rate_alerts:
    - severity: page
      multiplier: 14.4
      window: 1h
    - severity: page
      multiplier: 6
      window: 6h
    - severity: ticket
      multiplier: 2
      window: 3d

policy:
  budget_remaining_above_50pct:
    action: deploy_as_usual
  budget_remaining_below_25pct:
    action: freeze_non_critical_deploys
  budget_exhausted:
    action: halt_all_deploys_until_recovery`,
        explanation:
          'Konfigurasi SLO dan error budget policy mendefinisikan target reliability, alert burn rate, dan tindakan saat budget habis. Kebijakan eksplisit membantu tim menyeimbangkan velocity deploy dengan risiko kegagalan.',
      },
    },
    {
      id: 'sec-04-callout',
      type: 'callout',
      calloutType: 'info',
      content: '**Kesimpulan:** SLO harus realistis dan disepakati bersama tim produk. Error budget adalah alat untuk menyeimbangkan velocity dan reliability.',
    },
  ],
}
