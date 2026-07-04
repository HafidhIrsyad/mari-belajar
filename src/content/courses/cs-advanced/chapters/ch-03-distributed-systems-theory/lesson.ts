import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-distributed-systems-theory',
  estimatedMinutes: 60,
  sections: [
    {
      id: 'sec-03-basic-fallacies',
      type: 'markdown',
      level: 'basic',
      title: 'Fallacies dan Model Konsistensi',
      content: `## Mengapa Distributed Systems Sulit?

**Distributed system** adalah kumpulan komputer independen yang koordinasi melalui jaringan untuk mencapai tujuan bersama. Tidak seperti program single-machine, kita tidak bisa mengasumsikan:

- Operasi atomic global
- Clock sinkron sempurna
- Kegagalan jarang terjadi

Peter Deutsch (Sun Microsystems) merumuskan **Eight Fallacies of Distributed Computing** — asumsi salah yang sering dibuat developer:

1. **The network is reliable** — paket hilang, timeout, partial failure adalah norma.
2. **Latency is zero** — setiap remote call punya delay; round-trip bisa puluhan ms hingga detik.
3. **Bandwidth is infinite** — transfer data besar mahal; serialization overhead signifikan.
4. **The network is secure** — man-in-the-middle, eavesdropping, spoofing mungkin terjadi.
5. **Topology doesn't change** — node join/leave, load balancer rebalance, failover terjadi.
6. **There is one administrator** — multi-team, multi-region, multi-cloud.
7. **Transport cost is zero** — setiap RPC punya biaya CPU, memory, dan jaringan.
8. **The network is homogeneous** — protokol, versi, dan kapabilitas node bervariasi.

## Consistency Models

**Consistency model** mendefinisikan jaminan apa yang diberikan sistem terhadap urutan dan visibilitas operasi read/write:

| Model | Jaminan | Contoh |
|-------|---------|--------|
| **Strong / Linearizable** | Operasi terlihat atomic, berurutan real-time | etcd, ZooKeeper (dengan quorum) |
| **Sequential** | Semua node melihat urutan operasi sama | Single leader replication |
| **Eventual** | Tanpa write baru, semua replica konvergen | DNS, Cassandra (tunable) |
| **Causal** | Operasi yang causally related terlihat berurutan | Vector clocks |

## Linearizability

**Linearizability** (strongest practical consistency) memastikan:

- Setiap operasi terlihat atomic — tidak ada interleaving parsial yang terlihat client.
- Urutan operasi konsisten dengan **real-time ordering**: jika operasi A selesai sebelum B dimulai, A harus terlihat sebelum B.

Contoh: jika client A menulis \`x=1\` dan selesai, lalu client B membaca \`x\`, B **harus** melihat 1 (bukan nilai stale). Ini mahal — membutuhkan coordination antar replica.`,
    },
    {
      id: 'sec-03-go-basic',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go-basic',
        filename: 'eventual_consistency.go',
        language: 'go',
        title: 'Go: Simulasi Eventual Consistency',
        code: `package main

import (
	"fmt"
	"time"
)

type Replica struct {
	Name    string
	Value   string
	Version int
}

func (r *Replica) Write(value string, version int) {
	if version > r.Version {
		r.Value = value
		r.Version = version
	}
}

func (r *Replica) Read() Replica {
	return *r
}

func main() {
	replicaA := &Replica{Name: "A"}
	replicaB := &Replica{Name: "B"}

	replicaA.Write("hello", 1)
	fmt.Println("Replica A:", replicaA.Read())
	fmt.Println("Replica B (stale):", replicaB.Read())

	go func() {
		time.Sleep(100 * time.Millisecond)
		replicaB.Write("hello", 1)
		fmt.Println("Replica B sync:", replicaB.Read())
	}()

	time.Sleep(200 * time.Millisecond)
}`,
        explanation:
          'Simulasi eventual consistency: replica B belum menerima write dari A. Client yang baca dari B melihat data stale sampai replikasi selesai.',
      },
    },
    {
      id: 'sec-03-intermediate-cap-pacelc',
      type: 'markdown',
      level: 'intermediate',
      title: 'CAP, PACELC, dan Outline Raft',
      content: `## Teorema CAP

Eric Brewer (2000) merumuskan **CAP theorem**:

- **Consistency (C)**: semua node melihat data yang sama pada waktu yang sama.
- **Availability (A)**: setiap request mendapat respons (success atau failure), tanpa menunggu.
- **Partition tolerance (P)**: sistem tetap beroperasi meski jaringan terpartisi.

**Teorema**: pada saat **network partition**, sistem hanya bisa menjamin **C atau A**, tidak keduanya.

Contoh trade-off:

- **CP** (Consistency + Partition tolerance): etcd, ZooKeeper — saat partisi, tolak write untuk menjaga konsistensi.
- **AP** (Availability + Partition tolerance): Cassandra, Dynamo — saat partisi, terima write lokal, reconcile nanti (eventual consistency).

## PACELC

Daniel Abadi memperluas CAP dengan **PACELC**:

> If **P**artition, trade-off **A**vailability vs **C**onsistency; **E**lse, trade-off **L**atency vs **C**onsistency.

Saat **tidak ada partisi**, sistem tetap trade-off: strong consistency (quorum read/write) vs low latency (read dari replica lokal).

## Raft Consensus — Outline

**Raft** (Ongaro & Ousterhout, 2014) menyederhanakan Paxos dengan desain yang mudah dipahami. Tiga sub-problem:

### 1. Leader Election

- Node dalam state: **Follower**, **Candidate**, **Leader**.
- Follower timeout → jadi Candidate, minta vote.
- Majority vote → jadi Leader.
- Leader period (term) — setiap term paling banyak satu Leader.

### 2. Log Replication

- Client kirim command ke Leader.
- Leader append entry ke log lokal, replicate ke Follower.
- Entry **committed** setelah majority acknowledge.
- Leader apply committed entry ke state machine, balas client.

### 3. Safety

- **Election restriction**: hanya node dengan log up-to-date bisa jadi Leader.
- **Log matching**: jika dua entry di index sama dengan term sama, isinya identik.
- **Leader completeness**: entry committed pasti ada di log Leader term berikutnya.

Raft dipakai etcd, Consul, CockroachDB (dengan modifikasi), dan banyak sistem modern.

> **Praktik:** Untuk implementasi arsitektur terdistribusi di backend, lihat [Distributed Systems Basics](/courses/backend-advanced/ch-01-distributed-systems-basics). Untuk CAP, replication, dan distributed transactions di database, lihat [CAP Theorem & Distributed Databases](/courses/database-advanced/ch-03-cap-theorem-distributed-databases) dan [Distributed Transactions](/courses/database-advanced/ch-04-distributed-transactions).`,
    },
    {
      id: 'sec-03-go-intermediate',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go-intermediate',
        filename: 'vector_clock.go',
        language: 'go',
        title: 'Go: Vector Clock untuk Causal Ordering',
        code: `package main

import "fmt"

type VectorClock map[string]int

func increment(clock VectorClock, nodeID string) VectorClock {
	next := copyClock(clock)
	next[nodeID]++
	return next
}

func merge(a, b VectorClock) VectorClock {
	result := copyClock(a)
	for node, val := range b {
		if val > result[node] {
			result[node] = val
		}
	}
	return result
}

func happenedBefore(a, b VectorClock) bool {
	strictlyLess := false
	nodes := unionKeys(a, b)
	for _, node := range nodes {
		av, bv := a[node], b[node]
		if av > bv {
			return false
		}
		if av < bv {
			strictlyLess = true
		}
	}
	return strictlyLess
}

func copyClock(c VectorClock) VectorClock {
	out := make(VectorClock)
	for k, v := range c {
		out[k] = v
	}
	return out
}

func unionKeys(a, b VectorClock) []string {
	seen := make(map[string]bool)
	for k := range a {
		seen[k] = true
	}
	for k := range b {
		seen[k] = true
	}
	keys := make([]string, 0, len(seen))
	for k := range seen {
		keys = append(keys, k)
	}
	return keys
}

func main() {
	clockA := increment(VectorClock{}, "A")
	clockA = increment(clockA, "A")

	clockB := merge(clockA, VectorClock{})
	clockB = increment(clockB, "B")

	fmt.Println("A happened-before B?", happenedBefore(clockA, clockB))
}`,
        explanation:
          'Vector clock melacak causal dependency antar event. Event A happened-before B jika counter A ≤ B dan ada setidaknya satu strictly less. Concurrent events tidak comparable.',
      },
    },
    {
      id: 'sec-03-advanced-flp-raft',
      type: 'markdown',
      level: 'advanced',
      title: 'Vector Clocks, FLP Impossibility, dan Implikasi Desain',
      content: `## Lamport Clock vs Vector Clock

**Lamport clock** (logical clock): setiap node punya counter. Saat event lokal, increment. Saat receive message, set clock = max(local, received) + 1.

- **Keuntungan**: sederhana, total ordering.
- **Kelemahan**: tidak bisa deteksi **concurrent events** — \`a → b\` di Lamport clock tidak selalu berarti causal.

**Vector clock**: setiap node punya vector counter per node. Update saat local event, send (attach vector), receive (merge + increment). Dua event **concurrent** jika neither happened-before the other.

## FLP Impossibility

Fischer, Lynch, Paterson (1985) membuktikan:

> Tidak ada **deterministic** consensus algorithm yang **guaranteed terminate** di **fully asynchronous** system, meski hanya satu process crash.

Asumsi async: tidak ada bound on message delay; tidak ada reliable failure detector. Implikasi:

- Consensus praktis (Raft, Paxos) membutuhkan **partial synchrony** — eventually message delivered within bound, atau **failure detector** (heartbeat timeout).
- Leader election di Raft menggunakan randomized timeout untuk menghindari split vote deadlock.

## Quorum dan Majority

Raft dan sistem CP menggunakan **quorum**: operasi commit butuh acknowledgment dari **majority** (⌊n/2⌋ + 1) node.

- 3 node: butuh 2 untuk commit — toleransi 1 failure.
- 5 node: butuh 3 — toleransi 2 failure.

Trade-off: quorum meningkatkan latency (wait majority) dan consistency, tetapi mengurangi availability saat banyak node down.

## Desain Praktis

| Use Case | Consistency | Contoh |
|----------|-------------|--------|
| Distributed lock, config | Strong (linearizable) | etcd, Consul |
| Session store, cache | Eventual | Redis Cluster, Memcached |
| Financial transaction | Strong + transaction | Spanner, CockroachDB |
| Analytics, logging | Eventual, high throughput | Kafka, Cassandra |

Pilih model konsistensi berdasarkan **business requirement**, bukan default ke strongest — linearizability mahal dan sering tidak diperlukan.`,
    },
    {
      id: 'sec-03-go-advanced',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go-advanced',
        filename: 'raft_state.go',
        language: 'go',
        title: 'Go: Enum State Raft',
        code: `package main

import "fmt"

type NodeState int

const (
	Follower NodeState = iota
	Candidate
	Leader
)

func (s NodeState) String() string {
	switch s {
	case Follower:
		return "Follower"
	case Candidate:
		return "Candidate"
	case Leader:
		return "Leader"
	default:
		return "Unknown"
	}
}

func main() {
	var state NodeState = Follower
	fmt.Printf("Node mulai sebagai: %s\\n", state)

	state = Candidate
	fmt.Printf("Setelah timeout election: %s\\n", state)

	state = Leader
	fmt.Printf("Setelah menang vote majority: %s\\n", state)
}`,
        explanation:
          'Raft node berganti state: Follower (default) → Candidate (election timeout) → Leader (majority vote). Implementasi penuh meliputi log, term, dan RPC AppendEntries.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Distributed systems menghadapi partial failure, latency, dan asynchrony — jangan percaya fallacies jaringan. Linearizability memberikan jaminan terkuat; eventual consistency trade-off untuk availability dan latency. CAP memaksa pilihan C vs A saat partisi; PACELC memperluas ke latency. Raft menyelesaikan consensus dengan leader election dan log replication. Vector clocks melacak causal ordering; FLP membuktikan batas teoritis consensus di async system. Untuk praktik backend dan database, lihat bab terkait di backend-advanced dan database-advanced.',
    },
  ],
}
