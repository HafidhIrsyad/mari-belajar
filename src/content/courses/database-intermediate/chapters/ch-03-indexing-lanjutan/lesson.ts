import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: "lesson-ch-03-indexing-lanjutan",
  estimatedMinutes: 60,
  sections: [
    {
      id: "sec-03-$1",
      type: 'markdown',
      level: 'basic',
      title: "Pengantar Indexing Lanjutan",
      content: `## Partial Index

Partial index hanya mengindeks row yang memenuhi kondisi tertentu. Sintaks:

\`CREATE INDEX idx_orders_unpaid ON orders(user_id) WHERE status = 'unpaid';\`

Keuntungan:

- Ukuran index lebih kecil.
- Pencarian lebih cepat karena tree lebih ringan.
- Write overhead lebih rendah untuk row yang tidak cocok predicate.

## Expression Index

Expression index mempercepat query dengan ekspresi atau fungsi pada kolom:

\`CREATE INDEX idx_users_lower_email ON users(LOWER(email));\`

Query yang cocok:

\`SELECT * FROM users WHERE LOWER(email) = LOWER('Alice@Example.com');\`

Tanpa expression index, predicate \`LOWER(email)\` tidak dapat menggunakan index biasa.

## Covering Index

Covering index mencakup semua kolom yang dibutuhkan query, biasanya menggunakan \`INCLUDE\`:

\`CREATE INDEX idx_orders_user_status ON orders(user_id) INCLUDE(status);\`

Ini memungkinkan index-only scan: database tidak perlu mengakses heap.`,
    },
    {
      id: "sec-03-$1",
      type: 'code-example',
      codeExample: {
        id: "code-03-js",
        filename: "index-selector.js",
        language: 'javascript',
        title: "JavaScript: Memilih Jenis Index",
        code: "function recommendIndex(queryPattern) {\n  if (queryPattern.includes(\"LOWER(\")) {\n    return \"expression index pada hasil LOWER()\"\n  }\n  if (queryPattern.match(/WHERE status = '\\w+'/)) {\n    return \"pertimbangkan partial index jika nilai status selektif\"\n  }\n  if (queryPattern.includes(\"SELECT user_id, status FROM orders\")) {\n    return \"covering index dengan INCLUDE(status)\"\n  }\n  return \"B-tree pada kolom predicate\"\n}\n\nconsole.log(recommendIndex(\"SELECT * FROM users WHERE LOWER(email) = $1\"))\nconsole.log(recommendIndex(\"SELECT user_id, status FROM orders WHERE user_id = $1\"))",
        explanation: "Aturan sederhana ini memetakan pola query ke jenis index yang paling sesuai.",
      },
    },
    {
      id: "sec-03-$1",
      type: 'markdown',
      level: 'intermediate',
      title: "Konsep Menengah Indexing Lanjutan",
      content: `## Index-Only Scan dan Visibility Map

Di PostgreSQL, index-only scan membutuhkan **visibility map** untuk mengetahui apakah suatu page heap sudah "visible to all transactions". Jika page visible, database tidak perlu memeriksa heap. Jika tidak, terjadi **visibility map check** yang sedikit menambah biaya.

Untuk meningkatkan index-only scan, jalankan \`VACUUM\` secara rutin agar visibility map terupdate.

## Full-Text Search dengan GIN

PostgreSQL memiliki tipe \`tsvector\` dan \`tsquery\`. Index GIN mempercepat pencarian teks:

\`CREATE INDEX idx_docs_search ON docs USING GIN(to_tsvector('english', content));\`

Query:

\`SELECT * FROM docs WHERE to_tsvector('english', content) @@ to_tsquery('database & indexing');\`

## Trigram dan Similarity

Extension \`pg_trgm\` menyediakan index GIN/GiST untuk pencarian similarity:

\`CREATE INDEX idx_users_trgm ON users USING GIN(email gin_trgm_ops);\`

\`SELECT * FROM users WHERE email % 'alice@example.com';\`

Operator \`%\` menunjukkan similarity threshold.`,
    },
    {
      id: "sec-03-$1",
      type: 'code-example',
      codeExample: {
        id: "code-03-ts",
        filename: "index-design.ts",
        language: 'typescript',
        title: "TypeScript: Desain Index untuk Query Pattern",
        code: "interface QueryPattern {\n  select: string[]\n  where: { column: string; op: string }[]\n  orderBy?: string\n  highSelectivityPredicate?: string\n}\n\nfunction designIndexes(pattern: QueryPattern): string[] {\n  const indexes: string[] = []\n  const whereColumns = pattern.where.map((w) => w.column)\n\n  if (whereColumns.length > 1) {\n    indexes.push(`CREATE INDEX idx_${whereColumns.join(\"_\")} ON table_name(${whereColumns.join(\", \")})`)\n  } else if (whereColumns.length === 1) {\n    const col = whereColumns[0]\n    if (pattern.select.length > 0) {\n      indexes.push(`CREATE INDEX idx_${col}_cover ON table_name(${col}) INCLUDE(${pattern.select.join(\", \")})`)\n    } else {\n      indexes.push(`CREATE INDEX idx_${col} ON table_name(${col})`)\n    }\n  }\n\n  if (pattern.highSelectivityPredicate) {\n    indexes.push(`CREATE INDEX idx_partial ON table_name(...) WHERE ${pattern.highSelectivityPredicate}`)\n  }\n\n  return indexes\n}\n\nconsole.log(designIndexes({\n  select: [\"status\"],\n  where: [{ column: \"user_id\", op: \"=\" }],\n}))",
        explanation: "Fungsi ini menghasilkan skrip index berdasarkan kolom predicate dan kolom select, termasuk covering index.",
      },
    },
    {
      id: "sec-03-$1",
      type: 'markdown',
      level: 'advanced',
      title: "Internal Lanjutan Indexing Lanjutan",
      content: `## Di Balik GIN dan GiST

- **GIN (Generalized Inverted Index)**: dirancang untuk data yang nilainya adalah himpunan (array, JSONB, tsvector). Setiap elemen memetakan ke daftar row yang memuatnya. Cocok untuk equality dan containment.
- **GiST (Generalized Search Tree)**: framework untuk tipe data yang mendukung operator kelas seperti geometri, range, dan nearest-neighbor. GiST memungkinkan index untuk \`<->\` (distance) queries.
- **SP-GiST (Space-Partitioned GiST)**: untuk data yang dapat dipartisi secara rekursif, misalnya quadtree untuk titik geografis.
- **BRIN (Block Range INdex)**: menyimpan nilai minimum dan maksimum untuk setiap block range. Sangat kecil dan efisien untuk data yang terurut secara fisik, seperti timestamp dengan urutan insert.

## Write Amplification dan HOT Updates

Setiap index menambah biaya tulis. PostgreSQL memiliki **HOT (Heap-Only Tuple) updates**: jika update tidak mengubah kolom yang di-index, database dapat membuat tuple baru di heap tanpa memperbarui setiap index, mengurangi write amplification.

## Index Maintenance

Index dapat menjadi bloat karena update/delete. Lakukan:

- \`REINDEX CONCURRENTLY\` untuk membangun ulang tanpa lock.
- \`pgstattuple\` untuk memantau bloat.
- Pertimbangkan \`fillfactor\` untuk index yang sering update.

## Cost-Benefit Analysis

Sebelum membuat index, tanyakan:

1. Seberapa sering query ini dieksekusi?
2. Berapa selectivity predicate?
3. Berapa overhead tulis tambahan?
4. Apakah index dapat menjadi covering?`,
    },
    {
      id: "sec-03-$1",
      type: 'code-example',
      codeExample: {
        id: "code-03-go",
        filename: "main.go",
        language: 'go',
        title: "Go: Membuat Partial dan Expression Index",
        code: "package main\n\nimport (\n\t\"database/sql\"\n\t\"fmt\"\n\t\"log\"\n\n\t_ \"github.com/lib/pq\"\n)\n\nfunc main() {\n\tdb, err := sql.Open(\"postgres\", \"postgres://user:pass@localhost/shop?sslmode=disable\")\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tdefer db.Close()\n\n\tstmts := []string{\n\t\t\"CREATE INDEX IF NOT EXISTS idx_orders_unpaid ON orders(user_id) WHERE status = 'unpaid'\",\n\t\t\"CREATE INDEX IF NOT EXISTS idx_users_lower_email ON users(LOWER(email))\",\n\t\t\"CREATE INDEX IF NOT EXISTS idx_orders_cover ON orders(user_id) INCLUDE(status)\",\n\t}\n\n\tfor _, stmt := range stmts {\n\t\tif _, err := db.Exec(stmt); err != nil {\n\t\t\tlog.Printf(\"gagal %s: %v\", stmt, err)\n\t\t\tcontinue\n\t\t}\n\t\tfmt.Println(\"ok:\", stmt)\n\t}\n}",
        explanation: "Go dapat mengeksekusi DDL partial, expression, dan covering index secara idempotent dengan IF NOT EXISTS.",
      },
    },
    {
      id: "sec-03-$1",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Pilihlah jenis index berdasarkan pola query, distribusi data, dan biaya tulis. GIN/GiST/BRIN menambah senjata di luar B-tree. Pantau bloat dan pertahankan visibility map dengan VACUUM.`,
    },
  ],
}
