import type { Lesson } from '@/content/types'

export const ch01Lesson: Lesson = {
  id: "lesson-ch-01-query-optimization",
  estimatedMinutes: 55,
  sections: [
    {
      id: "sec-01-$1",
      type: 'markdown',
      level: 'basic',
      title: "Pengantar Query Optimization",
      content: `## Optimasi Query dari Sudut Pandang Database

Setiap query SQL melewati beberapa tahap sebelum dieksekusi: parsing, rewriting, planning, dan execution. Tahap **planning** adalah jantung optimasi.

- **Rule-based optimizer** memilih plan berdasarkan aturan tetap, misalnya "index selalu lebih baik dari full scan".
- **Cost-based optimizer** (CBO) menghitung estimasi biaya tiap candidate plan: jumlah page yang dibaca, biaya CPU, transfer memori, dan parallelism.

## Selectivity dan Cardinality

- **Selectivity** adalah fraksi row yang cocok dengan predicate. Selectivity 0.001 berarti hanya 0.1% row yang lolos.
- **Cardinality** adalah estimasi jumlah row hasil. Jika table memiliki 1 juta row dan selectivity 0.001, cardinality = 1.000.

Cardinality yang akurat sangat penting karena menentukan urutan join, pilihan index, dan alokasi memori.

## Query Sargable

Sargable = Search Argument Able. Predicate sargable memungkinkan database menggunakan index dengan efisien. Contoh tidak sargable:

\`WHERE YEAR(created_at) = 2026\`

Lebih baik:

\`WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'\``,
    },
    {
      id: "sec-01-$1",
      type: 'code-example',
      codeExample: {
        id: "code-01-js",
        filename: "cost-model-simulation.js",
        language: 'javascript',
        title: "JavaScript: Simulasi Cost Model Sederhana",
        code: "function estimateCost(tableRows, selectivity, indexLookupCost, pageSize, seqPageCost, randomPageCost) {\n  const matchingRows = tableRows * selectivity\n  const pages = Math.ceil(tableRows / pageSize)\n\n  // Sequential scan: baca semua page\n  const seqScanCost = pages * seqPageCost\n\n  // Index scan: traversal tree + lookup row untuk setiap match\n  const indexScanCost =\n    Math.log2(pages) * randomPageCost + matchingRows * (indexLookupCost + randomPageCost)\n\n  return {\n    seqScanCost: Math.round(seqScanCost),\n    indexScanCost: Math.round(indexScanCost),\n    chosen: seqScanCost <= indexScanCost ? \"Seq Scan\" : \"Index Scan\",\n  }\n}\n\nconsole.log(estimateCost(1_000_000, 0.5, 0.01, 100, 1.0, 4.0))\n// Seq Scan dipilih karena setengah row cocok\n\nconsole.log(estimateCost(1_000_000, 0.0001, 0.01, 100, 1.0, 4.0))\n// Index Scan dipilih karena hanya 100 row cocok",
        explanation: "Model sederhana ini membandingkan biaya sequential scan versus index scan berdasarkan selectivity. Database sesungguhnya memiliki cost model yang jauh lebih kaya.",
      },
    },
    {
      id: "sec-01-$1",
      type: 'markdown',
      level: 'intermediate',
      title: "Konsep Menengah Query Optimization",
      content: `## Statistik dan Histogram

Optimizer mengandalkan statistik yang dikumpulkan oleh \`ANALYZE\`:

- **Null fraction**: fraksi nilai NULL.
- **Distinct values**: jumlah nilai unik.
- **Most Common Values (MCV)** dan frekuensinya.
- **Histogram**: distribusi data untuk kolom dengan banyak nilai unik.
- **Correlation**: seberapa berkorelasi urutan fisik row dengan urutan nilai kolom.

Dengan histogram, optimizer dapat memperkirakan selectivity predicate range seperti \`WHERE age BETWEEN 20 AND 30\`.

## Join Selectivity dan Join Order

Untuk query dengan banyak table, optimizer harus memutuskan:

1. Urutan join.
2. Algoritma join: nested loop, hash join, atau merge join.
3. Pilihan driven table dan inner table.

Jumlah kemungkinan urutan join tumbuh faktorial dengan jumlah table. PostgreSQL menggunakan **Genetic Query Optimizer** (GEQO) untuk query dengan banyak join.

## Predicate Pushdown

Predicate pushdown memindahkan filter ke sumber data sedini mungkin. Contoh:

\`SELECT * FROM (SELECT * FROM orders) o WHERE o.status = 'shipped'\`

Optimizer akan mendorong \`status = 'shipped'\` ke dalam subquery sehingga tidak perlu membaca semua row.`,
    },
    {
      id: "sec-01-$1",
      type: 'code-example',
      codeExample: {
        id: "code-01-ts",
        filename: "sargability-checker.ts",
        language: 'typescript',
        title: "TypeScript: Memeriksa Sargability Predicate",
        code: "type Predicate = { column: string; operator: string; expression: string }\n\nfunction isSargable(predicate: Predicate): { sargable: boolean; reason: string } {\n  const leftSide = predicate.column.trim()\n  const rightSide = predicate.expression.trim()\n\n  // Sisi kiri tidak boleh mengandung fungsi pada kolom\n  if (/w+s*(/.test(leftSide)) {\n    return {\n      sargable: false,\n      reason: `Fungsi atau ekspresi diterapkan pada kolom: ${leftSide}`,\n    }\n  }\n\n  // Operator negasi umumnya tidak sargable\n  if (predicate.operator === \"<>\" || predicate.operator.toUpperCase() === \"NOT\") {\n    return { sargable: false, reason: \"Operator negasi menghambat penggunaan index\" }\n  }\n\n  return { sargable: true, reason: \"Predicate dapat menggunakan index\" }\n}\n\nconsole.log(isSargable({ column: \"created_at\", operator: \">=\", expression: \"'2026-01-01'\" }))\nconsole.log(isSargable({ column: \"YEAR(created_at)\", operator: \"=\", expression: \"2026\" }))",
        explanation: "Fungsi ini mendeteksi pola umum yang membuat predicate tidak sargable, seperti fungsi pada kolom dan operator negasi.",
      },
    },
    {
      id: "sec-01-$1",
      type: 'markdown',
      level: 'advanced',
      title: "Internal Lanjutan Query Optimization",
      content: `## Di Balik Query Planner PostgreSQL

PostgreSQL planner bekerja dalam beberapa tahap:

1. **Scan path**: mengevaluasi sequential scan, index scan, bitmap index scan, dan index-only scan.
2. **Join path**: mengevaluasi nested loop, merge join, hash join untuk setiap pasangan relasi.
3. **Aggregation**: memilih grouped aggregation, hash aggregate, atau mixed strategy.
4. **Cost comparison**: memilih path dengan total cost terendah.

### Genetic Query Optimizer (GEQO)

Ketika jumlah join melebihi \`geqo_threshold\` (default 12), PostgreSQL beralih ke algoritma genetika untuk menghindari ledakan kombinatorial. GEQO menggunakan populasi plan, mutasi, dan crossover untuk mendekati plan optimal.

### Misestimation dan Statistics Target

Misestimation terjadi ketika distribusi data berubah drastis atau statistik tidak cukup granular. Solusi:

- Tingkatkan \`default_statistics_target\` untuk kolom penting.
- Buat extended statistics untuk korelasi antar kolom.
- Gunakan \`CREATE STATISTICS\` dengan dependencies/functional/n distints.

### Parallel Query

PostgreSQL dapat mem parallel sequential scan, parallel index scan, parallel hash join, dan parallel aggregation. Parameter \`max_parallel_workers_per_gather\` mengontrol derajat parallelism.

### Partition Pruning

Pada table partitioned, planner dapat memangkas partisi yang tidak relevan berdasarkan predicate pada key partisi, mengurangi jumlah data yang diproses.`,
    },
    {
      id: "sec-01-$1",
      type: 'code-example',
      codeExample: {
        id: "code-01-go",
        filename: "main.go",
        language: 'go',
        title: "Go: Mengamati Plan dengan EXPLAIN",
        code: "package main\n\nimport (\n\t\"database/sql\"\n\t\"fmt\"\n\t\"log\"\n\n\t_ \"github.com/lib/pq\"\n)\n\nfunc main() {\n\tdb, err := sql.Open(\"postgres\", \"postgres://user:pass@localhost/shop?sslmode=disable\")\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tdefer db.Close()\n\n\tquery := `\n\t\tEXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)\n\t\tSELECT order_id, total\n\t\tFROM orders\n\t\tWHERE user_id = $1 AND created_at >= $2\n\t\tORDER BY created_at\n\t`\n\n\trows, err := db.Query(query, 42, \"2026-01-01\")\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tdefer rows.Close()\n\n\tfor rows.Next() {\n\t\tvar plan string\n\t\tif err := rows.Scan(&plan); err != nil {\n\t\t\tlog.Fatal(err)\n\t\t}\n\t\tfmt.Println(plan)\n\t}\n}",
        explanation: "Go dapat meminta PostgreSQL untuk mengembalikan execution plan dalam format JSON, yang berguna untuk logging dan analisis otomatis.",
      },
    },
    {
      id: "sec-01-$1",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Optimasi query dimulai dari pemahaman cost model, selectivity, dan sargability. Selalu dukung optimizer dengan statistik akurat dan verifikasi plan dengan EXPLAIN ANALYZE.`,
    },
  ],
}
