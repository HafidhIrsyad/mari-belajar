import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-deployment-strategies',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'sec-07-basic-strategies',
      type: 'markdown',
      level: 'basic',
      title: 'Strategi Deployment Dasar',
      content: `## Mengapa Strategi Deployment Penting?

Strategi deployment menentukan bagaimana versi baru aplikasi diperkenalkan ke pengguna. Pilihan strategi memengaruhi downtime, risiko kegagalan, konsumsi resource, dan kemudahan rollback.

## Recreate Deployment

Versi lama dihentikan sepenuhnya, kemudian versi baru dijalankan.

- **Kelebihan**: sederhana, tidak memerlukan resource ekstra.
- **Kekurangan**: ada downtime selama deploy.
- **Cocok untuk**: development environment atau aplikasi yang memperbolehkan downtime singkat.

## Rolling Deployment

Instance diperbarui satu per satu (atau sekelompok kecil) hingga semua menjalankan versi baru.

- **Kelebihan**: tidak ada downtime total; resource tetap sama.
- **Kekurangan**: selama deploy ada campuran versi lama dan baru; rollback lebih lambat.
- **Cocok untuk**: stateless service dengan backward compatibility.

## Blue-Green Deployment

Dua environment identik: blue (aktif) dan green (tidak aktif). Versi baru dideploy ke green, diverifikasi, lalu traffic dialihkan dari blue ke green. Blue tetap tersedia untuk rollback instan.

- **Kelebihan**: rollback hampir instan; tidak ada campuran versi selama switch.
- **Kekurangan**: membutuhkan resource dua kali lipat.
- **Cocok untuk**: rilis kritis yang memerlukan rollback cepat.

## Canary Deployment

Sebagian kecil traffic dialihkan ke versi baru. Jika metrik baik, proporsi traffic ditingkatkan secara bertahap hingga 100%.

- **Kelebihan**: membatasi blast radius jika terjadi kegagalan; feedback berdasarkan metrik nyata.
- **Kekurangan**: lebih kompleks; memerlukan traffic splitting dan monitoring.
- **Cocok untuk**: layanan dengan banyak pengguna dan toleransi risiko rendah.`,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'rollout-simulator.js',
        language: 'javascript',
        title: 'JavaScript: Simulator Rolling Deployment',
        code: `function rollingDeploy(instances, newVersion, batchSize) {
  let updated = 0
  const result = instances.map((instance, index) => {
    if (updated < batchSize && instance.version !== newVersion) {
      updated++
      return { ...instance, version: newVersion }
    }
    return instance
  })

  const progress = result.filter((i) => i.version === newVersion).length
  console.log(\`Progress: \${progress}/\${result.length} instance diperbarui\`)
  return result
}

let cluster = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, version: 'v1.0.0' }))

while (cluster.some((i) => i.version !== 'v1.1.0')) {
  cluster = rollingDeploy(cluster, 'v1.1.0', 2)
}

console.log('Deployment selesai:', cluster)`,
        explanation:
          'Simulator ini memperbarui instance secara bertahap dalam batch. Rolling deployment menjaga sebagian instance tetap aktif sehingga layanan tidak down.',
      },
    },
    {
      id: 'sec-07-intermediate-canary',
      type: 'markdown',
      level: 'intermediate',
      title: 'Canary, Feature Flags, dan Traffic Splitting',
      content: `## Canary Deployment Detail

Canary deployment mengikuti alur:

1. Deploy versi baru ke subset kecil instance atau pod.
2. Arahkan sebagian kecil traffic, misalnya 1% atau 5%.
3. Pantau error rate, latency, dan business metrics.
4. Jika stabil, tingkatkan traffic secara bertahap (10%, 25%, 50%, 100%).
5. Jika terjadi regresi, rollback dengan mengarahkan traffic ke versi lama.

## Traffic Splitting

Traffic splitting dapat dilakukan di beberapa layer:

- **Load balancer**: berdasarkan weight atau header.
- **Service mesh**: Istio, Linkerd dapat mengatur traffic berdasarkan label, header, atau cookie.
- **API gateway**: Kong, NGINX, Envoy mendukung weighted routing.
- **DNS**: weighted DNS record (kurang presisi).

## Feature Flags vs Canary

Feature flags beroperasi di dalam aplikasi, mengontrol kode mana yang dieksekusi untuk pengguna tertentu. Canary beroperasi di infrastruktur, mengontrol versi aplikasi mana yang menerima traffic. Keduanya dapat dikombinasikan.

## Deployment Windows

Deployment window adalah waktu tertentu ketika deploy diizinkan, misalnya di luar jam sibuk. Meski masih umum, praktik modern lebih memilih continuous deployment dengan canary dan automated rollback.

## Health Check dan Readiness Probe

Sebelum menerima traffic, instance baru harus lulus readiness probe. Liveness probe memastikan instance masih berfungsi selama berjalan. Probe yang baik mencegah traffic dialihkan ke instance yang belum siap.`,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'deployment-strategy.ts',
        language: 'typescript',
        title: 'TypeScript: Model Deployment Strategy',
        code: `type DeploymentStrategy = 'recreate' | 'rolling' | 'blue-green' | 'canary'

interface DeploymentPlan {
  strategy: DeploymentStrategy
  targetVersion: string
  trafficSplit: Record<string, number>
  rollbackOnError: boolean
}

function describePlan(plan: DeploymentPlan): string {
  const notes: Record<DeploymentStrategy, string> = {
    recreate: 'Downtime singkat; sederhana',
    rolling: 'Tanpa downtime total; campuran versi selama deploy',
    'blue-green': 'Rollback instan; membutuhkan resource ganda',
    canary: 'Risk minimal; memerlukan traffic splitting dan monitoring',
  }

  const split = Object.entries(plan.trafficSplit)
    .map(([version, percent]) => \`\${version}: \${percent}%\`)
    .join(', ')

  return \`Strategi: \${plan.strategy}\\nDeskripsi: \${notes[plan.strategy]}\\nTraffic: \${split}\\nRollback otomatis: \${plan.rollbackOnError}\`
}

const plan: DeploymentPlan = {
  strategy: 'canary',
  targetVersion: 'v2.0.0',
  trafficSplit: { 'v1.9.0': 90, 'v2.0.0': 10 },
  rollbackOnError: true,
}

console.log(describePlan(plan))`,
        explanation:
          'Model ini merepresentasikan rencana deployment dengan traffic split. Canary dimulai dengan proporsi kecil ke versi baru dan dapat diperbesar jika metrik memenuhi syarat.',
      },
    },
    {
      id: 'sec-07-advanced-progressive',
      type: 'markdown',
      level: 'advanced',
      title: 'Progressive Delivery dan Automated Canary Analysis',
      content: `## Progressive Delivery

Progressive delivery adalah evolusi dari continuous delivery yang menggabungkan:

- Canary deployment.
- Feature flags.
- A/B testing.
- Automated rollback berdasarkan metrik.

Tujuannya: mengurangi risiko rilis sambil tetap mempercepat iterasi.

## Automated Canary Analysis (ACA)

ACA menggunakan metrik untuk secara otomatis menilai kesehatan versi baru. Alur umum:

1. Baseline: metrik versi lama diukur.
2. Canary: metrik versi baru diukur pada traffic kecil.
3. Statistical test: membandingkan metrik, misalnya Mann-Whitney U test untuk latency.
4. Decision: lanjutkan, rollback, atau perluas canary.

Tools seperti Spinnaker, Flagger, Argo Rollouts mendukung ACA.

## Rollback Strategies

Rollback dapat dilakukan di beberapa level:

- **Application level**: switch traffic ke versi lama.
- **Database level**: reversal migration atau compensating transaction.
- **Infrastructure level**: kembali ke snapshot atau previous artifact.
- **Feature flag level**: nonaktifkan fitur bermasalah.

## Database Deployment Considerations

Deployment aplikasi sering diikuti perubahan skema database. Praktik aman:

- **Backward compatible migration**: skema baru kompatibel dengan versi lama dan baru.
- **Expand-contract pattern**: tambah kolom/tabel (expand), migrasikan data, hapus yang lama (contract).
- **Avoid destructive changes** di deploy yang sama dengan rilis aplikasi.

## Deployment Verification

Setelah deploy, lakukan:

- Smoke test terhadap endpoint kritis.
- Synthetic monitoring untuk user journey penting.
- Perbandingan metrik versi lama dan baru.
- Pengecekan log error.

## SRE dan Error Budget dalam Deployment

Jika error budget tersisa banyak, tim dapat lebih agresif dengan canary. Jika error budget menipis, deployment baru harus lebih hati-hati atau ditunda.`,
    },
    {
      id: 'sec-07-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go',
        filename: 'canary-router.go',
        language: 'go',
        title: 'Go: Router Sederhana untuk Canary',
        code: `package main

import (
	"fmt"
	"math/rand"
	"net/http"
)

func canaryHandler(stable, canary http.Handler, canaryPercent int) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Query().Get("canary") == "true" {
			canary.ServeHTTP(w, r)
			return
		}
		if rand.Intn(100) < canaryPercent {
			canary.ServeHTTP(w, r)
			return
		}
		stable.ServeHTTP(w, r)
	})
}

func main() {
	stable := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "v1.0.0 stable")
	})
	canary := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "v2.0.0 canary")
	})

	handler := canaryHandler(stable, canary, 10)
	fmt.Println("Canary server di http://localhost:8080 (10% ke canary)")
	http.ListenAndServe(":8080", handler)
}`,
        explanation:
          'Router ini mengarahkan 10% traffic ke versi canary secara acak, kecuali ada query parameter canary=true. Pendekatan sering diperluas dengan weight berbasis header, cookie, atau service mesh.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Pilihan strategi deployment bergantung pada toleransi downtime, risiko, dan resource. Blue-green memberikan rollback instan, canary membatasi blast radius, dan progressive delivery mengotomatisasi keputusan berdasarkan metrik. Selalu siapkan rollback dan verifikasi pasca-deploy.',
    },
  ],
}
