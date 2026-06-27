import type { Lesson } from '@/content/types'

export const ch04Lesson: Lesson = {
  id: "lesson-ch-04-connection-pooling-resource-management",
  estimatedMinutes: 50,
  sections: [
    {
      id: "sec-04-$1",
      type: 'markdown',
      level: 'basic',
      title: "Pengantar Connection Pooling & Resource Management",
      content: `## Lifecycle Koneksi

Membuka koneksi database melibatkan:

1. Resolusi DNS dan TCP handshake.
2. TLS negotiation (jika SSL).
3. Autentikasi.
4. Alokasi proses/backend (PostgreSQL) atau thread (MySQL).
5. Alokasi memory untuk buffer pribadi.

Proses ini memakan waktu dan resource. Pooling mempertahankan koneksi siap pakai.

## Client-Side Pool

Di aplikasi, library seperti HikariCP (JVM), \`database/sql\` (Go), atau \`pg.Pool\` (Node.js) menyimpan koneksi yang sudah dibuka. Parameter penting:

- **minimumIdle / min**: koneksi idle minimal.
- **maximumPoolSize / max**: batas koneksi maksimum per instance aplikasi.
- **connectionTimeout**: waktu maksimal menunggu koneksi dari pool.
- **idleTimeout / maxLifetime**: durasi koneksi idle atau total hidup.

## Server-Side Pool

Server-side pool seperti **PgBouncer** atau **Pgpool** duduk di antara aplikasi dan database. Mereka dapat mengelola ribuan koneksi aplikasi dengan sedikit koneksi backend. Mode PgBouncer:

- **Session pooling**: satu koneksi backend per koneksi client selama session.
- **Transaction pooling**: backend dipinjamkan per transaksi, lebih efisien tetapi ada batasan prepared statements.`,
    },
    {
      id: "sec-04-$1",
      type: 'code-example',
      codeExample: {
        id: "code-04-js",
        filename: "pool-simulator.js",
        language: 'javascript',
        title: "JavaScript: Simulasi Pool Sizing",
        code: "function recommendPoolSize(requestsPerSecond, avgQueryTimeMs, targetUtilization = 0.8) {\n  // Little's Law: L = λ × W\n  const avgConcurrency = requestsPerSecond * (avgQueryTimeMs / 1000)\n  return Math.ceil(avgConcurrency / targetUtilization)\n}\n\nconsole.log(recommendPoolSize(1000, 50))\n// ~63 koneksi untuk 1.000 req/s dengan rata-rata 50 ms\n\nconsole.log(recommendPoolSize(100, 200))\n// ~25 koneksi",
        explanation: "Perhitungan Little's Law memberikan titik awal sizing; faktor lain seperti jumlah instance aplikasi juga penting.",
      },
    },
    {
      id: "sec-04-$1",
      type: 'markdown',
      level: 'intermediate',
      title: "Konsep Menengah Connection Pooling & Resource Management",
      content: `## Sizing Pool dengan Little's Law

Little's Law: \`L = λ × W\`

- \`L\`: jumlah koneksi yang dibutuhkan.
- \`λ\`: arrival rate (request per detik).
- \`W\`: waktu rata-rata query dalam detik.

Contoh: 500 req/s × 0.02 s = 10 koneksi. Jika ada 10 instance aplikasi, total client-side pool 100. Gunakan PgBouncer untuk membatasi koneksi backend.

## PgBouncer Transaction Pooling

Mode transaction pooling meminjamkan backend hanya selama satu transaksi. Keuntungan:

- Backend dapat melayani banyak client secara bergantian.
- Cocok untuk aplikasi dengan banyak koneksi idle.

Keterbatasan:

- Prepared statements harus dinonaktifkan atau dikerjakan dengan care.
- SET session variables tidak bertahan antar transaksi.

## Timeouts

- **statement_timeout**: membatalkan query yang berjalan terlalu lama.
- **idle_in_transaction_session_timeout**: menghentikan transaksi yang terbuka tanpa aktivitas.
- **tcp_keepalives_idle**: mendeteksi koneksi mati.`,
    },
    {
      id: "sec-04-$1",
      type: 'code-example',
      codeExample: {
        id: "code-04-ts",
        filename: "pool-config.ts",
        language: 'typescript',
        title: "TypeScript: Konfigurasi Connection Pool",
        code: "interface PoolConfig {\n  min: number\n  max: number\n  acquireTimeoutMillis: number\n  idleTimeoutMillis: number\n  statementTimeoutMillis: number\n}\n\nfunction validatePool(config: PoolConfig): string[] {\n  const errors: string[] = []\n  if (config.min > config.max) {\n    errors.push(\"min tidak boleh lebih besar dari max\")\n  }\n  if (config.max > 100) {\n    errors.push(\"pertimbangkan PgBouncer jika max > 100 per instance\")\n  }\n  if (config.idleTimeoutMillis > config.acquireTimeoutMillis) {\n    errors.push(\"idleTimeout sebaiknya tidak melebihi acquireTimeout\")\n  }\n  return errors\n}\n\nconst cfg: PoolConfig = {\n  min: 5,\n  max: 20,\n  acquireTimeoutMillis: 5000,\n  idleTimeoutMillis: 30000,\n  statementTimeoutMillis: 30000,\n}\n\nconsole.log(validatePool(cfg))",
        explanation: "Validator ini membantu menghindari konfigurasi pool yang kontra-produktif sebelum masuk production.",
      },
    },
    {
      id: "sec-04-$1",
      type: 'markdown',
      level: 'advanced',
      title: "Internal Lanjutan Connection Pooling & Resource Management",
      content: `## Proses per Koneksi di PostgreSQL

PostgreSQL menggunakan model **one process per connection**. Setiap backend mengonsumsi:

- Shared memory untuk catalogs dan locks.
- Private memory untuk sort, joins, dan prepared plans (terbatas oleh \`work_mem\`).
- File descriptors dan locks.

Karena itu \`max_connections\` tidak boleh terlalu tinggi. Solusi:

1. Gunakan PgBouncer untuk multiplexing.
2. Naikkan \`work_mem\` hati-hati karena dapat digunakan per operation per query.
3. Pantau \`pg_stat_activity\` untuk idle connections.

## Async Connection dan Multiplexing

Driver modern seperti \`pgx\` (Go) dan asyncpg (Python) mendukung concurrent queries tanpa satu koneksi per query. Namun satu koneksi tetap menjalankan satu query pada satu waktu; untuk true multiplexing diperlukan connection pool.

## Resource Queues dan Admission Control

Di PostgreSQL, \`pg_bouncer\` atau middleware dapat mengimplementasikan admission control: antrekan request ketika semua backend sibuk. Ini mencegah database overload dan degradasi latensi.

## Backpressure

Ketika pool habis, aplikasi harus:

- Mengantre request dengan timeout.
- Mengembalikan error 503/429 daripada menunggu tanpa batas.
- Melakukan circuit breaker untuk downstream database.`,
    },
    {
      id: "sec-04-$1",
      type: 'code-example',
      codeExample: {
        id: "code-04-go",
        filename: "main.go",
        language: 'go',
        title: "Go: Konfigurasi sql.DB Pool",
        code: "package main\n\nimport (\n\t\"database/sql\"\n\t\"fmt\"\n\t\"time\"\n\n\t_ \"github.com/lib/pq\"\n)\n\nfunc main() {\n\tdb, err := sql.Open(\"postgres\", \"postgres://user:pass@localhost/shop?sslmode=disable\")\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tdefer db.Close()\n\n\tdb.SetMaxOpenConns(20)\n\tdb.SetMaxIdleConns(5)\n\tdb.SetConnMaxLifetime(30 * time.Minute)\n\tdb.SetConnMaxIdleTime(10 * time.Minute)\n\n\tstats := db.Stats()\n\tfmt.Printf(\"open=%d inUse=%d idle=%d\\n\", stats.OpenConnections, stats.InUse, stats.Idle)\n}",
        explanation: "Package database/sql Go memiliki API untuk mengontrol ukuran pool, lifetime, dan idle time.",
      },
    },
    {
      id: "sec-04-$1",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Pooling mengurangi overhead koneksi dan melindungi database. Sizing gunakan Little's Law, batasi max_connections, terapkan PgBouncer untuk multiplexing, dan konfigurasikan timeout untuk mencegah resource exhaustion.`,
    },
  ],
}
