import type { Lesson } from '@/content/types'

export const ch02Lesson: Lesson = {
  id: "lesson-ch-02-explain-execution-plans",
  estimatedMinutes: 55,
  sections: [
    {
      id: "sec-02-$1",
      type: 'markdown',
      level: 'basic',
      title: "Pengantar EXPLAIN & Execution Plans",
      content: `## Membaca EXPLAIN

Perintah \`EXPLAIN\` menampilkan execution plan yang dipilih optimizer. Contoh:

\`EXPLAIN SELECT * FROM users WHERE id = 1;\`

Output mungkin menunjukkan:

\`Index Scan using users_pkey on users ...\`

Tambahkan \`ANALYZE\` untuk mengeksekusi query dan melihat waktu aktual:

\`EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM users WHERE id = 1;\`

## Komponen Output

- **cost=0.00..8.30**: startup cost dan total cost dalam unit abstrak.
- **rows=1**: estimasi jumlah row yang dikembalikan node.
- **width=37**: estimasi ukuran row dalam byte.
- **actual time=0.012..0.013**: waktu aktual startup dan total.
- **loops=1**: berapa kali node dieksekusi.
- **Buffers: shared hit=1 read=0**: jumlah buffer yang dibaca dari cache (hit) atau disk (read).

## Node Umum

- **Seq Scan**: membaca table secara sequential.
- **Index Scan**: traversal index lalu lookup heap untuk setiap row.
- **Index Only Scan**: menjawab query hanya dari index.
- **Bitmap Index Scan + Bitmap Heap Scan**: mengumpulkan bitmap matching rows lalu mengakses heap secara berurutan.
- **Nested Loop, Hash Join, Merge Join**: algoritma join.`,
    },
    {
      id: "sec-02-$1",
      type: 'code-example',
      codeExample: {
        id: "code-02-js",
        filename: "parse-plan.js",
        language: 'javascript',
        title: "JavaScript: Parser Teks Plan Sederhana",
        code: "const planText = `\n  Seq Scan on orders  (cost=0.00..35.50 rows=2550 width=37)\n    Filter: (status = 'shipped'::text)\n`\n\nfunction parseNode(line) {\n  const match = line.match(/(\\w+)\\s+(?:Scan|Join|Aggregate|Sort) on \\w+.*cost=([\\d.]+)\\.\\.([\\d.]+) rows=(\\d+) width=(\\d+)/)\n  if (!match) return null\n  return {\n    operation: match[1],\n    startupCost: Number(match[2]),\n    totalCost: Number(match[3]),\n    estimatedRows: Number(match[4]),\n    width: Number(match[5]),\n  }\n}\n\nconsole.log(parseNode(planText.split(\"\\n\")[1]))",
        explanation: "Parser regex kecil mengilustrasikan bagaimana tools visualizer mengekstrak metrik dari teks plan.",
      },
    },
    {
      id: "sec-02-$1",
      type: 'markdown',
      level: 'intermediate',
      title: "Konsep Menengah EXPLAIN & Execution Plans",
      content: `## Perbandingan Node Join

- **Nested Loop**: cocok ketika satu sisi kecil dan sisi lain memiliki index. Kompleksitas O(M × N) tetapi murah jika M kecil.
- **Hash Join**: membangun hash table dari sisi kecil, lalu memprobesisi besar. Efisien untuk join tanpa index pada predicate.
- **Merge Join**: membutuhkan kedua sisi terurut. Efisien untuk large sorted inputs.

Pilihan bergantung pada ukuran relasi, keberadaan index, dan memory.

## Index Scan vs Bitmap Index Scan

- **Index Scan**: mengembalikan row satu per satu. Baik untuk LIMIT atau ketika hanya sedikit row.
- **Bitmap Index Scan**: mengumpulkan semua pointer row ke bitmap, lalu mengakses heap secara ordered. Baik untuk banyak row yang tersebar di banyak page karena mengurangi random I/O.

## Sort dan Aggregate

- **Sort**: terjadi untuk \`ORDER BY\`, merge join, atau input ke aggregate.
- **Aggregate**: \`HashAggregate\` lebih cepat untuk banyak groups; \`GroupAggregate\` digunakan untuk input yang sudah terurut.`,
    },
    {
      id: "sec-02-$1",
      type: 'code-example',
      codeExample: {
        id: "code-02-ts",
        filename: "plan-analyzer.ts",
        language: 'typescript',
        title: "TypeScript: Struktur Typed Plan Node",
        code: "type PlanNode = {\n  \"Node Type\": string\n  \"Startup Cost\": number\n  \"Total Cost\": number\n  \"Plan Rows\": number\n  \"Plan Width\": number\n  \"Actual Rows\"?: number\n  \"Actual Total Time\"?: number\n  \"Buffers\"?: { shared_hit?: number; shared_read?: number }\n  Plans?: PlanNode[]\n}\n\nfunction findHotSpot(node: PlanNode): PlanNode | null {\n  let worst: PlanNode | null = null\n  function walk(n: PlanNode) {\n    if (!worst || (n[\"Actual Total Time\"] ?? 0) > (worst[\"Actual Total Time\"] ?? 0)) {\n      worst = n\n    }\n    n.Plans?.forEach(walk)\n  }\n  walk(node)\n  return worst\n}\n\nconst sample: PlanNode = {\n  \"Node Type\": \"Seq Scan\",\n  \"Startup Cost\": 0,\n  \"Total Cost\": 100,\n  \"Plan Rows\": 1000,\n  \"Plan Width\": 32,\n  \"Actual Total Time\": 45.2,\n}\n\nconsole.log(findHotSpot(sample)?.[\"Node Type\"])",
        explanation: "Representasi typed dari node plan EXPLAIN FORMAT JSON memudahkan analisis otomatis seperti mencari node dengan waktu tertinggi.",
      },
    },
    {
      id: "sec-02-$1",
      type: 'markdown',
      level: 'advanced',
      title: "Internal Lanjutan EXPLAIN & Execution Plans",
      content: `## Di Balik Cost Model

Cost PostgreSQL adalah fungsi dari:

- **seq_page_cost**: biaya membaca satu page secara sequential.
- **random_page_cost**: biaya membaca satu page secara random.
- **cpu_tuple_cost**: biaya memproses satu row.
- **cpu_index_tuple_cost**: biaya memproses satu index entry.
- **cpu_operator_cost**: biaya mengevaluasi satu operator.
- **parallel_setup_cost** dan **parallel_tuple_cost**: overhead parallelism.

Nilai default \`random_page_cost=4\` cocok untuk HDD; untuk SSD dapat diturunkan menjadi 1.1.

## Misestimation dan Rectification

Jika \`Actual Rows\` jauh dari \`Plan Rows\`, kemungkinan penyebab:

1. Statistik usang → jalankan \`ANALYZE\`.
2. Distribusi data skewed → tingkatkan \`default_statistics_target\`.
3. Korelasi antar kolom → buat \`CREATE STATISTICS\`.
4. Predikat kompleks yang tidak tercakup histogram.

## BUFFERS dan I/O Pattern

\`EXPLAIN (ANALYZE, BUFFERS)\` menampilkan:

- \`shared hit\`: ditemukan di shared buffer.
- \`shared read": dibaca dari disk.
- \`temp read/write": penggunaan temporary file karena work_mem tidak cukup.

Jika \`temp read\` tinggi, pertimbangkan menaikkan \`work_mem\` atau menulis query yang lebih efisien.

## Visualizer

Plan dalam format JSON dapat dimuat ke visualizer seperti explain.dalibo.com atau pganalyze untuk membaca tree secara interaktif.`,
    },
    {
      id: "sec-02-$1",
      type: 'code-example',
      codeExample: {
        id: "code-02-go",
        filename: "main.go",
        language: 'go',
        title: "Go: Parsing EXPLAIN FORMAT JSON",
        code: "package main\n\nimport (\n\t\"database/sql\"\n\t\"encoding/json\"\n\t\"fmt\"\n\t\"log\"\n\n\t_ \"github.com/lib/pq\"\n)\n\ntype Plan struct {\n\tPlan PlanNode `json:\"Plan\"`\n}\n\ntype PlanNode struct {\n\tNodeType string     `json:\"Node Type\"`\n\tCost     float64    `json:\"Total Cost\"`\n\tPlans    []PlanNode `json:\"Plans\"`\n}\n\nfunc main() {\n\tdb, err := sql.Open(\"postgres\", \"postgres://user:pass@localhost/shop?sslmode=disable\")\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tdefer db.Close()\n\n\tvar raw string\n\terr = db.QueryRow(\n\t\t\"EXPLAIN (FORMAT JSON) SELECT * FROM orders WHERE user_id = $1\", 42,\n\t).Scan(&raw)\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\n\tvar plans []Plan\n\tif err := json.Unmarshal([]byte(raw), &plans); err != nil {\n\t\tlog.Fatal(err)\n\t}\n\n\tfor _, node := range plans[0].Plan.Plans {\n\t\tfmt.Printf(\"%s: %.2f\\n\", node.NodeType, node.Cost)\n\t}\n}",
        explanation: "Dengan format JSON, kita dapat mem-parsing plan ke struct Go untuk monitoring dan alerting.",
      },
    },
    {
      id: "sec-02-$1",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: EXPLAIN ANALYZE adalah alat utama untuk memahami performa query. Perhatikan cost, rows, actual time, dan buffer I/O. Jika estimasi meleset, perbarui statistik atau pertimbangkan ulang desain query.`,
    },
  ],
}
