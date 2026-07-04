import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-distributed-scalability-theory',
  estimatedMinutes: 52,
  sections: [
    {
      id: 'sec-07-basic-littles-law',
      type: 'markdown',
      level: 'basic',
      title: 'Little\'s Law dan Teori Antrian Dasar',
      content: `## Little's Law

**Little's Law** adalah hubungan fundamental dalam teori antrian yang berlaku untuk sistem stabil:

\`\`\`text
L = λ × W

L = jumlah rata-rata item dalam sistem (queue + service)
λ = arrival rate (item per satuan waktu)
W = waktu rata-rata item tinggal dalam sistem (latency)
\`\`\`

Contoh: API menerima 1000 request/detik (λ), latency rata-rata 200ms (W = 0.2s):

\`\`\`text
L = 1000 × 0.2 = 200 request "in flight" pada saat steady state
\`\`\`

Little's Law **tidak bergantung** pada distribusi arrival atau service time. Ini alat diagnostik: jika latency naik tanpa perubahan load, ada bottleneck; jika L meningkat, sistem kelebihan kapasitas.

## Model Antrian M/M/1

Model sederhana: **M/M/1** (Markovian arrival, Markovian service, 1 server).

\`\`\`text
Utilization ρ = λ/μ   (μ = service rate)

W = 1 / (μ - λ)       (latency rata-rata, ρ < 1)
L = λ / (μ - λ)       (jumlah dalam sistem)
\`\`\`

Ketika ρ → 1 (utilization mendekati 100%), latency **meledak** secara non-linear. Inilah alasan sistem production menjaga utilization di bawah 70–80%.

## Implikasi untuk Sistem Terdistribusi

- **Over-provisioning**: tambah kapasitas (μ) untuk menurunkan ρ.
- **Load shedding**: tolak request saat antrian penuh (circuit breaker).
- **Horizontal scaling**: tambah server (M/M/c model) untuk meningkatkan μ total.`,
    },
    {
      id: 'sec-07-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go-basic',
        filename: 'littles_law.go',
        language: 'go',
        title: 'Go: Simulasi Little\'s Law',
        code: `package main

import "fmt"

type QueueMetrics struct {
	InFlight    float64
	ArrivalRate float64
	Latency     float64
}

func littlesLaw(arrivalRatePerSec, avgLatencySec float64) QueueMetrics {
	return QueueMetrics{
		InFlight:    arrivalRatePerSec * avgLatencySec,
		ArrivalRate: arrivalRatePerSec,
		Latency:     avgLatencySec,
	}
}

func mm1Latency(serviceRate, arrivalRate float64) float64 {
	rho := arrivalRate / serviceRate
	if rho >= 1 {
		return -1 // tidak stabil
	}
	return 1 / (serviceRate - arrivalRate)
}

func main() {
	metrics := littlesLaw(500, 0.15)
	fmt.Printf("in-flight: %.0f req\\n", metrics.InFlight)

	latency := mm1Latency(600, 500)
	fmt.Printf("M/M/1 latency: %.4f s (ρ=0.833)\\n", latency)
}`,
        explanation:
          'Little\'s Law menghitung request in-flight. Model M/M/1 memprediksi latency naik drastis saat utilization mendekati 100%.',
      },
    },
    {
      id: 'sec-07-intermediate-consistency-latency',
      type: 'markdown',
      level: 'intermediate',
      title: 'Trade-off Konsistensi dan Latency',
      content: `## Spektrum Konsistensi

Dalam sistem terdistribusi, **konsistensi** dan **latency** sering bertrade-off:

| Model | Deskripsi | Latency | Contoh |
|-------|-----------|---------|--------|
| Strong consistency | Semua node melihat data sama | Tinggi (koordinasi) | Spanner, etcd |
| Eventual consistency | Konvergen setelah periode | Rendah | DynamoDB, Cassandra |
| Causal consistency | Mempertahankan urutan sebab-akibat | Sedang | MongoDB causal sessions |
| Read-your-writes | User selalu baca tulisannya sendiri | Sedang | Session stickiness |

## CAP Theorem (Ringkasan)

**CAP**: sistem terdistribusi hanya dapat menjamin **dua dari tiga** saat network partition:

- **C** — Consistency: semua node melihat data yang sama.
- **A** — Availability: setiap request mendapat respons (sukses/gagal).
- **P** — Partition tolerance: sistem tetap beroperasi meski jaringan terpartisi.

Dalam praktik, partition **akan** terjadi, sehingga pilihan nyata adalah **CP** (konsisten, mungkin unavailable) vs **AP** (available, mungkin inconsistent).

## PACELC Theorem

**PACELC** (Abadi, 2012) memperluas CAP:

\`\`\`text
If Partition (P):
  choose Availability (A) or Consistency (C)
Else (normal operation):
  choose Latency (L) or Consistency (C)
\`\`\`

Contoh:
- **Dynamo/Cassandra**: PA/EL — available saat partition, pilih latency over consistency saat normal.
- **Bigtable/HBase**: PC/EC — konsisten saat partition, konsisten meski latency lebih tinggi saat normal.
- **Spanner**: PC/EC dengan TrueTime — mendekati strong consistency dengan latency terkontrol.

Trade-off konsistensi-latency bukan binary; desain sistem memilih titik di spektrum sesuai kebutuhan bisnis.`,
    },
    {
      id: 'sec-07-intermediate-quorum',
      type: 'markdown',
      level: 'intermediate',
      title: 'Quorum Reads dan Writes',
      content: `## Konsep Quorum

Dalam replikasi **N** node, **quorum** menentukan berapa node yang harus berpartisipasi agar operasi read (R) atau write (W) dianggap sukses.

\`\`\`text
N = jumlah replika
R = jumlah node untuk read quorum
W = jumlah node untuk write quorum
\`\`\`

### Aturan Quorum Klasik

1. **R + W > N** → read dan write quorum overlap → **strong consistency** (read selalu melihat write terbaru).
2. **R + W ≤ N** → overlap tidak dijamin → **eventual consistency** dengan performa lebih baik.

Contoh N=3:
- W=2, R=2 → 2+2=4 > 3 → consistent read.
- W=1, R=1 → 1+1=2 ≤ 3 → fast but stale read possible.

### Sloppy Quorum dan Hinted Handoff

Saat node down, **sloppy quorum** menulis ke node pengganti (hinted handoff) agar availability terjaga. Data dikembalikan ke node asli saat recovery.

### Tunable Consistency

Cassandra memungkinkan per-query consistency level:
- \`ONE\`: W=1 atau R=1 — cepat, mungkin stale.
- \`QUORUM\`: W=⌊N/2⌋+1 — seimbang.
- \`ALL\`: W=N — lambat, strongest.

Quorum adalah mekanisme teoretis yang memungkinkan trade-off eksplisit antara konsistensi dan availability/latency.`,
    },
    {
      id: 'sec-07-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go-intermediate',
        filename: 'quorum.go',
        language: 'go',
        title: 'Go: Konfigurasi Quorum Replikasi',
        code: `package main

import "fmt"

type QuorumConfig struct {
	Replicas    int
	WriteQuorum int
	ReadQuorum  int
}

func isStronglyConsistent(c QuorumConfig) bool {
	return c.ReadQuorum+c.WriteQuorum > c.Replicas
}

func main() {
	configs := []QuorumConfig{
		{Replicas: 3, WriteQuorum: 2, ReadQuorum: 2},
		{Replicas: 5, WriteQuorum: 3, ReadQuorum: 3},
		{Replicas: 3, WriteQuorum: 1, ReadQuorum: 1},
	}

	for _, c := range configs {
		label := "eventual"
		if isStronglyConsistent(c) {
			label = "strong"
		}
		fmt.Printf("N=%d W=%d R=%d → %s\\n", c.Replicas, c.WriteQuorum, c.ReadQuorum, label)
	}
}`,
        explanation:
          'R + W > N menjamin overlap antara read dan write quorum sehingga read selalu menemukan versi terbaru. R + W ≤ N memungkinkan operasi lebih cepat dengan risiko stale read.',
      },
    },
    {
      id: 'sec-07-advanced-bft-pacelc',
      type: 'markdown',
      level: 'advanced',
      title: 'Byzantine Fault Tolerance dan PACELC',
      content: `## Crash Fault vs Byzantine Fault

- **Crash fault**: node berhenti merespons (fail-stop). Toleransi f crash fault butuh **2f+1** replika (majority voting).
- **Byzantine fault**: node dapat berperilaku arbitrer — mengirim data salah, menolak kooperasi, atau koordinasi serangan. Toleransi f Byzantine fault butuh **3f+1** replika.

### The Byzantine Generals Problem

N generali harus sepakat attack/retreat meski ada pengkhianat (traitor) yang mengirim pesan kontradiktif. Lamport, Shostak & Pease (1982) membuktikan solusi membutuhkan **≥ 3f+1** generali untuk toleransi f traitor.

### PBFT (Practical Byzantine Fault Tolerance)

PBFT (Castro & Liskov, 1999) mencapai konsensus BFT dengan:

1. **Pre-prepare**: leader usulkan request.
2. **Prepare**: replika broadcast prepare.
3. **Commit**: replika broadcast commit setelah cukup prepare.

Kompleksitas komunikasi O(n²) per request — praktis untuk n kecil (blockchain validator, consortium chain).

### Blockchain dan BFT

- **Proof of Work**: toleransi Byzantine via economic cost, bukan quorum voting.
- **Tendermint/Cosmos**: BFT consensus dengan 2/3+1 validator set.
- **Hyperledger Fabric**: pluggable consensus termasuk BFT untuk enterprise.

## PACELC dalam Praktik

| Sistem | P | Else | Interpretasi |
|--------|---|------|--------------|
| DynamoDB | A | L | Available saat partition; latency over consistency |
| MongoDB | A | C (configurable) | Default available; bisa set write concern majority |
| Google Spanner | C | C | Strong consistency; TrueTime untuk global ordering |
| Redis Cluster | A | L | Async replication; fast reads |

Memahami PACELC membantu memilih dan mengkonfigurasi sistem sesuai SLA: apakah bisnis toleransi stale read, atau latency 500ms tidak dapat diterima?`,
    },
    {
      id: 'sec-07-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go-advanced',
        filename: 'bft_quorum.go',
        language: 'go',
        title: 'Go: Byzantine Fault Tolerance — Quorum 3f+1',
        code: `package main

import "fmt"

func minReplicasForBFT(f int) int {
	return 3*f + 1
}

func quorumSize(n int) int {
	return (n / 2) + 1
}

func main() {
	for _, f := range []int{1, 2, 3} {
		n := minReplicasForBFT(f)
		q := quorumSize(n)
		fmt.Printf("f=%d traitor → butuh %d replika, quorum=%d\\n", f, n, q)
	}
	// f=1 → 4 replika, quorum=3 (2/3+1 untuk BFT consensus)
}`,
        explanation:
          'Byzantine fault tolerance butuh minimal 3f+1 replika untuk toleransi f node traitor. Quorum majority (⌊n/2⌋+1) adalah fondasi voting di Raft; BFT membutuhkan 2f+1 dari 3f+1.',
      },
    },
    {
      id: 'sec-07-cross-link',
      type: 'callout',
      calloutType: 'tip',
      content:
        '**Implementasi Praktis:** Teori skalabilitas terdistribusi diterapkan di Backend Advanced: [Caching Strategies](/courses/backend-advanced/ch-02-caching-strategies), [Message Queues & Event-Driven](/courses/backend-advanced/ch-03-message-queues-event-driven-architecture), [Rate Limiting & Throttling](/courses/backend-advanced/ch-04-rate-limiting-throttling), [Scalability & Reliability](/courses/backend-advanced/ch-05-scalability-reliability), dan [API Gateway & Service Mesh](/courses/backend-advanced/ch-06-api-gateway-service-mesh).',
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Skalabilitas terdistribusi membutuhkan analisis kuantitatif (Little\'s Law, queueing) dan pemahaman trade-off (konsistensi-latency, quorum, BFT, PACELC). Tidak ada konfigurasi universal — pilihan bergantung pada SLA, pola akses, dan toleransi failure domain.',
    },
  ],
}
