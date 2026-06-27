import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: 'lesson-ch-07-database-at-scale',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'sec-07-basic-scale-db',
      type: 'markdown',
      level: 'basic',
      title: 'Read Replicas dan Connection Pooling',
      content: `## Skala Database

Ketika beban melebihi kapasitas satu database server, kita perlu menskalakan. Strategi pertama biasanya:

- **Vertical scaling**: meningkatkan CPU/RAM/disk primary. Cepat tetapi terbatas.
- **Read replicas**: menyalin data ke satu atau lebih replika untuk melayani query baca.
- **Caching**: menyimpan hasil query sering diakses di memory.

## Read Replicas

Read replica adalah salinan database yang menerima stream perubahan dari primary. Aplikasi mengarahkan query tulis ke primary dan query baca ke replica.

Keuntungan:

- Mengurangi beban CPU dan I/O primary.
- Menurunkan latency dengan menempatkan replica dekat pengguna.
- Meningkatkan availability untuk read.

Tantangan:

- Replication lag: data di replica mungkin sedikit tertinggal. Aplikasi harus toleran terhadap eventual consistency.
- Query yang membutuhkan data mutakhir harus dibaca dari primary.

## Connection Pooling

Setiap koneksi database membutuhkan memori dan proses di server. Membuka koneksi baru setiap request sangat mahal. Connection pool menyimpan koneksi siap pakai. Parameter penting:

- **max open connections**: batas koneksi aktif.
- **max idle connections**: koneksi idle yang dipertahankan.
- **connection max lifetime**: batas usia koneksi sebelum diganti.`,
    },
    {
      id: 'sec-07-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'replica-router.js',
        language: 'javascript',
        title: 'JavaScript: Router Read/Write ke Primary dan Replica',
        code: `const { Pool } = require('pg')

const primary = new Pool({ connectionString: process.env.DATABASE_URL })
const replica = new Pool({ connectionString: process.env.REPLICA_URL })

async function getUser(id, preferFresh = false) {
  const pool = preferFresh ? primary : replica
  const result = await pool.query('SELECT id, name FROM users WHERE id = $1', [id])
  return result.rows[0]
}

async function createUser(name) {
  const result = await primary.query(
    'INSERT INTO users (name) VALUES ($1) RETURNING id, name',
    [name]
  )
  return result.rows[0]
}

module.exports = { getUser, createUser }`,
        explanation:
          'Aplikasi memilih pool berdasarkan jenis operasi: tulis ke primary, baca ke replica, dengan opsi baca fresh jika diperlukan.',
      },
    },
    {
      id: 'sec-07-intermediate-sharding',
      type: 'markdown',
      level: 'intermediate',
      title: 'Sharding, Partitioning, dan CQRS Read Model',
      content: `## Sharding

Sharding membagi data horizontal ke beberapa database (shard) berdasarkan shard key. Setiap shard menampung subset data dan berjalan sebagai database independen.

Strategi pemilihan shard key:

- **Hash sharding**: distribusi merata tetapi range query sulit.
- **Range sharding**: cocok untuk range query tetapi bisa menyebabkan hot shard.
- **Directory-based sharding**: lookup table memetakan key ke shard, fleksibel tetapi memerlukan metadata service.

Tantangan sharding:

- Cross-shard join dan transaction lebih kompleks.
- Rebalancing shard saat data tidak merata.
- Peningkatan latency karena routing tambahan.

## Partitioning

Partitioning membagi satu tabel besar menjadi partisi berdasarkan range, list, atau hash. Semua partisi tetap berada dalam satu database instance. Keuntungan:

- Query dapat memanfaatkan partition pruning.
- Maintenance lebih mudah (misalnya drop partisi lama).
- I/O lebih terdistribusi.

## CQRS Read Model

CQRS memisahkan model penulisan dan pembacaan. Read model dapat dioptimalkan untuk query spesifik, misalnya tabel denormalized atau materialized view yang diproyeksikan dari event stream. Read model bisa dihosting di database terpisah atau search engine seperti Elasticsearch.

Perhatikan bahwa read model eventual consistent dengan command model.`,
    },
    {
      id: 'sec-07-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'shard-router.ts',
        language: 'typescript',
        title: 'TypeScript: Router Sederhana untuk Hash Sharding',
        code: `type Shard = { id: number; url: string }

const shards: Shard[] = [
  { id: 0, url: 'postgres://shard0.local/db' },
  { id: 1, url: 'postgres://shard1.local/db' },
  { id: 2, url: 'postgres://shard2.local/db' },
]

function getShardForTenant(tenantId: string): Shard {
  const hash = hashCode(tenantId)
  return shards[Math.abs(hash) % shards.length]
}

function hashCode(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return hash
}

function getConnection(shard: Shard) {
  // Return pool for shard
  return { query: async (sql: string) => ({ rows: [] }) }
}

async function findTenant(tenantId: string) {
  const shard = getShardForTenant(tenantId)
  const db = getConnection(shard)
  return db.query('SELECT * FROM tenants WHERE id = ' + tenantId)
}

console.log(getShardForTenant('acme-corp'))`,
        explanation:
          'Router hash memetakan tenant ke shard tertentu. Fungsi hash harus stabil agar lokasi data tidak berubah antar request.',
      },
    },
    {
      id: 'sec-07-advanced-distributed-transactions',
      type: 'markdown',
      level: 'advanced',
      title: 'Distributed Transactions, 2PC, Saga, dan NewSQL',
      content: `## Distributed Transactions

Ketika transaksi melibatkan beberapa database atau service, ACID lokal tidak lagi cukup. Dibutuhkan protokol koordinasi.

## Two-Phase Commit (2PC)

2PC memiliki dua fase:

1. **Prepare**: coordinator menanyakan setiap participant apakah dapat commit.
2. **Commit/Rollback**: jika semua setuju, coordinator mengirim commit; jika ada yang menolak, rollback.

Kekuatan: atomicity. Kelemahan: blocking jika coordinator gagal, dan latency tinggi karena harus menunggu semua participant.

## Saga Pattern

Saga adalah urutan transaksi lokal yang masing-masing mempublish event atau memicu langkah berikutnya. Jika satu langkah gagal, saga menjalankan compensating transaction. Saga tidak menjamin isolasi seperti 2PC, tetapi lebih available dan scalable.

## NewSQL dan CockroachDB

NewSQL menggabungkan skalabilitas NoSQL dengan konsistensi SQL. Contoh: CockroachDB, YugabyteDB, TiDB. Mereka menggunakan distributed consensus (Raft/Paxos) untuk replikasi dan sharding otomatis. Aplikasi melihat satu cluster SQL logis meski data tersebar di banyak node.

## Under the Hood: Consistent Hashing

Consistent hashing adalah teknik memetakan key ke ring sehingga penambahan atau penghapusan shard hanya memindahkan sedikit data. Digunakan oleh sharded database dan distributed cache seperti Redis Cluster. Setiap shard memiliki rentang di ring; ketika shard ditambah, ia mengambil sebagian rentang dari tetangga terdekat.`,
    },
    {
      id: 'sec-07-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go',
        filename: 'main.go',
        language: 'go',
        title: 'Go: Konfigurasi Connection Pool',
        code: `package main

import (
	"database/sql"
	"log"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	db, err := sql.Open("postgres", "postgres://user:pass@primary.local/db?sslmode=require")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	db.SetMaxOpenConns(50)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(30 * time.Minute)
	db.SetConnMaxIdleTime(10 * time.Minute)

	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}

	log.Println("database pool configured")
}`,
        explanation:
          'Go database/sql secara default memiliki connection pool. Parameter ini mengontrol jumlah koneksi aktif, idle, dan umur maksimum agar tidak membebani database.',
      },
    },
    {
      id: 'sec-07-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Database at scale membutuhkan kombinasi replicas, pooling, partitioning, dan sharding. Untuk transaksi lintas service, saga lebih fleksibel daripada 2PC. NewSQL menawarkan SQL skalabel dengan distributed consensus di balik layar.',
    },
  ],
}
