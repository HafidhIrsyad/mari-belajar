import type { Lesson } from '@/content/types'

export const ch07Lesson: Lesson = {
  id: "lesson-ch-07-data-warehouse-olap",
  estimatedMinutes: 60,
  sections: [
    {
      id: "sec-07-01",
      type: 'markdown',
      level: 'basic',
      title: "OLTP vs OLAP",
      content: `## Dua Dunia Database

Sistem database dapat dibagi menjadi dua kategori besar berdasarkan workload:

### OLTP (Online Transaction Processing)

- Banyak transaksi kecil, cepat, dan konkuren.
- Biasanya menyimpan data terkini.
- Normalisasi tinggi untuk menghindari redundansi.
- Contoh: order entry, payment processing, user registration.

### OLAP (Online Analytical Processing)

- Query kompleks pada data historis.
- Aggregasi besar: SUM, COUNT, AVG, GROUP BY.
- Denormalisasi diterima demi performa query.
- Contoh: laporan penjualan, dashboard executive, analisis tren.

## Data Warehouse

**Data warehouse** adalah repositori data terintegrasi yang dioptimalkan untuk query analitis. Data berasal dari berbagai sumber (OLTP, CRM, log, external) melalui proses ekstraksi, transformasi, dan loading.

Karakteristik data warehouse (Inmon):
- Subject-oriented.
- Integrated.
- Time-variant.
- Non-volatile.

## Star Schema

Star schema adalah model data warehouse paling umum:

- **Fact table**: menyimpan metrik dan foreign keys ke dimension tables.
- **Dimension tables**: menyimpan atribut deskriptif (waktu, produk, customer, region).

Contoh fact table: \`sales_fact(order_id, date_id, product_id, customer_id, quantity, revenue)\`.

## Snowflake Schema

Snowflake schema adalah varian star schema di mana dimension tables dinormalisasi lebih lanjut. Contoh: dimension produk dipecah menjadi kategori, brand, dan product.`,
    },
    {
      id: "sec-07-02",
      type: 'code-example',
      codeExample: {
        id: "code-07-js",
        filename: "olap-aggregation.js",
        language: 'javascript',
        title: "JavaScript: Simulasi Aggregasi OLAP",
        code: "const sales = [\n  { date: '2026-01-01', region: 'Jakarta', product: 'Laptop', qty: 2, revenue: 2000 },\n  { date: '2026-01-01', region: 'Bandung', product: 'Mouse', qty: 5, revenue: 250 },\n  { date: '2026-01-02', region: 'Jakarta', product: 'Laptop', qty: 1, revenue: 1000 },\n  { date: '2026-01-02', region: 'Jakarta', product: 'Mouse', qty: 3, revenue: 150 },\n]\n\n// Roll-up: total revenue per region\nconst revenueByRegion = sales.reduce((acc, row) => {\n  acc[row.region] = (acc[row.region] || 0) + row.revenue\n  return acc\n}, {})\nconsole.log(revenueByRegion)\n\n// Slice: hanya Jakarta\nconst jakartaSales = sales.filter((row) => row.region === 'Jakarta')\nconsole.log(jakartaSales)\n\n// Drill-down: revenue per tanggal di Jakarta\nconst revenueByDate = jakartaSales.reduce((acc, row) => {\n  acc[row.date] = (acc[row.date] || 0) + row.revenue\n  return acc\n}, {})\nconsole.log(revenueByDate)",
        explanation: "Operasi OLAP dasar seperti roll-up, slice, dan drill-down dapat disimulasikan dengan reduce dan filter pada array.",
      },
    },
    {
      id: "sec-07-03",
      type: 'markdown',
      level: 'intermediate',
      title: "ETL/ELT & Columnar Storage",
      content: `## ETL vs ELT

### ETL (Extract, Transform, Load)

1. **Extract**: ambil data dari source systems.
2. **Transform**: bersihkan, gabungkan, agregasi di staging area.
3. **Load**: masukkan ke data warehouse.

Cocok untuk: skema ketat, data quality penting, source tidak dapat menangani transformasi berat.

### ELT (Extract, Load, Transform)

1. **Extract**: ambil data mentah.
2. **Load**: langsung masukkan ke data warehouse.
3. **Transform**: transformasi dijalankan di dalam warehouse.

Cocok untuk: cloud warehouse yang scalable seperti BigQuery, Snowflake, Redshift.

## Columnar Storage

OLAP database modern umumnya menggunakan **columnar storage**: data disimpan per kolom, bukan per row.

Keuntungan:
- Query analytical biasanya hanya membaca beberapa kolom.
- Kompresi jauh lebih baik karena nilai dalam satu kolom serupa.
- Operasi vectorized (SIMD) mempercepat aggregasi.

Contoh columnar database: Amazon Redshift, Google BigQuery, Snowflake, Apache Parquet.

## Partitioning di Warehouse

Data warehouse sering dipartisi berdasarkan waktu untuk:
- Mempercepat query historis.
- Memudahkan purge data lama.
- Mengurangi biaya storage (cold storage untuk partisi tua).

## Slowly Changing Dimensions (SCD)

Dimensi seperti customer atau produk berubah seiring waktu. Teknik SCD:

- **SCD Type 1**: overwrite nilai lama.
- **SCD Type 2**: simpan riwayat dengan effective date dan flag aktif.
- **SCD Type 3**: simpan nilai sebelumnya di kolom terpisah.`,
    },
    {
      id: "sec-07-04",
      type: 'code-example',
      codeExample: {
        id: "code-07-ts",
        filename: "star-schema.ts",
        language: 'typescript',
        title: "TypeScript: Model Star Schema",
        code: "type DateDimension = {\n  dateId: number\n  date: string\n  year: number\n  month: number\n  day: number\n  quarter: number\n}\n\ntype ProductDimension = {\n  productId: number\n  name: string\n  category: string\n  brand: string\n}\n\ntype SalesFact = {\n  saleId: number\n  dateId: number\n  productId: number\n  quantity: number\n  revenue: number\n}\n\nfunction aggregateByCategory(\n  facts: SalesFact[],\n  products: ProductDimension[]\n): Record<string, number> {\n  const productMap = new Map(products.map((p) => [p.productId, p]))\n  return facts.reduce((acc, fact) => {\n    const product = productMap.get(fact.productId)\n    if (!product) return acc\n    acc[product.category] = (acc[product.category] || 0) + fact.revenue\n    return acc\n  }, {} as Record<string, number>)\n}\n\nconst products: ProductDimension[] = [\n  { productId: 1, name: 'Laptop', category: 'Electronics', brand: 'X' },\n  { productId: 2, name: 'Mouse', category: 'Electronics', brand: 'Y' },\n]\n\nconst facts: SalesFact[] = [\n  { saleId: 1, dateId: 20260101, productId: 1, quantity: 2, revenue: 2000 },\n  { saleId: 2, dateId: 20260101, productId: 2, quantity: 5, revenue: 250 },\n]\n\nconsole.log(aggregateByCategory(facts, products))",
        explanation: "Model star schema memisahkan fact dan dimension, memudahkan aggregasi berdasarkan atribut dimensi seperti kategori produk.",
      },
    },
    {
      id: "sec-07-05",
      type: 'markdown',
      level: 'advanced',
      title: "Data Lake, Modern Warehouse & Data Mesh",
      content: `## Data Lake

**Data lake** menyimpan data mentah dalam format aslinya (JSON, Parquet, CSV, log, binary). Berbeda dengan data warehouse yang terstruktur, data lake mendukung structured, semi-structured, dan unstructured data.

Tools: Amazon S3, Apache Hudi, Delta Lake, Apache Iceberg.

## Lakehouse

**Lakehouse** menggabungkan fleksibilitas data lake dengan kemampuan transaction dan performance data warehouse. Fitur utama:
- ACID transaction pada object storage.
- Schema enforcement dan evolution.
- Time travel dan versioning.

Delta Lake, Iceberg, dan Hudi adalah implementasi populer.

## Modern Cloud Warehouse

- **BigQuery**: serverless, columnar, terintegrasi dengan GCP.
- **Snowflake**: arsitektur multi-cluster shared data, separation of compute and storage.
- **Redshift**: data warehouse AWS dengan RA3 node dan Spectrum untuk query data lake.

## Data Mesh

**Data mesh** adalah pendekatan organisasi data yang menekankan:

- **Domain-oriented ownership**: tim domain bertanggung jawab atas data produk mereka.
- **Data as a product**: data diperlakukan seperti produk dengan SLA, dokumentasi, dan versioning.
- **Self-serve data infrastructure**: platform menyediakan tools untuk tim.
- **Federated governance**: standar keamanan dan interoperabilitas bersama.

Data mesh tidak memusatkan semua data ke satu team; sebaliknya, ia mendistribusikan ownership.

## OLAP Under The Hood

Query OLAP sering melibatkan full table scan pada miliaran row. Columnar storage mengurangi I/O dengan hanya membaca kolom yang dibutuhkan. Selain itu, teknik seperti:

- **Bitmap indexes**: untuk kolom dengan low cardinality.
- **Zone maps**: metadata min/max per block untuk pruning.
- **Result caching**: menyimpan hasil query yang sering dijalankan.
- **Materialized views**: pre-computed aggregasi.`,
    },
    {
      id: "sec-07-06",
      type: 'code-example',
      codeExample: {
        id: "code-07-go",
        filename: "batch_report.go",
        language: 'go',
        title: "Go: Batch Report Aggregator",
        code: "package main\n\nimport (\n\t\"encoding/csv\"\n\t\"fmt\"\n\t\"os\"\n\t\"strconv\"\n)\n\ntype Sale struct {\n\tDate     string\n\tRegion   string\n\tProduct  string\n\tQuantity int\n\tRevenue  float64\n}\n\nfunc main() {\n\tfile, err := os.Open(\"sales.csv\")\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tdefer file.Close()\n\n\treader := csv.NewReader(file)\n\trecords, err := reader.ReadAll()\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\n\trevenueByRegion := make(map[string]float64)\n\tfor _, record := range records[1:] { // skip header\n\t\tregion := record[1]\n\t\trevenue, _ := strconv.ParseFloat(record[4], 64)\n\t\trevenueByRegion[region] += revenue\n\t}\n\n\tfor region, revenue := range revenueByRegion {\n\t\tfmt.Printf(\"%s: %.2f\\n\", region, revenue)\n\t}\n}",
        explanation: "Program batch Go ini membaca CSV penjualan dan menghitung total revenue per region, mengilustrasikan pola ETL sederhana menuju reporting.",
      },
    },
    {
      id: "sec-07-07",
      type: 'callout',
      calloutType: 'info',
      content: `Kesimpulan: Pisahkan workload OLTP dan OLAP untuk menghindari query berat membebani transaksi operational. Gunakan star/snowflake schema untuk analytical model, columnar storage untuk performa, dan pertimbangkan lakehouse atau data mesh sesuai skala organisasi.

Tools 2026: BigQuery, Snowflake, Redshift, dbt untuk transformasi, Delta Lake/Iceberg untuk lakehouse, dan Apache Superset/Metabase untuk visualisasi.`,
    },
  ],
}
